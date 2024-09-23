import {
  NativeSyntheticEvent,
  ScrollView,
  Text,
  TextInput,
  TextInputKeyPressEventData,
  TouchableOpacity,
  View,
} from 'react-native';

import React from 'react';
import BackWithHeader from '../../components/backHeader/BackWithHeader';
import TButton from '../../components/buttons/TButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const VerifyEmail = ({navigation}: NavigProps<null>) => {
  // Use React state with correct typing for OTP (array of strings)
  const [otp, setOtp] = React.useState<string[]>(['', '', '', '']);
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
    if (value && index) {
      console.log(value);
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

  return (
    <View style={tw`bg-base flex-1`}>
      <BackWithHeader navigation={navigation} title="OTP Verification" />
      <ScrollView
        contentContainerStyle={tw`px-[4%] gap-3`}
        keyboardShouldPersistTaps="always">
        <View>
          <Text style={tw`text-lg text-color-Black800 font-NunitoSansRegular`}>
            We just sent a verification code to alima012@gmail.com
          </Text>
          <View style={tw`gap-2 pt-8`}>
            <Text
              style={tw`text-[14px] text-color-Black950 font-NunitoSansBold`}>
              Enter the code
            </Text>
            <View style={tw`flex-row gap-3 my-2`}>
              {otp.map((digit, index) => (
                <View
                  key={index}
                  style={tw`w-14 h-14 rounded-2xl border border-[#D1D1D1] justify-center items-center`}>
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
        <TouchableOpacity style={tw`flex-row items-center`}>
          <Text style={tw`text-color-Black800 font-NunitoSansRegular`}>
            Didn’t receive the code?
          </Text>
          <Text
            onPress={() => navigation?.navigate('Login')}
            style={tw`text-primary font-NunitoSansExtraBold`}>
            {' '}
            Send again
          </Text>
        </TouchableOpacity>
      </ScrollView>
      <View style={tw`px-[4%]`}>
        <TButton
          onPress={() => navigation?.navigate('CreateNewPassword')}
          isLoading={false}
          title="Submit"
          containerStyle={tw`my-10 w-full bg-primary`}
        />
      </View>
    </View>
  );
};

export default VerifyEmail;
