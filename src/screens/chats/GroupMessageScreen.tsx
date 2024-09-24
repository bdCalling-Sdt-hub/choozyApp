import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  IconAttachment,
  IconCamera,
  IconSend,
  IconVThreeDotsMd,
} from '../../icons/icons';

import moment from 'moment-timezone';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import {Switch} from 'react-native-ui-lib';
import messageData from '../../assets/database/message.json';
import personalMessageData from '../../assets/database/personalMessage.json';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import InputText from '../../components/inputs/InputText';
import ActionModal from '../../components/modals/ActionModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const GroupMessageScreen = ({navigation}: NavigProps<null>) => {
  const [actionModalOpen, setActionModalOpen] = React.useState(false);
  const [makeMute, setMakeMute] = React.useState(false);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*============= header =============== */}
      <View>
        <BackWithComponent
          onPress={() => navigation?.goBack()}
          containerStyle={tw` justify-between items-start`}
          ComponentBtn={
            <View style={tw`flex-row items-start justify-between`}>
              <View>
                <View style={tw`flex-row items-center gap-3`}>
                  <Text
                    style={tw`text-color-Black1000 text-base font-NunitoSansExtraBold`}>
                    {messageData.group.name}
                  </Text>
                  <FastImage
                    style={tw`w-8 h-8 rounded-xl`}
                    source={{
                      uri: messageData?.group?.groupIcon,
                    }}
                  />
                </View>
                <Text style={tw`text-color-Black400 text-sm`}>
                  {messageData?.group?.members}
                </Text>
              </View>
              <TouchableOpacity
                activeOpacity={0.5}
                onPress={() => setActionModalOpen(!actionModalOpen)}
                style={tw`px-4 h-8 items-center justify-center`}>
                <SvgXml xml={IconVThreeDotsMd} />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
      {/*================= messages ================== */}
      {/*============= floating accept join for group ========= */}
      <View style={tw`absolute top-15 w-full px-3 z-30`}>
        <View style={tw`bg-white w-full p-4`}>
          <FastImage
            style={tw`w-14 h-14 rounded-2xl`}
            source={{
              uri: 'https://randomuser.me/api/portraits/men/19.jpg',
            }}
          />
        </View>
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        inverted
        contentContainerStyle={tw`pb-4`}
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
                          style={tw`text-color-Black1000 font-NunitoSansBold text-sm `}>
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
                            style={tw`text-white text-base font-NunitoSansRegular`}>
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
                          uri: item.avatar,
                        }}
                        style={tw`w-8 h-8 rounded-full mr-3`}
                      />
                      <View style={tw`flex-1`}>
                        <View
                          style={tw`flex-row justify-between items-center my-1`}>
                          <Text
                            style={tw`text-color-Black1000 font-NunitoSansBold text-sm `}>
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
                              style={tw`text-color-Black1000 text-lg font-NunitoSansRegular`}>
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
      <ActionModal
        containerStyle={tw``}
        visible={actionModalOpen}
        setVisible={setActionModalOpen}
        actionData={[
          {
            title: 'Members',
            onPress: () => {
              setActionModalOpen(false);
              navigation?.navigate('GroupMembers');
            },
          },
          {
            title: 'Mute Notification',
            //  onPress: () => {},
            enableBoth: true,
            customComponent: (
              <Switch
                offColor={'#E8E8EA'}
                onColor={'#4964C6'}
                value={makeMute}
                onValueChange={value => setMakeMute(value)}
              />
            ),
          },
          {
            title: 'Leave',
            titleStyle: tw`text-red-500`,
            onPress: () => {
              navigation?.goBack();
            },
          },
        ]}
      />
    </View>
  );
};

export default GroupMessageScreen;
