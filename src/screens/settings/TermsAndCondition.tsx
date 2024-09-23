import {ScrollView, Text, View} from 'react-native';

import React from 'react';
import BackButton from '../../components/backHeader/BackButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const TermsAndCondition = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton onPress={() => navigation?.goBack()} />

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={tw`px-[4%] gap-1 border-b border-b-color-Black100 pb-6`}>
          <Text style={tw`text-[#9F9F9F] font-NunitoSansRegular text-base`}>
            AGREEMENT
          </Text>
          <Text
            style={tw`text-color-Black1000 font-NunitoSansExtraBold text-2xl`}>
            Terms of Service
          </Text>
          <Text style={tw`text-[#7C7C7C] font-NunitoSansRegular text-sm`}>
            Last updated on 5/12/2024
          </Text>
        </View>

        <View style={tw`px-[4%] gap-2 my-6`}>
          <Text style={tw`text-color-Black900 font-NunitoSansBold text-xl`}>
            Clause 1
          </Text>
          <Text
            style={tw`text-color-Black600 font-NunitoSansRegular text-base`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>
        <View style={tw`px-[4%] gap-2 my-6`}>
          <Text style={tw`text-color-Black900 font-NunitoSansBold text-xl`}>
            Clause 1
          </Text>
          <Text
            style={tw`text-color-Black600 font-NunitoSansRegular text-base`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>
        <View style={tw`px-[4%] gap-2 my-6`}>
          <Text style={tw`text-color-Black900 font-NunitoSansBold text-xl`}>
            Clause 1
          </Text>
          <Text
            style={tw`text-color-Black600 font-NunitoSansRegular text-base`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>
        <View style={tw`px-[4%] gap-2 my-6`}>
          <Text style={tw`text-color-Black900 font-NunitoSansBold text-xl`}>
            Clause 1
          </Text>
          <Text
            style={tw`text-color-Black600 font-NunitoSansRegular text-base`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>
        <View style={tw`px-[4%] gap-2 my-6`}>
          <Text style={tw`text-color-Black900 font-NunitoSansBold text-xl`}>
            Clause 1
          </Text>
          <Text
            style={tw`text-color-Black600 font-NunitoSansRegular text-base`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>
        <View style={tw`px-[4%] gap-2 my-6`}>
          <Text style={tw`text-color-Black900 font-NunitoSansBold text-xl`}>
            Clause 1
          </Text>
          <Text
            style={tw`text-color-Black600 font-NunitoSansRegular text-base`}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra
            condimentum eget purus in. Consectetur eget id morbi amet amet, in.
            Ipsum viverra pretium tellus neque. Ullamcorper suspendisse aenean
            leo pharetra in sit semper et. Amet quam placerat sem.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TermsAndCondition;
