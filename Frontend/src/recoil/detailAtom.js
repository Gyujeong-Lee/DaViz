import { atom } from 'recoil';

export const detailDataState = atom({
  key: 'detailData',
  default: {
    detailDatas: []
  }
});

export const detailHistogramState = atom({
  key: 'detailHistogram',
  default: {
    detailHistogram: []
  }
});

export const detailBoxPlotState = atom({
  key: 'detailBoxPlot',
  default: {
    detailBoxPlot: []
  }
});
