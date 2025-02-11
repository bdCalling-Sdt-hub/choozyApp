import {Text, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {IconRightTik} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const VerifySuccess = ({navigation}: NavigProps<any>) => {
  setTimeout(() => {
    (navigation as any)?.replace('DrawerRoutes');
  }, 500);
  return (
    <View style={tw`flex-1 bg-base justify-center items-center`}>
      <View style={tw`gap-3 justify-center items-center`}>
        <View
          style={tw`w-20 h-20 rounded-full bg-green-600 justify-center items-center`}>
          <SvgXml xml={IconRightTik} />
        </View>
        <Text style={tw`text-[20px] text-color-Black800 font-NunitoSansBold `}>
          You’re done!
        </Text>
      </View>
    </View>
  );
};

export default VerifySuccess;
