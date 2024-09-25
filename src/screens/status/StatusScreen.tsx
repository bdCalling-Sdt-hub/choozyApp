import {FlatList, View} from 'react-native';

import React from 'react';
import postData from '../../assets/database/post.json';
import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import PostCard from '../../components/cards/PostCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const StatusScreen = ({navigation}: NavigProps<null>) => {
  const [isComment, setIsComment] = React.useState(false);
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
        contentContainerStyle={tw`gap-2 mt-3 pb-6`}
        data={postData.posts}
        renderItem={({item}) => {
          return (
            <>
              {/*================= Post Card ============ */}
              <PostCard
                onPress={() => {
                  navigation?.navigate('OtherWall');
                }}
                item={item}
              />
            </>
          );
        }}
      />
    </View>
  );
};

export default StatusScreen;
