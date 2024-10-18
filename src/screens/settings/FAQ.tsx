import {FlatList, Text, View} from 'react-native';

import React from 'react';
import BackButton from '../../components/backHeader/BackButton';
import ExpendComponent from '../../components/expend/ExpendComponent';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetFaqsQuery} from '../../redux/apiSlices/additionalSlices';

const FAQ = ({navigation}: NavigProps<any>) => {
  const {data: faqData} = useGetFaqsQuery({});

  // console.log(faqData);

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton onPress={() => navigation?.goBack()} />

      <View style={tw`px-[4%] gap-1  pb-3`}>
        <Text
          style={tw`text-color-Black1000 font-NunitoSansExtraBold text-2xl`}>
          Frequently Asked Questions
        </Text>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        data={faqData?.data}
        renderItem={({item}) => <ExpendComponent item={item} />}
      />
    </View>
  );
};

export default FAQ;
