import React, {Suspense} from 'react';
import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import ActionModal from '../../components/modals/ActionModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetProfileQuery} from '../../redux/apiSlices/authSlice';
import {useGetShopQuery} from '../../redux/apiSlices/shopSlices';
import {getSocket} from '../../redux/services/socket';

// import Chats from './components/Chats';
// import GroupsSection from './components/GroupsSection';

// import Chats from './components/Chats';

// import GroupsSection from './components/GroupsSection';

// lazy load
const Chats = React.lazy(() => import('./components/Chats'));
const GroupsSection = React.lazy(() => import('./components/GroupsSection'));

const ChatsScreen = ({navigation}: NavigProps<null>) => {
  //***** its needed to add this line don't remove it**********
  const {data: userInfo} = useGetProfileQuery({});
  //******************
  const [actionModalOpen, setActionModalOpen] = React.useState(false);

  // console.log(userInfo);

  // console.log(JSON.stringify(MessagesData, null, 2));
  const [options, setOptions] = React.useState<'Chats' | 'Groups'>('Chats');

  const {data: Shop} = useGetShopQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // console.log(userInfo?.data);
  // console.log(Shop);
  // console.log(lStorage.getString('token'));

  // all socket login when user come to this screen
  const socket = getSocket();
  React.useEffect(() => {
    if (userInfo?.data) {
      socket?.emit('login', {id: userInfo?.data?.id});
    }
  }, [userInfo?.data]);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================= header here =================== */}
      <View>
        <LogoWithHeader
          offMenu
          searchOffItem={{
            offPeople: true,
            offPost: true,
            offProduct: true,
          }}
          onFinish={text => {
            navigation?.navigate('Search', {
              text,
            });
          }}
          navigation={navigation}
        />
      </View>

      {/*================= options here =================== */}
      <View style={tw`flex-row items-center gap-1 px-[4%] py-2`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOptions('Chats')}
          style={tw`h-11 px-3 ${
            options == 'Chats'
              ? 'border-b-[3px] border-b-primary'
              : 'border-b-[3px] border-b-white'
          }  justify-center items-center`}>
          <Text
            style={tw` ${
              options == 'Chats' ? 'text-primary' : 'text-[#34303E]'
            } font-NunitoSansBold text-sm`}>
            Chats
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOptions('Groups')}
          style={tw`h-11 px-3 ${
            options == 'Groups'
              ? 'border-b-[3px] border-b-primary'
              : 'border-b-[3px] border-b-white'
          }  justify-center items-center`}>
          <Text
            style={tw` ${
              options == 'Groups' ? 'text-primary' : 'text-[#34303E]'
            } font-NunitoSansBold text-sm`}>
            Groups
          </Text>
        </TouchableOpacity>
      </View>

      {/*================= messages list/card here =================== */}
      {options == 'Chats' ? (
        <>
          <Suspense
            fallback={
              <View style={tw`flex-1`}>
                <ActivityIndicator color="#4964C6" />
              </View>
            }>
            <Chats navigation={navigation} />
          </Suspense>
        </>
      ) : (
        options == 'Groups' && (
          <Suspense
            fallback={
              <View style={tw`flex-1`}>
                <ActivityIndicator color="#4964C6" />
              </View>
            }>
            <GroupsSection navigation={navigation} />
          </Suspense>
        )
      )}

      <ActionModal
        visible={actionModalOpen}
        setVisible={setActionModalOpen}
        actionData={[
          {
            title: 'My Wallet',
            onPress: () => {
              setActionModalOpen(false);
              navigation?.navigate('Wallet');
            },
          },
          {
            title: 'My Status',
            onPress: () => {
              setActionModalOpen(false);
              navigation?.navigate('MyWall');
            },
          },
          // {
          //   title: 'My Wall',

          //   onPress: () => {
          //     setActionModalOpen(false);
          //     navigation?.navigate('MyWall');
          //   },
          // },
          {
            title: 'My Stores',
            onPress: () => {
              setActionModalOpen(false);
              if (Shop?.data?.id) {
                navigation?.navigate('MyWall', {state: 'store'});
              } else navigation?.navigate('CreateShop');
            },
          },
          // {
          //   title: 'Favs',
          //   onPress: () => {},
          // },
        ]}
      />

      <StatusBar barStyle="dark-content" backgroundColor="white" />
    </View>
  );
};

export default ChatsScreen;
