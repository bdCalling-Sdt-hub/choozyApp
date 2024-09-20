import { FlatList, Text, View } from 'react-native';

import BackButton from '../../components/backHeader/BackButton';
import { NavigProps } from '../../interfaces/NaviProps';
import NotificationCard from '../../components/cards/NotificationCard';
import NotificationData from '../../assets/database/notificaiton.json';
import React from 'react';
import tw from '../../lib/tailwind';

const NotificationScreen = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton onPress={() => navigation?.goBack()} />
      <View style={tw`px-[4%] py-1 flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center gap-3`}>
          <Text style={tw`text-color-Black1000 font-NunitoSansBold text-[24px]`}>Notifications</Text>
          <View style={tw`w-6 h-6 bg-red-500 rounded-[10px] justify-center items-center`}>
            <Text style={tw`text-white font-NunitoSansBold text-[10px]`}>5</Text>
          </View>
        </View>
        <Text style={tw`text-primary font-NunitoSansBold text-[12px]`}>Read all</Text>
      </View>
      
      <FlatList showsVerticalScrollIndicator={false} contentContainerStyle={tw`pt-2 pb-6`} data={NotificationData}  renderItem={({item,index})=><>
      
        <NotificationCard item={item} />

      </>}/>

    </View>
  );
};

export default NotificationScreen;
