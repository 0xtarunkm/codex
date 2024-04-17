import { selector } from 'recoil';
import { codeState } from '../atom/codeAtom';

export const codeSelector = selector({
  key: 'codeSelector',
  get: ({ get }) => {
    const code = get(codeState);
    return code.code;
  },
});
