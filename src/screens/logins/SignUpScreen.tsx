import { ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { Checkbox, TextField } from 'react-native-ui-lib';

import { Formik } from 'formik';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import IwtButton from '../../components/buttons/IwtButton';
import Or from '../../components/buttons/Or';
import TButton from '../../components/buttons/TButton';
import { NavigProps } from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const SignUpScreen = ({navigation} : NavigProps<null>) => {

  const [check,setCheck] = React.useState(false)
  const [showPass,setShowPass] = React.useState(false)


  const onSubmitHandler = (data) => {
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
       const errors = {};
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
     {({ handleChange, handleBlur, handleSubmit, values ,touched,errors,validateOnBlur }) => (
      <>
  <View style={tw`px-[4%] mt-6 gap-4`}>
         {/*======================= email ======================== */}
         <View
            style={tw`w-full rounded-2xl h-14  px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
            <SvgXml
              xml={`<svg width="11" height="16" viewBox="0 0 11 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M8.5 3.99804C8.5 5.65396 7.157 6.99609 5.5 6.99609C3.843 6.99609 2.5 5.65396 2.5 3.99804C2.5 2.34212 3.843 1 5.5 1C7.157 1 8.5 2.34212 8.5 3.99804Z" stroke="#454545" stroke-linecap="square"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M10.5 14.9909H0.5C0.5 14.2808 0.5 13.6053 0.5 12.9936C0.5 11.3368 1.84315 9.99414 3.5 9.99414H7.5C9.15685 9.99414 10.5 11.3368 10.5 12.9936C10.5 13.6053 10.5 14.2808 10.5 14.9909Z" stroke="#454545" stroke-linecap="square"/>
</svg>

           `}
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
              xml={`<svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M0.5 4L7.5 8L14.5 4M1.5 1H13.5C14.0523 1 14.5 1.44772 14.5 2V12C14.5 12.5523 14.0523 13 13.5 13H1.5C0.947716 13 0.5 12.5523 0.5 12V2C0.5 1.44772 0.947715 1 1.5 1Z" stroke="#454545"/>
</svg>

           `}
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
              xml={`<svg width="13" height="16" viewBox="0 0 13 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M6.5 8.99478C7.604 8.99478 8.5 8.09934 8.5 6.99606C8.5 5.89278 7.604 4.99738 6.5 4.99738C5.396 4.99738 4.5 5.89278 4.5 6.99606C4.5 8.09934 5.396 8.99478 6.5 8.99478Z" stroke="#454545" stroke-linecap="square"/>
<path fill-rule="evenodd" clip-rule="evenodd" d="M12.5 6.99606C12.5 11.9928 7.5 14.9909 6.5 14.9909C5.5 14.9909 0.5 11.9928 0.5 6.99606C0.5 3.68522 3.187 1 6.5 1C9.813 1 12.5 3.68522 12.5 6.99606Z" stroke="#454545" stroke-linecap="square"/>
</svg>

           `}
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
              xml={`<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M12.5 9V8C12.5 7.44772 12.0523 7 11.5 7H1.5C0.947715 7 0.5 7.44772 0.5 8V14C0.5 14.5523 0.947715 15 1.5 15H11.5C12.0523 15 12.5 14.5523 12.5 14V13M12.5 9H8.5C7.39543 9 6.5 9.89543 6.5 11C6.5 12.1046 7.39543 13 8.5 13H12.5M12.5 9C13.6046 9 14.5 9.89543 14.5 11C14.5 12.1046 13.6046 13 12.5 13M3.5 7V4C3.5 2.34315 4.84315 1 6.5 1C8.15685 1 9.5 2.34315 9.5 4V7M12 11H13M10 11H11M8 11H9" stroke="#454545"/>
</svg>

                `}
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
              xml={showPass ?`<svg width="15" height="12" viewBox="0 0 15 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 6L0.0357612 5.81431C-0.0119204 5.93351 -0.0119204 6.06649 0.0357612 6.18569L0.5 6ZM14.5 6L14.9642 6.1857C15.0119 6.06649 15.0119 5.93351 14.9642 5.8143L14.5 6ZM7.49998 10.5C5.18597 10.5 3.56111 9.34827 2.49664 8.16552C1.96405 7.57375 1.57811 6.98029 1.32563 6.53474C1.19968 6.31247 1.10772 6.12838 1.04797 6.00164C1.01811 5.9383 0.996349 5.8894 0.98246 5.85735C0.975517 5.84133 0.970545 5.82953 0.967517 5.82225C0.966003 5.81861 0.964975 5.8161 0.96443 5.81477C0.964157 5.8141 0.964005 5.81372 0.963973 5.81364C0.963958 5.8136 0.963972 5.81364 0.964016 5.81375C0.964038 5.81381 0.964094 5.81394 0.964105 5.81397C0.964168 5.81413 0.964239 5.81431 0.5 6C0.0357612 6.18569 0.0358471 6.18591 0.0359408 6.18614C0.0359823 6.18625 0.036084 6.1865 0.0361671 6.18671C0.0363335 6.18712 0.0365311 6.18761 0.0367599 6.18818C0.0372175 6.18931 0.0377999 6.19075 0.0385076 6.19248C0.0399231 6.19595 0.0418401 6.20062 0.0442628 6.20644C0.0491078 6.21808 0.0559773 6.23436 0.0649031 6.25495C0.0827516 6.29614 0.108844 6.35467 0.143439 6.42805C0.212592 6.57474 0.315944 6.78128 0.455611 7.02776C0.734381 7.51971 1.16093 8.17625 1.75334 8.83448C2.93886 10.1517 4.814 11.5 7.49998 11.5V10.5ZM0.5 6C0.964239 6.18569 0.964168 6.18587 0.964105 6.18603C0.964094 6.18606 0.964038 6.18619 0.964016 6.18625C0.963972 6.18636 0.963958 6.1864 0.963973 6.18636C0.964005 6.18628 0.964157 6.1859 0.96443 6.18523C0.964975 6.1839 0.966003 6.18139 0.967517 6.17775C0.970545 6.17047 0.975517 6.15867 0.98246 6.14265C0.996349 6.1106 1.01811 6.0617 1.04797 5.99836C1.10772 5.87162 1.19968 5.68753 1.32563 5.46526C1.57811 5.01971 1.96405 4.42625 2.49664 3.83448C3.56111 2.65173 5.18597 1.5 7.49998 1.5V0.5C4.814 0.5 2.93886 1.84827 1.75334 3.16552C1.16093 3.82375 0.734381 4.48029 0.455611 4.97224C0.315944 5.21872 0.212592 5.42526 0.143439 5.57195C0.108844 5.64533 0.0827516 5.70386 0.0649031 5.74505C0.0559773 5.76564 0.0491078 5.78192 0.0442628 5.79356C0.0418401 5.79938 0.0399231 5.80405 0.0385076 5.80752C0.0377999 5.80925 0.0372175 5.81069 0.0367599 5.81182C0.0365311 5.81239 0.0363335 5.81288 0.0361671 5.81329C0.036084 5.8135 0.0359823 5.81375 0.0359408 5.81386C0.0358471 5.81409 0.0357612 5.81431 0.5 6ZM7.49998 1.5C9.814 1.5 11.4389 2.65173 12.5033 3.83448C13.0359 4.42625 13.4219 5.01971 13.6744 5.46526C13.8003 5.68754 13.8923 5.87162 13.952 5.99837C13.9819 6.0617 14.0037 6.1106 14.0175 6.14265C14.0245 6.15868 14.0295 6.17048 14.0325 6.17775C14.034 6.18139 14.035 6.1839 14.0356 6.18524C14.0358 6.1859 14.036 6.18628 14.036 6.18636C14.036 6.1864 14.036 6.18636 14.036 6.18625C14.036 6.1862 14.0359 6.18606 14.0359 6.18603C14.0358 6.18587 14.0358 6.1857 14.5 6C14.9642 5.8143 14.9642 5.81409 14.9641 5.81385C14.964 5.81375 14.9639 5.8135 14.9638 5.81329C14.9637 5.81288 14.9635 5.81239 14.9632 5.81182C14.9628 5.81069 14.9622 5.80925 14.9615 5.80752C14.9601 5.80405 14.9582 5.79938 14.9557 5.79356C14.9509 5.78192 14.944 5.76564 14.9351 5.74504C14.9172 5.70385 14.8912 5.64533 14.8566 5.57195C14.7874 5.42526 14.6841 5.21871 14.5444 4.97224C14.2656 4.48029 13.8391 3.82375 13.2466 3.16552C12.0611 1.84827 10.186 0.5 7.49998 0.5V1.5ZM14.5 6C14.0358 5.8143 14.0358 5.81413 14.0359 5.81397C14.0359 5.81394 14.036 5.8138 14.036 5.81375C14.036 5.81364 14.036 5.8136 14.036 5.81364C14.036 5.81372 14.0358 5.8141 14.0356 5.81476C14.035 5.8161 14.034 5.81861 14.0325 5.82225C14.0295 5.82952 14.0245 5.84132 14.0175 5.85735C14.0037 5.8894 13.9819 5.9383 13.952 6.00163C13.8923 6.12838 13.8003 6.31246 13.6744 6.53474C13.4219 6.98029 13.0359 7.57375 12.5033 8.16552C11.4389 9.34827 9.814 10.5 7.49998 10.5V11.5C10.186 11.5 12.0611 10.1517 13.2466 8.83448C13.8391 8.17625 14.2656 7.51971 14.5444 7.02776C14.6841 6.78129 14.7874 6.57474 14.8566 6.42805C14.8912 6.35467 14.9172 6.29615 14.9351 6.25496C14.944 6.23436 14.9509 6.21808 14.9557 6.20644C14.9582 6.20062 14.9601 6.19595 14.9615 6.19248C14.9622 6.19075 14.9628 6.18931 14.9632 6.18818C14.9635 6.18761 14.9637 6.18712 14.9638 6.18671C14.9639 6.1865 14.964 6.18625 14.9641 6.18615C14.9642 6.18591 14.9642 6.1857 14.5 6ZM7.5 7.5C6.67157 7.5 6 6.82843 6 6H5C5 7.38071 6.11929 8.5 7.5 8.5V7.5ZM9 6C9 6.82843 8.32843 7.5 7.5 7.5V8.5C8.88071 8.5 10 7.38071 10 6H9ZM7.5 4.5C8.32843 4.5 9 5.17157 9 6H10C10 4.61929 8.88071 3.5 7.5 3.5V4.5ZM7.5 3.5C6.11929 3.5 5 4.61929 5 6H6C6 5.17157 6.67157 4.5 7.5 4.5V3.5Z" fill="#454545"/>
                </svg>
` : `<svg width="15" height="9" viewBox="0 0 15 9" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M2.49586 3.16537C3.56033 4.34812 5.18519 5.49985 7.4992 5.49985C9.81321 5.49985 11.4381 4.34812 12.5026 3.16536C13.0352 2.5736 13.4211 1.98014 13.6736 1.53459C13.7995 1.31231 13.8915 1.12823 13.9513 1.00148C13.9811 0.938146 14.0029 0.889248 14.0168 0.857195C14.0237 0.841172 14.0287 0.829371 14.0317 0.822094L14.0348 0.814612L14.0351 0.813817C14.0351 0.813975 14.035 0.814151 14.4992 0.999848C14.9635 1.18554 14.9634 1.18576 14.9633 1.18599L14.963 1.18656L14.9625 1.18803L14.9607 1.19233L14.955 1.20629C14.9501 1.21793 14.9432 1.23421 14.9343 1.25481C14.9165 1.29599 14.8904 1.35452 14.8558 1.4279C14.7866 1.57459 14.6833 1.78113 14.5436 2.02761C14.2648 2.51956 13.8383 3.1761 13.2459 3.83433C13.063 4.03753 12.8637 4.24146 12.6475 4.44107L14.3528 6.14629L13.6457 6.8534L11.8708 5.07856C10.863 5.80882 9.58174 6.38293 7.99921 6.48401L7.99922 8.49985L6.99922 8.49985L6.99921 6.48401C5.41667 6.38293 4.13542 5.80882 3.1276 5.07857L1.35277 6.8534L0.645665 6.14629L2.35088 4.44108C2.13473 4.24147 1.93544 4.03753 1.75256 3.83433C1.16015 3.17609 0.733599 2.51955 0.454829 2.0276C0.315162 1.78113 0.21181 1.57459 0.142657 1.4279C0.108062 1.35452 0.0819697 1.29599 0.0641213 1.2548C0.0551954 1.2342 0.0483259 1.21793 0.0434809 1.20629L0.0377257 1.19233L0.035978 1.18803L0.0353852 1.18655L0.0351589 1.18599C0.0350652 1.18576 0.0349793 1.18554 0.499218 0.999848C0.963457 0.814154 0.963386 0.813977 0.963323 0.813819L0.963234 0.813598L0.963648 0.814614L0.966735 0.822096C0.969764 0.829374 0.974735 0.841175 0.981678 0.857198C0.995568 0.889251 1.01733 0.938148 1.04718 1.00148C1.10694 1.12823 1.1989 1.31231 1.32485 1.53459C1.57733 1.98014 1.96327 2.5736 2.49586 3.16537ZM0.963192 0.813492C0.963176 0.813453 0.96319 0.813488 0.963234 0.813598L0.963192 0.813492Z" fill="#5D5D5D"/>
        </svg>
          `}
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
       <Text style={tw`ml-2  font-NunitoSansBold text-color-454545`}>Keep me logged in</Text>
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
        <IwtButton tw={tw} containerStyle={tw`w-full bg-[#FFFFFF]`} title='Continue with  Google' titleStyle={tw`text-color-454545 font-NunitoSansBold`}  svg={`<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
         <TouchableOpacity>
         <Text style={tw`text-primary font-NunitoSansBold`}>Forgot password?</Text>
         </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row items-center`}>
          <Text style={tw`text-color-454545 font-NunitoSansLight`}>Don’t have an account?</Text>
          <Text onPress={() => navigation?.navigate('SignUp')} style={tw`text-primary font-NunitoSansLight`}> Sign Up</Text>
        </TouchableOpacity>
        </View>
      </ScrollView>
      <StatusBar barStyle="dark-content" backgroundColor={'#f6f6f6'} />
    </View>
  );
};

export default SignUpScreen;
