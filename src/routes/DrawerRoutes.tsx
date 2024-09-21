import * as React from 'react';

import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
  createDrawerNavigator,
} from '@react-navigation/drawer';
import {Text, TouchableOpacity, View} from 'react-native';

import IButton from '../components/buttons/IButton';
import {IconCard} from '../icons/icons';
import tw from '../lib/tailwind';
import MyWall from '../screens/wall/MyWall';

function CustomDrawerContent(props: DrawerContentComponentProps) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <View style={tw`px-6 py-8 gap-10`}>
        <TouchableOpacity style={tw`flex-row gap-3 items-center`}>
          <IButton
            svg={IconCard}
            containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
          />
          <Text style={tw`text-color-Black800 font-NunitoSansBold text-sm`}>
            My Wallet
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row gap-3 items-center`}>
          <IButton
            svg={IconCard}
            containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
          />
          <Text style={tw`text-color-Black800 font-NunitoSansBold text-sm`}>
            History
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row gap-3 items-center`}>
          <IButton
            svg={IconCard}
            containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
          />
          <Text style={tw`text-color-Black800 font-NunitoSansBold  `}>
            Terms & Conditions
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row gap-3 items-center`}>
          <IButton
            svg={IconCard}
            containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
          />
          <Text style={tw`text-color-Black800 font-NunitoSansBold text-sm`}>
            FAQ
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row gap-3 items-center`}>
          <IButton
            svg={IconCard}
            containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
          />
          <Text style={tw`text-color-Black800 font-NunitoSansBold text-sm`}>
            Support
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={tw`flex-row gap-3 items-center`}>
          <IButton
            svg={IconCard}
            containerStyle={tw`w-12 h-12 bg-primary50 shadow-none`}
          />
          <Text style={tw`text-color-Black800 font-NunitoSansBold text-sm`}>
            Settings
          </Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
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
        drawerStyle: tw`w-[66%] md:w-[60%] tablet:w-[22%] `,
      }}
      drawerContent={props => <CustomDrawerContent {...props} />}>
      <Drawer.Screen
        options={{
          drawerItemStyle: {display: 'none'}, // Hides the drawer item for the screen
        }}
        name="MyWall"
        component={MyWall}
      />
    </Drawer.Navigator>
  );
}
