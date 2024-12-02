import {FlatList, View} from 'react-native';

import React from 'react';
import groupMessageData from '../../assets/database/groups.json';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import MessageCard from '../../components/cards/MessageCard';
import InputText from '../../components/inputs/InputText';
import {IconSearch} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const AllGroupsScreen = ({navigation, route}: NavigProps<{id: string}>) => {
  // console.log(route?.params?.id);
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithTitle title="All Groups" onPress={() => navigation?.goBack()} />
      <View style={tw`px-[4%] mb-3 h-14`}>
        <InputText placeholder="Search for group" svgSecondIcon={IconSearch} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        data={groupMessageData.slice(9, 30)}
        renderItem={({item, index}) => (
          <>
            <MessageCard
              onPress={() => navigation?.navigate('Message')}
              offPartThree
              key={item.id}
              titleContainerStyle={tw`gap-1`}
              joinBtn
              subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-[#1D1929]`}
              item={{
                image: item.image,
                last_message: item.following,
                full_name: item.groupName,
                last_message_time: item.time,
                unread_count: item.unread,
              }}
            />
          </>
        )}
      />
      <View></View>
    </View>
  );
};

export default AllGroupsScreen;
