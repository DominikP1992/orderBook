import colors from 'colors';
import OrderBookValueListEnum from 'enums/orderBookValueList.enum';
import TransactionTypeEnum from 'enums/transactionType.enum';

export const tableTitleOrder = [
  OrderBookValueListEnum.TOTAL,
  OrderBookValueListEnum.SIZE,
  OrderBookValueListEnum.PRICE,
];
export const orderListConfig = {
  [TransactionTypeEnum.ASKS]: {
    color: colors.textGreen,
    depthColor: colors.depthGreen,
    titleOrder: tableTitleOrder,
    direction: '-90deg',
  },
  [TransactionTypeEnum.BIDS]: {
    color: colors.textRed,
    depthColor: colors.depthRed,
    titleOrder: [...tableTitleOrder].reverse(),
    direction: '90deg',
  },
};
export const ORDER_BOOK_LIST_ROW_COUNT = 15;
