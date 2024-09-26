import React from 'react';
import {View} from 'react-native';
import productData from '../../../assets/database/product.json';
import ProductCard from '../../../components/cards/ProductCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

interface StoreProps extends NavigProps<null> {}
const Store = ({navigation}: StoreProps) => {
  // console.log();
  return (
    <View style={tw`px-[4%]`}>
      <View
        style={tw`flex-row flex-wrap  gap-2 md:gap-3 tablet:gap-16 tablet:justify-center`}>
        {productData?.map((item, index) => (
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
