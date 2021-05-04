import { selectorFamily, atom, selector, atomFamily } from 'recoil';
import { getFile, getRootReadmeID } from '../services/firebase/firestore';
import { File } from '../types/File';
import { currentFolderData } from './folder';

export const currentFileIDState = atom<string>({
  key: 'CURRENT_FILE_ID',
  default: selector({
    key: 'CURRENT_FILE_ID/DEFAULT',
    get: () => getRootReadmeID(),
  }),
});

export const currentFileData = selector<File>({
  key: 'CURRENT_FILE_DATA',
  get: ({ get }) => {
    const id = get(currentFileIDState);
    return get(fileData(id));
  },
});

export const filesInCurrentFolder = selector<File[]>({
  key: 'FILES_IN_CURRENT_FOLDER',
  get: ({ get }) => {
    const folder = get(currentFolderData);
    return Promise.all(folder.files.map((id) => get(fileData(id))));
  },
});

export const fileData = atomFamily<File, string>({
  key: 'FILE_DATA',
  default: selectorFamily({
    key: 'FILE_DATA/DEFAULT',
    get: (id: string) => async () => {
      return getFile(id);
    },
  }),
});
