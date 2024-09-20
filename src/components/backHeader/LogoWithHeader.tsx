import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import {
    IconBell,
    IconBellWithDot,
    IconClose,
    IconSearch,
    IconVThreeDots,
} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import searchResults from '../../assets/database/search.json';
import { NavigProps } from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import IButton from '../buttons/IButton';
import SearchCard from '../cards/SearchCard';
import InputText from '../inputs/InputText';
import NormalModal from '../modals/NormalModal';

interface ILogoWithHeader extends NavigProps<null> {
  onPressMenu?: () => void;
  searchOffItem ?: {
    offPost ?: boolean;
    offProduct ?: boolean;
    offPeople ?: boolean;
  };
  offMenu ?: boolean
}

const LogoWithHeader = ({navigation, onPressMenu,searchOffItem,offMenu}: ILogoWithHeader) => {
  const [searchVisible, setSearchVisible] = React.useState(false);

  return (
    <View style={tw`px-[4%] flex-row justify-between items-center`}>
      {/*============== image or logo==================  */}
      <View style={tw`py-4 flex-row items-center gap-2`}>
        <FastImage
          style={tw`h-10 aspect-square`}
          resizeMode={FastImage.resizeMode.contain}
          source={require('../../assets/images/logo/logo.png')}
        />
        <Text style={tw`text-2xl font-NunitoSansExtraBold text-primary`}>
          Choozy
        </Text>
      </View>
      <View style={tw`flex-row gap-3`}>
        <IButton
          onPress={() => setSearchVisible(!searchVisible)}
          svg={IconSearch}
          containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
        />
        <IButton
          onPress={() => navigation?.navigate('Notification')}
          svg={IconBellWithDot}
          containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
        />
        {
            !offMenu &&  <IButton
            onPress={onPressMenu}
            svg={IconVThreeDots}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
        }
      </View>
      <NormalModal
        containerStyle={tw`w-full`}
        setVisible={setSearchVisible}
        visible={searchVisible}>
        {/*=========== search here =========== */}
        <View style={tw`flex-row items-center py-2 gap-3`}>
          <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
          <InputText
            containerStyle={tw`w-full border-4 border-[#B3C5FF]`}
            placeholder="Search"
            onChangeText={text => {}}
            returnKeyType="done" // you can set returnKeyType like 'done', 'go', etc.
            onSubmitEditing={e => {
              console.log(e.nativeEvent.text);
            }}
            svgFirstIcon={IconSearch}
          />
          <IButton
            onPress={() => {
              setSearchVisible(!searchVisible);
              navigation?.navigate('Notification');
            }}
            svg={IconBell}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
          {/* <IButton
            onPress={() => {
              setSearchVisible(!searchVisible);
            }}
            svg={IconMenu}
            
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          /> */}
        </View>
        {/*============= results here =================*/}
        <FlatList
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`pt-2 `}
          data={searchResults}
          renderItem={({item}) => (
            <>
              <SearchCard item={item} offPost={searchOffItem?.offPost} offProduct={searchOffItem?.offProduct} offPeople={searchOffItem?.offPeople} />
            </>
          )}
        />
      </NormalModal>
    </View>
  );
};

export default LogoWithHeader;
