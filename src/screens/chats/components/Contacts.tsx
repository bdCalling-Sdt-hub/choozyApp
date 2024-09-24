import {FlatList, View} from 'react-native';

import React from 'react';
import MessagesData from '../../../assets/database/messages.json';
import MessageCard from '../../../components/cards/MessageCard';
import InputText from '../../../components/inputs/InputText';
import {IconSearch} from '../../../icons/icons';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

const Contacts = ({navigation}: NavigProps<null>) => {
  return (
    <>
      <FlatList
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 `}
        contentContainerStyle={tw`pt-2 pb-4`}
        data={MessagesData.slice(5, 25)}
        ListHeaderComponent={() => {
          return (
            <View style={tw`px-[4%] mb-3 h-14`}>
              <InputText
                placeholder="Search for group"
                svgSecondIcon={IconSearch}
              />
            </View>
          );
        }}
        renderItem={({item}) => (
          <>
            <MessageCard
              onPress={() => navigation?.navigate('SingleMessage')}
              item={item}
            />
          </>
        )}
      />
    </>
  );
};

export default Contacts;
