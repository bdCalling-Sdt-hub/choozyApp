import {ScrollView, Text, View} from 'react-native';

import React from 'react';
import BackButton from '../../components/backHeader/BackButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useCreateSupportMutation} from '../../redux/apiSlices/additionalSlices';

const Support = ({navigation}: NavigProps<any>) => {
  const [supportText, setSupportText] = React.useState('');
  const [createSupport] = useCreateSupportMutation();

  const {showToast, closeToast} = useToast();

  const handleCreateSupport = async () => {
    // console.log(supportText);
    const res = await createSupport({message: supportText});
    // console.log(res.error?.data);
    if (res.error?.data) {
      showToast({
        title: 'Warning',
        titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
        content: res.error?.data?.message,
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
        buttonStyle: tw`bg-primary`,
        buttonText: 'OK',
        onPress: () => {
          navigation?.goBack();
          closeToast();
        },
      });
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton onPress={() => navigation?.goBack()} />
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}>
        <View
          style={tw`px-[4%] gap-1 border-b border-b-color-Black100 pt-2 pb-8`}>
          <Text
            style={tw`text-color-Black1000 font-NunitoSansExtraBold text-2xl`}>
            We’re here to support you
          </Text>
        </View>
        <View style={tw`px-[4%] mt-6  `}>
          <View style={tw`gap-3 mb-2`}>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
              How can we help you today?
            </Text>
            <Text
              style={tw`text-color-Black600 font-NunitoSansRegular text-sm`}>
              Describe here
            </Text>
          </View>
          <View style={tw`h-40 my-4`}>
            <InputText
              placeholder="Start writing"
              multiline
              textAlignVertical="top"
              value={supportText}
              onChangeText={text => setSupportText(text)}
              fieldStyle={tw`h-40 py-3`}
              placeholderTextColor={'#A5A3A9'}
            />
          </View>
        </View>
        <View style={tw`px-[4%] mt-6`}>
          <TButton
            title="Submit"
            containerStyle={tw`bg-primary w-full `}
            onPress={handleCreateSupport}
            isLoading={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Support;
