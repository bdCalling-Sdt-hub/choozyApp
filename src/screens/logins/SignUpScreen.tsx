import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconAtTheRatOf,
  IconCloseEye,
  IconEmail,
  IconLocation,
  IconOpenEye,
  IconPassword,
  IconUser,
} from '../../icons/icons';
import {
  useCreateUserMutation,
  useLazyGetUserNameQuery,
} from '../../redux/apiSlices/authSlice';

import {Formik} from 'formik';
import React from 'react';
import FastImage from 'react-native-fast-image';
import Or from '../../components/buttons/Or';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

interface ISingUpForm {
  full_name: string;
  email: string;
  user_name?: string;
  password: string;
  address: string;
  role: 'MEMBER';
}

const SignUpScreen = ({navigation}: NavigProps<any>) => {
  const {showToast} = useToast();

  const [check, setCheck] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [errorUsername, setErrorUsername] = React.useState(false);

  const [createUser] = useCreateUserMutation({});
  const [userNameChecker, {isFetching: userNameCheckerFetching}] =
    useLazyGetUserNameQuery();

  const onSubmitHandler = (data: ISingUpForm) => {
    // console.log(data);
    createUser(data).then(res => {
      // console.log(res?.e);

      if (res.data) {
        showToast({
          title: 'Success',
          titleStyle: tw`text-primary text-base font-NunitoSansBold`,
          contentStyle: tw`text-sm`,
          content:
            "We've sent you an email for verification, it will expire in Time 10 minutes. Please check your inbox.",
          btnDisplay: true,
        });
        navigation?.navigate('Verify', {email: data.email, from: 'signup'});
      }

      if (res.error?.error) {
        showToast({
          title: 'Error',
          titleStyle: tw`text-red-500 text-base font-NunitoSansBold`,
          containerStyle: tw`text-xs`,
          content: res?.error?.messages?.email,
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
            Sign Up.
          </Text>
        </View>
        {/*================= inputs fields email or password  ================= */}

        <Formik
          initialValues={{
            full_name: '',
            role: 'MEMBER',
            email: '',
            user_name: '',
            password: '',
            address: '',
          }}
          onSubmit={onSubmitHandler}
          validate={values => {
            const errors: {
              email?: string;
              user_name?: string;
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
            if (!values.user_name) {
              errors.user_name = 'Required';
            }
            if (values.user_name) {
              userNameChecker(values.user_name).then(res => {
                if (res.error) {
                  setErrorUsername(true);
                }
                if (res.data) {
                  setErrorUsername(false);
                }
              });
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

                <InputText
                  value={values.user_name}
                  onChangeText={handleChange('user_name')}
                  onBlur={handleBlur('user_name')}
                  floatingPlaceholder
                  placeholder="Username"
                  svgFirstIcon={IconAtTheRatOf}
                />

                {errors.user_name && touched.user_name && (
                  <Text style={tw`text-red-500`}>{errors.user_name}</Text>
                )}
                {((!errors.user_name && errorUsername) ||
                  values?.user_name) && (
                  <Text
                    style={
                      errorUsername
                        ? tw`text-green-500 text-xs`
                        : tw`text-red-500 text-xs`
                    }>
                    {errorUsername
                      ? `@${values?.user_name} Username is available`
                      : `x ${values?.user_name} Username is not available`}
                  </Text>
                )}

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

          {/* <IwtButton
            containerStyle={tw`w-full bg-[#1877F2]`}
            title="Continue with Facebook"
            svg={IconFacebook}
          /> */}
          {/* <IwtButton
            containerStyle={tw`w-full bg-[#FFFFFF]`}
            title="Continue with  Google"
            titleStyle={tw`text-color-Black800 font-NunitoSansBold`}
            svg={IconGoogle}
          /> */}
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
