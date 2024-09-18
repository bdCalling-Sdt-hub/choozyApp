import { FlatList, View } from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import { IconSearch } from '../../icons/icons';
import InputText from '../../components/inputs/InputText';
import MessageCard from '../../components/cards/MessageCard';
import { NavigProps } from '../../interfaces/NaviProps';
import React from 'react';
import groupMessageData from '../../assets/database/groups.json';
import tw from '../../lib/tailwind';

const AllGroupsScreen = ({navigation} : NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-white`}>
       <BackWithTitle title='All Groups' onPress={() => navigation?.goBack()}/>
       <View style={tw`px-[4%] mb-3` }>
            <InputText
              placeholder="Search for group"
              svgSecondIcon={IconSearch}
            />
            </View>
        <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={tw`pb-6`} data={groupMessageData.slice(10,30)} renderItem={({item,index}) => <>
        <MessageCard offPartThree key={item.id} titleContainerStyle={tw`gap-1`} joinBtn subTitleStyle={tw`text-color-Black500`} titleStyle={tw`text-[#1D1929]`}  item={{
               image : item.image,
               lastMessage : item.following,
               name : item.groupName,
               time : item.time,
               unreadCount : item.unread
              }}/>
        </>} />
        <View>
       
        </View>
    </View>
  )
}

export default AllGroupsScreen