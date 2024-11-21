import {FlatList, View} from 'react-native';

import {IconSearch} from '../../../icons/icons';
import InputText from '../../../components/inputs/InputText';
import MessageCard from '../../../components/cards/MessageCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import React from 'react';
import tw from '../../../lib/tailwind';
import {useGetUserChatsQuery} from '../../../redux/apiSlices/message';

const Chats = ({navigation}: NavigProps<null>) => {
  const {data: MessagesData} = useGetUserChatsQuery({});

  const [searchText, setSearchText] = React.useState('');

  // console.log(MessagesData?.data);
  return (
    <>
      <View style={tw`px-[4%] mb-3 h-14`}>
        <InputText
          placeholder="Search for group"
          svgSecondIcon={IconSearch}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always"
        automaticallyAdjustKeyboardInsets
        style={tw`flex-1 `}
        contentContainerStyle={tw`pt-2 pb-4`}
        data={MessagesData?.data?.filter(item =>
          item.full_name.toLowerCase().includes(searchText.toLowerCase()),
        )}
        renderItem={({item}) => (
          <>
            <MessageCard
              onPress={() =>
                navigation?.navigate('SingleMessage', {id: item.id, item})
              }
              item={item}
            />
          </>
        )}
      />
    </>
  );
};

export default Chats;
