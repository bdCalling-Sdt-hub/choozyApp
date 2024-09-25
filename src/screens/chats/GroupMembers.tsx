import {FlatList, View} from 'react-native';

import React from 'react';
import groupMessageData from '../../assets/database/groups.json';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import SimpleButton from '../../components/buttons/SimpleButton';
import MessageCard from '../../components/cards/MessageCard';
import {IconMessageBlue} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const GroupMembers = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithTitle
        title="Group Members (135)"
        onPress={() => navigation?.goBack()}
      />
      {/* <View style={tw`px-[4%] mb-3 h-14` }>
            <InputText
              placeholder="Search for group"
              svgSecondIcon={IconSearch}
            />
            </View> */}
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        data={groupMessageData.slice(9, 30)}
        renderItem={({item, index}) => (
          <>
            <MessageCard
              //   onPress={() => navigation?.navigate('Message')}
              offPartThree
              key={item.id}
              titleContainerStyle={tw`gap-1`}
              joinBtn
              subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-[#1D1929] text-sm`}
              item={{
                image: item.image,
                name: item.groupName,
                time: item.time,
                unreadCount: item.unread,
              }}
              Component={
                <SimpleButton
                  onPress={() => navigation?.navigate('SingleMessage')}
                  containerStyle={tw`gap-2 flex-row-reverse rounded-xl h-8`}
                  svgIcon={IconMessageBlue}
                  title="Message"
                />
              }
            />
          </>
        )}
      />
    </View>
  );
};

export default GroupMembers;
