import {FlatList, RefreshControl, View} from 'react-native';
import {PrimaryColor, height} from '../../../utils/utils';

import {IconSearch} from '../../../icons/icons';
import InputText from '../../../components/inputs/InputText';
import MessageCard from '../../../components/cards/MessageCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import NoFoundCard from '../../../components/cards/NoFoundCard';
import React from 'react';
import {getSocket} from '../../../redux/services/socket';
import tw from '../../../lib/tailwind';
import {useGetUserChatsQuery} from '../../../redux/apiSlices/message';

const Chats = ({navigation}: NavigProps<null>) => {
  const {data: MessagesData, isLoading, refetch} = useGetUserChatsQuery({});

  const [searchText, setSearchText] = React.useState('');

  // console.log(MessagesData?.data);

  const socket = getSocket();

  const handleMessage = () => {
    refetch();
  };

  React.useEffect(() => {
    if (socket) {
      socket?.on('message', handleMessage);
    }
    return () => {
      if (socket) {
        socket?.off('message');
      }
    };
  }, [socket]);

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
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[PrimaryColor]}
          />
        }
        ListEmptyComponent={
          <NoFoundCard hight={height * 0.13} title="No Chats" />
        }
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
