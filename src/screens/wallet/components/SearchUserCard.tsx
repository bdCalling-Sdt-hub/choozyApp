import {FlatList, Text, View} from 'react-native';

import {IconSearch} from '../../../icons/icons';
import InputText from '../../../components/inputs/InputText';
import React from 'react';
import UserSelectionCard from '../../../components/cards/UserSelectionCard';
import tw from '../../../lib/tailwind';
import {useUserFriendQuery} from '../../../redux/apiSlices/contactSlices';

const SearchUserCard = ({
  selectionUser,
  setSelectionUser,
}: {
  selectionUser: any;
  setSelectionUser: any;
}) => {
  const {
    data: contacts,
    isLoading: contactsLoading,
    refetch: contactsRefetch,
  } = useUserFriendQuery({});
  const [searchText, setSearchText] = React.useState('');
  return (
    <>
      <View style={tw`gap-1 mb-3`}>
        <Text style={tw`text-2xl text-color-Black900 font-NunitoSansBold`}>
          Select from contacts
        </Text>
        <Text
          style={tw`text-base text-color-Black400 font-NunitoSansRegular text-xs`}>
          You can select multiple members
        </Text>
      </View>

      <View style={tw`flex-row items-center gap-3 my-3`}>
        <InputText
          placeholder="Search members"
          svgSecondIcon={IconSearch}
          onChangeText={text => setSearchText(text)}
        />
      </View>
      <FlatList
        contentContainerStyle={tw`py-4`}
        showsVerticalScrollIndicator={false}
        data={contacts?.friends?.data?.filter(
          item =>
            item.full_name.toLowerCase().includes(searchText.toLowerCase()) ||
            item.user_name.toLowerCase().includes(searchText.toLowerCase()),
        )}
        renderItem={({item}) => (
          <>
            <UserSelectionCard
              item={item}
              setSelectionSate={setSelectionUser}
              selectionSate={selectionUser}
            />
          </>
        )}
      />
    </>
  );
};

export default SearchUserCard;
