import MarketEnum from 'enums/markets.enum';

export const marketConfig = {
  [MarketEnum.PI_XBTUSD]: {
    defaultGroup: 0.5,
    groups: [0.5, 1, 2.5],
    marketName: 'XBTUSD',
  },
  [MarketEnum.PI_ETHUSD]: {
    defaultGroup: 0.05,
    groups: [0.05, 0.1, 0.25],
    marketName: 'ETHUSD',
  },
};
