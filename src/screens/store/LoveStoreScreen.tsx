import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PopUpModal, {PopUpModalRef} from '../../components/modals/PopUpModal';
import {
  IIConAmericanExpress,
  IIConDiscover,
  IIConMasterCard,
  IIConVisaCard,
} from '../../icons/IIcons';
import {IconClose, IconFillLove} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import DateModal from '../../components/modals/DateModal';
import SideModal from '../../components/modals/SideModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const LoveStoreScreen = ({navigation}: NavigProps<null>) => {
  const [close, setClose] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false);
  const [dateModal, setDateModal] = React.useState(false);
  const [selectData, setSelectDate] = React.useState<Date>(new Date());
  const popUpModalRef = React.useRef<PopUpModalRef>(null);
  const [coin, setCoin] = React.useState('');
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        onPress={() => navigation?.goBack()}
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <View>
            <FastImage
              source={{uri: 'https://randomuser.me/api/portraits/men/19.jpg'}}
              style={tw`w-8 h-8 rounded-xl`}
            />
          </View>
        }
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="always">
        {!close && (
          <View
            style={tw`mx-[4%] my-8 bg-danger50 p-4 rounded-2xl flex-row justify-between items-center`}>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-sm`}>
              Shop with exchange love!
            </Text>
            <TouchableOpacity
              onPress={() => {
                setClose(!close);
              }}
              activeOpacity={0.5}>
              <SvgXml height={15} width={15} xml={IconClose} />
            </TouchableOpacity>
          </View>
        )}

        <View style={tw`mx-[4%] my-5`}>
          <View style={tw`gap-2`}>
            <View style={tw`flex-row items-center gap-3`}>
              <Text
                style={tw`text-[24px] font-NunitoSansExtraBold text-color-Black1000 `}>
                Buy love's
              </Text>
              <SvgXml
                style={{
                  transform: [
                    {
                      rotate: '5deg',
                    },
                  ],
                }}
                height={36}
                width={36}
                xml={IconFillLove}
              />
            </View>
            <View style={tw`gap-5 mt-3`}>
              <View style={tw`h-14`}>
                <InputText
                  placeholder="Enter Amount"
                  keyboardType="decimal-pad"
                  floatingPlaceholder
                  onChangeText={(text: string) => setCoin(text)}
                />
              </View>
            </View>
            <View
              style={tw`px-[4%] py-12 gap-3 border-b border-b-color-Black200 border-dashed `}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text
                  style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
                  Total Coin
                </Text>
                <Text
                  style={tw`text-base text-color-Black1000 font-NunitoSansBold`}>
                  {coin || 0}
                </Text>
              </View>
              <View style={tw`flex-row justify-between items-center`}>
                <Text
                  style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
                  Coin Prize
                </Text>
                <Text
                  style={tw`text-base text-color-Black1000 font-NunitoSansBold`}>
                  €1.2
                </Text>
              </View>

              <View style={tw`flex-row justify-between items-center`}>
                <Text
                  style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
                  Total ({coin} * 1.2)
                </Text>
                <Text
                  style={tw`text-lg text-color-Black1000 font-NunitoSansBold`}>
                  €{parseInt(coin * 1.2).toFixed(2)}
                </Text>
              </View>
            </View>

            <View
              style={tw`flex-row items-center justify-between pt-2 gap-3 px-2 my-3`}>
              <TButton
                onPress={() => {
                  setPaymentModal(!paymentModal);
                }}
                title="Continue"
                containerStyle={tw`w-full justify-center items-center bg-primary shadow-none`}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6`}
        data={[...Array(10)]}
        renderItem={({item}) => (
          <View
            style={tw`mx-[4%] my-3 p-4 rounded-2xl flex-row justify-between items-center border border-dashed border-gray-300`}>
            <View style={tw`flex-row items-center gap-3`}>
              <SvgXml
                style={{
                  transform: [
                    {
                      rotate: '5deg',
                    },
                  ],
                }}
                height={36}
                width={36}
                xml={IconFillLove}
              />
              <View>
                <Text>Only for $10.00</Text>
                <Text>10</Text>
              </View>
            </View>
            <TButton
              onPress={() => {
                setPaymentModal(!paymentModal);
              }}
              title="Get"
              containerStyle={tw`p-2 bg-primary w-16 rounded-xl`}
            />
          </View>
        )}
      /> */}
      {/*===================== payment modal ======================== */}
      <SideModal scrollable visible={paymentModal} setVisible={setPaymentModal}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={tw` bg-white p-4 `}>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-lg`}>
              Pay with
            </Text>

            <View style={tw`mt-4 gap-6`}>
              <View
                style={tw`h-14 border border-dashed border-gray-300 rounded-2xl flex-row items-center  px-4 justify-between`}>
                <Text style={tw`text-black font-NunitoSansBold text-sm`}>
                  Cards
                </Text>
                <View style={tw`flex-row items-center gap-3`}>
                  <SvgXml xml={IIConMasterCard} />
                  <SvgXml xml={IIConVisaCard} />
                  <SvgXml xml={IIConAmericanExpress} />
                  <SvgXml xml={IIConDiscover} />
                </View>
              </View>
              <View style={tw`h-14 `}>
                <InputText
                  containerStyle={tw` bg-white `}
                  placeholder="Name On card"
                  floatingPlaceholder
                  defaultValue="John Due"
                />
              </View>
              <View style={tw`h-14 `}>
                <InputText
                  containerStyle={tw` bg-white `}
                  placeholder="Card Number"
                  floatingPlaceholder
                  keyboardType="decimal-pad"
                  defaultValue="1254 2365 2545"
                />
              </View>
              <View style={tw`h-14 `}>
                <InputText
                  //   editable={false}
                  onPress={() => {
                    setDateModal(!dateModal);
                  }}
                  value={`${
                    selectData ? new Date(selectData).toLocaleDateString() : ''
                  }`}
                  containerStyle={tw` bg-white `}
                  placeholder="Card Expiration"
                  floatingPlaceholder
                  svgSecondIcon={`<svg width="15" height="16" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
               <path d="M3.5 0.5V5.5M11.5 0.5V5.5M5 9H10M1.5 3H13.5C14.0523 3 14.5 3.44772 14.5 4V14C14.5 14.5523 14.0523 15     13.5 15H1.5C0.947716 15 0.5 14.5523 0.5 14V4C0.5 3.44772 0.947715 3 1.5 3Z" stroke="#5D5D5D"/>
               </svg>
                `}
                />
              </View>
              <View style={tw`h-14 `}>
                <InputText
                  containerStyle={tw` bg-white `}
                  placeholder="CVV"
                  floatingPlaceholder
                  defaultValue="574"
                />
              </View>
            </View>
            <TButton
              title="Pay €398.99"
              containerStyle={tw`mt-12 mb-5 bg-[#6461FC] w-full shadow-none`}
              titleStyle={tw`font-NunitoSansBold text-white`}
              onPress={() => {
                popUpModalRef?.current?.open({
                  iconComponent: (
                    <FastImage
                      style={tw`w-full h-40 rounded-2xl`}
                      source={require('../../assets/images/logo/extra/circus.png')}
                      resizeMode={FastImage.resizeMode.contain}
                    />
                  ),
                  title: 'Congratulations! Your purchase is done',
                  titleStyle: tw`text-color-Black1000 font-NunitoSansExtraBold`,
                  buttonText: 'Done',
                  buttonStyle: tw`w-full justify-center  items-center font-NunitoSansBold shadow-none`,
                  contentStyle: tw`text-color-Black800 font-NunitoSansRegular`,
                  onPress: () => {
                    popUpModalRef?.current?.close();
                    setPaymentModal(false);
                    navigation?.navigate('Wallet');
                  },
                });
              }}
              isLoading={false}
            />
          </View>
        </ScrollView>
      </SideModal>
      <DateModal
        selectedDate={setSelectDate}
        setVisible={setDateModal}
        visible={dateModal}
      />
      <PopUpModal ref={popUpModalRef} />
    </View>
  );
};

export default LoveStoreScreen;
