import { colorObject } from '../customColors';

export const inputTextField = {
  defaultProps: {
    fullWidth: true,
    variant: 'filled'
  }
};

export const inputTextFilledInput = {
  defaultProps: {
    disableUnderline: true,
    color: 'primary'
  },
  styleOverrides: {
    colorPrimary: {
      backgroundColor: colorObject.msgInputBg,
      color: colorObject.textDark
    },
    colorSecondary: {
      backgroundColor: colorObject.msgInputBg,
      color: colorObject.textDark
    },
    input: {
      padding: '1rem 2rem',
      '&::placeholder': {
        color: colorObject.textDark
      }
    }
  }
};
