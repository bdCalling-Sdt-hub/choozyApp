const plugin = require('tailwindcss/plugin');

module.exports = {
  theme: {
    screens: {
      sm: '380px',
      md: '520px',
      lg: '880px',
      tablet: '1024px',
    },
    extend: {
      fontFamily: {
        // poppins fonts 
        PoppinsBlack: 'PoppinsBlack',
        PoppinsBlackItalic: 'PoppinsBlackItalic',
        PoppinsBold: 'PoppinsBold',
        PoppinsBoldItalic: 'PoppinsBoldItalic',
        PoppinsExtraBold: 'PoppinsExtraBold',
        PoppinsExtraBoldItalic: 'PoppinsExtraBoldItalic',
        PoppinsExtraLight: 'PoppinsExtraLight',
        PoppinsExtraLightItalic: 'PoppinsExtraLightItalic',
        PoppinsItalic: 'PoppinsItalic',
        PoppinsLight: 'PoppinsLight',
        PoppinsLightItalic: 'PoppinsLightItalic',
        PoppinsMedium: 'PoppinsMedium',
        PoppinsMediumItalic: 'PoppinsMediumItalic',
        PoppinsRegular: 'PoppinsRegular',
        PoppinsSemiBold: 'PoppinsSemiBold',
        PoppinsSemiBoldItalic: 'PoppinsSemiBoldItalic',
        PoppinsThin: 'PoppinsThin',
        PoppinsThinItalic: 'PoppinsThinItalic',
        // You can replace 'YourCustomFont' with your desired font
        // Nunito fonts 
        NunitoSansBlack: 'NunitoSansBlack',
        NunitoSansBold: 'NunitoSansBold',
        NunitoSansExtraBold: 'NunitoSansExtraBold',
        NunitoSansExtraLight: 'NunitoSansExtraLight',
        NunitoSansLight: 'NunitoSansLight',
        NunitoSansMedium: 'NunitoSansMedium',
        NunitoSansRegular: 'NunitoSansRegular',
        NunitoSansSemiBold: 'NunitoSansSemiBold',
      },
      colors: {
        primary: '#4964C6',
        secondary: '#454545',
        base: '#f6f6f6',
        color : {
          "454545": '#454545',
         
        },
        success: {
          dark: '#28a745',
          light: '#cce53f',
        },
        error: {
          dark: '#dc3545',
          light: '#f8d7da',
        },
        info: {
          dark: '#17a2b8',
          light: '#d3e9fd',
        },
      },
    },
  },
  plugins: [
    plugin(({addUtilities}) => {
      addUtilities({
        '.btn': {
          padding: 3,
          borderRadius: 10,
          textTransform: `uppercase`,
          backgroundColor: `#333`,
        },
        '.resize-repeat': {
          resizeMode: `repeat`,
        },
      });
    }),
  ],
};
