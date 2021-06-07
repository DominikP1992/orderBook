import {
  ReactElement,
  useCallback,
  useEffect,
  useState,
  useMemo,
  Fragment,
} from 'react';

// components
import OrderBook from 'components/OrderBook';

// external components
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

// icons
import ErrorOutlineIcon from '@material-ui/icons/ErrorOutline';
import ImportExportIcon from '@material-ui/icons/ImportExport';

// enums
import WebsocketEventEnum from 'enums/websocketEvent.enum';
import MarketEnum from 'enums/markets.enum';

// constants
import { ORDER_BOOK_WEBSOCKET_URL } from 'constants/websocket.constants';

// types
import { AllOrders } from 'types/orders.type';

function OrderBookContainer(): ReactElement {
  const [orders, setOrders] = useState<AllOrders>(null);
  const [marketId, setMarketId] = useState(MarketEnum.PI_XBTUSD);
  const [isFirstRun, setFirstRun] = useState(true);
  const [reopenSocket, setReopenSocket] = useState(false);
  const [isSocketActive, setIsSocketActive] = useState(true);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const webSocket = useMemo(
    () => new WebSocket(ORDER_BOOK_WEBSOCKET_URL),
    [reopenSocket],
  );

  function openSocket() {
    setReopenSocket((prev) => !prev);
  }

  function closeSocket() {
    webSocket.close();
    setIsSocketActive(false);
  }

  function handleToggleConnection() {
    if (webSocket.readyState === 3) {
      return openSocket();
    }
    return closeSocket();
  }

  const subscribe = useCallback(() => {
    const subscriptionConfig = {
      event: WebsocketEventEnum.SUBSCRIBE,
      feed: 'book_ui_1',
      product_ids: [marketId],
    };

    webSocket.send(JSON.stringify(subscriptionConfig));
  }, [marketId, webSocket]);

  const unsubscribe = useCallback(() => {
    const subscriptionConfig = {
      event: WebsocketEventEnum.UNSUBSCRIBE,
      feed: 'book_ui_1',
      product_ids: [marketId],
    };
    webSocket.send(JSON.stringify(subscriptionConfig));
  }, [marketId, webSocket]);

  function handleToggleMarket() {
    unsubscribe();
    if (marketId === MarketEnum.PI_XBTUSD) {
      return setMarketId(MarketEnum.PI_ETHUSD);
    }

    return setMarketId(MarketEnum.PI_XBTUSD);
  }

  useEffect(() => {
    if (isFirstRun) {
      setFirstRun(false);
    } else {
      subscribe();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [marketId]);

  useEffect(() => {
    webSocket.onopen = () => {
      subscribe();
      setIsSocketActive(true);
    };

    webSocket.onmessage = (event: MessageEvent) => {
      const response = JSON.parse(event.data);
      setOrders(response);
    };

    webSocket.onerror = () => {
      setIsSocketActive(false);
      openSocket();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [webSocket]);

  useEffect(
    () => () => {
      closeSocket();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    },
    [],
  );

  return (
    <Container maxWidth="md">
      <Grid container>
        <Grid item xs={12}>
          <OrderBook
            orders={orders}
            market={marketId}
            isActive={isSocketActive}
            openConnection={openSocket}
          />
        </Grid>
        <Grid item xs={12}>
          <Box display="flex" justifyContent="space-around" mt={3}>
            <Button
              variant="contained"
              disabled={!isSocketActive}
              onClick={handleToggleMarket}
              color="primary"
            >
              <ImportExportIcon style={{ transform: 'rotate(90deg)' }} />
              &#160; Toggle feed
            </Button>
            <Button
              onClick={handleToggleConnection}
              color={isSocketActive ? 'secondary' : 'primary'}
              variant="contained"
            >
              {isSocketActive ? (
                <Fragment>
                  <ErrorOutlineIcon />
                  &#160;Kill feed
                </Fragment>
              ) : (
                'Open feed'
              )}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}

export default OrderBookContainer;
