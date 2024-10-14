import {
  FlatList,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  IconBasicsleft,
  IconImage,
  IconLock,
  IconMenu,
  IconPlus,
  IconPost,
  IconPostBlue,
  IconPublic,
  IconStore,
  IconStoreBlue,
} from '../../icons/icons';
import {
  useGetOtherUserProfileQuery,
  useGetUserProfileQuery,
} from '../../redux/apiSlices/authSlice';
import {PrimaryColor, useImagePicker} from '../../utils/utils';

import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
import {Asset} from 'react-native-image-picker';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import CreatedHeaderWithITB from '../../components/backHeader/CreatedHeaderWithITB';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import SimpleButton from '../../components/buttons/SimpleButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Post from './components/Post';
import Store from './components/Store';

// const Post = React.lazy(() => import('./components/Post'));
// const Store = React.lazy(() => import('./components/Store'));

const categoryData = [
  {
    id: 1,
    name: 'Vehicle',
  },
  {
    id: 2,
    name: 'Electronics',
  },
  {
    id: 3,
    name: 'Property',
  },
  {
    id: 4,
    name: 'Study',
  },
  {
    id: 5,
    name: 'Vehicle',
  },
  {
    id: 6,
    name: 'Electronics',
  },
  {
    id: 7,
    name: 'Property',
  },
  {
    id: 8,
    name: 'Study',
  },
  {
    id: 10,
    name: 'Study',
  },
  {
    id: 11,
    name: 'Study',
  },
  {
    id: 12,
    name: 'Study',
  },
];

const MyWall = ({navigation}: NavigProps<null>) => {
  // console.log(route);
  const {
    data: wallData,
    isLoading: wallLoading,
    refetch: wallRefetch,
  } = useGetUserProfileQuery({});
  const {data: otherWallData} = useGetOtherUserProfileQuery({});
  const [options, setOptions] = React.useState('post');
  const [isPublic, setIsPublic] = React.useState(true);

  const [showAddPostModal, setShowAddPostModal] = React.useState(false);
  const [showAddProductModal, setShowProductPostModal] = React.useState(false);
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [selectCategory, setSelectCategory] = React.useState('Vehicle');

  const [images, setImages] = React.useState<Array<Asset>>();

  const [post, setPost] = React.useState('');
  console.log(wallData?.data.news_feeds.length);

  const handleImage = async (need: 'post' | 'store') => {
    if (need === 'post') {
      const image = await useImagePicker({
        option: 'library',
      });
      // check image lenth maximum 4
      // console.log(image);
      setImages(image);
    }
    if (need === 'store') {
      const image = await useImagePicker({
        option: 'library',
        selectionLimit: 4,
      });
      // check image lenth maximum 4
      setImages(image);
    }
  };

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
              style={tw`flex-1 max-w-[50%]  flex-row justify-around tablet:max-w-72 `}>
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
              {wallData?.data?.formattedProducts?.length > 0 && (
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
            </View>
          </View>
          <View style={tw`gap-2`}>
            <Text style={tw`text-color-Black800 font-NunitoSansBold text-lg`}>
              {wallData?.data?.full_name}
            </Text>
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
                Store
              </Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={tw`px-[4%] my-4`}>
            <TouchableOpacity
              disabled
              onPress={() => setOptions('post')}
              style={tw`h-11 px-2 flex-row gap-2 border-b-2 border-primary w-[25%]  justify-center items-center`}>
              <SvgXml xml={options == 'post' ? IconPostBlue : IconPost} />
              <Text
                style={tw` ${
                  options == 'post' ? 'text-primary' : 'text-[#34303E]'
                } font-NunitoSansBold text-sm`}>
                Post
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {options == 'post' ? (
          <View style={tw`tablet:mx-[30%]`}>
            <Post navigation={navigation} />
          </View>
        ) : (
          <Store navigation={navigation} />
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

      <NormalModal
        visible={showAddPostModal}
        scrollable
        animationType="fade"
        layerContainerStyle={tw`flex-1 mx-[4%] justify-center items-center `}
        containerStyle={tw` rounded-2xl p-5`}
        setVisible={setShowAddPostModal}>
        <CreatedHeaderWithITB
          title="Create a post"
          onPress={() => setShowAddPostModal(false)}
        />
        <View style={tw`gap-3 flex-row items-center mt-5`}>
          <FastImage
            style={tw`w-8 h-8 rounded-xl `}
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: 'https://randomuser.me/api/portraits/men/19.jpg',
            }}
          />
          <View>
            <Text style={tw`text-color-Black800 font-NunitoSansBold text-base`}>
              Sam
            </Text>
            <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`}>
              Edwinmartin_0097
            </Text>
          </View>
        </View>
        <TextInput
          multiline
          textAlignVertical="top"
          placeholderTextColor={'#888888'}
          placeholder="Share your thoughts..."
          style={tw`h-32 text-color-Black400 font-NunitoSansRegular text-base px-2`}
        />
        <View style={tw`border-t-[1px] border-t-[#E5E5E5] border-dashed py-3`}>
          <Text
            style={tw`text-color-Black800 font-NunitoSansBold text-base my-2`}>
            Add to your post
          </Text>
          <View style={tw`flex-row items-center gap-4`}>
            <TouchableOpacity onPress={() => handleImage('post')}>
              {images?.length > 0 ? (
                <FastImage
                  style={tw`w-12 rounded-xl h-12 `}
                  resizeMode={FastImage.resizeMode.cover}
                  source={{
                    uri: images![0]?.uri,
                  }}
                />
              ) : (
                <SimpleButton
                  onPress={() => handleImage('post')}
                  svgIcon={IconImage}
                  containerStyle={tw`w-12 rounded-xl h-12 items-center justify-center border-0 bg-color-Black50`}
                />
              )}
            </TouchableOpacity>
            <View style={tw`gap-2`}>
              <Text
                style={tw`text-color-Black800 font-NunitoSansBold text-base`}>
                Privacy
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                <IwtButton
                  title="Public"
                  svg={IconPublic}
                  onPress={() => setIsPublic(true)}
                  titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                  containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                    isPublic ? 'bg-primary100' : 'bg-white'
                  } shadow-none`}
                />
                <IwtButton
                  title="Private"
                  svg={IconLock}
                  onPress={() => setIsPublic(false)}
                  titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                  containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                    isPublic ? 'bg-white' : 'bg-primary100'
                  } shadow-none`}
                />
              </View>
            </View>
          </View>
        </View>

        <View>
          <TButton
            containerStyle={tw`w-full my-3 bg-primary600`}
            onPress={() => setShowAddPostModal(false)}
            title="Post"
          />
        </View>
      </NormalModal>

      {/*=================== Product add ===================== */}
      <NormalModal
        scrollable
        visible={showAddProductModal}
        animationType="fade"
        layerContainerStyle={tw`flex-1 mx-[4%] justify-center items-center `}
        containerStyle={tw` rounded-2xl p-5 my-3`}
        setVisible={setShowProductPostModal}>
        <CreatedHeaderWithITB
          title="Add a new product"
          onPress={() => setShowProductPostModal(false)}
        />

        <View style={tw`border-b-[1px] border-b-[#E5E5E5] border-dashed py-3`}>
          <Text
            style={tw`text-color-Black800 font-NunitoSansBold text-base my-3`}>
            Select product images
          </Text>
          <View style={tw`flex-row items-center gap-4`}>
            <FlatList
              contentContainerStyle={tw`gap-2`}
              ListHeaderComponent={() => (
                <SimpleButton
                  onPress={() => handleImage('post')}
                  svgIcon={IconImage}
                  containerStyle={tw`w-12 rounded-xl h-12 items-center justify-center border-0 bg-color-Black50`}
                />
              )}
              data={images}
              horizontal
              showsHorizontalScrollIndicator={false}
              renderItem={({item}) => (
                <View>
                  <FastImage
                    style={tw`w-14 h-12 rounded-xl `}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: item.uri,
                    }}
                  />
                </View>
              )}
            />
          </View>
        </View>

        <View style={tw`py-4 gap-4`}>
          <View style={tw`h-14`}>
            <InputText
              placeholder="Set product prize"
              placeholderTextColor={'#A5A3A9'}
              keyboardType="decimal-pad"
              floatingPlaceholder
              style={tw`font-NunitoSansRegular `}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowCategoryModal(!showCategoryModal);
            }}
            activeOpacity={0.5}
            style={tw`h-14 justify-center items-start border border-[#E8E8EA] px-4 rounded-2xl`}>
            <Text style={tw`text-color-Black600  font-NunitoSansRegular`}>
              {selectCategory}
            </Text>
          </TouchableOpacity>
          <View style={tw`h-14`}>
            <InputText
              placeholder="Product code"
              floatingPlaceholder
              placeholderTextColor={'#A5A3A9'}
              style={tw`font-NunitoSansRegular `}
            />
          </View>
          <View style={tw`h-40`}>
            <InputText
              multiline
              textAlignVertical="top"
              placeholder="Description"
              // floatingPlaceholder
              placeholderTextColor={'#A5A3A9'}
              style={tw`h-40 py-3 font-NunitoSansRegular`}
            />
          </View>
        </View>

        <View>
          <TButton
            containerStyle={tw`w-full my-3 bg-primary600`}
            onPress={() => setShowProductPostModal(false)}
            title="Post"
          />
        </View>
      </NormalModal>
      <NormalModal
        scrollable
        visible={showCategoryModal}
        animationType="fade"
        layerContainerStyle={tw`flex-1 mx-[4%] justify-center items-center `}
        containerStyle={tw` rounded-2xl p-5 my-3`}
        setVisible={setShowCategoryModal}>
        <View style={tw` border-dashed py-2`}>
          <TouchableOpacity
            style={tw`flex-row items-center gap-3`}
            onPress={() => setShowCategoryModal(false)}>
            <SvgXml width={12} height={12} xml={IconBasicsleft} />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-base `}>
              Select Category
            </Text>
          </TouchableOpacity>
        </View>
        <View style={tw`py-4 gap-4`}>
          {categoryData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectCategory(item.name);
                setShowCategoryModal(false);
              }}
              activeOpacity={0.5}
              style={tw`py-2`}>
              <Text style={tw`text-color-Black600  font-NunitoSansRegular`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </NormalModal>
    </View>
  );
};

export default MyWall;
