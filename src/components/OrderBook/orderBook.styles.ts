import { makeStyles } from '@material-ui/core';

const useOrderBookStyles = makeStyles((theme) => ({
  orderBookListDisconnected: {
    position: 'absolute',
    background: 'rgba(0,0,0,0.7)',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    color: '#fff',
  },
  orderBookListHeader: {
    backgroundColor: theme.palette.background.paper,
    marginBottom: theme.spacing(0.5),
    marginTop: theme.spacing(0.5),
    padding: theme.spacing(1),
  },
  orderBookListBody: {
    backgroundColor: theme.palette.background.paper,
    padding: `0 ${theme.spacing(1)}`,
    overflow: 'hidden',
    position: 'relative',
    minHeight: 200,
  },
}));

export default useOrderBookStyles;
