import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconCallBlue, IconMessageBlue, IconVideo} from '../../icons/icons';
import {
  useUserFriendQuery,
  useUserFriendRequestsQuery,
} from '../../redux/apiSlices/contactSlices';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import IButton from '../../components/buttons/IButton';
import MessageCard from '../../components/cards/MessageCard';
import NoFoundCard from '../../components/cards/NoFoundCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';

// interface IPhoneContact {
//   company: string;
//   department: string;
//   displayName: string;
//   emailAddresses: [[Object]];
//   familyName: string;
//   givenName: string;
//   hasThumbnail: false;
//   imAddresses: [];
//   isStarred: false;
//   jobTitle: string;
//   middleName: string;
//   note: null;
//   phoneNumbers: [];
//   postalAddresses: [];
//   prefix: null;
//   rawContactId: string;
//   recordID: string;
//   suffix: null;
//   thumbnailPath: string;
//   urlAddresses: [];
// }

const ContactScreen = ({navigation}: NavigProps<null>) => {
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

  // async function requestContactPermission() {
  //   try {
  //     const granted = await PermissionsAndroid.request(
  //       PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
  //       {
  //         title: 'Contact Permission',
  //         message: 'This app needs access to your contacts',
  //         buttonPositive: 'OK',
  //       },
  //     );
  //     return granted === PermissionsAndroid.RESULTS.GRANTED;
  //   } catch (err) {
  //     console.warn(err);
  //     return false;
  //   }
  // }

  // useEffect(() => {
  //   requestContactPermission();
  //   getContacts();
  // }, []);

  // const [phoneContacts, setPhoneContacts] =
  //   React.useState<Array<IPhoneContact>>();

  // async function getContacts() {
  //   const permission = await requestContactPermission();
  //   if (permission) {
  //     Contacts.getAll()
  //       .then(contacts => {
  //         // console.log('Contacts:', contacts);
  //         setPhoneContacts(contacts);
  //         // Process the contacts array
  //       })
  //       .catch(error => {
  //         console.error('Error fetching contacts:', error);
  //       });
  //   } else {
  //     console.log('Contact permission denied');
  //   }
  // }

  // function sendInvite() {
  //   const message = `Hey! Check out this amazing app: https://yourapp.com/download`;
  //   const recipients = ['1234567890', '9876543210']; // Replace with default numbers if needed

  //   SendSMS.send(
  //     {
  //       body: message,
  //       recipients: recipients,
  //       successTypes: ['sent', 'queued'],
  //       allowAndroidSendWithoutReadPermission: true,
  //     },
  //     (completed, cancelled, error) => {
  //       if (completed) {
  //         console.log('SMS Sent Successfully');
  //       } else if (cancelled) {
  //         console.log('SMS Cancelled');
  //       } else if (error) {
  //         console.error('Error while sending SMS:', error);
  //       }
  //     },
  //   );
  // }

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================== header part ================= */}
      <View>
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
        ListHeaderComponent={() => {
          return (
            <>
              {/* <View style={tw`px-[4%] py-2`}>
                <View style={tw` gap-3  flex-row  items-center`}>
                  <Text
                    style={tw`text-color-Black600 font-NunitoSansMedium  text-lg py-2 `}>
                    Contacts
                  </Text>
                </View>
              </View> */}
            </>
          );
        }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6  gap-2 px-[2%]`}
        data={contacts?.friends?.data}
        ListEmptyComponent={() => <NoFoundCard title="No Contacts" />}
        ListFooterComponent={() => (
          <>
            {/* <View>
              {phoneContacts?.map((item, index) => (
                <MessageCard
                  key={index}
                  // disabled
                  onPress={() =>
                    navigation?.navigate('OtherWall', {
                      id: item.recordID,
                    })
                  }
                  offPartThree
                  titleContainerStyle={tw`gap-1`}
                  joinBtn
                  // subTitleStyle={tw`text-color-Black500`}
                  titleStyle={tw`text-color-Black600 text-sm`}
                  item={{
                    image: item.thumbnailPath,
                    full_name: item.displayName,
                    last_message: item?.phoneNumbers![0]?.number || 'Empty',
                  }}
                  Component={
                    <>
                      <TButton
                        onPress={() => sendInvite()}
                        title="Add Contact"
                        titleStyle={tw`text-white font-NunitoSansBold text-sm`}
                        containerStyle={tw`p-0 bg-primary rounded-lg w-30 h-8 justify-center items-center`}
                      />
                      <TButton
                        onPress={() => sendInvite()}
                        title="Invite"
                        titleStyle={tw`text-primary font-NunitoSansBold text-sm`}
                        containerStyle={tw`p-0 bg-gray-50 rounded-lg w-30 h-8 justify-center items-center`}
                      />
                    </>
                  }
                />
              ))}
            </View> */}
          </>
        )}
        renderItem={({item, index}) => (
          <>
            <MessageCard
              // disabled
              onPress={() =>
                navigation?.navigate('OtherWall', {
                  id: item.user_id,
                })
              }
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
                  {/* <TouchableOpacity
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
                  </TouchableOpacity> */}
                  <IButton
                    svg={IconMessageBlue}
                    containerStyle={tw`w-10 h-10 justify-center items-center bg-white`}
                    onPress={() => {}}
                  />
                  <IButton
                    svg={IconVideo}
                    containerStyle={tw`w-10 h-10 justify-center items-center bg-white`}
                    onPress={() => {
                      navigation?.navigate('VideoCall');
                    }}
                  />
                  <IButton
                    svg={IconCallBlue}
                    containerStyle={tw`w-10 h-10 justify-center items-center bg-white`}
                    onPress={() => {
                      navigation?.navigate('AudioCall');
                    }}
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

export default ContactScreen;
