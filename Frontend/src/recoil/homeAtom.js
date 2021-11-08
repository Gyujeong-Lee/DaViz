import { atom } from 'recoil';

export const uploadState = atom({
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
