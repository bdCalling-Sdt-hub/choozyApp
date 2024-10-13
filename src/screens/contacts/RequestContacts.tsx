import {FlatList, View} from 'react-native';

import React from 'react';
import BackButton from '../../components/backHeader/BackButton';
import TButton from '../../components/buttons/TButton';
import MessageCard from '../../components/cards/MessageCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {imageUrl} from '../../redux/api/baseApi';
import {useUserFriendRequestsQuery} from '../../redux/apiSlices/contactSlices';

const RequestContacts = ({navigation}: NavigProps<null>) => {
  const {data: allContactRequest} = useUserFriendRequestsQuery({});
  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================== header part ================= */}
      <BackButton onPress={() => navigation?.goBack()} />

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6 bg-white gap-2 px-[2%]`}
        data={allContactRequest?.friend_requests?.data}
        renderItem={({item, index}) => (
          <>
            <MessageCard
              // disabled
              // ImagePressable
              onPress={() => navigation?.navigate('OtherWall')}
              offPartThree
              titleContainerStyle={tw`gap-1`}
              joinBtn
              subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-[#1D1929] text-sm`}
              item={{
                image: imageUrl + 'Profile' + '//' + item.image,
                name: item.full_name,
                // lastMessage: item.followers,
              }}
              Component={
                <View style={tw`flex-row gap-3 items-center `}>
                  <TButton
                    title="Accept"
                    containerStyle={tw`w-20 h-10 p-0 justify-center items-center bg-white `}
                    titleStyle={tw`text-primary`}
                  />
                  <TButton
                    title="Cancel"
                    containerStyle={tw`w-20 h-10 p-0 justify-center items-center bg-primary `}
                  />
                </View>
              }
            />
          </>
        )}
      />
    </View>
  );
};

export default RequestContacts;
