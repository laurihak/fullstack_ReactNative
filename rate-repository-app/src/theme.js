import { Dimensions } from 'react-native';

const theme = {
  size: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height
  },
  colors: {
    textPrimary: '#24292e',
    textSecondary: '#586069',
    primary: '#0366d6',
    white: 'white',
    tabBackGround: '#24292e',
    mainBackGround: '#e1e4e8',
    red: '#d73a4a',
    lighBlue: '#0066cc',
    gray: '#808080',
    black: '#000000',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
  },
  fonts: {
    main: 'System',
    android: 'Roboto',
    ios: 'Arial'
  },
  paddings: {
    left: 20,
    right: 20
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
};

export default theme;