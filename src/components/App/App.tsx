import { MuiThemeProvider as ThemeProvider } from '@material-ui/core';
import CssBaseline from '@material-ui/core/CssBaseline';

// components
import OrderBookContainer from 'components/OrderBookContainer';

// themes
import theme from 'theme';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <OrderBookContainer />
    </ThemeProvider>
  );
}

export default App;
