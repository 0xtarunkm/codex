import { atom } from 'recoil';

export const playgroundState = atom({
  key: 'playgroundState',
  default: {
    id: '',
    template: '',
    title: '',
    userId: '',
  },
});

export const loadingState = atom({
  key: 'loadingState',
  default: false,
});
