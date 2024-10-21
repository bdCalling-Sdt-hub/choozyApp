import React from 'react';
import {View} from 'react-native';
import productData from '../../../assets/database/product.json';
import ProductCard from '../../../components/cards/ProductCard';
import {useToast} from '../../../components/modals/Toaster';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

const BuyingOrder = ({navigation}: NavigProps<null>) => {
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
              title: 'You get your product?',
              titleStyle: tw`text-2xl`,
              content: 'Please Confirm by pressing received ',
              contentStyle: tw`text-sm`,
              multipleButton: [
                {
                  buttonText: 'Reject',
                  buttonStyle: tw`bg-red-600 w-[35%] self-center`,
                  onPress: () => {
                    // navigation?.navigate('MyProductDetails', {item: item});
                    closeToast();
                  },
                },
                {
                  buttonText: 'Received',
                  buttonStyle: tw`bg-primary w-[35%] self-center`,
                  onPress: () => {
                    // navigation?.navigate('MyProductDetails', {item: item});
                    closeToast();
                  },
                },
              ],
              multipleBTNStyle: tw`justify-between`,
              containerStyle: tw`w-5/6`,
            });
          }}
        />
      ))}
    </View>
  );
};

export default BuyingOrder;
