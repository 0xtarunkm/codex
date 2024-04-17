import { selector } from 'recoil';
import { playgroundState } from '../atom/playgroundAtom';

export const playgroundTitleSelector = selector({
  key: 'playgroundTitleSelector',
  get: ({ get }) => {
    const playground = get(playgroundState);
    return playground.title;
  },
});

export const playgroundIdSelector = selector({
  key: 'playgroundIdSelector',
  get: ({ get }) => {
    const playground = get(playgroundState);
    return playground.id;
  },
});

export const playgroundUserIdSelector = selector({
  key: 'playgroundUserIdSelector',
  get: ({ get }) => {
    const playground = get(playgroundState);
    return playground.userId;
  },
});
