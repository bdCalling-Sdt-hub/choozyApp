import {Text, TouchableOpacity, View} from 'react-native';

import {Android} from '../../utils/utils';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import FastImage from 'react-native-fast-image';
import {IconWrite} from '../../icons/icons';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';
import {useGetProfileQuery} from '../../redux/apiSlices/authSlice';

const Settings = ({navigation}: NavigProps<any>) => {
  const {data: userProfile} = useGetProfileQuery({});
  // console.log(userProfile);
  // const {showToast, closeToast} = useToast();
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
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: userProfile?.data?.image,
              }}
            />
            {/* <View
              style={tw`absolute -left-1 -bottom-1  bg-white rounded-2xl p-2`}>
              <SvgXml xml={IconFillCamera} />
            </View> */}
          </TouchableOpacity>
          <View style={tw`flex-row gap-2`}>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
              {userProfile?.data?.privacy === 'public'
                ? 'Public'
                : userProfile?.data?.privacy === 'friends'
                ? 'Contacts Only'
                : 'Private'}
            </Text>
          </View>
          <View
            style={tw`gap-6 ${
              Android
                ? 'border-dashed w-full border-b-[1px]  border-b-[#E5E5E5]'
                : ''
            }`}>
            <View style={tw`justify-center items-center `}>
              <Text
                style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
                {userProfile?.data?.full_name}
              </Text>
              <Text
                style={tw`text-color-Black600 font-NunitoSansRegular text-xs`}>
                {userProfile?.data?.email}
              </Text>
            </View>
            <Text
              style={tw`text-[#A5A3A9] text-center font-NunitoSansRegular text-sm pb-2 `}>
              {userProfile?.data?.bio}
            </Text>
          </View>
        </View>
      </View>

      <View style={tw`p-[4%] gap-5 mt-5`}>
        <View style={tw`h-14`}>
          <InputText
            editable={false}
            placeholder={userProfile?.data?.full_name}
            floatingPlaceholder
          />
        </View>
        <View style={tw`h-14`}>
          <InputText
            editable={false}
            placeholder={userProfile?.data?.contact}
            floatingPlaceholder
          />
        </View>
        <View style={tw` h-14`}>
          <InputText
            editable={false}
            placeholder={userProfile?.data?.location}
            floatingPlaceholder
          />
        </View>
      </View>
    </View>
  );
};

export default Settings;
