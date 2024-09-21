import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IconMenu,
  IconPlus,
  IconPost,
  IconPostBlue,
  IconStore,
  IconStoreBlue,
} from '../../icons/icons';

import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import Post from './components/Post';
import Store from './components/Store';

const MyWall = ({navigation}: NavigProps<null>) => {
  const [options, setOptions] = React.useState('post');

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title="My Wall"
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <IButton
            onPress={() => {
              navigation?.dispatch(DrawerActions.openDrawer());
            }}
            svg={IconMenu}
            containerStyle={tw`w-12  h-12 bg-primary50 shadow-none`}
          />
        }
        onPress={() => {
          navigation?.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={tw`pb-6`}
        showsVerticalScrollIndicator={false}>
        <View style={tw`px-[4%]`}>
          <View style={tw`flex-row items-center justify-between gap-8 my-5`}>
            <FastImage
              style={tw`w-16 h-16 rounded-3xl`}
              source={{
                uri: 'https://randomuser.me/api/portraits/men/19.jpg',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={tw`flex-1 flex-row justify-between`}>
              <View style={tw`justify-center items-center`}>
                <Text
                  style={tw`text-color-Black800 font-NunitoSansBold text-[24px]`}>
                  236
                </Text>
                <Text
                  style={tw`text-[#A5A3A9] font-NunitoSansBold text-[12px]`}>
                  Posts
                </Text>
              </View>
              <View style={tw`justify-center items-center`}>
                <Text
                  style={tw`text-color-Black800 font-NunitoSansBold text-[24px]`}>
                  18.7k
                </Text>
                <Text
                  style={tw`text-[#A5A3A9] font-NunitoSansBold text-[12px]`}>
                  Followers
                </Text>
              </View>
              <View style={tw`justify-center items-center`}>
                <Text
                  style={tw`text-color-Black800 font-NunitoSansBold text-[24px]`}>
                  79
                </Text>
                <Text
                  style={tw`text-[#A5A3A9] font-NunitoSansBold text-[12px]`}>
                  Following
                </Text>
              </View>
            </View>
          </View>
          <View style={tw`gap-2`}>
            <Text
              style={tw`text-color-Black800 font-NunitoSansBold text-[16px]`}>
              Sam
            </Text>
            <Text
              style={tw`text-[#A5A3A9] font-NunitoSansRegular text-[12px] leading-4`}>
              Cut from geometric cotton lace mimicking decorative fretwork, this
              blouse reveals hints of skin offsetting its long-sleeve silhouette
            </Text>
          </View>
        </View>

        {/*================= options here =================== */}
        <View style={tw`flex-row items-center gap-3 px-[4%] my-4`}>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setOptions('post')}
            style={tw`h-11 px-2 flex-row gap-2  ${
              options == 'post'
                ? 'border-b-[3px] border-b-primary'
                : 'border-b-[3px] border-b-white'
            }  justify-center items-center`}>
            <SvgXml xml={options == 'post' ? IconPostBlue : IconPost} />
            <Text
              style={tw` ${
                options == 'post' ? 'text-primary' : 'text-[#34303E]'
              } font-NunitoSansBold text-[14px]`}>
              Post
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={() => setOptions('store')}
            style={tw`h-11 px-2 gap-2 ${
              options == 'store'
                ? 'border-b-[3px] border-b-primary'
                : 'border-b-[3px] border-b-white'
            }  justify-center items-center flex-row `}>
            <SvgXml xml={options == 'store' ? IconStoreBlue : IconStore} />
            <Text
              style={tw` ${
                options == 'store' ? 'text-primary' : 'text-[#34303E]'
              } font-NunitoSansBold text-[14px]`}>
              Store
            </Text>
          </TouchableOpacity>
        </View>

        {options == 'post' ? <Post /> : <Store />}
      </ScrollView>

      {/* floating icon here */}
      <IButton
        onPress={() => {}}
        svg={IconPlus}
        containerStyle={tw`absolute bottom-10 right-6 h-12 w-12 rounded-3xl items-center justify-center bg-Primary900 `}
      />
    </View>
  );
};

export default MyWall;
