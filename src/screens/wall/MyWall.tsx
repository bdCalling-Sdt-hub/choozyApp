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
  IconPlus,
  IconPost,
  IconPostBlue,
  IconPublic,
  IconStore,
  IconStoreBlue,
  IconTwoUser,
} from '../../icons/icons';
import React, {Suspense} from 'react';
import {
  useGetOtherUserProfileQuery,
  useGetUserProfileQuery,
} from '../../redux/apiSlices/authSlice';

import FastImage from 'react-native-fast-image';
import IButton from '../../components/buttons/IButton';
import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import {SvgXml} from 'react-native-svg';
import tw from '../../lib/tailwind';

// import Post from './components/Post';
// import Store from './components/Store';

const Post = React.lazy(() => import('./components/Post'));
const Store = React.lazy(() => import('./components/Store'));

const MyWall = ({navigation, route}: NavigProps<{state: string}>) => {
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
  // console.log(wallData?.data?.image);
  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================= header here =================== */}
      <LogoWithHeader offSearch offMenu navigation={navigation} />
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
            {wallData?.data?.image ? (
              <FastImage
                style={tw`w-16 h-16  rounded-3xl`}
                source={{
                  uri: wallData?.data?.image,
                }}
                resizeMode={FastImage.resizeMode.cover}
              />
            ) : (
              <View
                style={tw`w-16 h-16 justify-center items-center bg-primary rounded-full `}>
                <Text style={tw` font-NunitoSansBold text-2xl text-white `}>
                  {wallData?.data?.full_name.slice(0, 1).toUpperCase()}
                </Text>
              </View>
            )}

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
              {wallData?.data?.user_name && (
                <Text
                  style={tw`text-color-Black400 font-NunitoSansBold text-[10px]`}>
                  @{wallData?.data?.user_name}
                </Text>
              )}
              <View style={tw` px-1 rounded-full`}>
                {wallData?.data?.privacy === 'public' ? (
                  <SvgXml xml={IconPublic} width={10} />
                ) : wallData?.data?.privacy === 'private' ? (
                  <SvgXml xml={IconLock} width={10} />
                ) : (
                  <SvgXml xml={IconTwoUser} width={10} />
                )}
              </View>
            </View>

            {wallData?.data?.contact && (
              <Text style={tw`text-color-Black400 font-NunitoSansBold text-xs`}>
                {wallData?.data?.contact}
              </Text>
            )}

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
            <Store
              showAddProductModal={showAddProductModal}
              setShowProductPostModal={setShowProductPostModal}
              navigation={navigation}
            />
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
