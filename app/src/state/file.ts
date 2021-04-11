import { selectorFamily, atom, selector } from 'recoil';
import { getFile, getRootReadme } from '../services/firebase/firestore';
import { File } from '../types/File';
import { currentFolderData } from './folder';

export const currentFileIDState = atom<string | null>({
  key: 'CURRENT_FILE_ID',
  default: null,
});

export const currentFileData = selector<File>({
  key: 'CURRENT_FILE_DATA',
  get: ({ get }) => {
    const id = get(currentFileIDState);
    if (id === null) {
      return getRootReadme();
    }
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

export const fileData = selectorFamily<File, string>({
  key: 'FILE_DATA',
  get: (ref: string) => async () => {
    return getFile(ref);
  },
});
