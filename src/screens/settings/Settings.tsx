import {Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import InputText from '../../components/inputs/InputText';
import {IconWrite} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const Settings = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        onPress={() => navigation?.goBack()}
        title="Settings"
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {
              navigation?.navigate('ProfileEdit');
            }}
            style={tw`items-center px-4 py-1`}>
            <SvgXml width={18} height={18} xml={IconWrite} />
          </TouchableOpacity>
        }
      />

      <View style={tw`mt-9`}>
        <View style={tw`p-4 justify-center items-center gap-3`}>
          <TouchableOpacity style={tw`w-16 justify-center items-center`}>
            <FastImage
              style={tw`w-16 h-16 rounded-2xl`}
              resizeMode={FastImage.resizeMode.contain}
              source={{
                uri: 'https://randomuser.me/api/portraits/men/19.jpg',
              }}
            />
            {/* <View
              style={tw`absolute -left-1 -bottom-1  bg-white rounded-2xl p-2`}>
              <SvgXml xml={IconFillCamera} />
            </View> */}
          </TouchableOpacity>
          <View style={tw`flex-row gap-2`}>
            <Text>Private</Text>
            <Text>Public</Text>
            <Text>Contacts Only</Text>
          </View>
          <View
            style={tw`gap-6 border-b border-b-color-Black200 pb-10 border-dashed`}>
            <View style={tw`justify-center items-center `}>
              <Text
                style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
                Edwin Martins
              </Text>
              <Text
                style={tw`text-color-Black600 font-NunitoSansRegular text-xs`}>
                edwinmartin@gmail.com
              </Text>
            </View>
            <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-sm`}>
              Cut from geometric cotton lace mimicking decorative fretwork, this
              blouse reveals hints of skin offsetting its long-sleeve silhouette
            </Text>
          </View>
        </View>
      </View>

      <View style={tw`p-[4%] gap-5 mt-5`}>
        <View style={tw`h-14`}>
          <InputText
            editable={false}
            placeholder="Jenifer Lopez"
            floatingPlaceholder
          />
        </View>
        <View style={tw` h-14`}>
          <InputText
            editable={false}
            placeholder="Times squre, USA"
            floatingPlaceholder
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;
