import { store } from './index';
import { Folder } from '../../../types/Folder';
import { resolvePath, refToId, refArrayToIdArray, idArrayToRefArray, idToRef } from './util';

export const getRootFolderID = async () => {
  const {
    docs: [root],
  } = await store.collection(resolvePath('/folders')).where('name', '==', 'root').get();
  return root.id;
};

export const getFolder = async (id: string) => {
  const doc = await store.doc(resolvePath(`/folders/${id}`)).get();
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

const updateFolder = async (folder: Folder) =>
  store.doc(resolvePath(`/folders/${folder.id}`)).set({
    name: folder.name,
    parent: idToRef('/folders/', folder.parent),
    files: idArrayToRefArray('/documents/', folder.files),
    folders: idArrayToRefArray('/folders/', folder.folders),
  });

const createFolder = async (folder: Folder): Promise<string> =>
  store
    .collection(resolvePath(`/folders`))
    .add({
      name: folder.name,
      parent: idToRef('/folders/', folder.parent),
      files: idArrayToRefArray('/documents/', folder.files),
      folders: idArrayToRefArray('/folders/', folder.folders),
    })
    .then((doc) => doc.id);

export const setFolder = async (
  folder: Pick<Folder, 'name' | 'parent' | 'files' | 'folders'> &
    Partial<Pick<Folder, 'id'>>
) => {
  const ref = store.doc(resolvePath(`/folders/${folder.id}`));
  const doc = await ref.get();

  if (doc.exists && folder.id) {
    updateFolder(folder as Folder);
    return folder.id;
  }
  return createFolder(folder as Folder);
};

// TODO: Remove folder ID from parent folder. Currently this function bricks site.
export const deleteFolder = async (id: string) =>
  store.doc(resolvePath(`/folders/${id}`)).delete();