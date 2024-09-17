import { FlatList, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { IconBellWithDot, IconSearch, IconVThreeDots } from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import MessagesData from '../../assets/images/tamp/messages.json';
import IButton from '../../components/buttons/IButton';
import MessageCard from '../../components/cards/MessageCard';
import tw from '../../lib/tailwind';

// lazy load messageCard 

// const MessageCardLazy = React.lazy(() => import('../../components/cards/MessageCard'));

const ChatsScreen = () => {
  
  // console.log(JSON.stringify(MessagesData, null, 2));
  const [options, setOptions] = React.useState<'contacts' | 'groups'>(
    'contacts',
  );
  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================= header here =================== */}
      <View style={tw`px-[4%] flex-row justify-between items-center`}>
        {/*============== image or logo==================  */}
        <View style={tw`py-4 flex-row items-center gap-2`}>
          <FastImage
            style={tw`h-10 aspect-square`}
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../assets/images/logo/logo.png')}
          />
          <Text style={tw`text-2xl font-NunitoSansExtraBold text-primary`}>
            Choozy
          </Text>
        </View>
        <View style={tw`flex-row gap-3`}>
          <IButton
            svg={IconSearch}
            tw={tw}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
          <IButton
            svg={IconBellWithDot}
            tw={tw}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
          <IButton
            svg={IconVThreeDots}
            tw={tw}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
        </View>
      </View>

      {/*================= options here =================== */}
      <View style={tw`flex-row items-center gap-1 px-[4%] py-2`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOptions('contacts')}
          style={tw`h-11 px-3 ${
            options == 'contacts'
              ? 'border-b-[3px] border-b-primary'
              : 'border-b-[3px] border-b-white'
          }  justify-center items-center`}>
          <Text
            style={tw` ${
              options == 'contacts' ? 'text-primary' : 'text-[#34303E]'
            } font-NunitoSansBold text-[16px]`}>
            Contacts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOptions('groups')}
          style={tw`h-11 px-3 ${
            options == 'groups'
              ? 'border-b-[3px] border-b-primary'
              : 'border-b-[3px] border-b-white'
          }  justify-center items-center`}>
          <Text
            style={tw` ${
              options == 'groups' ? 'text-primary' : 'text-[#34303E]'
            } font-NunitoSansBold text-[16px]`}>
            Groups
          </Text>
        </TouchableOpacity>
      </View>

      {/*================= messages list/card here =================== */}
      {
        options == 'contacts' ? <>
         <FlatList
        showsVerticalScrollIndicator={false}
        style={tw`flex-1 `}
        contentContainerStyle={tw`pt-2 pb-4`}
        data={MessagesData.slice(5, 25)}
        renderItem={({item}) => (
          <>
          <MessageCard item={item} />
          </>
        )}
      />
        </> : <>
        
        </>
      }
     

      <StatusBar barStyle="dark-content" backgroundColor="white" />
    </View>
  );
};

export default ChatsScreen;
