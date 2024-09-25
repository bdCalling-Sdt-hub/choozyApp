import {ScrollView, Text, View} from 'react-native';

import React from 'react';
import BackButton from '../../components/backHeader/BackButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const Support = ({navigation}: NavigProps<null>) => {
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
              fieldStyle={tw`h-40 py-3`}
              placeholderTextColor={'#A5A3A9'}
            />
          </View>
        </View>
        <View style={tw`px-[4%] mt-6`}>
          <TButton
            title="Submit"
            containerStyle={tw`bg-primary w-full `}
            onPress={() => {}}
            isLoading={false}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default Support;
