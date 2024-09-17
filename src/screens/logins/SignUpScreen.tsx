import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, TextField } from 'react-native-ui-lib';
import { IconCloseEye, IconEmail, IconLocation, IconOpenEye, IconPassword, IconUser } from '../../icons/icons.config';

import { Formik } from 'formik';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import IwtButton from '../../components/buttons/IwtButton';
import Or from '../../components/buttons/Or';
import TButton from '../../components/buttons/TButton';
import { NavigProps } from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

interface ISingUpForm {
  name : string
  email : string
  password : string
  address : string
}

const SignUpScreen = ({navigation} : NavigProps<null>) => {

  const [check,setCheck] = React.useState(false)
  const [showPass,setShowPass] = React.useState(false)


  const onSubmitHandler = (data : ISingUpForm) => {
   console.log(data);
  }


  return (
    <View style={tw`bg-base h-full`}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={tw`gap-1 pb-12`} keyboardShouldPersistTaps="always">
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
            Sing Up.
          </Text>
        </View>
          {/*================= inputs fields email or password  ================= */}
      
        <Formik
     initialValues={{ email: '' , password : "" , name : "" , address : ""}}
     onSubmit={onSubmitHandler}
     validate={values => {
      const errors: { email?: string; password?: string , name?: string ,address ?: string } = {};
      if(!values.name){
        errors.name = "Required";
      }
      if(!values.email){
        errors.email = "Required";
      }
      if(!values.address){
        errors.address = "Required";
      }
      // check or validity of email
      if(!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)){
        errors.email = "Invalid email address";
      }
      // check or validity of password 6 digit 
      if(values.password.length < 6){
        errors.password = "Password must be at least 6 characters";
      }
      if(!values.password){
        errors.password = "Required";
      }
       return errors;
     }}
   >
     {({ handleChange, handleBlur, handleSubmit, values ,touched,errors }) => (
      <>
  <View style={tw`px-[4%] mt-6 gap-4`}>
         {/*======================= email ======================== */}
         <View
            style={tw`w-full rounded-2xl h-14  px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
            <SvgXml
              xml={IconUser}
            />
  
            <TextField
               value={values.name}
               onChangeText={handleChange('name')}
               onBlur={handleBlur('name')}
               containerStyle={tw`flex-1`}
               fieldStyle={tw`pb-4 `}
               floatingPlaceholder
               placeholder="Full Name"
               />
          </View>
      {errors.name && touched.name && <Text style={tw`text-red-500` }>
              {errors.name}</Text>}
         <View
            style={tw`w-full rounded-2xl h-14  px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
            <SvgXml
              xml={IconEmail}
            />
  
            <TextField
               value={values.email}
               onChangeText={handleChange('email')}
               onBlur={handleBlur('email')}
               containerStyle={tw`flex-1`}
               fieldStyle={tw`pb-4 `}
               floatingPlaceholder
               placeholder="Email"
               />
          </View>
      {errors.email && touched.email && <Text style={tw`text-red-500` }>
              {errors.email}</Text>}
         <View
            style={tw`w-full rounded-2xl h-14  px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
            <SvgXml
              xml={IconLocation}
            />
  
            <TextField
               value={values.address}
               onChangeText={handleChange('address')}
               onBlur={handleBlur('address')}
               containerStyle={tw`flex-1`}
               fieldStyle={tw`pb-4 `}
               floatingPlaceholder
               placeholder="Address"
               />
          </View>
      {errors.address && touched.address && <Text style={tw`text-red-500` }>
              {errors.address}</Text>}
        
          {/*================== password =================== */}
          <View
            style={tw`w-full rounded-2xl h-14 px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
            <SvgXml
              xml={IconPassword}
                />
            <TextField
                value={values.password}
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                containerStyle={tw`flex-1`}
                fieldStyle={tw`pb-4 `}
                
                placeholder="Enter Your Password"
                floatingPlaceholder
                secureTextEntry={!showPass}
                />
            <TouchableOpacity onPress={() => setShowPass(!showPass)}>
            <SvgXml 
              xml={showPass ?IconCloseEye : IconOpenEye}
            />
            </TouchableOpacity>
          </View>
        
            {errors.password && touched.password && <Text style={tw`text-red-500` }>
              {errors.password}
              </Text>}
       
       </View>
         {/* check box the Keep me logged In */}
         <View style={tw`px-[4%] `}>
       <TouchableOpacity style={tw` my-5 flex-row items-center `} onPress={()=>{
         setCheck(!check)
       }}>

       <Checkbox color='#4964C6' size={25} style={tw`border-2 border-[#E8E8EA]`} value={check} onValueChange={(value) => setCheck(value)} />
       <Text style={tw`ml-2  font-NunitoSansBold text-color-Black800`}>Keep me logged in</Text>
       </TouchableOpacity>
        <TButton onPress={handleSubmit} tw={tw} title='Log in' containerStyle={tw`w-full mb-5 mt-3 bg-primary text-[16px] `} titleStyle={tw`text-white font-NunitoSansSemiBold`} />
        </View>

     </>
     )}
   </Formik>
    
           
  
     
      
       {/*================ all buttons =================== */}
       <View style={tw`px-[4%] gap-6`}>
 

        <Or tw={tw} />

        <IwtButton tw={tw} containerStyle={tw`w-full bg-[#1877F2]`} title='Continue with Facebook' svg={`<svg width="11" height="20" viewBox="0 0 11 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M9.67109 11.4688L10.2031 8H6.875V5.75C6.875 4.80102 7.34 3.875 8.83063 3.875H10.3438V0.921875C10.3438 0.921875 8.97055 0.6875 7.65758 0.6875C4.91656 0.6875 3.125 2.34875 3.125 5.35625V8H0.078125V11.4688H3.125V19.8542C4.36744 20.0486 5.63256 20.0486 6.875 19.8542V11.4688H9.67109Z" fill="white"/>
        </svg>
        `} />
        <IwtButton tw={tw} containerStyle={tw`w-full bg-[#FFFFFF]`} title='Continue with  Google' titleStyle={tw`text-color-Black800 font-NunitoSansBold`}  svg={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clip-path="url(#clip0_703_91295)">
          <path d="M23.7682 12.2763C23.7682 11.4605 23.7021 10.6404 23.561 9.83789H12.2422V14.4589H18.7239C18.455 15.9492 17.5907 17.2676 16.3252 18.1054V21.1037H20.1922C22.463 19.0137 23.7682 15.9272 23.7682 12.2763Z" fill="#4285F4"/>
          <path d="M12.2391 24.0008C15.4756 24.0008 18.205 22.9382 20.1936 21.1039L16.3266 18.1055C15.2507 18.8375 13.8618 19.252 12.2435 19.252C9.11291 19.252 6.45849 17.1399 5.50607 14.3003H1.51562V17.3912C3.55274 21.4434 7.70192 24.0008 12.2391 24.0008Z" fill="#34A853"/>
          <path d="M5.50473 14.3002C5.00206 12.8099 5.00206 11.196 5.50473 9.70569V6.61475H1.51869C-0.183313 10.0055 -0.183313 14.0004 1.51869 17.3912L5.50473 14.3002Z" fill="#FBBC04"/>
            <path d="M12.2391 4.74966C13.9499 4.7232 15.6034 5.36697 16.8425 6.54867L20.2685 3.12262C18.0991 1.0855 15.2198 -0.034466 12.2391 0.000808666C7.70192 0.000808666 3.55274 2.55822 1.51562 6.61481L5.50166 9.70575C6.44967 6.86173 9.1085 4.74966 12.2391 4.74966Z" fill="#EA4335"/>
            </g>
            <defs>
            <clipPath id="clip0_703_91295">
            <rect width="24" height="24" fill="white"/>
            </clipPath>
            </defs>
            </svg>

        `} />

       </View>
        {/* Sing up and  Forgot password? */}
        <View style={tw`items-center gap-2 mt-6` }>
       
        <TouchableOpacity style={tw`flex-row items-center`}>
          <Text style={tw`text-color-Black800 font-NunitoSansLight`}>Already have an account? </Text>
          <Text onPress={() => navigation?.navigate('Login')} style={tw`text-primary font-NunitoSansLight`}> Login In</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor={'#f6f6f6'} />
    </View>
  );
};

export default SignUpScreen;
