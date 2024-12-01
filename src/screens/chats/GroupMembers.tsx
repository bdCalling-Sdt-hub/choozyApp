import {FlatList, RefreshControl, View} from 'react-native';
import {IconMessageBlue, IconSearch, IconUserPlus} from '../../icons/icons';

import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import InputText from '../../components/inputs/InputText';
import MessageCard from '../../components/cards/MessageCard';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import SimpleButton from '../../components/buttons/SimpleButton';
import tw from '../../lib/tailwind';
import {useGetGroupMembersQuery} from '../../redux/apiSlices/gourpSlices';

const GroupMembers = ({navigation, route}: NavigProps<{id: number}>) => {
  const [searchText, setSearchText] = React.useState('');
  const {
    data: groupMember,
    refetch,
    isLoading,
  } = useGetGroupMembersQuery(route?.params?.id as any, {
    skip: !route?.params?.id,
  });

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title={'Members' + ` (${groupMember?.member_count})`}
        onPress={() => navigation?.goBack()}
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <SimpleButton
            onPress={() =>
              navigation?.navigate('AddGroupMembers', {
                id: route?.params?.id,
              })
            }
            title="Add "
            containerStyle={tw`px-3 py-1 rounded-md`}
            titleStyle={tw`text-gray-500 text-sm`}
            svgIcon={IconUserPlus}
            svgHeight={13}
            svgWidth={13}
          />
        }
      />
      <View style={tw`px-[4%] mb-3 h-14`}>
        <InputText
          placeholder="Search group members"
          svgSecondIcon={IconSearch}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        data={groupMember?.data?.filter((item: any) =>
          item?.full_name?.toLowerCase().includes(searchText?.toLowerCase()),
        )}
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={[PrimaryColor]}
          />
        }
        renderItem={({item, index}) => (
          <>
            <MessageCard
              //   onPress={() => navigation?.navigate('Message')}
              offPartThree
              key={item.id}
              titleContainerStyle={tw`gap-1`}
              subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-[#1D1929] text-sm`}
              item={{
                image: item.image,
                full_name: item.full_name,
                // time: item.full_name,
                last_message: item?.email,
                // unreadCount: item.unread,
              }}
              Component={
                <SimpleButton
                  onPress={() =>
                    navigation?.navigate('SingleMessage', {
                      id: item.user_id,
                      item: item,
                    })
                  }
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
