import {ScrollView, Text, View} from 'react-native';

import React from 'react';
import BackButton from '../../components/backHeader/BackButton';
import ExpendComponent from '../../components/expend/ExpendComponent';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const FAQ = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton onPress={() => navigation?.goBack()} />

      <View style={tw`px-[4%] gap-1  pb-6`}>
        <Text
          style={tw`text-color-Black1000 font-NunitoSansExtraBold text-2xl`}>
          Frequently Asked Questions
        </Text>
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}>
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
        <ExpendComponent />
      </ScrollView>
    </View>
  );
};

export default FAQ;
