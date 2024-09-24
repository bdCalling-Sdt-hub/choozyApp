import {ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PopUpModal, {PopUpModalRef} from '../../components/modals/PopUpModal';
import {
  IIConAmericanExpress,
  IIConDiscover,
  IIConMasterCard,
  IIConVisaCard,
} from '../../icons/IIcons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IwtButton from '../../components/buttons/IwtButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import DateModal from '../../components/modals/DateModal';
import SideModal from '../../components/modals/SideModal';
import {IconRightArrow} from '../../icons/icons';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const Checkout = ({navigation}: NavigProps<null>) => {
  const [close, setClose] = React.useState(false);
  const [shippingModal, setShippingModal] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false);
  const [dateModal, setDateModal] = React.useState(false);
  const [selectData, setSelectDate] = React.useState<Date>(new Date());

  const popUpModalRef = React.useRef<PopUpModalRef>(null);
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title="Checkout"
        onPress={() => navigation?.goBack()}
        titleStyle={tw`text-lg text-black font-NunitoSansRegular`}
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <TouchableOpacity onPress={() => navigation?.goBack()}>
            <Text style={tw`text-base text-red-600 font-NunitoSansBold`}>
              Cancle
            </Text>
          </TouchableOpacity>
        }
      />

      <View style={tw`px-[4%] flex-row items-center gap-3`}>
        <FastImage
          style={tw`w-28 h-28 rounded-2xl`}
          resizeMode={FastImage.resizeMode.contain}
          source={{
            uri: 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_.jpg',
          }}
        />
        <View>
          <Text
            style={tw`text-base text-color-Black1000 font-NunitoSansRegular`}>
            Ninja ZX-1
          </Text>
          <Text style={tw`text-lg text-color-Black1000 font-NunitoSansBold`}>
            €398.99
          </Text>
        </View>
      </View>

      <View
        style={tw`px-[4%] py-12 gap-3 border-b border-b-color-Black200 border-dashed `}>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
            Subtotal
          </Text>
          <Text style={tw`text-base text-color-Black1000 font-NunitoSansBold`}>
            €398.99
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
            Shipping
          </Text>
          <Text style={tw`text-base text-color-Black1000 font-NunitoSansBold`}>
            €7.00
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
            Discount
          </Text>
          <Text style={tw`text-base text-color-Black1000 font-NunitoSansBold`}>
            €0.00
          </Text>
        </View>
        <View style={tw`flex-row justify-between items-center`}>
          <Text style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
            Total
          </Text>
          <Text style={tw`text-lg text-color-Black1000 font-NunitoSansBold`}>
            €398.99
          </Text>
        </View>
      </View>

      <View style={tw`flex-1 justify-end px-[4%] my-4`}>
        <View
          style={tw`flex-row items-center justify-between pt-2 gap-3  my-3`}>
          <IwtButton
            svg={IconRightArrow}
            onPress={() => {
              // setPurchaseModal(false);
              // navigation?.navigate('Checkout');
              setShippingModal(!shippingModal);
            }}
            title="Next"
            titleStyle={tw`font-NunitoSansBold`}
            containerStyle={tw`w-full justify-center items-center bg-primary shadow-none flex-row-reverse`}
          />
        </View>
      </View>
      {/*===================== Shipping modal ======================== */}
      <SideModal
        scrollable
        visible={shippingModal}
        setVisible={setShippingModal}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={tw` bg-white p-4 `}>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-lg`}>
              Shipping Address
            </Text>

            <View style={tw`mt-4 gap-6`}>
              <View style={tw`h-14 `}>
                <InputText
                  containerStyle={tw` bg-white `}
                  placeholder="Country"
                  floatingPlaceholder
                />
              </View>
              <View style={tw`h-14 `}>
                <InputText
                  containerStyle={tw` bg-white `}
                  placeholder="State"
                  floatingPlaceholder
                  keyboardType="decimal-pad"
                />
              </View>
              <View style={tw`h-14 `}>
                <InputText
                  containerStyle={tw` bg-white `}
                  placeholder="City"
                  floatingPlaceholder
                  keyboardType="ascii-capable"
                />
              </View>
              <View style={tw`h-14 `}>
                <InputText
                  containerStyle={tw` bg-white `}
                  placeholder="ZIP Code"
                  floatingPlaceholder
                />
              </View>
              <View style={tw`h-14 `}>
                <InputText
                  containerStyle={tw` bg-white `}
                  placeholder="Address"
                  floatingPlaceholder
                />
              </View>
            </View>

            <View
              style={tw`flex-row items-center justify-between pt-2 gap-3  my-3`}>
              <IwtButton
                svg={IconRightArrow}
                onPress={() => {
                  // setPurchaseModal(false);
                  // navigation?.navigate('Checkout');
                  setShippingModal(!shippingModal);
                  setPaymentModal(!paymentModal);
                }}
                title="Next"
                titleStyle={tw`font-NunitoSansBold`}
                containerStyle={tw`w-full justify-center items-center bg-primary shadow-none flex-row-reverse`}
              />
            </View>
          </View>
        </ScrollView>
      </SideModal>
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
                      style={tw`w-full h-28 rounded-2xl`}
                      source={require('../../assets/images/logo/extra/birthday.png')}
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
                    navigation?.goBack();
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

export default Checkout;
