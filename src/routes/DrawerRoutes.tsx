import * as React from 'react';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {
  IconClockBlue,
  IconCopyBoardBlue,
  IconExit,
  IconQuestionBlue,
  IconSettingBlue,
  IconStoreBlue,
  IconSupportedBlue,
} from '../icons/icons';
import {Text, TouchableOpacity, View} from 'react-native';

import IButton from '../components/buttons/IButton';
import Routes from './Routes';
import {removeStorageToken} from '../utils/utils';
import tw from '../lib/tailwind';
import {useSelector} from 'react-redux';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const user = useSelector(state => state.user.user);
  // console.log(user);

  return (
    <>
      <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
        <DrawerItemList {...props} />
        <View style={tw`flex-col flex-1 px-6 py-8 gap-10 `}>
          {/* <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Wallet');
            }}
            style={tw`flex-row gap-3 items-center`}>
            <IButton
              svg={IconCard}
              containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
            />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-xs md:text-sm`}>
              My Wallet
            </Text>
          </TouchableOpacity> */}

          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Wallet');
            }}
            style={tw`flex-row gap-3 items-center`}>
            <IButton
              svg={IconStoreBlue}
              containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
            />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-xs md:text-sm`}>
              Create Shop
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('OrderHistory');
            }}
            style={tw`flex-row gap-3 items-center`}>
            <IButton
              svg={IconClockBlue}
              containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
            />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-xs md:text-sm`}>
              History
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('TermsAndCondition');
            }}
            style={tw`flex-row gap-3 items-center`}>
            <IButton
              svg={IconCopyBoardBlue}
              containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
            />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold  text-xs md:text-sm`}>
              Terms & Conditions
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('FAQ');
            }}
            style={tw`flex-row gap-3 items-center`}>
            <IButton
              svg={IconQuestionBlue}
              containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
            />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-xs md:text-sm`}>
              FAQ
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Support');
            }}
            style={tw`flex-row gap-3 items-center`}>
            <IButton
              svg={IconSupportedBlue}
              containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
            />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-xs md:text-sm`}>
              Support
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Settings');
            }}
            style={tw`flex-row gap-3 items-center`}>
            <IButton
              svg={IconSettingBlue}
              containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
            />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-xs md:text-sm`}>
              Settings
            </Text>
          </TouchableOpacity>
        </View>
      </DrawerContentScrollView>
      <View style={tw` py-6 px-6`}>
        <TouchableOpacity
          onPress={() => {
            props.navigation.closeDrawer();
            removeStorageToken();
            props.navigation.reset({routes: [{name: 'Loading'}]});
          }}
          style={tw` flex-row gap-3 items-center`}>
          <IButton
            svg={IconExit}
            containerStyle={tw`w-12 h-12 bg-[#FEF2F2] shadow-none`}
          />
          <Text
            style={tw`text-color-Black800 font-NunitoSansBold text-xs md:text-sm`}>
            Log Out
          </Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

const Drawer = createDrawerNavigator();

export default function CustomDrawer() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right', // Drawer comes from the right
        drawerType: 'slide',
        headerShown: false,
        drawerStyle: tw`w-[66%] md:w-[65%] tablet:w-[22%] h-full`,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'}, // Hides the drawer item for the screen
        }}
        name="App"
        component={Routes}
      />
    </Drawer.Navigator>
  );
}
