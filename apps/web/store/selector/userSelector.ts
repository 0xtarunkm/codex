import { selector } from 'recoil';

import { userState } from '../atom/userAtom';

export const userNameSelector = selector({
  key: 'userNameSelector',
  get: ({ get }) => {
    const user = get(userState);
    return user.name;
  },
});

export const userIdSelector = selector({
  key: 'userIdSelector',
  get: ({ get }) => {
    const user = get(userState);
    return user.id;
  },
});
