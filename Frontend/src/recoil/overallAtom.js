import { atom } from 'recoil';

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

export const overallOriginDataState = atom({
  key: 'overallOriginDatas',
  default: {
    overallOriginDatas: []
  }
});

// 현재 index값 저장
export const overallIdState = atom({
  key: 'overallId',
  default: {
    overallId: 0
  }
});
