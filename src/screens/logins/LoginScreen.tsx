import {
  ScrollView,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconCloseEye,
  IconFillEmail,
  IconFillPassword,
  IconOpenEye,
} from '../../icons/icons';
import {lStorage, setStorageToken} from '../../utils/utils';

import {Formik} from 'formik';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {Checkbox} from 'react-native-ui-lib';
import {useDispatch} from 'react-redux';
import Or from '../../components/buttons/Or';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useLoginUserMutation} from '../../redux/apiSlices/authSlice';

interface ISingInForm {
  email: string;
  password: string;
}

const LoginScreen = ({navigation}: NavigProps<any>) => {
  const dispatch = useDispatch();
  const {showToast} = useToast();
  const [check, setCheck] = React.useState(false);
  const [showPass, setShowPass] = React.useState(false);
  const [rememberItems, setRememberItems] = React.useState({
    check: lStorage.getBool('check') || false,
    email: lStorage.getString('email') || '',
    password: lStorage.getString('password') || '',
  });
  const [loginUser, results] = useLoginUserMutation({});
  const onSubmitHandler = async (data: ISingInForm) => {
    console.log(data);
    const res = await loginUser(data);
    console.log(res);

    if (res.error) {
      console.log(res.error?.error);
      showToast({
        title: 'Error',
        titleStyle: tw`text-red-500 text-base font-NunitoSansBold`,
        content: res.error?.error,
        btnDisplay: true,
      });
    }
    if (res.data?.token) {
      setStorageToken(res.data?.token);
      (navigation as any)?.replace('DrawerRoutes');
    }
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
          <Text style={tw`text-[24px] text-black font-NunitoSansExtraBold `}>
            Log In.
          </Text>

          <Text style={tw`text-sm text-[#454545] font-NunitoSansRegular`}>
            Log In with your data that you entered during your registration
          </Text>
        </View>
        {/*================= inputs fields email or password  ================= */}

        <Formik
          initialValues={{
            email: rememberItems.email || '',
            password: rememberItems.password || '',
          }}
          onSubmit={onSubmitHandler}
          validate={values => {
            const errors: {email?: string; password?: string} = {};
            if (!values.email) {
              errors.email = 'Required';
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
              <View style={tw`px-[4%] mt-12 gap-4`}>
                {/*======================= email ======================== */}
                <InputText
                  value={values.email}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  placeholder="Email"
                  floatingPlaceholder
                  svgFirstIcon={IconFillEmail}
                />

                {errors.email && touched.email && (
                  <Text style={tw`text-red-500`}>{errors.email}</Text>
                )}

                {/*================== password =================== */}
                <InputText
                  onPress={() => setShowPass(!showPass)}
                  value={values.password}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
                  placeholder="Enter Your Password"
                  floatingPlaceholder
                  secureTextEntry={!showPass}
                  svgFirstIcon={IconFillPassword}
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
                    if (!rememberItems.check) {
                      setRememberItems({
                        check: true,
                        email: values.email,
                        password: values.password,
                      });
                      lStorage.setBool('check', true);
                      lStorage.setString('email', values.email);
                      lStorage.setString('password', values.password);
                    }

                    if (rememberItems.check) {
                      lStorage.removeItem('email');
                      lStorage.removeItem('password');
                      lStorage.removeItem('check');
                      setRememberItems({
                        check: false,
                        email: '',
                        password: '',
                      });
                    }
                  }}>
                  <Checkbox
                    color="#4964C6"
                    size={25}
                    style={tw`border-2 border-[#E8E8EA]`}
                    value={rememberItems.check}
                    onValueChange={value => setCheck(value)}
                  />
                  <Text
                    style={tw`ml-2  font-NunitoSansBold text-color-Black800`}>
                    Keep me logged in
                  </Text>
                </TouchableOpacity>
                <TButton
                  isLoading={results.isLoading}
                  loadingColor="white"
                  onPress={handleSubmit}
                  title="Log in"
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
            svg={`<svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.67109 11.4688L10.2031 8H6.875V5.75C6.875 4.80102 7.34 3.875 8.83063 3.875H10.3438V0.921875C10.3438 0.921875 8.97055 0.6875 7.65758 0.6875C4.91656 0.6875 3.125 2.34875 3.125 5.35625V8H0.078125V11.4688H3.125V19.8542C4.36744 20.0486 5.63256 20.0486 6.875 19.8542V11.4688H9.67109Z" fill="white"/>
        </svg>
        `}
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
          <TouchableOpacity onPress={() => navigation?.navigate('Forget')}>
            <Text style={tw`text-primary font-NunitoSansBold`}>
              Forgot password?
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={tw`flex-row items-center`}>
            <Text style={tw`text-color-Black800 font-NunitoSansLight`}>
              Don’t have an account?
            </Text>
            <Text
              onPress={() => navigation?.navigate('SignUp')}
              style={tw`text-primary font-NunitoSansLight`}>
              {' '}
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor={'#f6f6f6'} />
    </View>
  );
};

export default LoginScreen;
