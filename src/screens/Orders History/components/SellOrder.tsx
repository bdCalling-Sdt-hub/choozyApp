import {FlatList, RefreshControl} from 'react-native';
import {
  useAcceptOrderMutation,
  useGetSellerOrdersQuery,
  useRequestDeliveryMutation,
} from '../../../redux/apiSlices/order';

import React from 'react';
import NoFoundCard from '../../../components/cards/NoFoundCard';
import OrderCard from '../../../components/cards/OrderCard';
import {useToast} from '../../../components/modals/Toaster';
import {NavigProps} from '../../../interfaces/NaviProps';
import tw from '../../../lib/tailwind';
import {PrimaryColor} from '../../../utils/utils';

const SellOrder = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const {data: sellerOrder, isLoading, refetch} = useGetSellerOrdersQuery({});

  const [acceptOrder, orderResults] = useAcceptOrderMutation({});
  const [requestDelivery, requestResults] = useRequestDeliveryMutation({});

  return (
    <FlatList
      refreshControl={
        <RefreshControl
          onRefresh={() => refetch()}
          refreshing={isLoading}
          colors={[PrimaryColor]}
        />
      }
      contentContainerStyle={tw` px-[4%] pt-5 pb-10 gap-3`}
      ListEmptyComponent={<NoFoundCard title="No Orders" />}
      showsVerticalScrollIndicator={false}
      data={sellerOrder?.data}
      renderItem={({item, index}) => (
        <OrderCard
          secondButtonText="Deliver"
          onPressFirstButton={async () => {
            // "accept Order"
            if (item.status === 'pending') {
              const res = await acceptOrder({
                order_id: item.order_id,
                _method: 'PUT',
              });
              console.log(res);
              if (res.data) {
                showToast({
                  title: 'Order Accepted Successfully',
                  titleStyle: tw`py-8  bg-gray-50 font-NunitoSansBold rounded-md`,
                  buttonStyle: tw`bg-primary`,
                  onPress: closeToast,
                });
              }
              if (res.error) {
                showToast({
                  title: res.error?.message,
                  titleStyle: tw`py-8 text-yellow-500 bg-gray-50 font-NunitoSansBold rounded-md`,
                  buttonStyle: tw`bg-primary`,
                  onPress: closeToast,
                });
              }
            }
            // "request Delivery"
            if (item.status === 'accepted') {
              const res = await requestDelivery({
                order_id: item.order_id,
                _method: 'PUT',
              });
              // console.log(res);
              if (res.data) {
                showToast({
                  title: 'Delivery Requested Send Successfully',
                  titleStyle: tw`py-8  bg-gray-50 font-NunitoSansBold rounded-md`,
                  buttonStyle: tw`bg-primary`,
                  onPress: closeToast,
                });
              }
              if (res.error) {
                showToast({
                  title: res.error?.message,
                  titleStyle: tw`py-8 text-yellow-500 bg-gray-50 font-NunitoSansBold rounded-md`,
                  buttonStyle: tw`bg-primary`,
                  onPress: closeToast,
                });
              }
            }
          }}
          firstButtonText={
            item.status === 'pending'
              ? 'Accept Order'
              : item.status === 'accepted'
              ? 'Request Delivery'
              : 'Accept'
          }
          firstButtonStyle={
            item.status === 'pending' ? tw`bg-yellow-600` : tw``
          }
          onlyFirst={
            item.status === 'pending' ||
            item.status === 'accepted' ||
            item.status === 'acceptDelivery' ||
            item.status === 'deliveryRequest' ||
            item.status === 'rejectDelivery'
          }
          onlySecond={
            (item.status !== 'accepted' &&
              item.status !== 'pending' &&
              item.status === 'deliveryRequest') ||
            item.status === 'rejectDelivery' ||
            item.status === 'acceptDelivery'
          }
          key={index}
          item={item}
        />
      )}
    />
  );
};

export default SellOrder;
