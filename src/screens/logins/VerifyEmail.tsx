import {
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useResendOtpMutation,
  useVerifyEmailMutation,
} from '../../redux/apiSlices/authSlice';

import React from 'react';
import BackWithHeader from '../../components/backHeader/BackWithHeader';
import TButton from '../../components/buttons/TButton';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {setStorageToken} from '../../utils/utils';

const VerifyEmail = ({navigation, route}: NavigProps<{email: string}>) => {
  const {showToast} = useToast();
  const [verifyPin] = useVerifyEmailMutation();
  const [sendOtp] = useResendOtpMutation();

  // Use React state with correct typing for OTP (array of strings)
  const [otp, setOtp] = React.useState<string[]>(['', '', '', '', '', '']);
  const inputRefs = React.useRef<(TextInput | null)[]>([]);

  // Function to handle text change with correct typing for value and index

  //   console.log(otp);
  const handleChange = (value: string, index: number) => {
    // Update OTP state with correct typing
    // console.log(value, index);
    const otpCopy = [...otp];
    otpCopy[index] = value;
    setOtp(otpCopy);

    // Move to the next input if value is entered
    if (value && index <= otp.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }

    // Move to the previous input if value is deleted
  };

  // Function to handle key press with correct typing for the event and index
  const handleKeyPress = (
    event: NativeSyntheticEvent<TextInputKeyPressEventData>,
    index: number,
  ) => {
    if (
      event.nativeEvent.key === 'Backspace' &&
      otp[index] === '' &&
      index > 0
    ) {
      inputRefs.current[index - 1]?.focus();
    }
    if (otp[index] !== '' && event.nativeEvent.key !== 'Backspace') {
      const otpCopy = [...otp];
      otpCopy[index] = event.nativeEvent.key;
      setOtp(otpCopy);
      inputRefs.current[index + 1]?.focus();
    }
  };

  const onSubmit = async () => {
    if (otp.join('').length === 6) {
      console.log(otp.join(''));
      const res = await verifyPin({otp: otp.join('')});
      if (res.error) {
        console.log(res.error?.error);
        showToast({
          title: 'Error',
          titleStyle: tw`text-red-500 text-base font-NunitoSansBold`,
          content: res.error?.messages?.otp,
          btnDisplay: true,
        });
      }
      if (res.data?.token) {
        setStorageToken(res.data?.token);
        (navigation as any)?.replace('VerifySuccess');
      }
    } else {
      showToast({
        title: 'warning',
        titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
        content: 'Please enter valid OTP',
        contentStyle: tw`text-sm`,
        btnDisplay: true,
      });
    }
  };

  return (
    <View style={tw`bg-base flex-1`}>
      <BackWithHeader navigation={navigation} title="OTP Verification" />
      <ScrollView
        contentContainerStyle={tw`px-[4%] gap-3`}
        keyboardShouldPersistTaps="always">
        <View>
          <Text style={tw`text-lg text-color-Black800 font-NunitoSansRegular`}>
            We just sent a verification code to {route?.params?.email}
          </Text>
          <View style={tw`gap-2 pt-8`}>
            <Text style={tw`text-sm text-color-Black950 font-NunitoSansBold`}>
              Enter the code
            </Text>
            <View style={tw`flex-row gap-3 my-2`}>
              {otp.map((digit, index) => (
                <View
                  key={index}
                  style={tw`w-13 h-13 rounded-2xl border border-[#D1D1D1] justify-center items-center`}>
                  <TextInput
                    ref={el => (inputRefs.current[index] = el)}
                    value={digit}
                    onChangeText={value => handleChange(value, index)}
                    onKeyPress={e => handleKeyPress(e, index)}
                    keyboardType="number-pad"
                    textAlign="center"
                    textAlignVertical="center"
                    verticalAlign="middle"
                    maxLength={1}
                    style={tw` text-center font-NunitoSansExtraBold text-[34px] p-0`}
                  />
                </View>
              ))}
            </View>
          </View>
        </View>
        <View style={tw`flex-row items-center`}>
          <Text style={tw`text-color-Black800 font-NunitoSansRegular`}>
            Didn’t receive the code?
          </Text>
          <TouchableOpacity
            onPress={async () => {
              await sendOtp({email: route?.params?.email}).then(res => {
                console.log(res);
                if (res.data?.status === 200) {
                  showToast({
                    title: 'Success',
                    titleStyle: tw`text-gray-500 text-base font-NunitoSansBold`,
                    contentStyle: tw`text-sm`,
                    content: res.data?.message,
                    btnDisplay: true,
                  });
                }
              });
              setOtp(['', '', '', '', '', '']);
              inputRefs.current[0]?.focus();
            }}>
            <Text style={tw`text-primary font-NunitoSansExtraBold px-2`}>
              Send again
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={tw`px-[4%]`}>
        <TButton
          onPress={async () => {
            await onSubmit();
            setOtp(['', '', '', '', '', '']);
            inputRefs.current[0]?.focus();
          }}
          isLoading={false}
          title="Submit"
          containerStyle={tw`my-10 w-full bg-primary`}
        />
      </View>
    </View>
  );
};

export default VerifyEmail;
