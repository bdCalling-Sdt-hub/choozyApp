import {FlatList, View} from 'react-native';

import React from 'react';
import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import PostCard from '../../components/cards/PostCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetAllNewFeetQuery} from '../../redux/apiSlices/newsFeetSlices';

const StatusScreen = ({navigation}: NavigProps<null>) => {
  const {data: statusData} = useGetAllNewFeetQuery({});
  const [isComment, setIsComment] = React.useState(false);
  // console.log(statusData);
  return (
    <View style={tw`flex-1 bg-base`}>
      <View style={tw`bg-white shadow-md`}>
        <LogoWithHeader
          offMenu
          searchOffItem={{
            offPeople: true,
            offPost: true,
            offProduct: true,
          }}
          onFinish={() => {
            navigation?.navigate('Search');
          }}
          navigation={navigation}
        />
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        contentContainerStyle={tw`gap-2 mt-3 pb-6 tablet:mx-[30%]`}
        data={statusData?.data?.newsfeeds}
        renderItem={({item}) => {
          return (
            <PostCard
              onPress={() => {
                navigation?.navigate('OtherWall', {item: item});
              }}
              item={item}
            />
          );
        }}
      />
    </View>
  );
};

export default StatusScreen;
