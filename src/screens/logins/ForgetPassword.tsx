import {ScrollView, Text, View} from 'react-native';

import React from 'react';
import BackWithHeader from '../../components/backHeader/BackWithHeader';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {IconFillEmail} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useForgotPasswordMutation} from '../../redux/apiSlices/authSlice';

const ForgetPassword = ({navigation}: NavigProps<null>) => {
  const {showToast, closeToast} = useToast();
  const [email, setEmail] = React.useState<string>('');
  const [forgatPassword] = useForgotPasswordMutation();

  const onSubmit = async (email: string) => {
    const res = await forgatPassword({email});
    console.log(res);
    if (res.error) {
      // console.log(res.error?.error);
      showToast({
        title: 'Warning',
        titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
        content: res.error?.error,
        contentStyle: tw`text-sm`,
        btnDisplay: true,
      });
    }
    if (res.data) {
      showToast({
        title: 'Success',
        titleStyle: tw`text-primary text-base font-NunitoSansBold`,
        contentStyle: tw`text-sm`,
        content: res.data?.message,
        btnDisplay: true,
      });
      (navigation as any)?.replace('Verify', {
        email: email,
        from: 'forgetPassword',
      });
    }
  };

  return (
    <View style={tw`bg-base flex-1`}>
      <BackWithHeader navigation={navigation} title="Forget Password" />
      <ScrollView
        contentContainerStyle={tw`px-[4%] gap-3 `}
        keyboardShouldPersistTaps="always">
        <View>
          <Text style={tw`text-sm text-color-Black800 font-NunitoSansBold`}>
            Don’t worry we are here to help you
          </Text>
          <View style={tw`gap-2 py-8`}>
            <Text style={tw`text-sm text-color-Black950 font-NunitoSansBold`}>
              Submit your mail
            </Text>
            <InputText
              placeholder="Email"
              floatingPlaceholder
              value={email}
              onChangeText={text => setEmail(text)}
              svgFirstIcon={IconFillEmail}
            />
          </View>
        </View>
      </ScrollView>
      <View style={tw`px-[4%]`}>
        <TButton
          onPress={() => onSubmit(email)}
          isLoading={false}
          title="Submit"
          containerStyle={tw`my-10 w-full bg-primary`}
        />
      </View>
    </View>
  );
};

export default ForgetPassword;
