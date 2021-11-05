import { atom } from 'recoil';

export const homestate = atom({
  key: 'home',
  default: {
    openModal: false
  }
});

export const loadingstate = atom({
  key: 'loading',
  default: {
    loading: false
  }
});
