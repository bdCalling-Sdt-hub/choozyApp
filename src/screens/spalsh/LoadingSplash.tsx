import {StatusBar, StyleSheet, View} from 'react-native';
import {getSocket, initiateSocket} from '../../redux/services/socket';

import FastImage from 'react-native-fast-image';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {getStorageToken} from '../../utils/utils';
import tw from '../../lib/tailwind';
import {useLazyTokenCheckQuery} from '../../redux/apiSlices/authSlice';

const LoadingSplash = ({navigation}: NavigProps<null>) => {
  const token = getStorageToken();
  const socket = getSocket();
  const [checkToken] = useLazyTokenCheckQuery({});
  // console.log(token);
  const handleCheckValidToken = async () => {
    try {
      const res = await checkToken(token).unwrap();
      if (res.token_status) {
        (navigation as any)?.replace('HomeRoutes');
      } else {
        (navigation as any)?.replace('Login');
      }
    } catch (error) {
      console.log(error);
      (navigation as any)?.replace('Login');
    }
  };
  React.useEffect(() => {
    if (token) {
      if (!socket) {
        initiateSocket();
      }
      handleCheckValidToken();
    } else {
      (navigation as any)?.replace('Login');
    }
  }, []);

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
