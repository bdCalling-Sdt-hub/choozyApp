import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {
  IconAttachment,
  IconCallBlue,
  IconCamera,
  IconClose,
  IconSend,
  IconVThreeDots,
  IconVideo,
} from '../../icons/icons';

import moment from 'moment-timezone';
import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import {Switch} from 'react-native-ui-lib';
import personalMessageData from '../../assets/database/personalMessage.json';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IButton from '../../components/buttons/IButton';
import InputText from '../../components/inputs/InputText';
import ActionModal from '../../components/modals/ActionModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

// import messageData from '../../assets/database/message.json';

const SingleMessageScreen = ({
  navigation,
  route,
}: NavigProps<{proposal: true}>) => {
  const [actionModalOpen, setActionModalOpen] = React.useState(false);
  const [makeMute, setMakeMute] = React.useState(false);
  const [proposal, setPorposal] = React.useState(true);
  return (
    <View style={tw`flex-1 bg-white`}>
      {/*============= header =============== */}
      <View>
        <BackWithComponent
          onPress={() => navigation?.goBack()}
          containerStyle={tw` justify-between items-start`}
          ComponentBtn={
            <View style={tw`flex-row `}>
              <TouchableOpacity style={tw`px-3`} activeOpacity={0.5}>
                <SvgXml xml={IconVideo} />
              </TouchableOpacity>
              <TouchableOpacity style={tw`px-3`} activeOpacity={0.5}>
                <SvgXml xml={IconCallBlue} />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => {
                  setActionModalOpen(!actionModalOpen);
                }}
                style={tw`px-3`}
                activeOpacity={0.5}>
                <SvgXml xml={IconVThreeDots} />
              </TouchableOpacity>
            </View>
          }
        />
      </View>
      {/*================= messages ================== */}
      {route?.params?.proposal && proposal && (
        <View style={tw`absolute top-15 w-full px-3 z-30 `}>
          <View
            style={tw`bg-white w-full p-4 shadow-lg flex-row justify-between rounded-2xl items-center gap-3`}>
            <View style={tw`flex-row gap-3 items-center`}>
              <FastImage
                style={tw`w-12 h-12 rounded-2xl`}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
                }}
              />
              <View>
                <Text
                  style={tw`text-text14 font-NunitoSansRegular text-color-Black1000`}>
                  karla Blair Made aa offer
                </Text>
                <Text
                  style={tw`text-text14 font-NunitoSansBold text-color-Black1000`}>
                  $2,500
                </Text>
              </View>
            </View>
            <View style={tw`flex-row gap-6 items-center `}>
              <TouchableOpacity onPress={() => setPorposal(false)}>
                <Text style={tw`text-text14 font-NunitoSansBold text-primary`}>
                  Pending
                  {/* Accept  */}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPorposal(false)}>
                <SvgXml xml={IconClose} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}
      <FlatList
        showsVerticalScrollIndicator={false}
        inverted
        contentContainerStyle={tw`pb-4`}
        ListFooterComponent={() => (
          <>
            <View style={tw`px-[4%] py-7 justify-center items-center gap-3`}>
              <FastImage
                style={tw`w-16 h-16 rounded-3xl`}
                resizeMode={FastImage.resizeMode.contain}
                source={{
                  uri: personalMessageData?.chatHeader?.avatar,
                }}
              />
              <View style={tw`justify-center items-center `}>
                <Text
                  style={tw`text-color-Black1000 font-PoppinsBold text-[20px]`}>
                  {personalMessageData?.chatHeader?.name}
                </Text>
                <Text
                  style={tw`text-color-Black500 font-NunitoSansSemiBold text-sm`}>
                  location: {personalMessageData?.chatHeader?.location}
                </Text>
              </View>
            </View>
          </>
        )}
        data={personalMessageData?.messages.sort(
          (a, b) => new Date(b.timestamp) - new Date(a.timestamp),
        )}
        renderItem={({item, index}) => (
          <>
            <View key={index} style={tw``}>
              <View style={tw`px-4 py-2`}>
                {item.isCurrentUser &&
                (item?.message || item.image || route?.params?.proposal) ? (
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

                      {route?.params?.proposal && item.offer && (
                        <View
                          style={tw`bg-white w-full p-4 flex-row justify-between rounded-2xl items-center gap-3`}>
                          <View style={tw`flex-row gap-3 items-center`}>
                            <FastImage
                              style={tw`w-12 h-12 rounded-2xl`}
                              resizeMode={FastImage.resizeMode.contain}
                              source={{
                                uri: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
                              }}
                            />
                            <View style={tw`gap-1 w-[65%]`}>
                              <Text
                                style={tw`text-sm font-NunitoSansRegular text-color-Black1000 `}>
                                Your offer is accepted(same card show just 1)
                              </Text>
                              <Text
                                style={tw`text-base font-NunitoSansBold text-color-Black1000`}>
                                $2,500
                              </Text>
                            </View>
                          </View>
                          <TouchableOpacity
                            style={tw`flex-row gap-6 items-center `}>
                            <Text
                              style={tw`text-sm font-NunitoSansBold text-[#148D79]`}>
                              Pay Now
                              {/* Accept  */}
                            </Text>
                          </TouchableOpacity>
                        </View>
                      )}
                    </View>
                  </>
                ) : (
                  (item?.message || item.image || route?.params?.proposal) && (
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
                          {route?.params?.proposal && item.offer && (
                            <View
                              style={tw`bg-white w-full py-2 flex-row justify-between rounded-2xl items-center gap-3`}>
                              <View style={tw`flex-row gap-3 items-center`}>
                                <FastImage
                                  style={tw`w-12 h-12 rounded-2xl`}
                                  resizeMode={FastImage.resizeMode.contain}
                                  source={{
                                    uri: 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_.jpg',
                                  }}
                                />
                                <View style={tw`gap-1 w-[60%]`}>
                                  <Text
                                    style={tw`text-sm font-NunitoSansRegular text-color-Black1000 `}>
                                    You Made an offer(same card show just 1)
                                  </Text>
                                  <Text
                                    style={tw`text-base font-NunitoSansBold text-color-Black1000`}>
                                    $2,500
                                  </Text>
                                </View>
                              </View>
                              <View style={tw`flex-row gap-6 items-center `}>
                                <Text
                                  style={tw`text-sm font-NunitoSansBold text-[#148D79]`}>
                                  Accepted
                                  {/* Accept  */}
                                </Text>
                              </View>
                            </View>
                          )}
                        </View>
                      </View>
                    </>
                  )
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
        containerStyle={tw`top-[6%] right-[2%]`}
        visible={actionModalOpen}
        setVisible={setActionModalOpen}
        actionData={[
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

            onPress: () => {},
          },
        ]}
      />
    </View>
  );
};

export default SingleMessageScreen;
