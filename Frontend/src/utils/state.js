import { atom } from 'recoil';

export const homestate = atom({
  key: 'home',
  default: {
    openModal: false
  }
});

export default homestate;
