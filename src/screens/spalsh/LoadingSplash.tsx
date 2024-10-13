import {StatusBar, StyleSheet, View} from 'react-native';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {getStorageToken} from '../../utils/utils';

const LoadingSplash = ({navigation}: NavigProps<null>) => {
  const token = getStorageToken();
  // console.log(token);
  setTimeout(() => {
    if (token) {
      navigation?.replace('HomeRoutes');
    } else {
      navigation?.replace('Login');
    }
  }, 100);

  return (
    <View style={tw`flex-1 w-full bg-primary justify-center items-center`}>
      <FastImage
        style={tw`w-28 h-28 flex-1 `}
        resizeMode={FastImage.resizeMode.contain}
        source={require('../../assets/images/logo/logo.png')}
      />
      <StatusBar barStyle="light-content" backgroundColor={'#4964C6'} />
    </View>
  );
};

export default LoadingSplash;

const styles = StyleSheet.create({});
