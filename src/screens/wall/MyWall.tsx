import React, {Suspense} from 'react';
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
  IconMenu,
  IconPlus,
  IconPost,
  IconPostBlue,
  IconPublic,
  IconStore,
  IconStoreBlue,
  IconUser,
} from '../../icons/icons';
import {
  useGetOtherUserProfileQuery,
  useGetUserProfileQuery,
} from '../../redux/apiSlices/authSlice';

import {DrawerActions} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {PrimaryColor} from '../../utils/utils';

// import Post from './components/Post';
// import Store from './components/Store';

const Post = React.lazy(() => import('./components/Post'));
const Store = React.lazy(() => import('./components/Store'));

const MyWall = ({navigation, route}: NavigProps<{item: string}>) => {
  // console.log(route);
  const {
    data: wallData,
    isLoading: wallLoading,
    refetch: wallRefetch,
  } = useGetUserProfileQuery({});
  const {data: otherWallData} = useGetOtherUserProfileQuery({});

  // console.log(Shop?.data?.[0]?.id);

  const [options, setOptions] = React.useState(route?.params?.state || 'post');

  const [showAddPostModal, setShowAddPostModal] = React.useState(false);
  const [showAddProductModal, setShowProductPostModal] = React.useState(false);

  // console.log(Shop?.data?.[0]?.id);

  // console.log(wallData?.data.news_feeds.length);

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title="My Wall"
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <IButton
            onPress={() => {
              navigation?.dispatch(DrawerActions.openDrawer());
            }}
            svg={IconMenu}
            containerStyle={tw`w-12  h-12 bg-primary50 shadow-none`}
          />
        }
        onPress={() => {
          navigation?.goBack();
        }}
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
                showAddPostModal={showAddPostModal}
                setShowAddPostModal={setShowAddPostModal}
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
            <Store navigation={navigation} />
          </Suspense>
        )}
      </ScrollView>

      {/* floating icon here */}
      <IButton
        onPress={() => {
          if (options == 'post') setShowAddPostModal(!showAddPostModal);
          else setShowProductPostModal(!showAddProductModal);
        }}
        svg={IconPlus}
        containerStyle={tw`absolute bottom-10 right-6 h-12 w-12 rounded-3xl items-center justify-center bg-primary900 `}
      />
    </View>
  );
};

export default MyWall;
