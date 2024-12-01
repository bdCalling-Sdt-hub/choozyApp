import {FlatList, RefreshControl, View} from 'react-native';
import {
  useAcceptRequestMutation,
  useCancelRequestMutation,
  useUserFriendRequestsQuery,
} from '../../redux/apiSlices/contactSlices';

import BackButton from '../../components/backHeader/BackButton';
import MessageCard from '../../components/cards/MessageCard';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';

const RequestContacts = ({navigation}: NavigProps<null>) => {
  const {
    data: allContactRequest,
    isLoading,
    refetch,
  } = useUserFriendRequestsQuery({});
  const [accept, acceptResults] = useAcceptRequestMutation({});
  const [reject, rejectResults] = useCancelRequestMutation({});

  const acceptRequest = async (id: number) => {
    const res = await accept(id);
    console.log(res);
  };

  const rejectRequest = async (id: number) => {
    console.log(id);
    const res = await reject(id);
    console.log(res);
  };
  // console.log(allContactRequest?.friend_requests?.data);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================== header part ================= */}
      <BackButton onPress={() => navigation?.goBack()} />

      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={() => refetch()}
            refreshing={isLoading}
            colors={[PrimaryColor]}
          />
        }
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
                image: item.image,
                full_name: item.full_name,
                last_message: '@' + item.user_name,
              }}
              Component={
                <View style={tw`flex-row gap-3 items-center `}>
                  <TButton
                    isLoading={acceptResults.isLoading}
                    title="Accept"
                    containerStyle={tw`w-20 h-10 p-0 justify-center items-center bg-white `}
                    titleStyle={tw`text-primary`}
                    onPress={() => acceptRequest(item?.user_id)}
                  />
                  <TButton
                    isLoading={rejectResults.isLoading}
                    onPress={() => rejectRequest(item.user_id)}
                    loadingColor="white"
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
