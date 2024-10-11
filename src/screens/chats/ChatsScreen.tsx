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
import {useGetMassagesQuery} from '../../redux/apiSlices/message';
import Contacts from './components/Contacts';
import GroupsSection from './components/GroupsSection';

// import Contacts from './components/Contacts';

// import GroupsSection from './components/GroupsSection';

// lazy load
// const Contacts = React.lazy(() => import('./components/Contacts'));
// const GroupsSection = React.lazy(() => import('./components/GroupsSection'));

const ChatsScreen = ({navigation}: NavigProps<null>) => {
  const [actionModalOpen, setActionModalOpen] = React.useState(false);

  const {data: messagesData} = useGetMassagesQuery({});

  // console.log(JSON.stringify(MessagesData, null, 2));
  const [options, setOptions] = React.useState<'contacts' | 'groups'>(
    'contacts',
  );

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
          onPress={() => setOptions('contacts')}
          style={tw`h-11 px-3 ${
            options == 'contacts'
              ? 'border-b-[3px] border-b-primary'
              : 'border-b-[3px] border-b-white'
          }  justify-center items-center`}>
          <Text
            style={tw` ${
              options == 'contacts' ? 'text-primary' : 'text-[#34303E]'
            } font-NunitoSansBold text-sm`}>
            Contacts
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
      {options == 'contacts' ? (
        <>
          <Suspense
            fallback={
              <View style={tw`flex-1`}>
                <ActivityIndicator color="#4964C6" />
              </View>
            }>
            <Contacts navigation={navigation} />
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
              navigation?.navigate('CreateShop');
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
