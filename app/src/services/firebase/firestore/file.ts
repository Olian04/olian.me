import { store } from './index';
import { File } from '../../../types/File';
import { resolvePath, timestampToDate, dateToTimestamp, idToRef, Ref } from './util';
import { getRootFolderID, getFolder, setFolder } from './folder';

export const getFile = async (id: string) => {
  const doc = await store.doc(resolvePath(`/documents/${id}`)).get();

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

export const getRootReadmeID = async () => {
  const rootFolderID = await getRootFolderID();
  const { files } = await getFolder(rootFolderID);
  const { docs } = await store
    .collection(resolvePath('/documents'))
    .where('name', '==', 'README.md')
    .get();

  const rootReadme = docs.find((d) => files.indexOf(d.id) >= 0);

  if (rootReadme === undefined) {
    const rootReadmeID = await setFile({
      name: 'README.md',
      content: '# Hello World'
    });
    const rootFolder = await getFolder(rootFolderID);
    await setFolder({
      ...rootFolder,
      files: [
        ...rootFolder.files,
        rootReadmeID,
      ],
    });
    return rootReadmeID;
  }

  return rootReadme.id;
};

const updateFile = async (file: Pick<File, 'id' | 'name' | 'content'>) =>
  store.doc(resolvePath(`/documents/${file.id}`)).set({
    name: file.name,
    content: file.content,
    lastEdited: dateToTimestamp(new Date()),
  });

const createFile = async (
  file: Pick<File, 'id' | 'name' | 'content'>
): Promise<string> =>
  store
    .collection(resolvePath(`/documents`))
    .add({
      name: file.name,
      content: file.content,
      lastEdited: dateToTimestamp(new Date()),
    })
    .then((doc) => doc.id);

export const setFile = async (
  file: Pick<File, 'name' | 'content'> & Partial<Pick<File, 'id'>>
) => {
  const ref = store.doc(resolvePath(`/documents/${file.id}`));
  const doc = await ref.get();

  if (doc.exists && file.id) {
    await updateFile(file as File);
    return file.id;
  }
  return createFile(file as File);
};

export const deleteFile = async (id: string) => {
  const documentRef = store.doc(resolvePath(`/documents/${id}`));
  const { docs: [folder] } = await store
    .collection(resolvePath('/folders'))
    .where('files', 'array-contains', idToRef('/documents/', id))
    .get();

  folder.ref.update({
    files: (folder.get('files') as Ref[]).filter(r => r.id !== id),
  });
  documentRef.delete();
}
