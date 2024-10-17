import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconCloseEye,
  IconEmail,
  IconFacebook,
  IconGoogle,
  IconLocation,
  IconOpenEye,
  IconPassword,
  IconUser,
} from '../../icons/icons';

import {Formik} from 'formik';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Checkbox} from 'react-native-ui-lib';
import IwtButton from '../../components/buttons/IwtButton';
import Or from '../../components/buttons/Or';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useCreateUserMutation} from '../../redux/apiSlices/authSlice';

interface ISingUpForm {
  full_name: string;
  email: string;
  password: string;
  address: string;
  role: 'MEMBER';
}

const SignUpScreen = ({navigation}: NavigProps<any>) => {
  const {showToast} = useToast();

  const [check, setCheck] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);

  const [createUser] = useCreateUserMutation({});

  const onSubmitHandler = (data: ISingUpForm) => {
    console.log(data);

    // console.log(data);
    createUser(data).then(res => {
      console.log(res);

      if (res.data) {
        showToast({
          title: 'Success',
          titleStyle: tw`text-green-500 text-base font-NunitoSansBold`,
          contentStyle: tw`text-sm`,
          content: res.data?.message,
          btnDisplay: true,
        });
        navigation?.navigate('Verify', {email: data.email});
      }

      if (res.error) {
        showToast({
          title: 'Error',
          titleStyle: tw`text-red-500 text-base font-NunitoSansBold`,
          containerStyle: tw`text-xs`,
          content: res.error?.messages?.email,
          btnDisplay: true,
        });
      }
    });
  };

  return (
    <View style={tw`bg-base h-full`}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`gap-1 pb-12`}
        keyboardShouldPersistTaps="always">
        <View style={tw`flex-1 justify-center items-center mt-[5%] py-4`}>
          {/*=============== app logo ============= */}
          <FastImage
            style={tw`h-20 md:h-28  aspect-square`}
            // resizeMode={FastImage.resizeMode.contain}
            source={require('../../assets/images/logo/logo.png')}
          />
        </View>
        {/*================= login title and subtitle ================= */}
        <View style={tw`px-[4%] gap-3`}>
          <Text
            style={tw`text-[24px] text-color-Black800 font-NunitoSansExtraBold `}>
            Sing Up.
          </Text>
        </View>
        {/*================= inputs fields email or password  ================= */}

        <Formik
          initialValues={{
            full_name: '',
            role: 'MEMBER',
            email: '',
            password: '',
            address: '',
          }}
          onSubmit={onSubmitHandler}
          validate={values => {
            const errors: {
              email?: string;
              password?: string;
              full_name?: string;
              address?: string;
            } = {};
            if (!values.full_name) {
              errors.full_name = 'Required';
            }
            if (!values.email) {
              errors.email = 'Required';
            }
            if (!values.address) {
              errors.address = 'Required';
            }
            // check or validity of email
            if (
              !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
            ) {
              errors.email = 'Invalid email address';
            }
            // check or validity of password 6 digit
            if (values.password.length < 8) {
              errors.password = 'Password must be at least 8 characters';
            }
            if (!values.password) {
              errors.password = 'Required';
            }
            return errors;
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            touched,
            errors,
          }) => (
            <>
              <View style={tw`px-[4%] mt-6 gap-4`}>
                {/*======================= email ======================== */}

                <InputText
                  value={values.full_name}
                  onChangeText={handleChange('full_name')}
                  onBlur={handleBlur('full_name')}
                  floatingPlaceholder
                  placeholder="Full Name"
                  svgFirstIcon={IconUser}
                />
                {errors.full_name && touched.full_name && (
                  <Text style={tw`text-red-500`}>{errors.full_name}</Text>
                )}

                {/* <InputText
                  value={values.user_name}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  floatingPlaceholder
                  placeholder="Username"
                  svgFirstIcon={IconAtTheRatOf}
                />

                {errors.user_name && touched.user_name && (
                  <Text style={tw`text-red-500`}>{errors.user_name}</Text>
                )} */}
                <InputText
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  floatingPlaceholder
                  placeholder="Email"
                  svgFirstIcon={IconEmail}
                />

                {errors.email && touched.email && (
                  <Text style={tw`text-red-500`}>{errors.email}</Text>
                )}

                <InputText
                  value={values.address}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  floatingPlaceholder
                  placeholder="Address"
                  svgFirstIcon={IconLocation}
                />

                {errors.address && touched.address && (
                  <Text style={tw`text-red-500`}>{errors.address}</Text>
                )}

                {/*================== password =================== */}
                <InputText
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  onPress={() => setShowPass(!showPass)}
                  placeholder="Enter Your Password"
                  floatingPlaceholder
                  secureTextEntry={!showPass}
                  svgFirstIcon={IconPassword}
                  svgSecondIcon={showPass ? IconCloseEye : IconOpenEye}
                />
                {errors.password && touched.password && (
                  <Text style={tw`text-red-500`}>{errors.password}</Text>
                )}
              </View>
              {/* check box the Keep me logged In */}
              <View style={tw`px-[4%] `}>
                <TouchableOpacity
                  style={tw` my-5 flex-row items-center `}
                  onPress={() => {
                    setCheck(!check);
                  }}>
                  <Checkbox
                    color="#4964C6"
                    size={25}
                    style={tw`border-2 border-[#E8E8EA]`}
                    value={check}
                    onValueChange={value => setCheck(value)}
                  />
                  <Text
                    style={tw`ml-2  font-NunitoSansBold text-color-Black800`}>
                    Keep me logged in
                  </Text>
                </TouchableOpacity>
                <TButton
                  onPress={handleSubmit}
                  title="Sing Up"
                  containerStyle={tw`w-full mb-5 mt-3 bg-primary text-lg `}
                  titleStyle={tw`text-white font-NunitoSansSemiBold`}
                />
              </View>
            </>
          )}
        </Formik>

        {/*================ all buttons =================== */}
        <View style={tw`px-[4%] gap-6`}>
          <Or />

          <IwtButton
            containerStyle={tw`w-full bg-[#1877F2]`}
            title="Continue with Facebook"
            svg={IconFacebook}
          />
          <IwtButton
            containerStyle={tw`w-full bg-[#FFFFFF]`}
            title="Continue with  Google"
            titleStyle={tw`text-color-Black800 font-NunitoSansBold`}
            svg={IconGoogle}
          />
        </View>
        {/* Sing up and  Forgot password? */}
        <View style={tw`items-center gap-2 mt-6`}>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <Text style={tw`text-color-Black800 font-NunitoSansLight`}>
              Already have an account?{' '}
            </Text>
            <Text
              onPress={() => navigation?.navigate('Login')}
              style={tw`text-primary font-NunitoSansLight`}>
              {' '}
              Login In
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor={'#f6f6f6'} />
    </View>
  );
};

export default SignUpScreen;
