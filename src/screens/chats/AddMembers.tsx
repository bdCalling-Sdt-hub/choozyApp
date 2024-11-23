import {FlatList, RefreshControl, View} from 'react-native';
import {IconFillUserPlus, IconSearch} from '../../icons/icons';
import React, {useEffect} from 'react';
import {
  useAddMemberMutation,
  useGetGroupMembersQuery,
} from '../../redux/apiSlices/gourpSlices';

import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import InputText from '../../components/inputs/InputText';
import MessageCard from '../../components/cards/MessageCard';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import SimpleButton from '../../components/buttons/SimpleButton';
import tw from '../../lib/tailwind';
import {useUserFriendQuery} from '../../redux/apiSlices/contactSlices';

const AddGroupMembers = ({navigation, route}: NavigProps<{id: number}>) => {
  const [newGroupMembers, setNewGroupMembers] = React.useState([]);
  const [exitContact, setExitContact] = React.useState([]);

  const [searchText, setSearchText] = React.useState('');
  const {
    data: groupMember,
    refetch,
    isLoading,
  } = useGetGroupMembersQuery(route?.params?.id as any, {
    skip: !route?.params?.id,
  });
  const {data: contacts} = useUserFriendQuery({});

  useEffect(() => {
    if (groupMember?.data && contacts?.friends?.data) {
      const filteredContacts = contacts.friends.data.filter((contact: any) => {
        return !groupMember.data.some(
          (member: any) => member.id === contact.user_id,
        );
      });

      setExitContact(filteredContacts);
    }
  }, [groupMember, contacts]);

  const [addMembers] = useAddMemberMutation();
  const handleAddMembers = async (id: number) => {
    const res = await addMembers({
      group_id: route?.params?.id,
      user_ids: [id],
      _method: 'PUT',
    });
    if (res?.data?.success) {
      refetch();
    }
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title={'Add Members'}
        onPress={() => navigation?.goBack()}
        containerStyle={tw`justify-between`}
      />
      <View style={tw`px-[4%] mb-3 h-14`}>
        <InputText
          placeholder="Search contacts"
          svgSecondIcon={IconSearch}
          value={searchText}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        data={exitContact?.filter((item: any) =>
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
              key={item.user_id}
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
                  onPress={() => {
                    handleAddMembers(item.user_id);
                  }}
                  containerStyle={tw`gap-2 flex-row-reverse rounded-xl h-8`}
                  svgIcon={IconFillUserPlus}
                  title="Add"
                />
              }
            />
          </>
        )}
      />
    </View>
  );
};

export default AddGroupMembers;
