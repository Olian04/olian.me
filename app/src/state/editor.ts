import { atom } from 'recoil';

export const editorIsActiveState = atom<boolean>({
  key: 'EDITOR_IS_ACTIVE',
  default: false,
});

export const editorContentState = atom<string>({
  key: 'EDITOR_CONTENT',
  default: '',
});

export const editorNameState = atom<string>({
  key: 'EDITOR_NAME',
  default: '',
});
