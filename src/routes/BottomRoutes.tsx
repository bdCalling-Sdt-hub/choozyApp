import {
  IconCall,
  IconFillCall,
  IconFillMessage,
  IconFillNote,
  IconFillUser,
  IconFillUserPlus,
  IconFillWallet,
  IconMessage,
  IconNote,
  IconUserB,
  IconUserPlus,
  IconWallet,
} from '../icons/icons';
import {Text, TouchableOpacity} from 'react-native';

import {Android} from '../utils/utils';
import ChatsScreen from '../screens/chats/ChatsScreen';
import ContactScreen from '../screens/contacts/ContactScreen';
import MyWall from '../screens/wall/MyWall';
import StatusScreen from '../screens/status/StatusScreen';
import {SvgXml} from 'react-native-svg';
import WalletScreen from '../screens/wallet/WalletScreen';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import tw from '../lib/tailwind';

const Tab = createBottomTabNavigator();
// height: 65,
// backgroundColor : "#ffffff",
// borderTopWidth: 0,
// elevation: 0,
// shadowOpacity: 0,
function BottomRoutes() {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarStyle: tw` ${
          Android ? 'h-16' : 'h-26'
        } bg-white shadow-none border border-white`,
        tabBarItemStyle: tw`my-[10px] tablet:my-5 flex-col`,
        tabBarLabelStyle: tw``,
        tabBarButton: props => <TouchableOpacity {...props} />,
        tabBarIcon: ({focused}) => {
          let icon: any;

          switch (route.name) {
            case 'Chats':
              icon = focused ? IconFillMessage : IconMessage;
              break;
            case 'Status':
              icon = focused ? IconFillNote : IconNote;
              break;
            case 'People':
              icon = focused ? IconFillUserPlus : IconUserPlus;
              break;
            case 'Contacts':
              icon = focused ? IconFillUserPlus : IconUserPlus;
              break;
            case 'Calls':
              icon = focused ? IconFillCall : IconCall;
              break;
            case 'Wallet':
              icon = focused ? IconFillWallet : IconWallet;
              break;
            case 'Wall':
              icon = focused ? IconFillUser : IconUserB;
              break;
          }

          return <SvgXml xml={icon} />;
        },
        tabBarLabel: ({focused}) => {
          const color = focused ? '#4964C6' : '#5D5D5D';
          const font = focused ? 'NunitoSansBold' : 'NunitoSansRegular';
          return (
            <Text
              style={{
                color,
                fontSize: 12,
                textTransform: 'capitalize',
                fontFamily: font,
              }}>
              {route.name}
            </Text>
          );
        },
      })}>
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Status" component={StatusScreen} />
      {/* <Tab.Screen name="People" component={PeopleScreen} /> */}
      <Tab.Screen name="Contacts" component={ContactScreen} />
      {/* <Tab.Screen name="Calls" component={CallsScreen} /> */}
      <Tab.Screen name="Wallet" component={WalletScreen} />
      <Tab.Screen name="Wall" component={MyWall} />
    </Tab.Navigator>
  );
}

export default BottomRoutes;
