import OrderBookValueListEnum from 'enums/orderBookValueList.enum';
import TransactionTypeEnum from 'enums/transactionType.enum';
import { OrdersType } from 'types/orders.type';

export type SingleOrderType = {
  [OrderBookValueListEnum.PRICE]: number;
  [OrderBookValueListEnum.SIZE]: number;
  [OrderBookValueListEnum.TOTAL]: number;
};

export type OrderBookListPropsType = {
  orders: OrdersType;
  type: TransactionTypeEnum.ASKS | TransactionTypeEnum.BIDS;
  group: number;
  defaultGroup: number;
};

export type OrdersByPriceType = Record<
  string,
  {
    [OrderBookValueListEnum.PRICE]: number;
    [OrderBookValueListEnum.SIZE]: number;
  }
>;
