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

export const detailColumnState = atom({
  key: 'detailColumn',
  default: {
    detailColumns: []
  }
});

export const selectedColumnState = atom({
  key: 'selectedColumn',
  default: {
    selectedColumn: []
  }
});

export const filterConditionState = atom({
  key: 'filterCondition',
  default: {
    filterCondition: []
  }
});
