import { atom } from 'recoil';

export const codeState = atom({
  key: 'codeState',
  default: {
    code: '',
    language: '',
    path: '',
    fileName: '',
  },
});
