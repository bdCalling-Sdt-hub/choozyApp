import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import {IMessage, IUserChat} from '../../redux/interface/message';
import {
  IconAttachment,
  IconCamera,
  IconSend,
  IconVThreeDots,
} from '../../icons/icons';
import {
  useGetMassagesQuery,
  useLazyGetMassagesQuery,
  useSendMessageMutation,
} from '../../redux/apiSlices/message';

import ActionModal from '../../components/modals/ActionModal';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import FastImage from 'react-native-fast-image';
import IButton from '../../components/buttons/IButton';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {Switch} from 'react-native-ui-lib';
import {getSocket} from '../../redux/services/socket';
import moment from 'moment-timezone';
import tw from '../../lib/tailwind';
import {useImagePicker} from '../../utils/utils';
import {useSelector} from 'react-redux';

// import messageData from '../../assets/database/message.json';

const SingleMessageScreen = ({
  navigation,
  route,
}: NavigProps<{id: string; item: IUserChat}>) => {
  const [actionModalOpen, setActionModalOpen] = React.useState(false);
  const [makeMute, setMakeMute] = React.useState<boolean>(false);
  const [message, setMessage] = React.useState('');
  const [allMessage, setAllMessage] = React.useState<Array<IMessage>>([]);
  // console.log(route?.params?.id, route?.params?.item);

  const Item = route?.params?.item;

  const {data: MessageData} = useGetMassagesQuery(route?.params?.id);

  const [getMessages] = useLazyGetMassagesQuery();

  const user = useSelector(state => state?.user?.user);

  const [sendMessage] = useSendMessageMutation();

  // console.log(user);
  const socket = getSocket();
  // console.log(MessageData);

  const handleImage = async (type: 'camera' | 'library') => {
    if (type === 'camera') {
      const image = await useImagePicker({
        option: 'camera',
      });
      if (image?.some(item => item?.uri)) {
        handleSendMessage({
          image: image,
        });
      }
    }
    if (type === 'library') {
      const image = await useImagePicker({
        option: 'library',
        selectionLimit: 6,
      });
      if (image?.some(item => item?.uri)) {
        handleSendMessage({
          image: image,
        });
      }
    }
  };

  const handleSendMessage = async ({message, image}: any) => {
    // console.log(message);

    const formData = new FormData();

    image &&
      image?.forEach((item: any, index: string) =>
        formData.append(`images[${index}]`, {
          uri: item?.uri,
          type: item?.type,
          name: item?.fileName,
        }),
      );

    message && formData.append('message', message);
    image && formData.append('images[]', image);
    formData.append('receiver_id', route?.params?.id);

    const res = await sendMessage(formData);
    console.log(res?.data);
    if (res.data) {
      setMessage('');
      socket?.emit('message', {
        id: route?.params?.id,
      });
    }
  };

  const handleLoadData = async () => {
    const res = await getMessages(route?.params?.id);
    // console.log(res);
    setAllMessage(res?.data?.data);
  };

  React.useEffect(() => {
    handleLoadData();
  }, []);

  React.useEffect(() => {
    if (socket) {
      socket?.on('message', handleLoadData);
    }

    return () => {
      socket?.off('message', handleLoadData);
    };
  }, [socket]);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*============= header =============== */}
      <View>
        <BackWithComponent
          onPress={() => navigation?.goBack()}
          containerStyle={tw` justify-between items-start`}
          ComponentBtn={
            <View style={tw`flex-row `}>
              {/* <TouchableOpacity style={tw`px-3`} activeOpacity={0.5}>
                <SvgXml xml={IconVideo} />
              </TouchableOpacity>
              <TouchableOpacity style={tw`px-3`} activeOpacity={0.5}>
                <SvgXml xml={IconCallBlue} />
              </TouchableOpacity> */}
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
      {/* {route?.params?.proposal && proposal && (
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
            
                </Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setPorposal(false)}>
                <SvgXml xml={IconClose} />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )} */}
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
                  uri: Item?.image,
                }}
              />
              <View style={tw`justify-center items-center `}>
                <Text
                  style={tw`text-color-Black1000 font-PoppinsBold text-[20px]`}>
                  {Item?.full_name}
                </Text>
                <Text
                  style={tw`text-color-Black500 font-NunitoSansSemiBold text-sm`}>
                  location: {Item?.location}
                </Text>
              </View>
            </View>
          </>
        )}
        data={allMessage}
        renderItem={({item, index}) => (
          <>
            <View key={index} style={tw``}>
              <View style={tw`px-4 py-2`}>
                {item.sender?.id === user?.id &&
                (item?.message || item.images) ? (
                  <>
                    {/* Message from "You" */}
                    <View style={tw`flex w-full `}>
                      <View
                        style={tw`flex-row justify-between items-center my-1`}>
                        <Text
                          style={tw`text-color-Black1000 font-NunitoSansBold text-sm `}>
                          {/* {item.sender?.full_name} */} You
                        </Text>
                        <Text
                          style={tw`text-gray-500 text-xs pr-3 font-PoppinsRegular`}>
                          {/* Thursday 11:41am */}
                          {moment(item.created_at).format('dddd hh:mma')}
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

                      {item.images?.length > 0 && (
                        <View style={tw`items-end mt-3`}>
                          <FastImage
                            source={{
                              uri: item.images[0],
                            }}
                            style={tw`h-32 w-60 rounded-xl`}
                            resizeMode={FastImage.resizeMode.cover}
                          />
                        </View>
                      )}
                    </View>
                  </>
                ) : (
                  (item?.message || item.images) && (
                    <>
                      {/* Message from "Karla Blair" */}
                      <View style={tw`flex flex-row mt-4`}>
                        {/* Avatar */}
                        <FastImage
                          source={{
                            uri: item.sender?.image,
                          }}
                          style={tw`w-8 h-8 rounded-full mr-3`}
                        />
                        <View style={tw`flex-1`}>
                          <View
                            style={tw`flex-row justify-between items-center my-1`}>
                            <Text
                              style={tw`text-color-Black1000 font-NunitoSansBold text-sm `}>
                              {item.sender?.full_name}
                            </Text>
                            <Text
                              style={tw`text-gray-500 text-xs pr-3 font-PoppinsRegular`}>
                              {moment(item.created_at).format('dddd hh:mma')}
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
                          {item.images?.length > 0 && (
                            <View style={tw`items-start mt-3`}>
                              <FastImage
                                source={{
                                  uri: item.images[0],
                                }}
                                style={tw`h-32 w-60 rounded-xl`}
                                resizeMode={FastImage.resizeMode.cover}
                              />
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
            onChangeText={text => setMessage(text)}
            value={message}
            Component={
              <View style={tw`flex-row gap-5`}>
                <TouchableOpacity
                  onPress={() => {
                    handleImage('camera');
                  }}>
                  <SvgXml xml={IconCamera} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleImage('library')}>
                  <SvgXml xml={IconAttachment} />
                </TouchableOpacity>
              </View>
            }
          />
        </View>
        <IButton
          svg={IconSend}
          containerStyle={tw`bg-primary p-4 w-14 shadow-none`}
          onPress={() => {
            handleSendMessage({message});
          }}
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

            onPress: () => {
              navigation?.goBack();
            },
          },
        ]}
      />
    </View>
  );
};

export default SingleMessageScreen;
