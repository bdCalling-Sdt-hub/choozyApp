import {ScrollView, Text, TouchableOpacity, View} from 'react-native';

import React from 'react';
import BackButton from '../../components/backHeader/BackButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import BuyingOrders from './components/BuyingOrders';
import SellOrder from './components/SellOrder';

const OrdersHistory = ({navigation}: NavigProps<null>) => {
  const [options, setOptions] = React.useState('Buying Orders');

  return (
    <View style={tw`flex-1 bg-base`}>
      <BackButton
        onPress={() => navigation?.goBack()}
        title="Orders History"
        containerStyle={tw`bg-white`}
      />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`px-[4%] bg-white mt-2 pb-12`}>
        {/*================= options here =================== */}
        <View style={tw`flex-row items-center gap-1  py-2`}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setOptions('Buying Orders')}
            style={tw`h-11 px-3 ${
              options == 'Buying Orders'
                ? 'border-b-[3px] border-b-primary'
                : 'border-b-[3px] border-b-white'
            }  justify-center items-center`}>
            <Text
              style={tw` ${
                options == 'Buying Orders' ? 'text-primary' : 'text-[#34303E]'
              } font-NunitoSansBold text-sm`}>
              Buying Orders
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setOptions('Sell Orders')}
            style={tw`h-11 px-3 ${
              options == 'Sell Orders'
                ? 'border-b-[3px] border-b-primary'
                : 'border-b-[3px] border-b-white'
            }  justify-center items-center`}>
            <Text
              style={tw` ${
                options == 'Sell Orders' ? 'text-primary' : 'text-[#34303E]'
              } font-NunitoSansBold text-sm`}>
              Sell Orders
            </Text>
          </TouchableOpacity>
        </View>

        <View>
          {options === 'Buying Orders' ? (
            <BuyingOrders navigation={navigation} />
          ) : (
            <SellOrder navigation={navigation} />
          )}
        </View>
      </ScrollView>
    </View>
  );
};

export default OrdersHistory;
