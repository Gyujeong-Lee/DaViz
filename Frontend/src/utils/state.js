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

export const overallDataState = atom({
  key: 'overallData',
  default: {
    overallDatas: []
  }
});

export const overallInfoState = atom({
  key: 'overalldata',
  default: {
    overallInfos: []
  }
});

export const detailDataState = atom({
  key: 'detailData',
  default: {
    detailDatas: []
  }
});
