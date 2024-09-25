import * as React from 'react';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Text, TouchableOpacity, View} from 'react-native';
import {
  IconCard,
  IconClockBlue,
  IconCopyBoardBlue,
  IconExit,
  IconQuestionBlue,
  IconSettingBlue,
  IconSupportedBlue,
} from '../icons/icons';

import {NavigationContainer} from '@react-navigation/native';
import {useDeviceContext} from 'twrnc';
import IButton from '../components/buttons/IButton';
import tw from '../lib/tailwind';
import AppRoutes from './AppRoutes';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView showsVerticalScrollIndicator={false} {...props}>
      <DrawerItemList {...props} />
      <View style={tw`flex-col flex-1 px-6 py-8 gap-10 `}>
        <TouchableOpacity
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
        <View style={tw`flex-1 `}>
          <TouchableOpacity
            onPress={() => {
              props.navigation.navigate('Login');
            }}
            style={tw` flex-row gap-3 items-center`}>
            <IButton
              svg={IconExit}
              containerStyle={tw`w-12 h-12 bg-[#FEF2F2] shadow-none`}
            />
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-xs md:text-sm`}>
              Sing Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </DrawerContentScrollView>
  );
}

const Drawer = createDrawerNavigator();

export default function CustomDrawer() {
  useDeviceContext(tw);
  return (
    <NavigationContainer>
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
          component={AppRoutes}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
