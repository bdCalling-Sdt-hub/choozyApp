import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IconPost,
  IconPostBlue,
  IconStore,
  IconStoreBlue,
} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import OtherWallPost from './components/OtherWallPost';
import OtherWallStore from './components/OtherWallStore';

const Post = React.lazy(() => import('./components/Post'));
const Store = React.lazy(() => import('./components/Store'));

const categoryData = [
  {
    id: 1,
    name: 'Vehicle',
  },
  {
    id: 2,
    name: 'Electronics',
  },
  {
    id: 3,
    name: 'Property',
  },
  {
    id: 4,
    name: 'Study',
  },
  {
    id: 5,
    name: 'Vehicle',
  },
  {
    id: 6,
    name: 'Electronics',
  },
  {
    id: 7,
    name: 'Property',
  },
  {
    id: 8,
    name: 'Study',
  },
  {
    id: 10,
    name: 'Study',
  },
  {
    id: 11,
    name: 'Study',
  },
  {
    id: 12,
    name: 'Study',
  },
];

const OtherWall = ({navigation}: NavigProps<null>) => {
  // console.log(route);
  const [options, setOptions] = React.useState('post');
  const [isPublic, setIsPublic] = React.useState(true);

  const [showAddPostModal, setShowAddPostModal] = React.useState(false);
  const [showAddProductModal, setShowProductPostModal] = React.useState(false);
  const [showCategoryModal, setShowCategoryModal] = React.useState(false);
  const [selectCategory, setSelectCategory] = React.useState('Vehicle');

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title="My Wall"
        containerStyle={tw`justify-between`}
        onPress={() => {
          navigation?.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={tw`pb-6`}
        nestedScrollEnabled
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
            <Text style={tw`text-color-Black800 font-NunitoSansBold text-lg`}>
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
              } font-NunitoSansBold text-sm`}>
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
              } font-NunitoSansBold text-sm`}>
              Store
            </Text>
          </TouchableOpacity>
        </View>

        {options == 'post' ? (
          <OtherWallPost navigation={navigation} />
        ) : (
          <OtherWallStore navigation={navigation} />
        )}
      </ScrollView>
    </View>
  );
};

export default OtherWall;
