import React, {SetStateAction} from 'react';
import {StatusBar, View} from 'react-native';

import FastImage from 'react-native-fast-image';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

interface SplashProps extends NavigProps<null> {
  setIsSplash: React.Dispatch<SetStateAction<boolean>>;
  isSplash?: boolean;
}

const SplashScreen = ({navigation, setIsSplash}: SplashProps) => {
  setTimeout(() => {
    setIsSplash(false);
  }, 1000);
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

export default SplashScreen;
