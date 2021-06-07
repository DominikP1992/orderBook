import { useCallback, useEffect, useMemo, useState } from 'react';

// external components
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';

// enums
import OrderBookValueListEnum from 'enums/orderBookValueList.enum';

// styles
import useOrderBookListStyles from './orderBookList.styles';

// config
import { orderListConfig } from './orderBookList.config';

// types
import {
  OrderBookListPropsType,
  OrdersByPriceType,
  SingleOrderType,
} from './orderBookList.types';

// utils
import {
  getGroupedOrdersByPrice,
  getOrdersArray,
  getOrdersByPrice,
} from './orderBookList.utils';

function OrderBookList({
  orders,
  type,
  group,
  defaultGroup,
}: OrderBookListPropsType) {
  const classes = useOrderBookListStyles();
  const { color, depthColor, titleOrder, direction } = useMemo(
    () => orderListConfig[type],
    [type],
  );

  const [ordersByPrice, setOrdersByPrice] = useState<OrdersByPriceType>({});

  useEffect(() => {
    setOrdersByPrice((prevOrders) => getOrdersByPrice(orders, prevOrders));
  }, [orders, setOrdersByPrice]);

  const getMarketDepthBackground = useCallback(
    (marketDepth: number) =>
      `linear-gradient(${direction}, ${depthColor}, ${depthColor} ${marketDepth}%, transparent ${marketDepth}%)`,
    [direction, depthColor],
  );

  const groupedOrdersByPrice = useMemo(() => {
    if (group === defaultGroup) {
      return ordersByPrice;
    }
    return getGroupedOrdersByPrice(ordersByPrice, group);
  }, [ordersByPrice, group, defaultGroup]);

  const ordersArr: SingleOrderType[] = useMemo(
    () => getOrdersArray(groupedOrdersByPrice),
    [groupedOrdersByPrice],
  );

  const getTableRow = useCallback(
    (order: SingleOrderType, marketDepth: number) => (
      <TableRow
        key={`${order.price}`}
        style={{ background: getMarketDepthBackground(marketDepth) }}
      >
        {titleOrder.map((tableKey) => (
          <TableCell
            className={classes.cell}
            size="small"
            key={tableKey}
            style={{
              color:
                tableKey === OrderBookValueListEnum.PRICE ? color : undefined,
            }}
          >
            {order[tableKey as OrderBookValueListEnum]}
          </TableCell>
        ))}
      </TableRow>
    ),
    [getMarketDepthBackground, titleOrder, color, classes],
  );

  return (
    <Table>
      <TableHead>
        <TableRow>
          {orderListConfig[type].titleOrder.map((title) => (
            <TableCell className={classes.cell} size="small" key={title}>
              {title}
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
      <TableBody>
        {ordersArr.map((order) => {
          const marketDepth = Math.round(
            (order.total / ordersArr[ordersArr.length - 1].total) * 100,
          );
          return getTableRow(order, marketDepth);
        })}
      </TableBody>
    </Table>
  );
}

export default OrderBookList;
