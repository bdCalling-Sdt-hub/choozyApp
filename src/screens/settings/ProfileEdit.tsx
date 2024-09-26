import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {Asset} from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {IconFillCamera} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useImagePicker} from '../../utils/utils';

const ProfileEdit = ({navigation}: NavigProps<null>) => {
  const [image, setImage] = React.useState<Asset>();

  const handleImage = async () => {
    const image = await useImagePicker({
      option: 'library',
    });
    setImage(image![0]);
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title="Settings"
        onPress={() => navigation?.goBack()}
        containerStyle={tw`justify-between`}
        // ComponentBtn={
        //   <TouchableOpacity
        //     activeOpacity={0.5}
        //     onPress={() => {
        //       navigation?.navigate('ProfileEdit');
        //     }}
        //     style={tw`items-center px-4 py-1`}>
        //     <SvgXml width={18} height={18} xml={IconWrite} />
        //   </TouchableOpacity>
        // }
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-8`}>
        <View style={tw`mt-9`}>
          <View style={tw`p-4  gap-3`}>
            <TouchableOpacity
              onPress={handleImage}
              style={tw`w-16 justify-center items-center self-center`}>
              <FastImage
                style={tw`w-16 h-16 rounded-2xl`}
                resizeMode={FastImage.resizeMode.cover}
                source={{
                  uri: image
                    ? image.uri
                    : 'https://randomuser.me/api/portraits/men/19.jpg',
                }}
              />
              <View
                style={tw`absolute -left-1 -bottom-1  bg-white rounded-2xl p-2`}>
                <SvgXml xml={IconFillCamera} />
              </View>
            </TouchableOpacity>
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

              <View style={tw`h-32 `}>
                <InputText
                  placeholder="bio"
                  multiline
                  fieldStyle={tw`h-32 py-3`}
                  textAlignVertical="top"
                  defaultValue=" Cut from geometric cotton lace mimicking decorative fretwork, this
              blouse reveals hints of skin offsetting its long-sleeve silhouette"
                />
              </View>
            </View>
          </View>
        </View>

        <View style={tw`p-[4%] gap-5 mt-5`}>
          <View style={tw`h-14`}>
            <InputText
              placeholder="Full Name"
              floatingPlaceholder
              defaultValue="Edwin Martins"
            />
          </View>
          <View style={tw` h-14`}>
            <InputText
              placeholder="location"
              floatingPlaceholder
              defaultValue="Times squre ,USA"
            />
          </View>
        </View>

        <TouchableOpacity
          onPress={() => navigation?.navigate('UpdatePassword')}
          style={tw`px-[4%] mt-2 self-end`}>
          <Text style={tw`text-primary600 font-NunitoSansBold text-sm `}>
            Update Password
          </Text>
        </TouchableOpacity>
        <View style={tw`px-[4%] my-8`}>
          <TButton
            title="Save Changes"
            onPress={() => {
              navigation?.goBack();
            }}
            containerStyle={tw`my-3 w-full bg-primary`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default ProfileEdit;
