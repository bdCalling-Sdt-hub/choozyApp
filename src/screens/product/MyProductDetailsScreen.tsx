import {
  FlatList,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import PopUpModal, {PopUpModalRef} from '../../components/modals/PopUpModal';
import {
  IconBasicsleft,
  IconDeleted,
  IconImage,
  IconVThreeDots,
} from '../../icons/icons';
import {
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useUpdateProductMutation,
} from '../../redux/apiSlices/productSlices';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import CreatedHeaderWithITB from '../../components/backHeader/CreatedHeaderWithITB';
import SimpleButton from '../../components/buttons/SimpleButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import ActionModal from '../../components/modals/ActionModal';
import NormalModal from '../../components/modals/NormalModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetShopQuery} from '../../redux/apiSlices/shopSlices';
import {IProduct} from '../../redux/interface/products';
import {useImagePicker} from '../../utils/utils';

const MyProductDetailsScreen = ({
  navigation,
  route,
}: NavigProps<{item: IProduct}>) => {
  const [actionModalOpen, setActionModalOpen] = React.useState(false);
  const {height, width} = useWindowDimensions();
  const Item = route?.params.item;

  const {data: categories} = useGetCategoriesQuery({});
  const [showAddProductModal, setShowProductPostModal] = React.useState(false);
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [selectCategory, setSelectCategory] = React.useState(
    categories?.data?.data?.find(i => i.category_name === Item?.category_name)
      ?.category_name || 'Select Category',
  );

  const popUpModalRef = React.useRef<PopUpModalRef>(null);

  // console.log(categories?.data.data);

  const handleImage = async () => {
    try {
      const image = await useImagePicker({
        option: 'library',
        selectionLimit: 6,
      });

      image?.forEach(item => {
        setProductInfo((pre: any) => {
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
    } catch (error) {
      console.log(error);
    }
  };

  const {data: Shop} = useGetShopQuery({});

  const [updateProduct] = useUpdateProductMutation({});
  const [productDelete] = useDeleteProductMutation({});

  const [productInfo, setProductInfo] = React.useState<{
    category_id?: number;
    shop_id?: number;
    product_name?: string;
    description?: string;
    price?: number;
    images?: any[];
    product_code?: string;
    status?: number;
  }>({
    category_id:
      categories?.data?.data?.find(i => i.category_name === Item?.category_name)
        ?.id || 0,
    status: 1,
    images:
      Item?.product_images?.map(item => ({
        uri: item,
        type: 'image/jpg',
        name: item,
      })) || [],
    shop_id: Shop?.data.id || 0,
    product_name: Item?.product_name || '',
    product_code: Item?.product_code || '',
    description: Item?.description || '',
    price: Item?.price || 10,
  });

  // console.log(productInfo?.images);

  const handleAddProducts = React.useCallback(
    async (UData: typeof productInfo) => {
      const fromData = new FormData();
      UData?.product_name &&
        fromData.append('product_name', UData?.product_name);
      UData?.description && fromData.append('description', UData?.description);
      UData?.price && fromData.append('price', UData?.price);
      UData?.category_id && fromData.append('category_id', UData?.category_id);
      UData?.product_code &&
        fromData.append('product_code', UData?.product_code);
      // console.log(UData?.images?.length);
      UData?.images?.forEach((item, index) => {
        fromData.append(`images[${index}]`, item);
      });
      fromData.append('_method', 'PUT');
      // console.log(fromData);
      const res = await updateProduct({data: fromData, id: Item?.id});
      // console.log(res);
      if (res?.data?.data?.id) {
        setShowProductPostModal(false);
        setProductInfo({
          category_id: 3,
          shop_id: 0,
          product_name: '',
          description: '',
          price: 10,
          images: [],
          status: 1,
        });
        navigation?.goBack();
      }
    },
    [productInfo],
  );

  // console.log(productInfo);

  const handleDelete = () => {
    // console.log(selectItem);
    productDelete(Item?.id).then(res => {
      console.log(res);
      popUpModalRef.current?.close();
      setActionModalOpen(false);
      navigation?.goBack();
    });
  };

  return (
    <View style={tw`flex-1 bg-base`}>
      <BackWithComponent
        onPress={() => navigation?.goBack()}
        title="Product Details"
        containerStyle={tw`justify-between items-center bg-white`}
        ComponentBtn={
          <TouchableOpacity
            onPress={() => {
              setActionModalOpen(!actionModalOpen);
            }}
            activeOpacity={0.5}
            style={tw`px-4 py-2`}>
            <SvgXml xml={IconVThreeDots} />
          </TouchableOpacity>
        }
      />

      <ScrollView
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={false}>
        <View style={tw`bg-white`}>
          <FlatList
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            horizontal
            data={Item?.product_images}
            renderItem={({item, index}) => {
              return (
                <>
                  <FastImage
                    style={tw`w-[${width}px] h-72 `}
                    resizeMode={FastImage.resizeMode.contain}
                    source={{
                      uri: item,
                    }}
                  />
                  <View
                    style={tw`bg-[#FFFFFF99] absolute  bottom-4 rounded-lg px-2 py-1 right-5`}>
                    <Text style={tw`text-center font-NunitoSansBold text-base`}>
                      {index + 1}/{Item?.product_images?.length}
                    </Text>
                  </View>
                </>
              );
            }}
          />
          <View style={tw`p-4`}>
            <View style={tw`flex-row justify-between items-center`}>
              <Text
                style={tw`text-color-Black900 font-NunitoSansBold text-2xl`}>
                €{Item?.price}
              </Text>
              <View style={tw`items-end gap-1`}>
                <Text
                  style={tw`text-color-Black1000 font-NunitoSansBold text-sm`}>
                  {Item?.category_name}
                </Text>
                <Text
                  style={tw`text-color-Black600 font-NunitoSansRegular text-xs`}>
                  Published: 03 Min ago
                </Text>
              </View>
            </View>
            <Text
              style={tw`text-color-Black900 font-NunitoSansBold text-lg my-4`}>
              {Item?.product_name}
            </Text>
          </View>
        </View>

        <View style={tw`mt-3 bg-white  flex-1  p-4 gap-3 min-h-96 `}>
          <View>
            <Text style={tw`text-color-Black900 font-NunitoSansBold`}>
              Description
            </Text>
            <Text style={tw`text-color-Black800 font-NunitoSansRegular`}>
              {Item?.description}
            </Text>
          </View>
        </View>
      </ScrollView>

      <ActionModal
        containerStyle={tw`top-[6%] right-[2%]`}
        visible={actionModalOpen}
        setVisible={setActionModalOpen}
        actionData={[
          {
            title: 'Edit',
            onPress: () => {
              setShowProductPostModal(true);
              setActionModalOpen(false);
            },
            // enableBoth: true,
          },
          {
            titleStyle: tw`text-red-500`,
            customComponent: (
              <TouchableOpacity
                onPress={() => {
                  popUpModalRef.current?.open({
                    title: 'Delete product',
                    content:
                      'Are you sure! You want to delete product permanently?',
                    titleStyle: tw`text-xl`,
                    contentStyle: tw`text-base gap-2`,
                    containerStyle: tw`w-[80%]`,

                    multipleBTNStyle: tw`flex-row gap-3 justify-between mt-3`,
                    multipleButton: [
                      {
                        buttonText: 'Delete',
                        onPress: () => {
                          // navigation?.goBack();
                          handleDelete();
                        },
                        buttonStyle: tw`bg-red-500 w-20`,
                        buttonTextStyle: tw``,
                      },
                      {
                        buttonText: 'Cancel',
                        onPress: () => {
                          popUpModalRef.current?.close();
                          setActionModalOpen(false);
                        },
                        buttonStyle: tw`w-20 bg-primary`,
                      },
                    ],
                  });
                }}
                style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-red-500 font-NunitoSansBold`}>Delete</Text>
                <SvgXml xml={IconDeleted} />
              </TouchableOpacity>
            ),
          },
        ]}
      />

      {/*==================== confirmation modal ===================*/}

      {/*======================== Products updated modals  ===================*/}

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
                    onPress={() => handleImage()}
                    svgIcon={IconImage}
                    containerStyle={tw`w-12 rounded-xl h-12 items-center justify-center border-0 bg-color-Black50`}
                  />
                )}
                data={productInfo?.images}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      setProductInfo((pre: any) => {
                        return {
                          ...pre,
                          images: pre.images.filter(
                            (i: string) => i?.uri !== item?.uri,
                          ),
                        };
                      });
                    }}>
                    <FastImage
                      style={tw`w-14 h-12 rounded-xl `}
                      resizeMode={FastImage.resizeMode.cover}
                      source={{
                        uri: item.uri,
                      }}
                    />
                    <Text
                      style={tw`text-red-500 font-NunitoSansExtraBold absolute top-0 right-3`}>
                      X
                    </Text>
                  </TouchableOpacity>
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
                value={productInfo.product_code}
                onChangeText={text =>
                  setProductInfo({...productInfo, product_code: text})
                }
                floatingPlaceholder
                placeholderTextColor={'#A5A3A9'}
                style={tw`font-NunitoSansRegular `}
              />
            </View>
            <View style={tw`h-14`}>
              <InputText
                placeholder="Price"
                defaultValue={productInfo?.price?.toString()}
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
            {categories?.data?.data.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectCategory(item.category_name);
                  setShowCategoryModal(false);
                  setProductInfo({...productInfo, category_id: item?.id});
                }}
                activeOpacity={0.5}
                style={tw`py-2`}>
                <Text style={tw`text-color-Black600  font-NunitoSansRegular`}>
                  {item.category_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </NormalModal>
      )}

      <PopUpModal ref={popUpModalRef} />
    </View>
  );
};

export default MyProductDetailsScreen;
