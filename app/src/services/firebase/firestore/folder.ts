import { store } from './index';
import { Folder } from '../../../types/Folder';
import { deleteFile } from './file';
import { resolvePath, refToId, refArrayToIdArray, idArrayToRefArray, idToRef, Ref } from './util';

export const getRootFolderID = async () => {
  const {
    docs: [root],
  } = await store.collection(resolvePath('/folders')).where('name', '==', 'root').get();
  if (root === undefined) {
    const rootID = await store
      .collection(resolvePath(`/folders`))
      .add({ name: 'root' })
      .then((doc) => doc.id);

    return setFolder({
      id: rootID,
      name: 'root',
      parent: rootID,
      files: [],
      folders: [],
    });
  }
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

export const deleteFolder = async (id: string) => {
  const folder = await store.doc(resolvePath(`/folders/${id}`)).get();
  const parentFolder = await (folder.get('parent') as Ref).get();

  // Remove soon to be orphans
  await Promise.all([
    ...(folder.get('files') as Ref[]).map((fileRef) => deleteFile(fileRef.id)),
    ...(folder.get('folders') as Ref[]).map((folderRef) => deleteFolder(folderRef.id)),
  ]);

  // Remove ref to self from parent
  parentFolder.ref.update({
    folders: (parentFolder.get('folders') as Ref[]).filter(r => {
      console.log(r.id, id, r.id !== id);
      return r.id !== id;
    }),
  });

  // Remove self
  folder.ref.delete();
}
