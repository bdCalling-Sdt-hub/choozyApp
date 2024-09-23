import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IconImage,
  IconLock,
  IconMenu,
  IconPlus,
  IconPost,
  IconPostBlue,
  IconPublic,
  IconStore,
  IconStoreBlue,
} from '../../icons/icons';

import {DrawerActions} from '@react-navigation/native';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {TextInput} from 'react-native-gesture-handler';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import CreatedHeaderWithITB from '../../components/backHeader/CreatedHeaderWithITB';
import IButton from '../../components/buttons/IButton';
import IwtButton from '../../components/buttons/IwtButton';
import SimpleButton from '../../components/buttons/SimpleButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

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

const MyWall = ({navigation}: NavigProps<null>) => {
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

        {options == 'post' ? (
          <Post navigation={navigation} />
        ) : (
          <Store navigation={navigation} />
        )}
      </ScrollView>

      {/* floating icon here */}
      <IButton
        onPress={() => {
          if (options == 'post') setShowAddPostModal(!showAddPostModal);
          else setShowProductPostModal(!showAddProductModal);
        }}
        svg={IconPlus}
        containerStyle={tw`absolute bottom-10 right-6 h-12 w-12 rounded-3xl items-center justify-center bg-primary900 `}
      />

      <NormalModal
        visible={showAddPostModal}
        animationType="fade"
        layerContainerStyle={tw`flex-1 mx-[4%] justify-center items-center `}
        containerStyle={tw` rounded-2xl p-5`}
        setVisible={setShowAddPostModal}>
        <CreatedHeaderWithITB
          title="Create a post"
          onPress={() => setShowAddPostModal(false)}
        />
        <View style={tw`gap-3 flex-row items-center mt-5`}>
          <FastImage
            style={tw`w-8 h-8 rounded-xl `}
            resizeMode={FastImage.resizeMode.contain}
            source={{
              uri: 'https://randomuser.me/api/portraits/men/19.jpg',
            }}
          />
          <View>
            <Text style={tw`text-color-Black800 font-NunitoSansBold text-base`}>
              Sam
            </Text>
            <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`}>
              Edwinmartin_0097
            </Text>
          </View>
        </View>
        <TextInput
          multiline
          textAlignVertical="top"
          placeholderTextColor={'#888888'}
          placeholder="Share your thoughts..."
          style={tw`h-32 text-color-Black400 font-NunitoSansRegular text-base px-2`}
        />
        <View style={tw`border-t-[1px] border-t-[#E5E5E5] border-dashed py-3`}>
          <Text
            style={tw`text-color-Black800 font-NunitoSansBold text-base my-2`}>
            Add to your post
          </Text>
          <View style={tw`flex-row items-center gap-4`}>
            <SimpleButton
              svgIcon={IconImage}
              containerStyle={tw`w-12 rounded-xl h-12 items-center justify-center border-0 bg-color-Black50`}
            />
            <View style={tw`gap-2`}>
              <Text
                style={tw`text-color-Black800 font-NunitoSansBold text-base`}>
                Privacy
              </Text>
              <View style={tw`flex-row items-center gap-2`}>
                <IwtButton
                  title="Public"
                  svg={IconPublic}
                  onPress={() => setIsPublic(true)}
                  titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                  containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                    isPublic ? 'bg-primary100' : 'bg-white'
                  } shadow-none`}
                />
                <IwtButton
                  title="Private"
                  svg={IconLock}
                  onPress={() => setIsPublic(false)}
                  titleStyle={tw`text-[10px] text-black font-NunitoSansRegular `}
                  containerStyle={tw` rounded-xl h-7 w-20 items-center  p-0 ${
                    isPublic ? 'bg-white' : 'bg-primary100'
                  } shadow-none`}
                />
              </View>
            </View>
          </View>
        </View>

        <View>
          <TButton
            containerStyle={tw`w-full my-3 bg-primary600`}
            onPress={() => setShowAddPostModal(false)}
            title="Post"
          />
        </View>
      </NormalModal>

      <NormalModal
        visible={showAddProductModal}
        animationType="fade"
        layerContainerStyle={tw`flex-1 mx-[4%] justify-center items-center `}
        containerStyle={tw` rounded-2xl p-5 my-3`}
        setVisible={setShowProductPostModal}>
        <CreatedHeaderWithITB
          title="Add a new product"
          onPress={() => setShowProductPostModal(false)}
        />

        <View style={tw`border-b-[1px] border-b-[#E5E5E5] border-dashed py-3`}>
          <Text
            style={tw`text-color-Black800 font-NunitoSansBold text-base my-3`}>
            Select product images
          </Text>
          <View style={tw`flex-row items-center gap-4`}>
            <SimpleButton
              svgIcon={IconImage}
              containerStyle={tw`w-12 rounded-xl h-12 items-center justify-center border-0 bg-color-Black50`}
            />
          </View>
        </View>

        <View style={tw`py-4 gap-4`}>
          <View style={tw`h-14`}>
            <InputText
              placeholder="Set product prize"
              placeholderTextColor={'#A5A3A9'}
              floatingPlaceholder
              style={tw`font-NunitoSansRegular `}
            />
          </View>
          <TouchableOpacity
            onPress={() => {
              setShowCategoryModal(!showCategoryModal);
            }}
            activeOpacity={0.5}
            style={tw`h-14 justify-center items-start border border-[#E8E8EA] px-4 rounded-2xl`}>
            <Text style={tw`text-color-Black600  font-NunitoSansRegular`}>
              {selectCategory}
            </Text>
          </TouchableOpacity>
          <View style={tw`h-14`}>
            <InputText
              placeholder="Product code"
              floatingPlaceholder
              placeholderTextColor={'#A5A3A9'}
              style={tw`font-NunitoSansRegular `}
            />
          </View>
          <View style={tw`h-40`}>
            <InputText
              multiline
              textAlignVertical="top"
              placeholder="Description"
              // floatingPlaceholder
              placeholderTextColor={'#A5A3A9'}
              style={tw`h-40 py-3 font-NunitoSansRegular`}
            />
          </View>
        </View>

        <View>
          <TButton
            containerStyle={tw`w-full my-3 bg-primary600`}
            onPress={() => setShowProductPostModal(false)}
            title="Post"
          />
        </View>
      </NormalModal>
      <NormalModal
        visible={showCategoryModal}
        animationType="fade"
        layerContainerStyle={tw`flex-1 mx-[4%] justify-center items-center `}
        containerStyle={tw` rounded-2xl p-5 my-3`}
        setVisible={setShowCategoryModal}>
        <View style={tw` border-dashed py-2`}>
          <Text style={tw`text-color-Black800 font-NunitoSansBold text-base `}>
            Select Category
          </Text>
        </View>
        <View style={tw`py-4 gap-4`}>
          {categoryData.map((item, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => {
                setSelectCategory(item.name);
                setShowCategoryModal(false);
              }}
              activeOpacity={0.5}
              style={tw`py-2`}>
              <Text style={tw`text-color-Black600  font-NunitoSansRegular`}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </NormalModal>
    </View>
  );
};

export default MyWall;
