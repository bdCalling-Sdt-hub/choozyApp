import {FlatList, RefreshControl} from 'react-native';
import {
  useAcceptDeliveryMutation,
  useCancelOrderMutation,
  useGetUserOrdersQuery,
  useRejectDeliveryMutation,
} from '../../../redux/apiSlices/order';

import {NavigProps} from '../../../interfaces/NaviProps';
import NoFoundCard from '../../../components/cards/NoFoundCard';
import OrderCard from '../../../components/cards/OrderCard';
import {PrimaryColor} from '../../../utils/utils';
import React from 'react';
import tw from '../../../lib/tailwind';
import {useToast} from '../../../components/modals/Toaster';

const BuyingOrder = ({navigation, route}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();

  const {data: BuyerOrder, isLoading, refetch} = useGetUserOrdersQuery({});
  // console.log(BuyerOrder);
  const [cancelOrder, cancelResults] = useCancelOrderMutation({});
  const [acceptDelivery, acceptResults] = useAcceptDeliveryMutation({});
  const [rejectDelivery, rejectResults] = useRejectDeliveryMutation({});
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
      data={BuyerOrder?.data}
      renderItem={({item, index}) => (
        <OrderCard
          onPressFirstButton={async () => {
            if (item.status === 'pending') {
              console.log({
                order_id: item.order_id,
                _method: 'PUT',
              });
              const res = await cancelOrder({
                order_id: item.order_id,
                _method: 'PUT',
              });
              console.log(res);
              if (res.data) {
                showToast({
                  title: 'Order Cancelled',

                  titleStyle: tw`py-8 text-rose-500 bg-gray-50 font-NunitoSansBold rounded-md`,
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
            if (item.status === 'deliveryRequest') {
              console.log({
                order_id: item.order_id,
                _method: 'PUT',
              });
              const res = await acceptDelivery({
                order_id: item.order_id,
                _method: 'PUT',
              });
              console.log(res);
              if (res.data) {
                showToast({
                  title: 'Delivery Accepted Successfully',
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
          onPressSecondButton={async () => {
            if (item.status === 'deliveryRequest') {
              const res = await rejectDelivery({
                order_id: item.order_id,
                _method: 'PUT',
              });
              console.log(res);
              if (res.data) {
                showToast({
                  title: 'Delivery Rejected Successfully',
                  titleStyle: tw`py-8  bg-gray-50 font-NunitoSansBold rounded-md`,
                  buttonStyle: tw`bg-primary`,
                  onPress: closeToast,
                });
              }
              if (res.error) {
                showToast({
                  title: 'Warning',
                  content: res.error?.message,
                  titleStyle: tw`py-8 text-yellow-500 bg-gray-50 font-NunitoSansBold rounded-md`,
                  buttonStyle: tw`bg-primary`,
                  onPress: closeToast,
                });
              }
            }
            if (item.status === 'accepted') {
              const res = await rejectDelivery({
                order_id: item.order_id,
                _method: 'PUT',
              });
              console.log(res);
              if (res.data) {
                showToast({
                  title: 'Order Rejected Successfully',
                  titleStyle: tw`py-8  bg-gray-50 font-NunitoSansBold rounded-md`,
                  buttonStyle: tw`bg-primary`,
                  onPress: closeToast,
                });
              }
              if (res.error) {
                showToast({
                  title: 'Warning',
                  content: res.error?.message,
                  titleStyle: tw`py-8 text-yellow-500 bg-gray-50 font-NunitoSansBold rounded-md`,
                  buttonStyle: tw`bg-primary`,
                  onPress: closeToast,
                });
              }
            }
          }}
          firstButtonText={item.status === 'pending' ? 'Cancel' : 'Accept'}
          secondButtonText={
            item.status === 'deliveryRequest' || item.status === 'accepted'
              ? 'Reject'
              : ''
          }
          onlyFirst={
            item.status === 'pending' ||
            item.status === 'acceptDelivery' ||
            item.status === 'rejectDelivery' ||
            item.status === 'amountReturned'
          }
          onlySecond={
            item.status === 'accepted' ||
            item.status === 'acceptDelivery' ||
            item.status === 'rejectDelivery' ||
            item.status === 'amountReturned'
          }
          firstButtonStyle={item.status === 'pending' ? tw`bg-red-800` : tw``}
          key={index}
          item={item}
        />
      )}
    />
  );
};

export default BuyingOrder;
