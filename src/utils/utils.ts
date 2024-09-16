// devices screen size

import { Dimensions, PixelRatio } from 'react-native';

import { MMKVLoader } from 'react-native-mmkv-storage';
import { imageUrl } from '../redux/api/baseApi';

export const {width, height} = Dimensions.get('screen')
export const lStorage = new MMKVLoader().initialize();

export const makeImage = (url: string) => {
  return  url.startsWith('https') ? url : imageUrl + url
}
export const makeImageUrl = (url: string) => {
  return imageUrl + url
}

//  three size like sm md or tablet 
const fontScale = PixelRatio.getFontScale();
export const FontSize = (size : number) => size / fontScale;

export const isSmall = () => {
    return width < 375
}
export const isTablet = () => {
    return width >= 768
}

export const isMobile = () => {
    return width < 768
}




export const setStorageToken = (token: string) => {
  lStorage.setString('token', token);
};

export const getStorageToken = () => {
  return lStorage.getString('token');
};

export const removeStorageToken = () => {
  lStorage.removeItem('token');
};

export const setStorageRole = (role: string) => {
  lStorage.setString('role', role);
};

export const getStorageRole = () => {
  return lStorage.getString('role');
};

export const removeStorageRole = () => {
  lStorage.removeItem('role');
};


