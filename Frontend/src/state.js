import { atom } from 'recoil';

export const homestate = atom({
  key: 'home',
  default: {
    uploadModal: false
  }
});

export default homestate;
