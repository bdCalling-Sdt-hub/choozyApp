import {Text, View} from 'react-native';

import React from 'react';
import FastImage from 'react-native-fast-image';
import tw from '../../../lib/tailwind';

const Store = () => {
  return (
    <View style={tw`px-[4%]`}>
      <View style={tw`flex-row justify-between`}>
        <View style={tw`bg-white p-4 shadow-md rounded-xl gap-2`}>
          <FastImage
            style={tw`w-[150.5px] h-[163px] rounded-xl`}
            source={{
              uri: 'https://www.cnet.com/a/img/resize/690ad0a97cf8fc98f3cf851e7b149d2ffc5b171e/hub/2023/05/04/31dfdcf2-1ac3-4320-b40c-4c356300f06e/google-pixel-7a-phone-14.jpg?auto=webp&height=500',
            }}
          />
          <View style={tw`flex-row justify-between gap-2`}>
            <Text
              style={tw`text-center font-NunitoSansBold text-[14px] text-color-Black900`}>
              €398.99
            </Text>
            <Text
              style={tw`text-center text-[#615E69] font-NunitoSansRegular text-[14px]`}>
              WA251236
            </Text>
          </View>
          <Text
            style={tw`text-center text-color-Black900 font-NunitoSansBold text-[14px] w-36`}>
            Iphone 12 pro max, 128GB
          </Text>
        </View>
        <View style={tw`bg-white p-4 shadow-md rounded-xl gap-2`}>
          <FastImage
            style={tw`w-[150.5px] h-[163px] rounded-xl`}
            source={{
              uri: 'https://cdn.vox-cdn.com/thumbor/sHEvJOujltAU6673yP8RHZ4yqok=/0x0:1198x1197/768x768/filters:focal(599x599:600x600)/cdn.vox-cdn.com/uploads/chorus_asset/file/23889980/vpavic_220708_5335_0017_sq.jpg',
            }}
          />
          <View style={tw`flex-row justify-between gap-2`}>
            <Text
              style={tw`text-center font-NunitoSansBold text-[14px] text-color-Black900`}>
              €398.99
            </Text>
            <Text
              style={tw`text-center text-[#615E69] font-NunitoSansRegular text-[14px]`}>
              WA251236
            </Text>
          </View>
          <Text
            style={tw`text-center text-color-Black900 font-NunitoSansBold text-[14px] w-36`}>
            Iphone 12 pro max, 128GB
          </Text>
        </View>
      </View>
    </View>
  );
};

export default Store;
