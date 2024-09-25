import {ScrollView, Text, View} from 'react-native';
import {IconCloseEye, IconOpenEye} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import BackButton from '../../components/backHeader/BackButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const UpdatePassword = ({navigation}: NavigProps<null>) => {
  const [showPassOld, setShowPassOld] = React.useState(false);
  const [showPassNew, setShowPassNew] = React.useState(false);
  const [showPassNewConfirm, setShowPassNewConfirm] = React.useState(false);

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton
        onPress={() => navigation?.goBack()}
        title="Update Password"
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`pb-6`}>
        <View
          style={tw`items-center justify-center mt-4 bg-[#d7ebec] m-6 rounded-3xl py-6`}>
          <FastImage
            resizeMode={FastImage.resizeMode.contain}
            style={tw` h-64 aspect-square`}
            source={require('../../assets/images/logo/extra/circus.png')}
          />
        </View>
        <View style={tw`items-center`}>
          <Text
            style={tw`text-center font-NunitoSansBold text-2xl text-color-Black900 w-[80%] `}>
            Update passwords helps to keep you more secure{' '}
          </Text>
        </View>

        <View style={tw`p-[4%] gap-5 mt-5`}>
          <View style={tw`h-14`}>
            <InputText
              onPress={() => setShowPassOld(!showPassOld)}
              placeholder="Old Password"
              floatingPlaceholder
              secureTextEntry={!showPassOld}
              // svgFirstIcon={IconFillPassword}
              svgSecondIcon={showPassOld ? IconCloseEye : IconOpenEye}
            />
          </View>
          <View style={tw`h-14`}>
            <InputText
              onPress={() => setShowPassNew(!showPassNew)}
              placeholder="New Password"
              floatingPlaceholder
              secureTextEntry={!showPassNew}
              // svgFirstIcon={IconFillPassword}
              svgSecondIcon={showPassNew ? IconCloseEye : IconOpenEye}
            />
          </View>
          <View style={tw`h-14`}>
            <InputText
              onPress={() => setShowPassNewConfirm(!showPassNewConfirm)}
              placeholder="Confirm Password"
              floatingPlaceholder
              secureTextEntry={!showPassNewConfirm}
              // svgFirstIcon={IconFillPassword}
              svgSecondIcon={showPassNewConfirm ? IconCloseEye : IconOpenEye}
            />
          </View>
        </View>
        <View style={tw`px-[4%] my-4`}>
          <TButton
            title="Save Changes"
            onPress={() => {
              navigation?.navigate('PassChanSuccess');
            }}
            containerStyle={tw`my-3 w-full bg-primary`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdatePassword;
