import { atom, atomFamily, selector, selectorFamily } from 'recoil';
import { getFolder, getRootFolder } from '../services/firebase/firestore';
import { Folder } from '../types/Folder';

export const currentFolderIDState = atom<string | null>({
  key: 'CURRENT_FOLDER_ID',
  default: null,
});

export const currentFolderData = selector<Folder>({
  key: 'CURRENT_FOLDER_DATA',
  get: ({ get }) => {
    const id = get(currentFolderIDState);
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

export const folderData = atomFamily<Folder, string>({
  key: 'FOLDER_DATA',
  default: selectorFamily({
    key: 'FOLDER_DATA/DEFAULT',
    get: (id: string) => async () => {
      return getFolder(id);
    },
  }),
});
