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
import NormalModal from '../../components/modals/NormalModal';
import {PrimaryColor} from '../../utils/utils';
import React from 'react';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import {Text} from 'react-native';
import TransferRequestCard from '../../components/cards/TransferRequestCard';
import tw from '../../lib/tailwind';
import {useSelector} from 'react-redux';
import {useToast} from '../../components/modals/Toaster';

const TransferRequest = ({navigation}: NavigProps<null>) => {
  const {closeToast, showToast} = useToast();
  const transactionExtra = useSelector(state => state?.extra);
  const user = useSelector(state => state?.user?.user);
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

  const [userAmount, setUserAmount] = React.useState(0);
  const handleAccept = async () => {
    const transactions =
      (userAmount * transactionExtra?.transactionsFee) / 100 +
      parseFloat(userAmount);

    const res = await acceptRequest({
      id: selectItem?.id,
      data: {
        amount: transactions,
        total_love: userAmount,
        payment_method: 'manual',
      },
    });
    console.log(res);
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
      showToast({
        title: 'Success',
        titleStyle: tw`text-primary text-base font-NunitoSansBold`,
        contentStyle: tw`text-sm`,
        content: 'Request has been accepted',
        btnDisplay: true,
        onPress: () => {
          closeToast();
          setShowTransferModal(false);
        },
      });
    }
  };

  // console.log(selectItem);

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithTitle
        title="Transfer Request"
        onPress={() => navigation?.goBack()}
      />
      <FlatList
        refreshControl={
          <RefreshControl
            onRefresh={() => refetchRequest()}
            refreshing={loadingRequest}
            tintColor={PrimaryColor}
          />
        }
        contentContainerStyle={tw`px-[4%] pb-5 gap-6`}
        data={request?.data}
        renderItem={({item}) => (
          <TransferRequestCard
            onPressAccept={() => {
              setSelectItem(item);
              setUserAmount(item?.amount);
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
          </View>
          <View style={tw`flex-row items-center gap-2`}>
            <SvgXml
              height={30}
              width={30}
              style={{
                transform: [{rotate: '5deg'}],
              }}
              xml={IconFillLove}
            />
            <Text
              style={tw`text-[34px] font-NunitoSansExtraBold text-color-Black1000 my-2`}>
              {user.balance}
            </Text>
          </View>

          <View style={tw`gap-5 my-3`}>
            <View style={tw`h-14`}>
              <InputText
                keyboardType="decimal-pad"
                placeholder="Enter Amount"
                floatingPlaceholder
                value={`${userAmount}`}
                onChangeText={text => setUserAmount(text)}
              />
            </View>
            <View style={tw`h-14`}>
              <InputText
                editable={false}
                value={`${transactionExtra?.transactionsFee}%`}
                style={tw`text-left text-color-Black800 font-NunitoSansExtraBold`}
                placeholder="Transfer fee"
                floatingPlaceholder
                svgSecondIcon={IconLockWithCircle}
              />
            </View>
          </View>
          <View style={tw`my-2`}>
            <Text>
              Total send your amount:
              {userAmount
                ? (userAmount * transactionExtra?.transactionsFee) / 100 +
                  parseFloat(userAmount)
                : ''}
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
