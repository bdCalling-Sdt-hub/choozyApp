import {FlatList, ScrollView, Text, TouchableOpacity, View} from 'react-native';
import PopUpModal, {PopUpModalRef} from '../../components/modals/PopUpModal';
import {
  IconBell,
  IconFillLove,
  IconLockWithCircle,
  IconSearch,
} from '../../icons/icons';

import React from 'react';
import FastImage from 'react-native-fast-image';
import {SvgXml} from 'react-native-svg';
import MessagesData from '../../assets/database/messages.json';
import transaction from '../../assets/database/transaction.json';
import BackWithComponent from '../../components/backHeader/BackWithCoponent';
import SimpleButton from '../../components/buttons/SimpleButton';
import TButton from '../../components/buttons/TButton';
import TransactionCard from '../../components/cards/TransactionCard';
import UserSelectionCard from '../../components/cards/UserSelectionCard';
import InputText from '../../components/inputs/InputText';
import NormalModal from '../../components/modals/NormalModal';
import {NavigProps} from '../../interfaces/NaviProps';
import tw from '../../lib/tailwind';

const WalletScreen = ({navigation}: NavigProps<null>) => {
  const [selectionSate, setSelectionSate] = React.useState([]);
  const [showTransferModal, setShowTransferModal] = React.useState(false);
  const [showTransferSelectModal, setShowTransferSelectModal] =
    React.useState(false);
  const [showRequestModal, setShowRequestModal] = React.useState(false);
  const [showRequestSelectModal, setShowRequestSelectModal] =
    React.useState(false);

  const popUpModalRef = React.useRef<PopUpModalRef>(null);

  return (
    <View style={tw`flex-1 bg-white`}>
      <BackWithComponent
        title={'My Wallet'}
        containerStyle={tw`justify-between`}
        onPress={() => navigation?.goBack()}
        ComponentBtn={
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => navigation?.navigate('Notification')}>
            <SvgXml xml={IconBell} style={tw`w-6 h-6`} />
          </TouchableOpacity>
        }
      />
      <ScrollView>
        {/*========================== wallet part ====================== */}
        <View
          style={tw`mx-[4%] my-4 self-center w-[95%] tablet:w-[40%] bg-[#6461FC] h-64 rounded-2xl p-4 gap-8 `}>
          {/*========================== profile part ====================== */}
          <View style={tw`flex-row items-center gap-3`}>
            <FastImage
              style={tw`w-12 h-12 rounded-2xl`}
              source={{uri: 'https://randomuser.me/api/portraits/men/19.jpg'}}
            />
            <View style={tw`flex-row items-center justify-between`}>
              <View>
                <Text
                  style={tw`text-white text-[12px] font-NunitoSansRegular `}>
                  Hello Rishabh Singh
                </Text>
                <Text style={tw`text-white font-NunitoSansBold text-[18px]`}>
                  Good Evening!
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
              12,400
            </Text>
          </View>
          {/*========================== buttons part ====================== */}
          <View style={tw`flex-row justify-between items-center gap-4`}>
            <SimpleButton
              onPress={() => setShowTransferModal(!showTransferModal)}
              containerStyle={tw`bg-white py-2 rounded-xl border-[1px] flex-1 justify-center`}
              title="Transfer"
              titleStyle={tw`text-primary600`}
            />
            <SimpleButton
              containerStyle={tw`bg-transparent py-2 rounded-xl border-[1px] flex-1 justify-center`}
              title="Request"
              titleStyle={tw`text-white`}
              onPress={() => setShowRequestModal(!showRequestModal)}
            />
            <SimpleButton
              onPress={() => navigation?.navigate('LoveStore')}
              containerStyle={tw`bg-transparent py-2 rounded-xl border-[1px] flex-1 justify-center`}
              title="Get"
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
                  <Text style={tw`text-primary font-NunitoSansBold text-sm`}>
                    View all
                  </Text>
                </TouchableOpacity>
              </View>
              {transaction?.map((item, index) => {
                return <TransactionCard item={item} key={index} />;
              })}
            </View>
          }
        </>
      </ScrollView>

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
            12,400
          </Text>
          <View style={tw`gap-5 my-3`}>
            <View style={tw`h-14`}>
              <InputText
                keyboardType="decimal-pad"
                placeholder="Enter Amount"
                floatingPlaceholder
              />
            </View>
            <View style={tw`h-14`}>
              <InputText
                editable={false}
                value="+2.5%"
                style={tw`text-left text-color-Black800 font-NunitoSansExtraBold`}
                placeholder="Transfer fee"
                floatingPlaceholder
                svgSecondIcon={IconLockWithCircle}
              />
            </View>
          </View>
          <View style={tw`my-2`}>
            <Text>The receiver will received only 2,300</Text>
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
        <View style={tw`gap-1 mb-3`}>
          <Text style={tw`text-2xl text-color-Black900 font-NunitoSansBold`}>
            Select from contacts
          </Text>
          <Text
            style={tw`text-base text-color-Black400 font-NunitoSansRegular text-xs`}>
            You can select multiple members
          </Text>
        </View>

        <View style={tw`flex-row items-center gap-3 my-3`}>
          <InputText placeholder="Search members" svgSecondIcon={IconSearch} />
        </View>
        <FlatList
          contentContainerStyle={tw`py-4`}
          showsVerticalScrollIndicator={false}
          data={MessagesData.slice(0, 10)}
          renderItem={({item}) => (
            <>
              <UserSelectionCard
                item={item}
                setSelectionSate={setSelectionSate}
                selectionSate={selectionSate}
              />
            </>
          )}
        />
        <View style={tw`flex-row items-center justify-between pt-2 gap-3 px-2`}>
          <TButton
            onPress={() => {
              //   setCreateGroupModal(false);
              //   navigation?.navigate('GroupMessage');
              popUpModalRef.current?.open({
                svgIcon: (
                  <SvgXml
                    height={65}
                    width={65}
                    xml={IconFillLove}
                    style={{
                      transform: [{rotate: '5deg'}],
                    }}
                  />
                ),
                onPress: () => {
                  popUpModalRef.current?.close();
                  setShowTransferModal(false);
                  setShowTransferSelectModal(false);
                },
                title: 'You’re done!',
                titleStyle: tw`text-color-Black1000 font-NunitoSansExtraBold`,
                content:
                  'Your coins has been shared with the receiver(s) successfully',
                contentStyle: tw`text-color-Black800 font-NunitoSansRegular`,
                buttonText: 'Back to your Wallet',
                buttonStyle: tw`w-full justify-center items-center font-NunitoSansBold shadow-none`,
              });
            }}
            title="Send"
            containerStyle={tw`w-20 justify-center items-center bg-primary shadow-none`}
          />
          <TButton
            onPress={() => {
              setShowTransferModal(!showTransferModal);
              setShowTransferSelectModal(!showTransferSelectModal);
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
              />
            </View>
          </View>

          <View
            style={tw`flex-row items-center justify-between pt-2 gap-3 px-2 my-3`}>
            <TButton
              onPress={() => {
                setShowRequestSelectModal(!showRequestSelectModal);
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
      <NormalModal
        animationType="fade"
        visible={showRequestSelectModal}
        setVisible={setShowRequestSelectModal}
        layerContainerStyle={tw`justify-center items-center h-full `}
        containerStyle={tw`w-[92%] h-[70%] rounded-3xl p-8 justify-center`}>
        <View style={tw`gap-1 mb-3`}>
          <Text style={tw`text-2xl text-color-Black900 font-NunitoSansBold`}>
            Select from contacts
          </Text>
          <Text
            style={tw`text-base text-color-Black400 font-NunitoSansRegular text-xs`}>
            You can select multiple members
          </Text>
        </View>

        <View style={tw`flex-row items-center gap-3 my-3`}>
          <InputText placeholder="Search members" svgSecondIcon={IconSearch} />
        </View>
        <FlatList
          contentContainerStyle={tw`py-4`}
          showsVerticalScrollIndicator={false}
          data={MessagesData.slice(0, 10)}
          renderItem={({item}) => (
            <>
              <UserSelectionCard
                item={item}
                setSelectionSate={setSelectionSate}
                selectionSate={selectionSate}
              />
            </>
          )}
        />
        <View style={tw`flex-row items-center justify-between pt-2 gap-3 px-2`}>
          <TButton
            onPress={() => {
              //   setCreateGroupModal(false);
              //   navigation?.navigate('GroupMessage');
              popUpModalRef.current?.open({
                iconComponent: (
                  <FastImage
                    source={require('../../assets/icons/takingLove.png')}
                    style={tw`w-16 h-16`}
                    resizeMode={FastImage.resizeMode.contain}
                  />
                ),
                onPress: () => {
                  popUpModalRef.current?.close();
                  setShowRequestModal(false);
                  setShowRequestSelectModal(false);
                },
                title: 'Your request is pending',
                titleStyle: tw`text-color-Black1000 font-NunitoSansExtraBold`,

                content:
                  'You will get love while the sender accept your request',
                contentStyle: tw`text-color-Black800 font-NunitoSansRegular`,
                buttonText: 'Back to your Wallet',
                buttonStyle: tw`w-full justify-center bg-Warning500 items-center font-NunitoSansBold shadow-none`,
              });
            }}
            title="Send"
            containerStyle={tw`w-20 justify-center items-center bg-primary shadow-none`}
          />
          <TButton
            onPress={() => {
              setShowRequestModal(!showRequestModal);
              setShowRequestSelectModal(!showRequestSelectModal);
            }}
            title="Cancel"
            containerStyle={tw`w-20 justify-center items-center bg-white border border-[#E8E8EA] shadow-none`}
            titleStyle={tw`text-red-500`}
          />
        </View>
      </NormalModal>
      <PopUpModal ref={popUpModalRef} />
    </View>
  );
};

export default WalletScreen;
