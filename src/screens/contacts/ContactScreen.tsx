import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  useUserFriendQuery,
  useUserFriendRequestsQuery,
} from '../../redux/apiSlices/contactSlices';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import MessageCard from '../../components/cards/MessageCard';
import NoFoundCard from '../../components/cards/NoFoundCard';
import {IconMessageWhite} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';

const ContactScreen = ({navigation}: NavigProps<any>) => {
  const {
    data: contacts,
    isLoading: contactsLoading,
    refetch: contactsRefetch,
  } = useUserFriendQuery({});
  const {
    data: allContactRequest,
    isLoading: allContactRequestLoading,
    refetch: allContactRequestRefetch,
  } = useUserFriendRequestsQuery({});

  // console.log(allContactRequest?.friend_requests?.data);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================== header part ================= */}
      <View style={tw``}>
        <LogoWithHeader
          offMenu
          searchOffItem={{
            offPeople: true,
            offPost: true,
            offProduct: true,
          }}
          onFinish={text => {
            navigation?.navigate('Search', {
              text,
            });
          }}
          navigation={navigation}
        />
      </View>
      <View style={tw` px-[4%] py-2`}>
        <View style={tw` gap-3  flex-row justify-center items-center`}></View>
        {allContactRequest && allContactRequest?.total_requests > 0 && (
          <TouchableOpacity
            onPress={() => {
              navigation?.navigate('RequestContacts');
            }}
            style={tw`gap-1 flex-row items-center self-end mt-1`}>
            <Text
              style={tw`text-color-Black600 font-NunitoSansMedium  text-xs py-2 `}>
              Requested
            </Text>
            <View style={tw`bg-primary px-1.2 py-0.3 rounded-full`}>
              <Text style={tw`text-white font-NunitoSansBold text-[10px]`}>
                {allContactRequest?.total_requests}
              </Text>
            </View>
            <SvgXml
              height={10}
              xml={`<svg width="9" height="15" viewBox="0 0 9 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M1 14L8 7.5L1 1" stroke="#1D1929" stroke-linecap="square"/>
  </svg>
  `}
            />
          </TouchableOpacity>
        )}
      </View>
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={contactsLoading || allContactRequestLoading}
            onRefresh={() => {
              contactsRefetch();
              allContactRequestRefetch();
            }}
            colors={[PrimaryColor]}
          />
        }
        refreshing={contactsLoading || allContactRequestLoading}
        onRefresh={() => {
          contactsRefetch();
          allContactRequestRefetch();
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6  gap-2 px-[2%]`}
        data={contacts?.friends?.data}
        ListEmptyComponent={() => <NoFoundCard title="No Contacts" />}
        renderItem={({item, index}) => (
          <>
            <MessageCard
              // disabled
              onPress={() => navigation?.navigate('OtherWall')}
              offPartThree
              titleContainerStyle={tw`gap-1`}
              joinBtn
              // subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-color-Black600 text-sm`}
              item={{
                image: item.image,
                full_name: item.full_name,
                last_message: item.user_name,
              }}
              Component={
                <View style={tw`px-4 flex-row gap-4 items-center`}>
                  {/* <TouchableOpacity>
                    <SvgXml
                      height={20}
                      width={20}
                      // fill={"#4964C6"}
                      xml={IconCallBlue}
                    />
                  </TouchableOpacity>
                  <TouchableOpacity>
                    <SvgXml
                      height={25}
                      width={25}
                      // fill={"#4964C6"}
                      xml={IconVideo}
                    />
                  </TouchableOpacity> */}
                  {/* <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('SingleMessage');
                    }}>
                    <SvgXml
                      height={20}
                      width={20}
                      // fill={'#4964C6'}
                      xml={IconMessageBlueUL}
                    />
                  </TouchableOpacity> */}

                  <TouchableOpacity
                    onPress={() => {
                      navigation?.navigate('SingleMessage', {
                        id: item.user_id,
                        item,
                      });
                    }}
                    style={tw`flex-row gap-2 items-center bg-primary px-3 py-2 rounded-md`}>
                    <SvgXml
                      height={15}
                      width={15}
                      // fill={'white'}
                      xml={IconMessageWhite}
                    />
                    <Text style={tw`text-white `}>Message</Text>
                  </TouchableOpacity>
                </View>
              }
            />
          </>
        )}
      />
    </View>
  );
};

export default ContactScreen;
