import React from 'react';
import {View} from 'react-native';
import ProductCard from '../../../components/cards/ProductCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {IProduct} from '../../../redux/interface/products';

interface StoreProps extends NavigProps<null> {
  productData?: IProduct[];
}
const OtherWallStore = ({navigation, productData}: StoreProps) => {
  // console.log();
  // console.log(productData);
  return (
    <View style={tw`px-[4%]`}>
      <View
        style={tw`flex-row flex-wrap  gap-2 md:gap-3 tablet:gap-16 tablet:justify-center`}>
        {productData?.map((item, index) => (
          <ProductCard
            key={index}
            item={item}
            onPress={() => {
              navigation?.navigate('ProductDetails', {item: item});
            }}
          />
        ))}
      </View>
    </View>
  );
};

export default OtherWallStore;
