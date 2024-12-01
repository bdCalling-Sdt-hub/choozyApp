import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  useCreateProductMutation,
  useGetCategoriesQuery,
  useGetUserProductsQuery,
} from '../../../redux/apiSlices/productSlices';
import {Android, useImagePicker} from '../../../utils/utils';

import React from 'react';
import FastImage from 'react-native-fast-image';
import CreatedHeaderWithITB from '../../../components/backHeader/CreatedHeaderWithITB';
import SimpleButton from '../../../components/buttons/SimpleButton';
import TButton from '../../../components/buttons/TButton';
import ProductCard from '../../../components/cards/ProductCard';
import InputText from '../../../components/inputs/InputText';
import NormalModal from '../../../components/modals/NormalModal';
import SideModal from '../../../components/modals/SideModal';
import {IconImage} from '../../../icons/icons';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {useGetShopQuery} from '../../../redux/apiSlices/shopSlices';

interface StoreProps extends NavigProps<any> {
  showAddProductModal: boolean;
  setShowProductPostModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const Store = ({
  navigation,
  setShowProductPostModal,
  showAddProductModal,
}: StoreProps) => {
  // console.log();
  const {
    data: Products,
    isLoading: productsLoading,
    refetch: productRefetch,
    error: productError,
  } = useGetUserProductsQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // console.log(productError);

  const {data: categories} = useGetCategoriesQuery({});

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
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [selectCategory, setSelectCategory] = React.useState(
    categories?.data?.data?.[0]?.category_name || 'Select Category',
  );

  const [createProduct] = useCreateProductMutation({});

  const [productInfo, setProductInfo] = React.useState<{
    category_id?: number;
    shop_id?: number;
    product_name?: string;
    description?: string;
    price?: number;
    images?: any[];
    status?: number;
  }>({
    category_id: categories?.data?.data?.[0]?.id,
    status: 1,
    images: [],
  });

  const handleAddProducts = React.useCallback(
    async (UData: typeof productInfo) => {
      const fromData = new FormData();
      UData?.category_id && fromData.append('category_id', UData?.category_id);
      UData?.product_name &&
        fromData.append('product_name', UData?.product_name);
      UData?.description && fromData.append('description', UData?.description);
      UData?.price && fromData.append('price', UData?.price);

      UData?.images?.forEach((item, index) => {
        fromData.append(`images[${index}]`, item);
      });
      UData?.status && fromData.append('status', UData?.status);
      fromData.append('shop_id', Shop?.data?.id);
      console.log(UData?.images);
      const res = await createProduct(fromData);
      console.log(res);
      if (res?.data?.data?.id) {
        productRefetch();
        setShowProductPostModal(false);
        setSelectCategory('Select Category');
        setProductInfo({
          category_id: 0,
          shop_id: 0,
          product_name: '',
          description: '',
          price: 10,
          images: [],
          status: 1,
        });
      }
    },
    [productInfo],
  );

  // console.log(productInfo);

  return (
    <>
      <View style={tw`px-[4%]`}>
        <View
          style={tw`flex-row flex-wrap  gap-2 md:gap-3 tablet:gap-16 tablet:justify-center`}>
          {Products?.data &&
            !productError?.data &&
            Products?.data.map((item, index) => (
              <ProductCard
                key={index}
                item={item}
                onPress={() => {
                  navigation?.navigate('MyProductDetails', {item: item});
                }}
              />
            ))}
        </View>
      </View>
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
            style={tw`${
              Android ? 'border-dashed border-b-[1px] border-b-[#E5E5E5]' : ''
            } py-3`}>
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
                floatingPlaceholder
                style={tw`font-NunitoSansRegular `}
              />
            </View>
            <TouchableOpacity
              onPress={() => {
                setShowProductPostModal(false);
                setShowCategoryModal(!showCategoryModal);
              }}
              activeOpacity={0.5}
              style={tw`h-14 justify-center items-start border border-[#E8E8EA] px-4 rounded-2xl`}>
              <Text style={tw`text-color-Black600  font-NunitoSansRegular`}>
                {selectCategory}
              </Text>
            </TouchableOpacity>
            {/* <View style={tw`h-14`}>
              <InputText
                placeholder="Product code"
                // value={productInfo.product_code}
                // onChangeText={(text)=>setProductInfo({...productInfo,product_code:text})}
                floatingPlaceholder
                placeholderTextColor={'#A5A3A9'}
                style={tw`font-NunitoSansRegular `}
              />
            </View> */}
            <View style={tw`h-14`}>
              <InputText
                placeholder="Love"
                onChangeText={text =>
                  setProductInfo({...productInfo, price: Number(text)})
                }
                floatingPlaceholder
                keyboardType="decimal-pad"
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
        <SideModal
          headerOff
          scrollable
          visible={showCategoryModal}
          layerContainerStyle={tw` `}
          containerStyle={tw` rounded-2xl p-5 `}
          setVisible={setShowCategoryModal}>
          <CreatedHeaderWithITB
            title="Select Category"
            visibleIcon
            onPress={() => {
              setShowCategoryModal(false);
              setShowProductPostModal(true);
            }}
          />
          <View
            style={tw` ${
              Android ? 'border-dashed border-b-[1px] border-b-[#E5E5E5]' : ''
            } py-2`}></View>
          <View style={tw`py-4 gap-4`}>
            {categories?.data?.data.map((item, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  setSelectCategory(item.category_name);
                  setShowCategoryModal(false);
                  setProductInfo({...productInfo, category_id: item?.id});
                  setShowProductPostModal(true);
                }}
                activeOpacity={0.5}
                style={tw`py-2`}>
                <Text style={tw`text-color-Black800  font-NunitoSansBold`}>
                  {item.category_name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </SideModal>
      )}
    </>
  );
};

export default React.memo(Store);
