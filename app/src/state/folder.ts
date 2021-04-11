import { atom, selector, selectorFamily } from 'recoil';
import { getFolder, getRootFolder } from '../services/firebase/firestore';
import { Folder } from '../types/Folder';

export const currentFolderID = atom<string | null>({
  key: 'CURRENT_FOLDER_ID',
  default: null,
});

export const currentFolderData = selector<Folder>({
  key: 'CURRENT_FOLDER_DATA',
  get: ({ get }) => {
    const id = get(currentFolderID);
    if (id === null) {
      return getRootFolder();
    }
    return get(folderData(id));
  },
});

export const foldersInCurrentFolder = selector<Folder[]>({
  key: 'FOLDERS_IN_CURRENT_FOLDER',
  get: ({ get }) => {
    const folder = get(currentFolderData);
    return Promise.all(folder.folders.map((id) => get(folderData(id))));
  },
});

export const folderData = selectorFamily<Folder, string>({
  key: 'FOLDER_DATA',
  get: (ref: string) => async () => {
    return getFolder(ref);
  },
});
