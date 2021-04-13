import { store } from './index';
import { File } from '../../../types/File';
import { timestampToDate, dateToTimestamp } from './util';
import { getRootFolder } from './folder';

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

export const setFile = async (
  file: Pick<File, 'name' | 'content'> & Partial<Pick<File, 'id'>>
) => {
  const ref = store.doc(`/documents/${file.id}`);
  const doc = await ref.get();

  if (doc.exists && file.id) {
    await updateFile(file as File);
    return file.id;
  }
  return createFile(file as File);
};

export const deleteFile = async (id: string) =>
  store.doc(`/documents/${id}`).delete();
