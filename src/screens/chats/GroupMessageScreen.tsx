import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import {
    IconAttachment,
    IconCamera,
    IconSend,
    IconVThreeDotsMd,
} from '../../icons/icons';

import moment from 'moment-timezone';
import React from 'react';
import FastImage from 'react-native-fast-image';
import { SvgXml } from 'react-native-svg';
import messageData from '../../assets/database/message.json';
import personalMessageData from '../../assets/database/personalMessage.json';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import InputText from '../../components/inputs/InputText';
import { NavigProps } from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const GroupMessageScreen = ({navigation}: NavigProps<null>) => {
  return (
    <View style={tw`flex-1 bg-white`}>
      {/*============= header =============== */}
      <View>
        <BackWithComponent
          onPress={() => navigation?.goBack()}
          containerStyle={tw` justify-between items-start`}
          ComponentBtn={
            <View style={tw`flex-row items-center justify-between`}>
              <View>
                <View style={tw`flex-row items-center gap-3`}>
                  <Text
                    style={tw`text-color-Black1000 font-NunitoSansExtraBold`}>
                    {messageData.group.name}
                  </Text>
                  <FastImage
                    style={tw`w-8 h-8 rounded-xl`}
                    source={{
                      uri: messageData?.group?.groupIcon,
                    }}
                  />
                </View>
                <Text>{messageData?.group?.members}</Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => {}}
                style={tw`px-4 items-center justify-center`}>
                <SvgXml xml={IconVThreeDotsMd} />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
      {/*================= messages ================== */}

      <FlatList
        showsVerticalScrollIndicator={false}
        inverted
        contentContainerStyle={tw`pb-4`}
        // ListFooterComponent={() => (
        //   <>
        //     <View style={tw`px-[4%] py-7 justify-center items-center gap-3`}>
        //       <FastImage
        //         style={tw`w-16 h-16 rounded-3xl`}
        //         resizeMode={FastImage.resizeMode.contain}
        //         source={{
        //           uri: personalMessageData?.chatHeader?.avatar,
        //         }}
        //       />
        //       <View style={tw`justify-center items-center `}>
        //         <Text
        //           style={tw`text-color-Black1000 font-PoppinsBold text-[20px]`}>
        //           {personalMessageData?.chatHeader?.name}
        //         </Text>
        //         <Text
        //           style={tw`text-color-Black500 font-NunitoSansSemiBold text-[14px]`}>
        //           location: {personalMessageData?.chatHeader?.location}
        //         </Text>
        //       </View>
        //     </View>
        //   </>
        // )}
        data={personalMessageData?.messages.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        )}
        renderItem={({item, index}) => (
          <>
            <View key={index} style={tw``}>
              <View style={tw`px-4 py-2`}>
                {item.isCurrentUser ? (
                  <>
                    {/* Message from "You" */}
                    <View style={tw`flex w-full `}>
                      <View
                        style={tw`flex-row justify-between items-center my-1`}>
                        <Text
                          style={tw`text-color-Black1000 font-NunitoSansBold text-[14px] `}>
                          {item.sender}
                        </Text>
                        <Text
                          style={tw`text-gray-500 text-xs pr-3 font-PoppinsRegular`}>
                          {/* Thursday 11:41am */}
                          {moment(item.timestamp).format('dddd hh:mma')}
                        </Text>
                      </View>
                      {item?.message && (
                        <View
                          style={tw`bg-primary500  p-3 rounded-lg  self-end rounded-tr-none`}>
                          <Text
                            style={tw`text-white text-[16px] font-NunitoSansRegular`}>
                            {item.message}
                          </Text>
                        </View>
                      )}

                      {item.image && (
                        <View style={tw`items-end `}>
                          <FastImage
                            source={{
                              uri: item.image,
                            }}
                            style={tw`h-32 w-60 rounded-xl`}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      )}
                    </View>
                  </>
                ) : (
                  <>
                    {/* Message from "Karla Blair" */}
                    <View style={tw`flex flex-row mt-4`}>
                      {/* Avatar */}
                      <FastImage
                        source={{
                          uri: 'https://randomuser.me/api/portraits/lego/5.jpg',
                        }}
                        style={tw`w-8 h-8 rounded-full mr-3`}
                      />
                      <View style={tw`flex-1`}>
                        <View
                          style={tw`flex-row justify-between items-center my-1`}>
                          <Text
                            style={tw`text-color-Black1000 font-NunitoSansBold text-[14px] `}>
                            {item.sender}
                          </Text>
                          <Text
                            style={tw`text-gray-500 text-xs pr-3 font-PoppinsRegular`}>
                            {moment(item.timestamp).format('dddd hh:mma')}
                          </Text>
                        </View>
                        {item?.message && (
                          <View
                            style={tw`bg-gray-100 p-3 rounded-lg  rounded-tl-none`}>
                            <Text
                              style={tw`text-color-Black1000 text-[16px] font-NunitoSansRegular`}>
                              {item.message}
                            </Text>
                          </View>
                        )}
                        {item.image && (
                          <View style={tw`items-start `}>
                            <FastImage
                              source={{
                                uri: item.image,
                              }}
                              style={tw`h-32 w-60 rounded-xl`}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </View>
                        )}
                      </View>
                    </View>
                  </>
                )}
              </View>
            </View>
          </>
        )}
      />
      {/*================== footer of message options ==================== */}
      <View
        style={tw`px-[4%] flex-row gap-3 items-center justify-between py-2 `}>
        <View style={tw` h-14 flex-1`}>
          <InputText
            placeholder="Write text"
            Component={
              <View style={tw`flex-row gap-5`}>
                <SvgXml xml={IconCamera} />
                <SvgXml xml={IconAttachment} />
              </View>
            }
          />
        </View>
        <IButton
          svg={IconSend}
          containerStyle={tw`bg-primary p-4 w-14 shadow-none`}
          onPress={() => {}}
        />
      </View>
    </View>
  );
};

export default GroupMessageScreen;
