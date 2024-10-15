import React, {useState} from 'react';
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
  IconUser,
  IconUserSmall,
} from '../../icons/icons';
import {
  useGetOtherUserProfileQuery,
  useGetUserProfileQuery,
} from '../../redux/apiSlices/authSlice';
import {
  useCreateNewFeetMutation,
  useDeleteNewFeetMutation,
} from '../../redux/apiSlices/newsFeetSlices';
import {PrimaryColor, useImagePicker} from '../../utils/utils';

import {DrawerActions} from '@react-navigation/native';
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
import ConfrimationModal from '../../components/modals/ConfrimationModal';
import NormalModal from '../../components/modals/NormalModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useCreateProductMutation} from '../../redux/apiSlices/productSlices';
import {useGetShopQuery} from '../../redux/apiSlices/shopSlices';
import {INewpaper} from '../../redux/interface/newpaper';
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

const MyWall = ({navigation, route}: NavigProps<{state: string}>) => {
  // console.log(route);
  const {
    data: wallData,
    isLoading: wallLoading,
    refetch: wallRefetch,
  } = useGetUserProfileQuery({});
  const {data: otherWallData} = useGetOtherUserProfileQuery({});
  const {data: Shop} = useGetShopQuery({});

  // console.log(Shop?.data?.[0]?.id);
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [selectItem, setSelectItem] = useState<null | INewpaper>(null);

  const [createNewsPost] = useCreateNewFeetMutation({});
  const [createProduct] = useCreateProductMutation({});

  const [options, setOptions] = React.useState(route?.params?.state || 'post');
  const [isPublic, setIsPublic] = React.useState('public');

  const [showAddPostModal, setShowAddPostModal] = React.useState(false);
  const [showAddProductModal, setShowProductPostModal] = React.useState(false);
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [selectCategory, setSelectCategory] = React.useState('Vehicle');

  const [postDeleted] = useDeleteNewFeetMutation();
  const [images, setImages] = React.useState<Array<Asset>>();
  // console.log(Shop?.data?.[0]?.id);
  const [postInfo, setPostInfo] = React.useState({
    share_your_thoughts: '',
    images: {},
    privacy: isPublic,
    status: 1,
  });
  const [productInfo, setProductInfo] = React.useState({
    category_id: 3,
    shop_id: 0,
    product_name: '',
    description: '',
    price: 10,
    images: [],
    status: 1,
  });
  // console.log(wallData?.data.news_feeds.length);

  const handleImage = async (need: 'post' | 'store') => {
    try {
      if (need === 'post') {
        const image = await useImagePicker({
          option: 'library',
          // selectionLimit: 2,
        });
        // check image lenth maximum 4
        // console.log(image);
        setImages(image);
        setPostInfo({
          ...postInfo,
          images: {
            uri: image![0]?.uri,
            type: image![0]?.type,
            name: image![0]?.fileName,
          },
        });
      }
      if (need === 'store') {
        const image = await useImagePicker({
          option: 'library',
          selectionLimit: 6,
        });
        // check image lenth maximum 4
        setImages(image);

        image?.forEach(item => {
          setProductInfo(pre => {
            return {
              ...pre,
              images: [
                ...pre.images,
                {
                  uri: item?.uri,
                  type: item?.type,
                  name: item?.fileName,
                },
              ],
            };
          });
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddPost = React.useCallback(
    async (UData: typeof postInfo) => {
      const fromData = new FormData();
      UData?.share_your_thoughts &&
        fromData.append('share_your_thoughts', UData?.share_your_thoughts);
      UData?.images && fromData.append('images[]', UData?.images);
      fromData.append('privacy', UData?.privacy || 'public');
      UData?.status && fromData.append('status', UData?.status);
      const res = await createNewsPost(fromData);
      console.log(res);
      if (res?.data?.data?.id) {
        wallRefetch();
        setShowAddPostModal(false);
        setImages([]);
        setPostInfo({});
      }
    },
    [postInfo],
  );

  const handleAddProducts = React.useCallback(
    async (UData: typeof productInfo) => {
      const fromData = new FormData();
      UData?.category_id && fromData.append('category_id', 1);
      UData?.product_name &&
        fromData.append('product_name', UData?.product_name);
      UData?.description && fromData.append('description', UData?.description);
      UData?.price && fromData.append('price', UData?.price);

      UData?.images?.forEach((item, index) => {
        fromData.append(`images[${index}]`, item);
      });
      UData?.status && fromData.append('status', UData?.status);
      fromData.append('shop_id', Shop?.data?.[0]?.id);
      console.log(UData?.images);
      const res = await createProduct(fromData);
      console.log(res);
      if (res?.data?.data?.id) {
        wallRefetch();
        setShowProductPostModal(false);
        setProductInfo({});
        setImages([]);
      }
    },
    [productInfo],
  );
  const handleDelete = () => {
    // console.log(selectItem);
    postDeleted(selectItem?.id).then(res => {
      console.log(res);
      wallRefetch();
      setConfirmationModal(false);
    });
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
          <View style={tw`tablet:mx-[30%]`}>
            <Post
              setSelectItem={setSelectItem}
              setConfirmationModal={setConfirmationModal}
              navigation={navigation}
            />
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
      {showAddPostModal && (
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
              resizeMode={FastImage.resizeMode.cover}
              source={{
                uri: wallData?.data?.image,
              }}
            />
            <View>
              <Text
                style={tw`text-color-Black800 font-NunitoSansBold text-base`}>
                {wallData?.data?.full_name}
              </Text>
              <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`}>
                {wallData?.data?.user_name}
              </Text>
            </View>
          </View>
          <TextInput
            multiline
            textAlignVertical="top"
            defaultValue={selectItem?.content}
            value={postInfo.share_your_thoughts}
            onChangeText={text =>
              setPostInfo({...postInfo, share_your_thoughts: text})
            }
            placeholderTextColor={'#888888'}
            placeholder="Share your thoughts..."
            style={tw`h-32 text-color-Black400 font-NunitoSansRegular text-base px-2`}
          />
          <View
            style={tw`border-t-[1px] border-t-[#E5E5E5] border-dashed py-3`}>
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-base my-2`}>
              Add to your post
            </Text>
            <View style={tw`flex-row items-center gap-4`}>
              <TouchableOpacity onPress={() => handleImage('post')}>
                {images && images?.length > 0 ? (
                  <FastImage
                    style={tw`w-12 rounded-xl h-12 `}
                    resizeMode={FastImage.resizeMode.cover}
                    source={{
                      uri: selectItem?.images[0].url || images![0]?.uri,
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
                    onPress={() => {
                      setIsPublic('public');
                      setPostInfo({
                        ...postInfo,
                        privacy: 'public',
                      });
                    }}
                    titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                    containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                      isPublic === 'public' ? 'bg-primary100' : 'bg-white'
                    } shadow-none`}
                  />
                  <IwtButton
                    title="Friends"
                    svg={IconUserSmall}
                    onPress={() => {
                      setIsPublic('friends');
                      setPostInfo({
                        ...postInfo,
                        privacy: 'friends',
                      });
                    }}
                    titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                    containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                      isPublic === 'friends' ? 'bg-primary100' : 'bg-white'
                    } shadow-none`}
                  />
                  <IwtButton
                    title="Private"
                    svg={IconLock}
                    onPress={() => {
                      setIsPublic('private');
                      setPostInfo({
                        ...postInfo,
                        privacy: 'private',
                      });
                    }}
                    titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                    containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                      isPublic === 'private' ? 'bg-primary100' : 'bg-white'
                    } shadow-none`}
                  />
                </View>
              </View>
            </View>
          </View>

          <View>
            <TButton
              containerStyle={tw`w-full my-3 bg-primary600`}
              onPress={() => {
                handleAddPost(postInfo);
              }}
              title="Post"
            />
          </View>
        </NormalModal>
      )}

      {/*=================== Product add ===================== */}
      {showAddProductModal && (
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

          <View
            style={tw`border-b-[1px] border-b-[#E5E5E5] border-dashed py-3`}>
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-base my-3`}>
              Select product images
            </Text>
            <View style={tw`flex-row items-center gap-4`}>
              <FlatList
                contentContainerStyle={tw`gap-2`}
                ListHeaderComponent={() => (
                  <SimpleButton
                    onPress={() => handleImage('store')}
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
                onChangeText={text =>
                  setProductInfo({...productInfo, product_name: text})
                }
                value={productInfo.product_name}
                placeholder="Set product name"
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
                // value={productInfo.product_code}
                // onChangeText={(text)=>setProductInfo({...productInfo,product_code:text})}
                floatingPlaceholder
                placeholderTextColor={'#A5A3A9'}
                style={tw`font-NunitoSansRegular `}
              />
            </View>
            <View style={tw`h-14`}>
              <InputText
                placeholder="Price"
                defaultValue={productInfo.price.toString()}
                onChangeText={text =>
                  setProductInfo({...productInfo, price: Number(text)})
                }
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
                onChangeText={text =>
                  setProductInfo({...productInfo, description: text})
                }
                value={productInfo.description}
                // floatingPlaceholder
                placeholderTextColor={'#A5A3A9'}
                style={tw`h-40 py-3 font-NunitoSansRegular`}
              />
            </View>
          </View>

          <View>
            <TButton
              containerStyle={tw`w-full my-3 bg-primary600`}
              onPress={() => {
                handleAddProducts(productInfo);
              }}
              title="Add Product"
            />
          </View>
        </NormalModal>
      )}
      {showCategoryModal && (
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
                  setProductInfo({...productInfo, category_id: 1});
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
      )}

      <ConfrimationModal
        title="Are you sure you want to delete this item?"
        visible={confirmationModal}
        setVisible={setConfirmationModal}
        confirmationPress={() => {
          handleDelete();
        }}
        titleStyle={tw`text-color-Black900 text-lg `}
        buttonText="Delete"
        svg={`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 3V1.5C11 0.671573 10.3284 0 9.5 0H5.5C4.67157 0 4 0.671573 4 1.5V3H0V4H1V13.5C1 14.3284 1.67157 15 2.5 15H12.5C13.3284 15 14 14.3284 14 13.5V4H15V3H11ZM5 1.5C5 1.22386 5.22386 1 5.5 1H9.5C9.77614 1 10 1.22386 10 1.5V3H5V1.5ZM7 7V12H8V7H7ZM4 12V9H5V12H4ZM10 9V12H11V9H10Z" fill="white"/>
              </svg>
              `}
      />
    </View>
  );
};

export default MyWall;
