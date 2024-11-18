import React from 'react';
import {View} from 'react-native';
import OrderCard from '../../../components/cards/OrderCard';
import {useToast} from '../../../components/modals/Toaster';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {useGetSellerOrdersQuery} from '../../../redux/apiSlices/order';

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
