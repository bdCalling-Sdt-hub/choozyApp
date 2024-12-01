import {
  FlatList,
  RefreshControl,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {IconFillLove, IconLockWithCircle} from '../../icons/icons';
import {
  useLoveRequestMutation,
  useLoveTransferMutation,
} from '../../redux/apiSlices/wallet';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import {useSelector} from 'react-redux';
import LogoWithHeader from '../../components/backHeader/LogoWithHeader';
import SimpleButton from '../../components/buttons/SimpleButton';
import TButton from '../../components/buttons/TButton';
import TransactionCard from '../../components/cards/TransactionCard';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';
import {useToast} from '../../components/modals/Toaster';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';
import {useGetProfileQuery} from '../../redux/apiSlices/authSlice';
import {useGetPaymentHistoryQuery} from '../../redux/apiSlices/paymentSlices';
import {extractDateTimeParts} from '../../utils/extractDateTimeParts';
import {PrimaryColor} from '../../utils/utils';
import SearchUserCard from './components/SearchUserCard';

const WalletScreen = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();

  const {
    data: userInfo,
    refetch: refetchProfile,
    isLoading: isLoadingProfile,
  } = useGetProfileQuery({});

  const {data: transaction, refetch: walletRefetch} = useGetPaymentHistoryQuery(
    {},
  );

  const [requestLove] = useLoveRequestMutation({});
  const [transferLove] = useLoveTransferMutation({});

  const {lovePrice, transactionsFee} = useSelector(state => state?.extra);

  const [selectionSate, setSelectionSate] = React.useState(null);
  const [amountLove, setAmountLove] = React.useState('');
  const [isTransfer, setIsTransfer] = React.useState(false);

  const [showTransferModal, setShowTransferModal] = React.useState(false);
  const [showTransferSelectModal, setShowTransferSelectModal] =
    React.useState(false);
  const [showRequestModal, setShowRequestModal] = React.useState(false);
  const [showRequestSelectModal, setShowRequestSelectModal] =
    React.useState(false);

  const handleRequestLove = async () => {
    const res = await requestLove({
      amount: amountLove,
      request_id: selectionSate?.user_id,
    });
    // console.log(res);
    if (res.data) {
      setShowRequestModal(false);
      setSelectionSate(null);
      setAmountLove('');
      showToast({
        content: res.data.message,
        title: 'success',
        containerStyle: tw`text-xs`,
        titleStyle: tw`text-green-500`,
        btnDisplay: true,
      });
    }
    if (res.error) {
      showToast({
        content: res.error?.message,
        containerStyle: tw`text-xs`,
        title: 'Warning',
        titleStyle: tw`text-yellow-500`,
        btnDisplay: true,
      });
    }
  };

  const handleTransferLove = async () => {
    const res = await transferLove({
      amount: amountLove,
      total_love:
        Number(amountLove) - (Number(amountLove) * transactionsFee) / 100,
      received_id: selectionSate?.user_id,
      payment_method: 'manual',
    });
    // console.log(res);
    if (res.data) {
      refetchProfile();
      setShowTransferModal(false);
      setSelectionSate(null);
      setAmountLove('');
      showToast({
        content: res.data.message,
        title: 'success',
        titleStyle: tw`text-green-500`,
        containerStyle: tw`text-xs`,
        btnDisplay: true,
      });
    }
    if (res.error) {
      showToast({
        content: res.error?.message,
        title: 'Warning',
        containerStyle: tw`text-xs`,
        titleStyle: tw`text-yellow-500`,
        btnDisplay: true,
      });
    }
  };

  // console.log(selectionSate);

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================= header here =================== */}
      <View style={tw``}>
        <LogoWithHeader
          offMenu
          searchOffItem={{
            offPeople: true,
            offPost: true,
            offProduct: true,
          }}
          onFinish={text => {
            navigation?.navigate('Search', {
              text,
            });
          }}
          navigation={navigation}
        />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={isLoadingProfile}
            onRefresh={() => {
              walletRefetch();
              refetchProfile();
            }}
            colors={[PrimaryColor]}
          />
        }
        data={[1]}
        renderItem={() => {
          return (
            <>
              {/*========================== wallet part ====================== */}
              <View
                style={tw`mx-[4%] my-4 self-center w-[95%] tablet:w-[40%] bg-[#6461FC] h-64 rounded-2xl p-4 gap-8 `}>
                {/*========================== profile part ====================== */}
                <View style={tw`flex-row items-center gap-3`}>
                  {userInfo?.data?.image ? (
                    <FastImage
                      style={tw`w-12 h-12 rounded-2xl`}
                      source={{uri: userInfo?.data?.image}}
                    />
                  ) : (
                    <View
                      style={tw`w-12 h-12 rounded-2xl bg-primary justify-center items-center`}>
                      <Text
                        style={tw`text-white font-NunitoSansBold text-[20px]`}>
                        {userInfo?.data?.full_name[0]}
                      </Text>
                    </View>
                  )}

                  <View style={tw`flex-row items-center justify-between`}>
                    <View>
                      <Text
                        style={tw`text-white text-[12px] font-NunitoSansRegular `}>
                        {userInfo?.data?.full_name}
                      </Text>
                      <Text
                        style={tw`text-white font-NunitoSansBold text-[18px]`}>
                        Good{' '}
                        {
                          extractDateTimeParts(
                            new Date().toISOString(),
                            false,
                            true,
                          ).timeOfDay
                        }
                        !
                      </Text>
                    </View>
                  </View>
                </View>
                {/*========================== balance part ====================== */}
                <View style={tw``}>
                  <View style={tw`flex-row  gap-1  items-center`}>
                    <Text style={tw`text-white text-sm font-NunitoSansBold `}>
                      Available Balance
                    </Text>
                    <SvgXml
                      style={{
                        transform: [{rotate: '5deg'}],
                      }}
                      xml={IconFillLove}
                    />
                  </View>
                  <Text
                    style={tw`text-white font-NunitoSansExtraBold text-[34px] tracking-wide`}>
                    {userInfo?.data?.balance}
                  </Text>
                </View>
                {/*========================== buttons part ====================== */}
                <View
                  style={tw` flex-row flex-wrap self-start items-center gap-4`}>
                  <SimpleButton
                    onPress={() => {
                      setIsTransfer(true);
                      setShowTransferModal(!showTransferModal);
                    }}
                    containerStyle={tw`bg-white py-2 rounded-xl border-[1px] self-start  justify-center`}
                    title="Transfer"
                    titleStyle={tw`text-primary600`}
                  />
                  <SimpleButton
                    containerStyle={tw`bg-transparent py-2 rounded-xl border-[1px] self-start  justify-center`}
                    title="Request"
                    titleStyle={tw`text-white`}
                    onPress={() => {
                      setIsTransfer(false);
                      setShowRequestModal(!showRequestModal);
                    }}
                  />
                  <SimpleButton
                    onPress={() => navigation?.navigate('LoveStore')}
                    containerStyle={tw`bg-transparent py-2 rounded-xl border-[1px] self-start  justify-center`}
                    title="Get"
                    titleStyle={tw`text-white`}
                  />
                  <SimpleButton
                    onPress={() => navigation?.navigate('TransferRequest')}
                    containerStyle={tw`bg-transparent py-2 rounded-xl border-[1px] self-start  justify-center`}
                    title="Trans. Request"
                    titleStyle={tw`text-white`}
                  />
                </View>
              </View>
              {/*==================== transaction history part ========================= */}
              <>
                {
                  <View style={tw`px-[4%] py-4`}>
                    <View style={tw` flex-row justify-between mb-2 `}>
                      <Text
                        style={tw`text-color-Black1000 font-NunitoSansBold text-[18px]`}>
                        Last Transactions
                      </Text>
                      <TouchableOpacity
                        activeOpacity={0.5}
                        onPress={() => {
                          navigation?.navigate('TransactionHistory');
                        }}>
                        <Text
                          style={tw`text-primary font-NunitoSansBold text-sm`}>
                          View all
                        </Text>
                      </TouchableOpacity>
                    </View>
                    {transaction?.data?.transactions?.map((item, index) => {
                      // console.log(item);
                      return <TransactionCard item={item} key={index} />;
                    })}
                  </View>
                }
              </>
            </>
          );
        }}
      />

      {/*==================== transfer modals ========================= */}
      <NormalModal
        animationType="fade"
        visible={showTransferModal}
        setVisible={setShowTransferModal}
        layerContainerStyle={tw`justify-center items-center h-full `}
        containerStyle={tw`w-[92%]  rounded-3xl p-8 justify-center`}>
        <View style={tw`gap-2`}>
          <View style={tw`flex-row items-center gap-3`}>
            <Text
              style={tw`text-[24px] font-NunitoSansExtraBold text-color-Black1000 `}>
              Available
            </Text>
            <SvgXml
              height={25}
              width={25}
              style={{
                transform: [{rotate: '5deg'}],
              }}
              xml={IconFillLove}
            />
          </View>
          <Text
            style={tw`text-[34px] font-NunitoSansExtraBold text-color-Black1000 my-2`}>
            {(
              Number(userInfo?.data?.balance) - Number(amountLove || 0)
            ).toFixed(2)}
          </Text>
          <View style={tw`gap-5 my-3`}>
            <View style={tw`h-14`}>
              <InputText
                keyboardType="decimal-pad"
                placeholder="Enter Amount"
                floatingPlaceholder
                value={amountLove}
                onChangeText={text => {
                  // Allow only numbers and one decimal point
                  const sanitizedText = text.replace(/[^0-9.]/g, '');

                  // Limit input to 2 decimal places
                  if (sanitizedText.includes('.')) {
                    const [integer, decimal] = sanitizedText.split('.');
                    if (decimal?.length > 2) {
                      return; // Stop input if more than 2 decimal places
                    }
                  }

                  // Check if balance is sufficient
                  const newAmount = Number(sanitizedText || 0);
                  const currentBalance = Number(userInfo?.data?.balance || 0);

                  if (newAmount > currentBalance) {
                    return; // Prevent setting amount that would make the balance negative
                  }

                  setAmountLove(sanitizedText);
                }}
              />
            </View>
            <View style={tw`h-14`}>
              <InputText
                editable={false}
                value={`${transactionsFee}%`}
                style={tw`text-left text-color-Black800 font-NunitoSansExtraBold`}
                placeholder="Transfer fee"
                floatingPlaceholder
                svgSecondIcon={IconLockWithCircle}
              />
            </View>
          </View>
          <View style={tw`my-2`}>
            <Text>
              The receiver will received only{' '}
              {Number(amountLove) -
                (Number(amountLove) * transactionsFee) / 100}
            </Text>
          </View>
          <View
            style={tw`flex-row items-center justify-between pt-2 gap-3 px-2 my-3`}>
            <TButton
              onPress={() => {
                setShowTransferSelectModal(!showTransferSelectModal);
                setShowTransferModal(!showTransferModal);
              }}
              title="Continue"
              containerStyle={tw`w-24 justify-center items-center bg-primary shadow-none`}
            />
            <TButton
              onPress={() => {
                setShowTransferModal(!showTransferModal);
              }}
              title="Cancel"
              containerStyle={tw`w-20 justify-center items-center bg-white border border-[#E8E8EA] shadow-none`}
              titleStyle={tw`text-red-500`}
            />
          </View>
        </View>
      </NormalModal>
      <NormalModal
        animationType="fade"
        visible={showTransferSelectModal}
        setVisible={setShowTransferSelectModal}
        layerContainerStyle={tw`justify-center items-center h-full `}
        containerStyle={tw`w-[92%] h-[70%] rounded-3xl p-8 justify-center`}>
        <SearchUserCard
          selectionUser={selectionSate}
          setSelectionUser={setSelectionSate}
        />
        <View style={tw`flex-row items-center justify-between pt-2 gap-3 px-2`}>
          <TButton
            disabled={!selectionSate}
            onPress={() => {
              if (!isTransfer) {
                console.log('handleRequestLove');
                handleRequestLove();
              } else {
                console.log('handleTransferLove');
                handleTransferLove();
              }
              setShowTransferSelectModal(false);

              // showToast({
              //   svgIcon: (
              //     <SvgXml
              //       height={65}
              //       width={65}
              //       xml={IconFillLove}
              //       style={{
              //         transform: [{rotate: '5deg'}],
              //       }}
              //     />
              //   ),
              //   onPress: () => {
              //     closeToast();
              //     setShowTransferModal(false);
              //     setShowTransferSelectModal(false);
              //   },
              //   title: 'You’re done!',
              //   titleStyle: tw`text-color-Black1000 font-NunitoSansExtraBold`,
              //   content:
              //     'Your coins has been shared with the receiver(s) successfully',
              //   contentStyle: tw`text-color-Black800 font-NunitoSansRegular`,
              //   buttonText: 'Back to your Wallet',
              //   buttonStyle: tw`w-full justify-center items-center font-NunitoSansBold shadow-none`,
              // });
            }}
            title="Send"
            containerStyle={tw`w-20 justify-center items-center  bg-primary shadow-none`}
          />
          <TButton
            onPress={() => {
              setShowTransferSelectModal(!showTransferSelectModal);
              setSelectionSate(null);
              setIsTransfer(false);
            }}
            title="Cancel"
            containerStyle={tw`w-20 justify-center items-center bg-white border border-[#E8E8EA] shadow-none`}
            titleStyle={tw`text-red-500`}
          />
        </View>
      </NormalModal>
      {/*==================== Request modals ========================= */}
      <NormalModal
        animationType="fade"
        visible={showRequestModal}
        setVisible={setShowRequestModal}
        layerContainerStyle={tw`justify-center items-center h-full `}
        containerStyle={tw`w-[92%]  rounded-3xl p-8 justify-center`}>
        <View style={tw`gap-2`}>
          <Text
            style={tw`text-[24px] font-NunitoSansExtraBold text-color-Black1000 `}>
            Request
          </Text>
          <View style={tw`gap-5 mt-3`}>
            <View style={tw`h-14`}>
              <InputText
                placeholder="Enter Amount"
                keyboardType="decimal-pad"
                floatingPlaceholder
                onChangeText={text => setAmountLove(text)}
              />
            </View>
          </View>

          <View
            style={tw`flex-row items-center justify-between pt-2 gap-3 px-2 my-3`}>
            <TButton
              onPress={() => {
                setShowTransferSelectModal(!showTransferSelectModal);
                setShowRequestModal(!showRequestModal);
              }}
              title="Request"
              containerStyle={tw`w-24 justify-center items-center bg-primary shadow-none`}
            />
            <TButton
              onPress={() => {
                setShowRequestModal(!showRequestModal);
              }}
              title="Cancel"
              containerStyle={tw`w-20 justify-center items-center bg-white border border-[#E8E8EA] shadow-none`}
              titleStyle={tw`text-red-500`}
            />
          </View>
        </View>
      </NormalModal>
    </View>
  );
};

export default WalletScreen;
