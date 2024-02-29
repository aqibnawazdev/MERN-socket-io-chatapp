import { createTheme } from '@mui/material';

import { typography } from './Components-Theme/typography';
import { muiButton } from './Components-Theme/muiButton';

import { colorObject } from './customColors';
import { inputTextField, inputTextFilledInput } from './Components-Theme/input';
import { themeBreakPoints } from './Components-Theme/breakPoints';
import shadows from '@mui/material/styles/shadows';

const theme = createTheme({
  breakpoints: {
    values: {
      ...themeBreakPoints.values
    }
  },

  palette: {
    ...colorObject,
    red: colorObject.notificationRed
  },
  typography: typography(),

  shape: {
    borderRadius: 4
  },
  components: {
    MuiButton: {
      ...muiButton
    },
    MuiTextField: {
      ...inputTextField
    },
    MuiFilledInput: {
      ...inputTextFilledInput
    },
    MuiTooltip: {
      defaultProps: {
        placement: 'right'
      }
    }
  }
});
export default theme;
