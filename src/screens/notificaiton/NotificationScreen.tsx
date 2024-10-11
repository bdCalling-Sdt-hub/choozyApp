import {FlatList, RefreshControl, Text, View} from 'react-native';
import {
  useGetNotificationsQuery,
  useReadAllNotificationMutation,
  useReadNotificationMutation,
} from '../../redux/apiSlices/notificaiton';

import React from 'react';
import BackButton from '../../components/backHeader/BackButton';
import NotificationCard from '../../components/cards/NotificationCard';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const NotificationScreen = ({navigation}: NavigProps<null>) => {
  const {data, refetch, isLoading} = useGetNotificationsQuery({});
  const [readAll] = useReadAllNotificationMutation();
  const [singleRead] = useReadNotificationMutation();

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackButton onPress={() => navigation?.goBack()} />
      <View style={tw`px-[4%] py-1 flex-row justify-between items-center`}>
        <View style={tw`flex-row items-center gap-3`}>
          <Text
            style={tw`text-color-Black1000 font-NunitoSansBold text-[24px]`}>
            Notifications
          </Text>
          {data?.data?.filter(item => item.read_at === null).length > 0 && (
            <View
              style={tw`w-6 h-6 bg-red-500 rounded-[10px] justify-center items-center`}>
              <Text style={tw`text-white font-NunitoSansBold text-[10px]`}>
                {data?.data?.filter(item => item.read_at === null).length}
              </Text>
            </View>
          )}
        </View>
        <Text
          onPress={() => readAll({})}
          style={tw`text-primary font-NunitoSansBold text-[12px]`}>
          Read all
        </Text>
      </View>

      <FlatList
        refreshControl={
          <RefreshControl
            refreshing={isLoading}
            onRefresh={refetch}
            colors={['#4964C6']}
          />
        }
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pt-2 pb-6`}
        data={data?.data}
        renderItem={({item, index}) => (
          <>
            <NotificationCard
              item={item}
              onPress={() => {
                if (item.read_at === null) {
                  singleRead(item.id);
                }
              }}
            />
          </>
        )}
      />
    </View>
  );
};

export default NotificationScreen;
