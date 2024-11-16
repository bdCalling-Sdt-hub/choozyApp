import {
  ActivityIndicator,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {Suspense} from 'react';

import ActionModal from '../../components/modals/ActionModal';
import Chats from './components/Chats';
import GroupsSection from './components/GroupsSection';
import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import {NavigProps} from '../../interfaces/NaviProps';
import {setUser} from '../../redux/slices/userSlices';
import tw from '../../lib/tailwind';
import {useDispatch} from 'react-redux';
import {useGetMassagesQuery} from '../../redux/apiSlices/message';
import {useGetProfileQuery} from '../../redux/apiSlices/authSlice';
import {useGetShopQuery} from '../../redux/apiSlices/shopSlices';

// import Chats from './components/Chats';

// import GroupsSection from './components/GroupsSection';

// lazy load
// const Chats = React.lazy(() => import('./components/Chats'));
// const GroupsSection = React.lazy(() => import('./components/GroupsSection'));

const ChatsScreen = ({navigation}: NavigProps<null>) => {
  const dispatch = useDispatch();
  const [actionModalOpen, setActionModalOpen] = React.useState(false);
  const {data: userInfo} = useGetProfileQuery({});
  // console.log(userInfo);
  const {data: messagesData} = useGetMassagesQuery({});

  // console.log(JSON.stringify(MessagesData, null, 2));
  const [options, setOptions] = React.useState<'Chats' | 'groups'>('Chats');

  const {data: Shop} = useGetShopQuery(
    {},
    {
      refetchOnMountOrArgChange: true,
    },
  );

  // console.log(userInfo?.data);
  // console.log(Shop);
  // console.log(lStorage.getString('token'));

  React.useEffect(() => {
    dispatch(setUser(userInfo?.data));
  }, [userInfo]);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================= header here =================== */}
      <LogoWithHeader
        offSearch
        searchOffItem={{
          offPost: true,
          offProduct: true,
        }}
        onPressMenu={() => setActionModalOpen(!actionModalOpen)}
        navigation={navigation}
      />

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
          onPress={() => setOptions('groups')}
          style={tw`h-11 px-3 ${
            options == 'groups'
              ? 'border-b-[3px] border-b-primary'
              : 'border-b-[3px] border-b-white'
          }  justify-center items-center`}>
          <Text
            style={tw` ${
              options == 'groups' ? 'text-primary' : 'text-[#34303E]'
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
        <Suspense
          fallback={
            <View style={tw`flex-1`}>
              <ActivityIndicator color="#4964C6" />
            </View>
          }>
          <GroupsSection navigation={navigation} />
        </Suspense>
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
