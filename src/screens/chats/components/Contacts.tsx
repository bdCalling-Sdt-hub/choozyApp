import React from 'react';
import { FlatList } from 'react-native';
import MessagesData from '../../../assets/database/messages.json';
import MessageCard from '../../../components/cards/MessageCard';
import { NavigProps } from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

const Contacts = ({navigation} : NavigProps<null>) => {
  return (

       <FlatList
            showsVerticalScrollIndicator={false}
            style={tw`flex-1 `}
            contentContainerStyle={tw`pt-2 pb-4`}
            data={MessagesData.slice(5, 25)}
            renderItem={({item}) => (
              <>
                <MessageCard onPress={() => navigation?.navigate("SingleMessage")} item={item} />
              </>
            )}
          />
  
  )
}

export default Contacts