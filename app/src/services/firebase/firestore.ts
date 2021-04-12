import { app } from './initializeService';
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Folder } from '../../types/Folder';
import { File } from '../../types/File';

type Ref = firebase.firestore.DocumentReference;

const store = app.firestore();

const refToId = (ref: Ref) => ref.id;
const refArrayToIdArray = (refs: Ref[]) => refs.map(refToId);

const idToRef = (path: string, id: string) => store.doc(`${path}${id}`);
const idArrayToRefArray = (path: string, ids: string[]) =>
  ids.map((id) => idToRef(path, id));

const timestampToDate = (timestamp: { seconds: number }) =>
  new Date(timestamp.seconds * 1000);

const dateToTimestamp = (date: Date): { seconds: number } => ({
  seconds: Math.floor(date.getTime() / 1000),
});

export const getRootFolder = async () => {
  const {
    docs: [root],
  } = await store.collection('folders').where('name', '==', 'root').get();

  const folder: Folder = {
    id: root.id,
    name: root.get('name') as string,
    parent: refToId(root.get('parent')),
    files: refArrayToIdArray(root.get('files') ?? []),
    folders: refArrayToIdArray(root.get('folders') ?? []),
  };

  return folder;
};

export const getFolder = async (id: string) => {
  const doc = await store.doc(`/folders/${id}`).get();
  if (doc.exists === false) {
    throw new Error(`Unknown folder ${id}`);
  }
  const folder: Folder = {
    id: doc.id,
    name: doc.get('name') as string,
    parent: refToId(doc.get('parent')),
    files: refArrayToIdArray(doc.get('files') ?? []),
    folders: refArrayToIdArray(doc.get('folders') ?? []),
  };
  return folder;
};

export const getFile = async (id: string) => {
  const doc = await store.doc(`/documents/${id}`).get();

  if (doc.exists === false) {
    throw new Error(`Unknown file ${id}`);
  }

  const file: File = {
    id: doc.id,
    name: doc.get('name') as string,
    content: doc.get('content') as string,
    lastEdited: timestampToDate(doc.get('lastEdited')),
  };

  return file;
};

export const getRootReadme = async () => {
  const { files } = await getRootFolder();
  const { docs } = await store
    .collection('documents')
    .where('name', '==', 'README.md')
    .get();

  const rootReadme = docs.find((d) => files.indexOf(d.id) >= 0);

  if (rootReadme === undefined) {
    throw new Error('Failed to locate root README.md file');
  }

  const file: File = {
    id: rootReadme.id,
    name: rootReadme.get('name') as string,
    content: rootReadme.get('content') as string,
    lastEdited: timestampToDate(rootReadme.get('lastEdited')),
  };

  return file;
};

const updateFile = async (file: Pick<File, 'id' | 'name' | 'content'>) =>
  store.doc(`/documents/${file.id}`).set({
    name: file.name,
    content: file.content,
    lastEdited: dateToTimestamp(new Date()),
  });

const createFile = async (
  file: Pick<File, 'id' | 'name' | 'content'>
): Promise<string> =>
  store
    .collection(`/documents`)
    .add({
      name: file.name,
      content: file.content,
      lastEdited: dateToTimestamp(new Date()),
    })
    .then((doc) => doc.id);

export const setFile = async (file: File) => {
  const ref = store.doc(`/documents/${file.id}`);
  const doc = await ref.get();

  if (doc.exists) {
    await updateFile(file);
    return file.id;
  }
  return createFile(file);
};

const updateFolder = async (folder: Folder) =>
  store.doc(`/folders/${folder.id}`).set({
    name: folder.name,
    parent: idToRef('/folders/', folder.parent),
    files: idArrayToRefArray('/documents/', folder.files),
    folders: idArrayToRefArray('/folders/', folder.folders),
  });

const createFolder = async (folder: Folder): Promise<string> =>
  store
    .collection(`/folders`)
    .add({
      name: folder.name,
      parent: idToRef('/folders/', folder.parent),
      files: idArrayToRefArray('/documents/', folder.files),
      folders: idArrayToRefArray('/folders/', folder.folders),
    })
    .then((doc) => doc.id);

export const setFolder = async (folder: Folder) => {
  const ref = store.doc(`/folders/${folder.id}`);
  const doc = await ref.get();

  if (doc.exists) {
    updateFolder(folder);
    return folder.id;
  }
  return createFolder(folder);
};
