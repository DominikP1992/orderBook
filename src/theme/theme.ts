import { createMuiTheme } from '@material-ui/core';
import colors from 'colors';

const theme = createMuiTheme({
  palette: {
    background: {
      default: colors.backgroundDefault,
      paper: colors.backgroundPaper,
    },
  },
  typography: {
    allVariants: {
      color: colors.white,
    },
  },

  overrides: {
    MuiTableHead: {
      root: {
        textTransform: 'uppercase',
      },
    },
    MuiTableCell: {
      root: {
        borderBottom: 'none',
      },
      head: {
        color: colors.gray,
      },
      body: {
        color: colors.white,
      },
    },

    MuiSelect: {
      root: {
        color: colors.white,
      },
      icon: {
        fill: colors.white,
      },
    },

    MuiButton: {
      containedPrimary: {
        backgroundColor: colors.primaryButton,
      },
      containedSecondary: {
        backgroundColor: colors.secondaryButton,
      },
    },
  },
});

export default theme;
