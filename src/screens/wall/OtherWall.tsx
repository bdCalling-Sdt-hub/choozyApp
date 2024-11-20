import {
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconLock,
  IconPost,
  IconPostBlue,
  IconPublic,
  IconStore,
  IconStoreBlue,
  IconUser,
} from '../../icons/icons';
import React, {Suspense} from 'react';
import {
  useCancelRequestMutation,
  useSendFriendRequestMutation,
  useUnfriendMutation,
  useUserFriendQuery,
  useUserSendFriendRequestsQuery,
} from '../../redux/apiSlices/contactSlices';

import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import FastImage from 'react-native-fast-image';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import tw from '../../lib/tailwind';
import {useGetOtherUserProfileQuery} from '../../redux/apiSlices/authSlice';
import {useToast} from '../../components/modals/Toaster';

// import Post from './components/Post';
// import Store from './components/Store';

const Post = React.lazy(() => import('./components/OtherWallPost'));
const Store = React.lazy(() => import('./components/OtherWallStore'));

const OtherWall = ({navigation, route}: NavigProps<{id: number}>) => {
  const {closeToast, showToast} = useToast();
  // console.log(route?.params);
  const {
    data: wallData,
    isLoading: wallLoading,
    refetch: wallRefetch,
  } = useGetOtherUserProfileQuery(route?.params?.id);

  // console.log(Shop?.data?.[0]?.id);
  // console.log(wallData);

  const [options, setOptions] = React.useState('post');

  const [sendFriendRequest] = useSendFriendRequestMutation();
  // console.log(Shop?.data?.[0]?.id);

  const [unfriend] = useUnfriendMutation();
  const [cancelRequest] = useCancelRequestMutation();

  const {data: friends} = useUserFriendQuery({});
  const {data: friendsRequest} = useUserSendFriendRequestsQuery({});
  // console.log(wallData?.data.news_feeds.length);

  const handleSendFriendRequest = async () => {
    const res = await sendFriendRequest(route?.params?.id);

    // console.log(res);
    if (res.data) {
      showToast({
        content: res.data.message,
        title: 'success',
        titleStyle: tw`text-green-500`,
        btnDisplay: true,
      });
    }
    if (res.error) {
      showToast({
        content: res.error?.message,
        title: 'Warning',
        titleStyle: tw`text-yellow-500`,
        btnDisplay: true,
      });
    }
  };
  const handleUnFriendRequest = async () => {
    const res = await unfriend(route?.params?.id);
    // console.log(res);
    if (res.data) {
      showToast({
        content: res.data.message,
        title: 'success',
        titleStyle: tw`text-green-500`,
        btnDisplay: true,
      });
    }
    if (res.error) {
      showToast({
        content: res.error?.message,
        title: 'Warning',
        titleStyle: tw`text-yellow-500`,
        btnDisplay: true,
      });
    }
  };

  const handleCancelRequest = async () => {
    console.log(route?.params?.id);
    const res = await cancelRequest(route?.params?.id);
    if (res.data) {
      showToast({
        content: res.data.message,
        title: 'success',
        titleStyle: tw`text-green-500`,
        btnDisplay: true,
      });
    }
    if (res.error) {
      showToast({
        content: res.error?.message,
        title: 'Warning',
        titleStyle: tw`text-yellow-500`,
        btnDisplay: true,
      });
    }
    console.log(res);
  };

  const alreadyFriend = () => {
    return friends?.friends?.data?.some(
      item => item.user_id === route?.params?.id,
    );
  };
  const alreadyFriendRequest = () => {
    return friendsRequest?.data?.some(
      item => item.user_id === route?.params?.id,
    );
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title="Back"
        containerStyle={tw`justify-between`}
        onPress={() => {
          navigation?.goBack();
        }}
        ComponentBtn={
          <TButton
            containerStyle={tw`self-center p-2 items-center bg-primary`}
            title={
              alreadyFriend()
                ? 'Remove Contact'
                : alreadyFriendRequest()
                ? 'Cancel Request'
                : 'Add Contact'
            }
            onPress={() => {
              if (alreadyFriendRequest()) {
                handleCancelRequest();
              } else if (alreadyFriend()) {
                handleUnFriendRequest();
              } else {
                handleSendFriendRequest();
              }
            }}
          />
        }
      />
      <ScrollView
        refreshControl={
          <RefreshControl
            refreshing={wallLoading}
            onRefresh={wallRefetch}
            colors={[PrimaryColor]}
          />
        }
        contentContainerStyle={tw`pb-6`}
        nestedScrollEnabled
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={tw`px-[4%]`}>
          <View
            style={tw`flex-row items-center  tablet:justify-start gap-8  my-5`}>
            <FastImage
              style={tw`w-16 h-16  rounded-3xl`}
              source={{
                uri: wallData?.data?.image,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <View
              style={tw`flex-1 max-w-[50%]  flex-row  gap-[80%] tablet:max-w-72 `}>
              {wallData && wallData?.data?.news_feeds?.length > 0 && (
                <View style={tw`justify-center items-center`}>
                  <Text
                    style={tw`text-color-Black800 font-NunitoSansBold text-[24px]`}>
                    {wallData?.data?.news_feeds?.length}
                  </Text>
                  <Text
                    style={tw`text-[#A5A3A9] font-NunitoSansBold text-[12px]`}>
                    Posts
                  </Text>
                </View>
              )}
              {wallData && wallData?.data?.formattedProducts?.length > 0 && (
                <View style={tw`justify-center items-center`}>
                  <Text
                    style={tw`text-color-Black800 font-NunitoSansBold text-[24px]`}>
                    {wallData?.data?.formattedProducts?.length}
                  </Text>
                  <Text
                    style={tw`text-[#A5A3A9] font-NunitoSansBold text-[12px]`}>
                    Products
                  </Text>
                </View>
              )}
              {wallData && wallData?.data?.friends_count > 0 && (
                <View style={tw`justify-center items-center`}>
                  <Text
                    style={tw`text-color-Black800 font-NunitoSansBold text-[24px]`}>
                    {wallData?.data?.friends_count}
                  </Text>
                  <Text
                    style={tw`text-[#A5A3A9] font-NunitoSansBold text-[12px]`}>
                    Contacts
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={tw`gap-2 justify-center`}>
            <View style={tw`flex-row  gap-1 items-center`}>
              <Text style={tw`text-color-Black800 font-NunitoSansBold text-lg`}>
                {wallData?.data?.full_name}
              </Text>
              <View style={tw` px-2 rounded-full`}>
                {wallData?.data?.privacy === 'public' ? (
                  <SvgXml xml={IconPublic} width={10} />
                ) : wallData?.data?.privacy === 'private' ? (
                  <SvgXml xml={IconLock} width={10} />
                ) : (
                  <SvgXml xml={IconUser} width={10} />
                )}
              </View>
            </View>
            <Text
              style={tw`text-[#A5A3A9] font-NunitoSansRegular text-[12px] leading-4`}>
              {wallData?.data?.bio}
            </Text>
          </View>
        </View>

        {/*================= options here =================== */}
        {wallData?.data?.shop ? (
          <View style={tw`flex-row items-center gap-3 px-[4%] my-4`}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOptions('post')}
              style={tw`h-11 px-2 flex-row gap-2  ${
                options == 'post'
                  ? 'border-b-[3px] border-b-primary'
                  : 'border-b-[3px] border-b-white'
              }  justify-center items-center`}>
              <SvgXml xml={options == 'post' ? IconPostBlue : IconPost} />
              <Text
                style={tw` ${
                  options == 'post' ? 'text-primary' : 'text-[#34303E]'
                } font-NunitoSansBold text-sm`}>
                Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOptions('store')}
              style={tw`h-11 px-2 gap-2 ${
                options == 'store'
                  ? 'border-b-[3px] border-b-primary'
                  : 'border-b-[3px] border-b-white'
              }  justify-center items-center flex-row `}>
              <SvgXml xml={options == 'store' ? IconStoreBlue : IconStore} />
              <Text
                style={tw` ${
                  options == 'store' ? 'text-primary' : 'text-[#34303E]'
                } font-NunitoSansBold text-sm`}>
                {wallData?.data?.shop?.shop_name}
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`flex-row items-center gap-3 px-[4%] my-4`}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => setOptions('post')}
              style={tw`h-11 px-2 flex-row gap-2  
              
                   border-b-[3px] border-b-primary
              
                justify-center items-center`}>
              <SvgXml xml={IconPostBlue} />
              <Text style={tw`  text-primary  font-NunitoSansBold text-sm`}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {options == 'post' ? (
          <Suspense
            fallback={
              <View>
                <ActivityIndicator color={PrimaryColor} />
              </View>
            }>
            <View style={tw`tablet:mx-[30%]`}>
              <Post
                userId={route?.params?.id as number}
                navigation={navigation}
              />
            </View>
          </Suspense>
        ) : (
          <Suspense
            fallback={
              <View>
                <ActivityIndicator color={PrimaryColor} />
              </View>
            }>
            <Store
              productData={wallData?.data.formattedProducts}
              navigation={navigation}
            />
          </Suspense>
        )}
      </ScrollView>
    </View>
  );
};

export default OtherWall;
