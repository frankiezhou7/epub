import Colors from '../colors';
import {fade} from 'epui-md/lib/utils/colorManipulator';
import Spacing from '../spacing';

export default {
  colors:Colors,
  spacing: Spacing,
  // fontFamily: 'Roboto, sans-serif',
  palette: {
    primary1Color: '#004588',
    primary2Color: Colors.blueA400,
    primary3Color: Colors.blue100,
    accent1Color: Colors.amberA400,
    accent2Color: Colors.amberA200,
    accent3Color: Colors.ambergulp500,
    textColor: Colors.darkBlack,
    canvasColor: Colors.white,
    borderColor: Colors.grey300,
    greyColor: Colors.grey600,
    disabledColor: fade(Colors.darkBlack, 0.3),
    errorColor: Colors.red900,
    warningColor: Colors.yellow900,
    infoColor: Colors.blue500
  },
};
