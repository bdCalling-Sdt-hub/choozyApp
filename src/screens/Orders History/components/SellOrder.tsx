import React from 'react';
import {View} from 'react-native';
import productData from '../../../assets/database/product.json';
import ProductCard from '../../../components/cards/ProductCard';
import {useToast} from '../../../components/modals/Toaster';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

const SellOrder = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  return (
    <View style={tw`flex-row flex-wrap justify-between gap-3`}>
      {productData?.map((item, index) => (
        <ProductCard
          showStatus={true}
          status="Delivered"
          key={index}
          item={item}
          onPress={() => {
            // navigation?.navigate('MyProductDetails', {item: item});
            showToast({
              title: 'Are you sure?',
              titleStyle: tw`text-2xl`,
              content: 'You want to deliver this product.',
              contentStyle: tw`text-sm`,
              buttonText: 'Deliver',
              onPress: () => {
                // navigation?.navigate('MyProductDetails', {item: item});
                closeToast();
              },
              buttonStyle: tw`bg-primary w-[35%] self-center`,
              containerStyle: tw`w-5/6`,
            });
          }}
        />
      ))}
    </View>
  );
};

export default SellOrder;
