import { colorObject } from '../customColors';
import { fontFamilies } from './typography';
export const muiButton = {
  styleOverrides: {
    containedPrimary: {
      backgroundColor: colorObject.sidebarBgPrimary,
      color: colorObject.textWhite
    },
    textSecondary: {
      color: colorObject.textDark
    },
    sizeSmall: {
      padding: '1.2rem 2rem'
    },
    sizeMedium: {
      padding: '1.8rem 2rem',
      maxWidth: '200px'
    },
    root: {
      fontFamily: fontFamilies.Roboto,
      whiteSpace: 'nowrap',
      lineHeight: 0
    }
  },

};
