import React from 'react';
import {View} from 'react-native';
import OrderCard from '../../../components/cards/OrderCard';
import {useToast} from '../../../components/modals/Toaster';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {useGetUserOrdersQuery} from '../../../redux/apiSlices/order';

const BuyingOrder = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();

  const {data: BuyerOrder} = useGetUserOrdersQuery({});

  return (
    <View style={tw` gap-5`}>
      {BuyerOrder?.data.map((item, index) => (
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

export default BuyingOrder;
