import {FlatList, View} from 'react-native';

import React from 'react';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import TransactionCard from '../../components/cards/TransactionCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetPaymentHistoryQuery} from '../../redux/apiSlices/paymentSlices';

const TransactionsHistory = ({navigation}: NavigProps<null>) => {
  const {data: transaction} = useGetPaymentHistoryQuery({});
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithTitle title="History" onPress={() => navigation?.goBack()} />
      <FlatList
        contentContainerStyle={tw`px-[4%] pb-3`}
        data={transaction?.data?.transactions}
        renderItem={({item}) => <TransactionCard item={item} />}
      />
    </View>
  );
};

export default TransactionsHistory;
