// devices screen size

import {Dimensions, PixelRatio} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import {MMKVLoader} from 'react-native-mmkv-storage';
import {imageUrl} from '../redux/api/baseApi';

export const lStorage = new MMKVLoader().initialize();

export const PrimaryColor = '#4964C6';

export const makeImage = (url: string) => {
  return url.startsWith('https') ? url : imageUrl + url;
};
export const makeImageUrl = (url: string) => {
  return imageUrl + url;
};

export const {width, height} = Dimensions.get('screen');
//  three size like sm md or tablet
const fontScale = PixelRatio.getFontScale();
export const FontSize = (size: number) => size / fontScale;

export const isSmall = () => {
  return width < 375;
};
export const isTablet = () => {
  return width >= 768;
};

export const isMobile = () => {
  return width < 768;
};

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

export const useImagePicker = async ({
  option,
  selectionLimit,
}: {
  option: 'camera' | 'library';
  selectionLimit?: number;
}) => {
  try {
    if (option === 'camera') {
      const result = await launchCamera({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
      });

      if (!result.didCancel) {
        return result.assets;
      }
    }
    if (option === 'library') {
      const result = await launchImageLibrary({
        mediaType: 'photo',
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.5,
        selectionLimit: selectionLimit || 1, // Set to 0 for unlimited image selection
      });

      if (!result.didCancel) {
        return result.assets;
      }
    }
  } catch (error) {
    console.log(error);
  }
};

function getRandomHashColor() {
  let letters = '0123456789ABCDEF';
  let color = '#';

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }

  return color;
}
