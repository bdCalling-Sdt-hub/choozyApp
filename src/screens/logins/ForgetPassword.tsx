import { ScrollView, Text, View } from 'react-native'

import React from 'react'
import BackWithHeader from '../../components/backHeader/BackWithHeader'
import TButton from '../../components/buttons/TButton'
import InputText from '../../components/inputs/InputText'
import { IconFillEmail } from '../../icons/icons'
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
            <InputText
           
                  placeholder="Email"
                  floatingPlaceholder
                  svgFirstIcon={IconFillEmail}
                />
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

