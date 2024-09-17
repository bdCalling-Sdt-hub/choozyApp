import { ScrollView, Text, View } from 'react-native'

import React from 'react'
import { SvgXml } from 'react-native-svg'
import { TextField } from 'react-native-ui-lib'
import BackWithHeader from '../../components/backHeader/BackWithHeader'
import TButton from '../../components/buttons/TButton'
import { IconFillEmail } from '../../icons/icons.config'
import { NavigProps } from '../../interfaces/NaviProps'
import tw from '../../lib/tailwind'

const ForgetPassword = ({navigation} : NavigProps<null>) => {
  return (
    <View style={tw`bg-base flex-1`}>
        <BackWithHeader navigation={navigation} tw={tw} title='Forget Password' />
        <ScrollView contentContainerStyle={tw`px-[4%] gap-3 `} keyboardShouldPersistTaps="always">
        <View>
        <Text style={tw`text-[14px] text-color-Black800 font-NunitoSansBold`}>
          Don’t worry we are here to help you
          </Text>
        <View style={tw`gap-2 py-8`}>
            <Text style={tw`text-[14px] text-color-Black950 font-NunitoSansBold`}>
            Submit your mail
            </Text>
            <View
            style={tw`w-full rounded-2xl h-14  px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
       
            <SvgXml
           
              xml={IconFillEmail}
            />
           
  
            <TextField
            //    value={values.email}
            //    onChangeText={handleChange('email')}
               containerStyle={tw`flex-1`}
               fieldStyle={tw`pb-4 `}
               floatingPlaceholder
               placeholder="Email"
               />
          </View>
        </View>
        </View>
        
        </ScrollView>
      <View style={tw`px-[4%]`}>
      <TButton onPress={() => navigation?.navigate('Verify')} isLoading={false} tw={tw} title="Submit" containerStyle={tw`my-10 w-full bg-primary`} />
      </View>
    </View>
  )
}

export default ForgetPassword

