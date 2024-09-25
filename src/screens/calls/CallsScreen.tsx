import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  IconCallBlue,
  IconIncomingDownArrow,
  IconIncomingUpArrow,
  IconSearch,
  IconVideo,
} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import call from '../../assets/database/call.json';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const CallsScreen = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-base`}>
      {/*================== header part ================= */}
      <View style={tw`bg-white px-[4%] py-2`}>
        <View style={tw` gap-3  flex-row justify-center items-center`}>
          <Text style={tw`text-2xl text-primary900 font-NunitoSansExtraBold`}>
            Calls
          </Text>
          <View style={tw` h-14 flex-1 `}>
            <InputText placeholder="Search.." svgSecondIcon={IconSearch} />
          </View>
        </View>
      </View>

      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6 bg-white gap-5 px-[4%] py-3`}
        data={call}
        renderItem={({item, index}) => (
          <>
            <View>
              <View style={tw`flex-row justify-between items-center`}>
                <View style={tw`flex-row items-center gap-3`}>
                  <FastImage
                    source={{uri: item.image}}
                    style={tw`w-12 h-12 rounded-2xl`}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                  <View style={tw`gap-1`}>
                    <Text
                      style={tw`text-text16 font-NunitoSansBold ${
                        item.callType === 'incoming'
                          ? 'text-red-500'
                          : 'text-color-Black600'
                      }`}>
                      {item.name}
                    </Text>
                    <View style={tw`flex-row items-center gap-1`}>
                      <SvgXml
                        height={8}
                        width={8}
                        xml={
                          item.callType === 'incoming'
                            ? IconIncomingDownArrow
                            : IconIncomingUpArrow
                        }
                      />
                      <Text
                        style={tw`text-color-Black600 font-NunitoSansRegular text-xs`}>
                        {item.date} , {item.time}
                      </Text>
                    </View>
                  </View>
                </View>
                <TouchableOpacity style={tw`px-4`}>
                  <SvgXml
                    // fill={"#4964C6"}
                    xml={item.callMethod === 'audio' ? IconCallBlue : IconVideo}
                    width={item.callMethod === 'audio' ? 20 : 23}
                    height={item.callMethod === 'audio' ? 20 : 23}
                  />
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      />
    </View>
  );
};

export default CallsScreen;
