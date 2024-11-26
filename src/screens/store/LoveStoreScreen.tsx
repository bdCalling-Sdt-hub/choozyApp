import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import {
  IIConAmericanExpress,
  IIConDiscover,
  IIConMasterCard,
  IIConVisaCard,
} from '../../icons/IIcons';
import {IconClose, IconFillEarthWhite, IconFillLove} from '../../icons/icons';

import {StripeProvider} from '@stripe/stripe-react-native';
import axios from 'axios';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import IwtButton from '../../components/buttons/IwtButton';
import TButton from '../../components/buttons/TButton';
import InputText from '../../components/inputs/InputText';
import DateModal from '../../components/modals/DateModal';
import SideModal from '../../components/modals/SideModal';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {formatCurrency} from '../../utils/currencyFomator';
import {Android} from '../../utils/utils';
import LoveCheckout from './LoveCheckout';
import Countries from './countries.json';

const handleExchangeRate = async () => {
  const res = await axios.get(
    `https://v6.exchangerate-api.com/v6/abac13c63695c04cc1d7ac4f/latest/USD`,
  );

  return res?.data;
};

const LoveStoreScreen = ({navigation}: NavigProps<null>) => {
  const [countryModal, setCountryModal] = React.useState(false);
  const [selectedCurrency, setSelectedCurrency] = React.useState<
    (typeof Countries)[0]
  >({
    country: 'United States',
    currency_code: 'USD',
    locale: 'en-US',
  });
  const [allConversionRate, setAllConversionRate] = React.useState<
    [{country: string; currency_code: string; locale: string}]
  >([{country: 'United States', currency_code: 'USD', locale: 'en-US'}]);
  const [calculateCurrency, setCalculateCurrency] = React.useState('');

  const {closeToast, showToast} = useToast();
  // console.log(Countries);
  const extra = useSelector(state => state?.extra);
  // console.log(extra);
  const [close, setClose] = React.useState(false);
  const [paymentModal, setPaymentModal] = React.useState(false);

  const [dateModal, setDateModal] = React.useState(false);
  const [selectData, setSelectDate] = React.useState<Date>(new Date());
  const [coin, setCoin] = React.useState('');
  const [customerName, setCustomerName] = React.useState('');
  const [customerEmail, setCustomerEmail] = React.useState('');

  React.useEffect(() => {
    handleExchangeRate(selectedCurrency?.currency_code).then(res => {
      setAllConversionRate(res?.conversion_rates);
    });
  }, [selectedCurrency]);

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        onPress={() => navigation?.goBack()}
        containerStyle={tw`justify-between`}
        ComponentBtn={
          <IwtButton
            title={`${selectedCurrency?.currency_code}`}
            titleStyle={tw`text-white text-xs`}
            svg={IconFillEarthWhite}
            onPress={() => {
              setCountryModal(true);
            }}
            containerStyle={tw`p-0 bg-primary self-end w-22 gap-2  items-center justify-center h-7 rounded-md`}
          />
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
                Get love
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
              style={tw`px-[4%] py-12 gap-3 ${
                Android ? 'border-b border-dashed  border-b-gray-400' : ''
              }`}>
              <View style={tw`flex-row justify-between items-center`}>
                <Text
                  style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
                  Total Love
                </Text>
                <View style={tw`flex-row items-center gap-2`}>
                  <SvgXml height={10} width={10} xml={IconFillLove} />
                  <Text
                    style={tw`text-lg text-color-Black1000 font-NunitoSansBold`}>
                    {coin || 0}
                  </Text>
                </View>
              </View>
              <View style={tw`flex-row justify-between items-center`}>
                <Text
                  style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
                  Love Prize
                </Text>
                <Text
                  style={tw`text-lg text-color-Black1000 font-NunitoSansBold`}>
                  {formatCurrency(
                    extra?.lovePrice *
                      allConversionRate[selectedCurrency?.currency_code] || 0,
                    selectedCurrency?.currency_code,
                    selectedCurrency?.locale,
                  )}
                </Text>
              </View>

              <View style={tw`flex-row justify-between items-center`}>
                <Text
                  style={tw`text-sm text-color-Black400 font-NunitoSansRegular`}>
                  Total
                </Text>
                <Text
                  style={tw`text-lg text-color-Black1000 font-NunitoSansBold`}>
                  {formatCurrency(
                    extra?.lovePrice *
                      allConversionRate[selectedCurrency?.currency_code] *
                      coin || 0,
                    selectedCurrency?.currency_code,
                    selectedCurrency?.locale,
                  )}
                </Text>
              </View>
            </View>

            <View
              style={tw`flex-row items-center justify-between pt-2 gap-3 px-2 my-3`}>
              <TButton
                disabled={!coin}
                onPress={() => {
                  setPaymentModal(!paymentModal);
                  // setDateModal(!dateModal);
                }}
                title="Continue"
                containerStyle={tw`w-full justify-center items-center ${
                  !coin ? 'bg-primary opacity-25' : 'bg-primary'
                } shadow-none`}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <SideModal
        headerOff
        scrollable
        visible={paymentModal}
        setVisible={setPaymentModal}>
        <ScrollView
          keyboardShouldPersistTaps="always"
          showsVerticalScrollIndicator={false}>
          <View style={tw` bg-white p-4  `}>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-lg`}>
              Pay with
            </Text>
            <View style={tw`my-4 gap-6`}>
              <View
                style={tw`h-14 ${
                  Android ? 'border-dashed border-[1px] border-gray-200' : ''
                } rounded-2xl flex-row items-center  px-4 justify-between`}>
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
            </View>
            <View style={tw`gap-3 mt-3`}>
              {/* Input for Customer Name */}
              <View style={tw`h-14`}>
                <InputText
                  placeholder="Enter Your Name"
                  floatingPlaceholder
                  onChangeText={(text: string) => setCustomerName(text)}
                />
              </View>
              {/* Input for Customer Email */}
              <View style={tw`h-14`}>
                <InputText
                  placeholder="Enter Your Email"
                  keyboardType="email-address"
                  floatingPlaceholder
                  onChangeText={(text: string) => setCustomerEmail(text)}
                />
              </View>
            </View>
            <StripeProvider publishableKey="pk_test_51M6AQECe4QqAuKX4hQuRPLKDeB192L6xZiop8yWhLLrmbBTZjSsPKPyGvhhHVlKQNikct3mhaeZgyGjYTA17VwbT00l34SeOAr">
              <LoveCheckout
                setPaymentModal={setPaymentModal}
                love={coin}
                customerEmail={customerEmail}
                customerName={customerName}
                totalAmount={extra?.lovePrice * coin}
                navigation={navigation}
              />
            </StripeProvider>
          </View>
        </ScrollView>
      </SideModal>

      <DateModal
        selectedDate={setSelectDate}
        setVisible={setDateModal}
        visible={dateModal}
      />

      <SideModal headerOff visible={countryModal} setVisible={setCountryModal}>
        <View style={tw` bg-white p-4  `}>
          <Text style={tw`text-color-Black900 font-NunitoSansBold text-lg`}>
            Select Country
          </Text>
        </View>

        <FlatList
          contentContainerStyle={tw`pb-12 bg-white`}
          data={Countries}
          renderItem={({item}) => (
            <View>
              <TouchableOpacity
                onPress={() => {
                  setSelectedCurrency(item);
                  setCountryModal(false);
                }}
                style={tw`h-14 ${
                  Android
                    ? `border-dashed border-[1px] border-gray-200 ${
                        selectedCurrency.currency_code == item.currency_code
                          ? 'bg-primary'
                          : ''
                      }`
                    : ''
                } rounded-2xl flex-row items-center  px-4 justify-between`}>
                <Text
                  style={tw`text-black ${
                    selectedCurrency.currency_code == item.currency_code
                      ? 'text-white'
                      : ''
                  } font-NunitoSansBold text-sm`}>
                  {item.country}
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </SideModal>
    </View>
  );
};

export default LoveStoreScreen;
