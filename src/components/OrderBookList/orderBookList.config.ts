import OrderBookValueListEnum from 'enums/orderBookValueList.enum';
import TransactionTypeEnum from 'enums/transactionType.enum';

export const tableTitleOrder = [
  OrderBookValueListEnum.TOTAL,
  OrderBookValueListEnum.SIZE,
  OrderBookValueListEnum.PRICE,
];
export const orderListConfig = {
  [TransactionTypeEnum.ASKS]: {
    color: 'green',
    depthColor: 'lightgreen',
    titleOrder: tableTitleOrder,
    direction: '-90deg',
  },
  [TransactionTypeEnum.BIDS]: {
    color: 'red',
    depthColor: 'pink',
    titleOrder: [...tableTitleOrder].reverse(),
    direction: '90deg',
  },
};
export const ORDER_BOOK_LIST_ROW_COUNT = 15;
