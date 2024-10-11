import {StatusBar, StyleSheet, View} from 'react-native';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {useSelector} from 'react-redux';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const LoadingSplash = ({navigation}: NavigProps<null>) => {
  const token = useSelector((state: any) => state?.token);

  setTimeout(() => {
    if (token) {
      navigation?.replace('HomeRoutes');
    } else {
      navigation?.replace('Login');
    }
  }, 500);

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
