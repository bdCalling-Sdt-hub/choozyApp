import React from 'react';
import {View} from 'react-native';
import ProductCard from '../../../components/cards/ProductCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {useGetUserProductsQuery} from '../../../redux/apiSlices/productSlices';

interface StoreProps extends NavigProps<null> {}
const Store = ({navigation}: StoreProps) => {
  // console.log();
  const {
    data: Products,
    isLoading: productsLoading,
    refetch: productRefetch,
  } = useGetUserProductsQuery({});
  return (
    <View style={tw`px-[4%]`}>
      <View
        style={tw`flex-row flex-wrap  gap-2 md:gap-3 tablet:gap-16 tablet:justify-center`}>
        {Products?.data &&
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
  );
};

export default Store;
