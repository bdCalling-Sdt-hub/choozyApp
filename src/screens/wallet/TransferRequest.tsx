import {FlatList, RefreshControl, View} from 'react-native';
import {IconFillLove, IconLockWithCircle} from '../../icons/icons';
import {
  useAcceptLoveRequestMutation,
  useGetMyRequestQuery,
  useRejectLoveRequestMutation,
} from '../../redux/apiSlices/wallet';

import BackWithTitle from '../../components/backHeader/BackWithTitle';
import ConfrimationModal from '../../components/modals/ConfrimationModal';
import InputText from '../../components/inputs/InputText';
import {NavigProps} from '../../interfaces/NaviProps';
import NoFoundCard from '../../components/cards/NoFoundCard';
import NormalModal from '../../components/modals/NormalModal';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import {Text} from 'react-native';
import TransferRequestCard from '../../components/cards/TransferRequestCard';
import tw from '../../lib/tailwind';
import {useGetProfileQuery} from '../../redux/apiSlices/authSlice';
import {useSelector} from 'react-redux';
import {useToast} from '../../components/modals/Toaster';

const TransferRequest = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const {lovePrice, transactionsFee} = useSelector(state => state?.extra);
  const {data: userInfo, refetch: refetchUser} = useGetProfileQuery({});
  // console.log(transactionExtra, user);
  const [confirmationModal, setConfirmationModal] = React.useState(false);
  const [selectItem, setSelectItem] = React.useState<null | any>(null);
  const {
    data: request,
    refetch: refetchRequest,
    isLoading: loadingRequest,
  } = useGetMyRequestQuery({});

  const [showTransferModal, setShowTransferModal] = React.useState(false);
  const [showTransferSelectModal, setShowTransferSelectModal] =
    React.useState(false);
  const [showRequestModal, setShowRequestModal] = React.useState(false);
  const [showRequestSelectModal, setShowRequestSelectModal] =
    React.useState(false);

  const [acceptRequest] = useAcceptLoveRequestMutation({});
  const [rejectRequest] = useRejectLoveRequestMutation({});

  const [amountLove, setAmountLove] = React.useState('');
  const handleAccept = async () => {
    const transactions = (
      Number(amountLove) -
      (Number(selectItem?.amount) * transactionsFee) / 100
    ).toFixed(2);

    // console.log(transactions);
    const res = await acceptRequest({
      id: selectItem?.id,
      data: {
        amount: transactions,
        total_love: amountLove,
        payment_method: 'manual',
      },
    });

    // console.log(res);
    if (res.error) {
      showToast({
        title: 'Warning',
        titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
        content: res.error?.message,
        btnDisplay: true,
      });
    }
    if (res.data) {
      setShowTransferModal(false);
      showToast({
        title: 'Success',
        titleStyle: tw`text-primary text-base font-NunitoSansBold`,
        contentStyle: tw`text-sm`,
        content: 'Transfer request accepted successfully',
        // btnDisplay: true,
        buttonText: 'OK',
        buttonStyle: tw`bg-primary`,
        onPress: () => {
          refetchRequest();
          closeToast();
          refetchUser();
        },
      });
    }
  };
  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithTitle
        title="Transfer Request"
        onPress={() => navigation?.goBack()}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={refetchRequest}
            refreshing={loadingRequest}
            colors={[PrimaryColor]}
          />
        }
        contentContainerStyle={tw`px-[4%] pb-5 gap-6`}
        data={request?.data}
        ListEmptyComponent={() => <NoFoundCard title="No Status" />}
        renderItem={({item}) => (
          <TransferRequestCard
            onPressAccept={() => {
              setSelectItem(item);
              setAmountLove(
                `${
                  Number(item.amount) +
                  (Number(item.amount) * transactionsFee) / 100
                }`,
              );

              setShowTransferModal(true);
            }}
            onPressDecline={() => {
              setSelectItem(item);
              setConfirmationModal(true);
            }}
            item={item}
          />
        )}
      />

      <ConfrimationModal
        title="Are you sure you want to decline this request?"
        visible={confirmationModal}
        setVisible={setConfirmationModal}
        confirmationPress={() => {
          // handleDelete();
          console.log(selectItem?.id);
          rejectRequest({
            id: selectItem?.id,
          }).then(res => {
            // console.log(res);
            setConfirmationModal(false);
          });
        }}
        titleStyle={tw`text-color-Black900 text-lg `}
        buttonText="Decline"
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
                value={`${amountLove}`}
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
              {(
                Number(amountLove) -
                (Number(selectItem?.amount) * transactionsFee) / 100
              ).toFixed(2)}
            </Text>
          </View>
          <View
            style={tw`flex-row items-center justify-between pt-2 gap-3 px-2 my-3`}>
            <TButton
              onPress={() => {
                handleAccept();
              }}
              title="Send"
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
    </View>
  );
};

export default TransferRequest;
