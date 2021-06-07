import React, { useEffect, useMemo, useState } from 'react';

// components
import OrderBookList from 'components/OrderBookList';

// external components
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

// enums
import TransactionTypeEnum from 'enums/transactionType.enum';
import MarketEnum from 'enums/markets.enum';

// types
import { AllOrders } from 'types/orders.type';

// styles
import useOrderBookStyles from './orderBook.styles';

// config
import { marketConfig } from './orderBook.config';

type OrderBookPropsType = {
  orders: AllOrders;
  market: keyof typeof MarketEnum;
  isActive: boolean;
  openConnection: () => void;
};

function OrderBook({
  orders,
  market,
  isActive,
  openConnection,
}: OrderBookPropsType) {
  const classes = useOrderBookStyles();
  const marketInfo = useMemo(() => marketConfig[market], [market]);
  const [group, setGroup] = useState(marketInfo.defaultGroup);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setGroup(event.target.value as number);
  };

  useEffect(() => {
    setGroup(marketInfo.defaultGroup);
  }, [marketInfo]);

  return (
    <Grid container>
      <Grid
        container
        justify="space-between"
        alignItems="center"
        className={classes.orderBookListHeader}
      >
        <Typography display="inline">Order book</Typography>
        <Typography display="inline">{marketInfo.marketName}</Typography>
        <Select value={group} onChange={handleChange} disabled={!isActive}>
          {marketInfo.groups.map((orderBookGroup: number) => (
            <MenuItem
              key={orderBookGroup}
              value={orderBookGroup}
            >
              {`Group ${orderBookGroup}`}
            </MenuItem>
          ))}
        </Select>
      </Grid>
      <Grid container className={classes.orderBookListBody}>
        {orders && orders.bids && orders.asks && (
          <React.Fragment>
            <Grid item xs={12} md={6}>
              <OrderBookList
                orders={orders.bids}
                type={TransactionTypeEnum.ASKS}
                group={group}
                defaultGroup={marketInfo.defaultGroup}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <OrderBookList
                orders={orders.asks}
                type={TransactionTypeEnum.BIDS}
                group={group}
                defaultGroup={marketInfo.defaultGroup}
              />
            </Grid>
          </React.Fragment>
        )}
        {!isActive && (
          <div className={classes.orderBookListDisconnected}>
            <Grid container direction="column" alignItems="center">
              <Typography variant="h4" align="center">
                Lost connection, click
                {' '}
                <strong>Connect</strong>
                {' '}
                button to
                reconnect
              </Typography>
              <Button
                onClick={openConnection}
                variant="contained"
                color="secondary"
              >
                Connect
              </Button>
            </Grid>
          </div>
        )}
      </Grid>
    </Grid>
  );
}

export default OrderBook;
