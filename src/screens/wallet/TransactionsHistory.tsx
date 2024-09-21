import React from 'react';
import {View} from 'react-native';
import transaction from '../../assets/database/transaction.json';
import BackWithTitle from '../../components/backHeader/BackWithTitle';
import TransactionCard from '../../components/cards/TransactionCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const TransactionsHistory = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithTitle title="History" onPress={() => navigation?.goBack()} />
      <View style={tw`px-[4%] pb-3`}>
        {transaction?.map((item, index) => {
          return <TransactionCard item={item} key={index} />;
        })}
      </View>
    </View>
  );
};

export default TransactionsHistory;
