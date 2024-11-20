import {NavigProps} from '../../../interfaces/NaviProps';
import OrderCard from '../../../components/cards/OrderCard';
import React from 'react';
import {View} from 'react-native';
import tw from '../../../lib/tailwind';
import {useGetUserOrdersQuery} from '../../../redux/apiSlices/order';
import {useToast} from '../../../components/modals/Toaster';

const BuyingOrder = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();

  const {data: BuyerOrder} = useGetUserOrdersQuery({});

  return (
    <View style={tw` gap-5`}>
      {BuyerOrder?.data.map((item, index) => (
        <OrderCard
          secondButtonText="Deliver"
          firstButtonText="Cancel"
          onlyFirst
          key={index}
          item={item}
        />
      ))}
    </View>
  );
};

export default BuyingOrder;
