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
import SimpleButton from '../../components/buttons/SimpleButton';
import TButton from '../../components/buttons/TButton';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import OtherWallPost from './components/OtherWallPost';
import OtherWallStore from './components/OtherWallStore';

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

  const [isFollow, setIsFollow] = React.useState(false);

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title="Back"
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <TButton
            onPress={() => {
              setIsFollow(!isFollow);
            }}
            title={isFollow ? 'Following' : 'Follow'}
            containerStyle={tw`${
              isFollow ? 'bg-primary' : 'bg-white '
            }   py-1 w-24 `}
            titleStyle={tw`${isFollow ? 'text-white' : 'text-black'}`}
          />
        }
        onPress={() => {
          navigation?.goBack();
        }}
      />
      <ScrollView
        contentContainerStyle={tw`pb-6`}
        nestedScrollEnabled
        showsVerticalScrollIndicator={false}>
        <View style={tw`px-[4%]`}>
          <View
            style={tw`flex-row items-center justify-between tablet:justify-start gap-8  my-5`}>
            <FastImage
              style={tw`w-16 h-16  rounded-3xl`}
              source={{
                uri: 'https://randomuser.me/api/portraits/men/19.jpg',
              }}
              resizeMode={FastImage.resizeMode.contain}
            />
            <View style={tw`flex-1  flex-row justify-between tablet:max-w-72 `}>
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
        <View style={tw`flex-row items-center justify-between px-[4%]  my-4`}>
          <View style={tw`flex-row items-center gap-3 `}>
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
          <View>
            <SimpleButton
              onPress={() => navigation?.navigate('SingleMessage')}
              containerStyle={tw`gap-2  rounded-xl h-8`}
              svgIcon={`<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.9541 0.709802C14.93 0.761862 14.8965 0.810638 14.8536 0.853553L5.40076 10.3064L8.07126 14.7573C8.16786 14.9183 8.34653 15.0116 8.53386 14.9989C8.72119 14.9862 8.88561 14.8696 8.95958 14.697L14.9541 0.709802Z" fill="#5D5D5D"/>
              <path d="M4.69366 9.59931L0.242756 6.92876C0.0817496 6.83216 -0.0115621 6.65349 0.00115182 6.46616C0.0138657 6.27883 0.130462 6.11441 0.303045 6.04044L14.293 0.0447451C14.2399 0.0688812 14.1902 0.102782 14.1465 0.146447L4.69366 9.59931Z" fill="#5D5D5D"/>
              </svg>
              `}
              titleStyle={tw`text-color-Black800`}
              title="Message"
            />
          </View>
        </View>

        {options == 'post' ? (
          <View style={tw`tablet:mx-[30%]`}>
            <OtherWallPost navigation={navigation} />
          </View>
        ) : (
          <OtherWallStore navigation={navigation} />
        )}
      </ScrollView>
    </View>
  );
};

export default OtherWall;
