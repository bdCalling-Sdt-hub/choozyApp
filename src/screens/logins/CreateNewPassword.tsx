import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {IconCloseEye, IconOpenEye} from '../../icons/icons';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {TextField} from 'react-native-ui-lib';
import TButton from '../../components/buttons/TButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const CreateNewPassword = ({navigation}: NavigProps<null>) => {
  const [showPass, setShowPass] = React.useState({
    password: false,
    confirmPassword: false,
  });
  return (
    <View style={tw`bg-base flex-1`}>
      <View style={tw`px-[4%] py-8 flex-row gap-3 items-center`}>
        {/* <TouchableOpacity  onPress={() => navigation?.goBack()}>
        <SvgXml xml={Basicsleft}/>
        </TouchableOpacity> */}
        <Text
          style={tw`text-[24px] text-color-Black950 font-NunitoSansExtraBold `}>
          Create new password
        </Text>
      </View>
      <ScrollView
        contentContainerStyle={tw`px-[4%] gap-5 `}
        keyboardShouldPersistTaps="always">
        <View style={tw`gap-2 `}>
          <Text style={tw`text-sm text-color-Black950 font-NunitoSansBold`}>
            New Password
          </Text>
          <View
            style={tw`w-full rounded-2xl h-14  px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
            <TextField
              //    value={values.email}
              //    onChangeText={handleChange('email')}
              containerStyle={tw`flex-1`}
              fieldStyle={tw` `}
              //  floatingPlaceholder
              placeholder="********"
              secureTextEntry={!showPass.password}
            />
            <TouchableOpacity
              style={tw`h-full justify-center items-end  `}
              onPress={() =>
                setShowPass({
                  ...showPass,
                  password: !showPass.password,
                })
              }>
              <SvgXml xml={showPass.password ? IconCloseEye : IconOpenEye} />
            </TouchableOpacity>
          </View>
        </View>
        <View style={tw`gap-2 `}>
          <Text style={tw`text-sm text-color-Black950 font-NunitoSansBold`}>
            Confirm Password
          </Text>
          <View
            style={tw`w-full rounded-2xl h-14  px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
            <TextField
              //    value={values.email}
              //    onChangeText={handleChange('email')}
              containerStyle={tw`flex-1`}
              fieldStyle={tw` `}
              //  floatingPlaceholder
              placeholder="********"
              secureTextEntry={!showPass.confirmPassword}
            />
            <TouchableOpacity
              style={tw`h-full justify-center items-end  `}
              onPress={() =>
                setShowPass({
                  ...showPass,
                  confirmPassword: !showPass.confirmPassword,
                })
              }>
              <SvgXml
                xml={showPass.confirmPassword ? IconCloseEye : IconOpenEye}
              />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
      <View style={tw`px-[4%]`}>
        <TButton
          onPress={() => navigation?.navigate('VerifySuccess')}
          isLoading={false}
          title="Submit"
          containerStyle={tw`my-10 w-full bg-primary`}
        />
      </View>
    </View>
  );
};

export default CreateNewPassword;
