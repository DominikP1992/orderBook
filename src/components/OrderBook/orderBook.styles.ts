import { makeStyles } from '@material-ui/core';

const useOrderBookStyles = makeStyles({
  orderBookList: {
    overflow: 'hidden',
    position: 'relative',
    height: 550,
  },
  orderBookListDisconnected: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.3)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
});

export default useOrderBookStyles;
