import {FlatList, RefreshControl, View} from 'react-native';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import {NavigProps} from '../../interfaces/NaviProps';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import TransactionCard from '../../components/cards/TransactionCard';
import tw from '../../lib/tailwind';
import {useGetPaymentHistoryQuery} from '../../redux/apiSlices/paymentSlices';

const TransactionsHistory = ({navigation}: NavigProps<null>) => {
  const {data: transaction, isLoading, refetch} = useGetPaymentHistoryQuery({});
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithTitle title="History" onPress={() => navigation?.goBack()} />
      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={() => refetch()}
            colors={[PrimaryColor]}
          />
        }
        contentContainerStyle={tw`px-[4%] pb-3`}
        data={transaction?.data?.transactions}
        renderItem={({item}) => <TransactionCard item={item} />}
      />
    </View>
  );
};

export default TransactionsHistory;
