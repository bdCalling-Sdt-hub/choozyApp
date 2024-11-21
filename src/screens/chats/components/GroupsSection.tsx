import {IconPuls, IconSearch} from '../../../icons/icons';
import {ScrollView, View} from 'react-native';

import InputText from '../../../components/inputs/InputText';
import IwtButton from '../../../components/buttons/IwtButton';
import MessageCard from '../../../components/cards/MessageCard';
import {NavigProps} from '../../../interfaces/NaviProps';
import NormalModal from '../../../components/modals/NormalModal';
import React from 'react';
import SearchUserCard from '../../wallet/components/SearchUserCard';
import TButton from '../../../components/buttons/TButton';
import groupMessageData from '../../../assets/database/groups.json';
import tw from '../../../lib/tailwind';

const GroupsSection = ({navigation}: NavigProps<null>) => {
  const [showGroupModal, setShowGroupModal] = React.useState(false);
  const [createGroupData, setCreateGroupData] = React.useState([]);
  const [selectItem, setSelectItem] = React.useState(null);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1`}>
        <View style={tw` mt-2 relative`}>
          {/*======================== search input  ==========================*/}
          <View style={tw`px-[4%]`}>
            <InputText
              placeholder="Search for group"
              svgSecondIcon={IconSearch}
            />
          </View>
        </View>

        <View style={tw`pb-20 pt-2`}>
          {groupMessageData.slice(0, 10).map(item => (
            <MessageCard
              onPress={() => navigation?.navigate('GroupMessage')}
              key={item.id}
              titleContainerStyle={tw`gap-1`}
              joinBtn
              joinPress={() => navigation?.navigate('GroupMessage')}
              subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-[#1D1929]`}
              item={{
                image: item.image,
                lastMessage: item.following,
                name: item.groupName,
                time: item.time,
                unreadCount: item.unread,
              }}
            />
          ))}
        </View>
      </ScrollView>
      <View style={tw`absolute bottom-3 right-0  px-4 py-2`}>
        <IwtButton
          onPress={() => setShowGroupModal(!showGroupModal)}
          svg={IconPuls}
          title="Create Group"
          containerStyle={tw`bg-primary`}
        />
      </View>
      <NormalModal
        animationType="fade"
        visible={showGroupModal}
        setVisible={setShowGroupModal}
        layerContainerStyle={tw`justify-center items-center h-full `}
        containerStyle={tw`w-[92%] h-[70%] rounded-3xl p-8 justify-center`}>
        <SearchUserCard
          selectionUser={selectItem}
          setSelectionUser={setSelectItem}
        />
        <View style={tw`flex-row items-center justify-between pt-2 gap-3 px-2`}>
          <TButton
            disabled={!selectItem}
            onPress={() => {
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
              setShowGroupModal(!showGroupModal);
            }}
            title="Cancel"
            containerStyle={tw`w-20 justify-center items-center bg-white border border-[#E8E8EA] shadow-none`}
            titleStyle={tw`text-red-500`}
          />
        </View>
      </NormalModal>
    </>
  );
};

export default GroupsSection;

{
  /*============================= view group =======================  */
}
{
  /* <View style={tw`flex-row justify-between items-center my-4 px-[4%]`}>
            <Text style={tw`text-color-Black1000 font-NunitoSansBold text-lg`}>
              Your Groups
            </Text>
            <SimpleButton
              onPress={() => navigation?.navigate('AllGroups')}
              title="View All"
            />
          </View> */
}
{
  /*=========================== user cards ===================== */
}
// <FlatList
//   horizontal
//   showsHorizontalScrollIndicator={false}
//   contentContainerStyle={tw`px-[2%]`}
//   data={MessagesData.slice(20, 40)}
//   renderItem={({item}) => (
//     <>
//       {/* user card here */}
//       <UserCard
//         onPress={() => navigation?.navigate('GroupMessage')}
//         item={item}
//       />
//     </>
//   )}
// />
{
  /*======================= others groups ========================= */
}

// <View style={tw`px-[4%] my-2`}>
//   <Text style={tw`text-color-Black1000 font-NunitoSansBold text-lg`}>
//     Other groups
//   </Text>
// </View>
