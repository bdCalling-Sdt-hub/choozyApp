import PopUpModal, {PopUpModalRef} from '../../../components/modals/PopUpModal';

import React from 'react';
import {View} from 'react-native';
import productData from '../../../assets/database/product.json';
import ProductCard from '../../../components/cards/ProductCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

const BuyingOrder = ({navigation}: NavigProps<null>) => {
  const popUpModalRef = React.useRef<PopUpModalRef>(null);
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
            popUpModalRef?.current?.open({
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
                    popUpModalRef?.current?.close();
                  },
                },
                {
                  buttonText: 'Received',
                  buttonStyle: tw`bg-primary w-[35%] self-center`,
                  onPress: () => {
                    // navigation?.navigate('MyProductDetails', {item: item});
                    popUpModalRef?.current?.close();
                  },
                },
              ],
              multipleBTNStyle: tw`justify-between`,
              containerStyle: tw`w-5/6`,
            });
          }}
        />
      ))}
      <PopUpModal ref={popUpModalRef} />
    </View>
  );
};

export default BuyingOrder;
