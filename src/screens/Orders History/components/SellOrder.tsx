import {NavigProps} from '../../../interfaces/NaviProps';
import OrderCard from '../../../components/cards/OrderCard';
import React from 'react';
import {View} from 'react-native';
import tw from '../../../lib/tailwind';
import {useGetSellerOrdersQuery} from '../../../redux/apiSlices/order';
import {useToast} from '../../../components/modals/Toaster';

const SellOrder = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const {data: sellerOrder} = useGetSellerOrdersQuery({});
  return (
    <View style={tw` gap-5`}>
      {sellerOrder?.data?.map((item, index) => (
        <OrderCard
          secondButtonText="Deliver"
          firstButtonText="Cancel"
          key={index}
          item={item}
        />
      ))}
    </View>
  );
};

export default SellOrder;
