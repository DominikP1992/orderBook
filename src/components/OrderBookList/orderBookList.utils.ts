// enums
import OrderBookValueListEnum from 'enums/orderBookValueList.enum';
import { OrdersType } from 'types/orders.type';

// utils
import floorValueWithStep from 'utils/floorValueWithStep';
import { ORDER_BOOK_LIST_ROW_COUNT } from './orderBookList.config';

// types
import { OrdersByPriceType, SingleOrderType } from './orderBookList.types';

export function getGroupedOrdersByPrice(
  ordersByPrice: OrdersByPriceType,
  group: number,
) {
  return Object.keys(ordersByPrice).reduce(
    (currentOrdersByPrice: OrdersByPriceType, orderPrice: string) => {
      const step = group;
      const { size } = ordersByPrice[orderPrice];
      const groupKeyPrice = floorValueWithStep(Number(orderPrice), step);
      const groupField = currentOrdersByPrice[groupKeyPrice];

      if (groupField) {
        const { size: prevSize } = groupField;
        return {
          ...currentOrdersByPrice,
          [groupKeyPrice]: {
            [OrderBookValueListEnum.SIZE]: prevSize + size,
            [OrderBookValueListEnum.PRICE]: groupKeyPrice,
          },
        };
      }
      return {
        ...currentOrdersByPrice,
        [groupKeyPrice]: {
          [OrderBookValueListEnum.SIZE]: size,
          [OrderBookValueListEnum.PRICE]: groupKeyPrice,
        },
      };
    },
    {} as OrdersByPriceType,
  );
}

export function getOrdersArray(groupedOrdersByPrice: OrdersByPriceType) {
  return Object.keys(groupedOrdersByPrice)
    .sort((a, b) => Number(a) - Number(b))
    .splice(0, ORDER_BOOK_LIST_ROW_COUNT)
    .reduce((arr: SingleOrderType[], orderKey) => {
      const { price, size } = groupedOrdersByPrice[orderKey];
      const prevTotalSize = arr[arr.length - 1];
      const totalSize = prevTotalSize ? prevTotalSize.total + size : size;

      return [
        ...arr,
        {
          [OrderBookValueListEnum.TOTAL]: totalSize,
          [OrderBookValueListEnum.SIZE]: size,
          [OrderBookValueListEnum.PRICE]: price,
        },
      ];
    }, [] as SingleOrderType[]);
}

export function getOrdersByPrice(
  orders: OrdersType,
  prevOrders: OrdersByPriceType,
) {
  const updatedOrders = { ...prevOrders };
  for (let index = 0; index < orders.length; index += 1) {
    const order = orders[index];
    const price = order[0];
    const size = order[1];

    if (size === 0) {
      delete updatedOrders[price];
    } else {
      updatedOrders[price] = {
        [OrderBookValueListEnum.SIZE]: size,
        [OrderBookValueListEnum.PRICE]: price,
      };
    }
  }

  return updatedOrders;
}
