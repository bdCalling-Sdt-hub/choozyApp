import {ScrollView, Text, View} from 'react-native';
import {IconCloseEye, IconOpenEye} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import BackButton from '../../components/backHeader/BackButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useUserPasswordUpdateMutation} from '../../redux/apiSlices/authSlice';

const UpdatePassword = ({navigation}: NavigProps<any>) => {
  const {closeToast, showToast} = useToast();
  const [showPassOld, setShowPassOld] = React.useState(false);
  const [showPassNew, setShowPassNew] = React.useState(false);
  const [showPassNewConfirm, setShowPassNewConfirm] = React.useState(false);
  const [passInfo, setPassInfo] = React.useState({
    current_password: '',
    new_password: '',
    confirm_password: '',
  });

  const [updatedPassword] = useUserPasswordUpdateMutation();

  const handlePasswordUpdated = () => {
    if (passInfo.new_password !== passInfo.confirm_password) {
      showToast({
        title: 'error',
        content: 'Passwords do not match',
      });
    }
    if (
      passInfo?.current_password.length < 8 ||
      passInfo.new_password.length < 8 ||
      passInfo.confirm_password.length < 8
    ) {
      showToast({
        content: 'Password must be at least 8 characters',
        buttonStyle: tw`bg-primary`,
        buttonText: 'OK',
        onPress: () => {
          closeToast();
        },
      });
      return;
    }

    updatedPassword(passInfo).then(res => {
      console.log(res);
      if (res.data) {
        showToast({
          title: 'success',
          titleStyle: tw`text-primary text-base font-NunitoSansBold`,
          content: res.data?.message,
          contentStyle: tw`text-sm`,
          buttonStyle: tw`bg-primary`,
          buttonText: 'Back',
          onPress: () => {
            closeToast();
            navigation?.goBack();
          },
        });
      }
      if (res.error) {
        showToast({
          title: 'error',
          titleStyle: tw`text-red-500 text-base font-NunitoSansBold`,
          content: res.error?.data?.message,
          contentStyle: tw`text-sm`,
          btnDisplay: true,
        });
      }
      if (res.error?.message) {
        showToast({
          title: 'error',
          titleStyle: tw`text-red-500 text-base font-NunitoSansBold`,
          content: res.error?.message,
          contentStyle: tw`text-sm`,
          btnDisplay: true,
        });
      }
    });
  };

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
              value={passInfo.current_password}
              onChangeText={text =>
                setPassInfo({...passInfo, current_password: text})
              }
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
              value={passInfo.new_password}
              onChangeText={text =>
                setPassInfo({...passInfo, new_password: text})
              }
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
              value={passInfo.confirm_password}
              onChangeText={text =>
                setPassInfo({...passInfo, confirm_password: text})
              }
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
              handlePasswordUpdated();
            }}
            containerStyle={tw`my-3 w-full bg-primary`}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default UpdatePassword;
