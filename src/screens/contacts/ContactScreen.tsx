import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {IconMessageWhite, IconSearch} from '../../icons/icons';
import {
  useUserFriendQuery,
  useUserFriendRequestsQuery,
} from '../../redux/apiSlices/contactSlices';

import InputText from '../../components/inputs/InputText';
import MessageCard from '../../components/cards/MessageCard';
import {NavigProps} from '../../interfaces/NaviProps';
import NoFoundCard from '../../components/cards/NoFoundCard';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

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
      <View style={tw`bg-white px-[4%] py-2`}>
        <View style={tw` gap-3  flex-row justify-center items-center`}>
          <Text style={tw`text-2xl text-primary900 font-NunitoSansExtraBold`}>
            Contacts
          </Text>
          <View style={tw` h-14 flex-1 `}>
            <InputText placeholder="Search.." svgSecondIcon={IconSearch} />
          </View>
        </View>
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
        refreshing={contactsLoading || allContactRequestLoading}
        onRefresh={() => {
          contactsRefetch();
          allContactRequestRefetch();
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6 bg-white gap-2 px-[2%]`}
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
                name: item.full_name,
                lastMessage: item.user_name,
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
                      navigation?.navigate('SingleMessage');
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
