import PopUpModal, {PopUpModalRef} from '../../../components/modals/PopUpModal';

import React from 'react';
import {View} from 'react-native';
import productData from '../../../assets/database/product.json';
import ProductCard from '../../../components/cards/ProductCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';

const SellOrder = ({navigation}: NavigProps<null>) => {
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
              title: 'Are you sure?',
              titleStyle: tw`text-2xl`,
              content: 'You want to deliver this product.',
              contentStyle: tw`text-sm`,
              buttonText: 'Deliver',
              onPress: () => {
                // navigation?.navigate('MyProductDetails', {item: item});
                popUpModalRef?.current?.close();
              },
              buttonStyle: tw`bg-primary w-[35%] self-center`,
              containerStyle: tw`w-5/6`,
            });
          }}
        />
      ))}
      <PopUpModal ref={popUpModalRef} />
    </View>
  );
};

export default SellOrder;
