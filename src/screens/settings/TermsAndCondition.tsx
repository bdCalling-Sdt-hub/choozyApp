import {ActivityIndicator, ScrollView, View} from 'react-native';
import {PrimaryColor, width} from '../../utils/utils';

import React from 'react';
import RenderHTML from 'react-native-render-html';
import BackButton from '../../components/backHeader/BackButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetTermsAndConditionQuery} from '../../redux/apiSlices/additionalSlices';

const TermsAndCondition = ({navigation}: NavigProps<any>) => {
  const {data, isFetching, isLoading} = useGetTermsAndConditionQuery({});
  const html = `${data?.data?.content}`;

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton onPress={() => navigation?.goBack()} />

      {isFetching || isLoading ? (
        <View style={tw`flex-1 justify-center items-center`}>
          <ActivityIndicator size="large" color={PrimaryColor} />
        </View>
      ) : (
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`px-6`}>
          {data?.data?.content && (
            <RenderHTML
              contentWidth={width}
              source={{html}}
              baseStyle={{fontFamily: 'NunitoSans'}}
            />
          )}
        </ScrollView>
      )}
    </View>
  );
};

export default TermsAndCondition;
