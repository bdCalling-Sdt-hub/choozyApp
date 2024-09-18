import ActionModal, { ActionModalRef } from '../../components/modals/ActionModal';
import { FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View } from 'react-native';
import { IconBell, IconBellWithDot, IconClose, IconMenu, IconPuls, IconSearch, IconVThreeDots } from '../../icons/icons';

import FastImage from 'react-native-fast-image';
import IButton from '../../components/buttons/IButton';
import InputText from '../../components/inputs/InputText';
import IwtButton from '../../components/buttons/IwtButton';
import MessageCard from '../../components/cards/MessageCard';
import MessagesData from '../../assets/database/messages.json';
import { NavigProps } from '../../interfaces/NaviProps';
import NormalModal from '../../components/modals/NormalModal';
import React from 'react';
import SearchCard from '../../components/cards/SearchCard';
import SimpleButton from '../../components/buttons/SimpleButton';
import { SvgXml } from 'react-native-svg';
import UserCard from '../../components/cards/UserCard';
import groupMessageData from '../../assets/database/groups.json';
import searchResults from '../../assets/database/search.json';
import tw from '../../lib/tailwind';

// lazy load messageCard

// const MessageCardLazy = React.lazy(() => import('../../components/cards/MessageCard'));

const ChatsScreen = ({navigation} : NavigProps<null>) => {
  const [searchVisible, setSearchVisible] = React.useState(false);
  const [createGroupModal, setCreateGroupModal] = React.useState(false);
  const ActionModalRef = React.useRef<ActionModalRef>()
  // console.log(JSON.stringify(MessagesData, null, 2));
  const [options, setOptions] = React.useState<'contacts' | 'groups'>(
    'contacts',
  );

  const onOptionsPress = () => {

    ActionModalRef?.current?.open({
      actionData: [
        {
          title: 'My Wallet',
          onPress: () => {},
        },
        {
          title: 'My Status',
          onPress: () => {},
        },  
        {
          title: 'My Wall',
          onPress: () => {},
        },  
        {
          title: 'My Stores',
          onPress: () => {},
        },  
        {
          title: 'Favs',
          onPress: () => {},
        },  
      ],
    });
  };

  return (
    <View style={tw`flex-1 bg-white`}>
      {/*================= header here =================== */}
      <View style={tw`px-[4%] flex-row justify-between items-center`}>
        {/*============== image or logo==================  */}
        <View style={tw`py-4 flex-row items-center gap-2`}>
          <FastImage
            style={tw`h-10 aspect-square`}
            resizeMode={FastImage.resizeMode.contain}
            source={require('../../assets/images/logo/logo.png')}
          />
          <Text style={tw`text-2xl font-NunitoSansExtraBold text-primary`}>
            Choozy
          </Text>
        </View>
        <View style={tw`flex-row gap-3`}>
          <IButton
          onPress={() => setSearchVisible(!searchVisible)}
            svg={IconSearch}
            tw={tw}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
          <IButton
            onPress={() => navigation?.navigate('Notification')}
            svg={IconBellWithDot}
            tw={tw}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
          <IButton
          onPress={onOptionsPress}
            svg={IconVThreeDots}
            tw={tw}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
        </View>
      </View>

      {/*================= options here =================== */}
      <View style={tw`flex-row items-center gap-1 px-[4%] py-2`}>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOptions('contacts')}
          style={tw`h-11 px-3 ${
            options == 'contacts'
              ? 'border-b-[3px] border-b-primary'
              : 'border-b-[3px] border-b-white'
          }  justify-center items-center`}>
          <Text
            style={tw` ${
              options == 'contacts' ? 'text-primary' : 'text-[#34303E]'
            } font-NunitoSansBold text-[16px]`}>
            Contacts
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={() => setOptions('groups')}
          style={tw`h-11 px-3 ${
            options == 'groups'
              ? 'border-b-[3px] border-b-primary'
              : 'border-b-[3px] border-b-white'
          }  justify-center items-center`}>
          <Text
            style={tw` ${
              options == 'groups' ? 'text-primary' : 'text-[#34303E]'
            } font-NunitoSansBold text-[16px]`}>
            Groups
          </Text>
        </TouchableOpacity>
      </View>

      {/*================= messages list/card here =================== */}
      {options == 'contacts' ? (
        <>
          <FlatList
            showsVerticalScrollIndicator={false}
            style={tw`flex-1 `}
            contentContainerStyle={tw`pt-2 pb-4`}
            data={MessagesData.slice(5, 25)}
            renderItem={({item}) => (
              <>
                <MessageCard item={item} />
              </>
            )}
          />
        </>
      ) : (
        <ScrollView   showsVerticalScrollIndicator={false}  style={tw`flex-1`}>
          <View style={tw` mt-6 relative`}>
            {/*======================== search input  ==========================*/}
            <View style={tw`px-[4%]` }>
            <InputText
              placeholder="Search for group"
              svgSecondIcon={IconSearch}
            />
            </View>
          {/*============================= view group =======================  */}
            <View style={tw`flex-row justify-between items-center my-4 px-[4%]`}>
              <Text
                style={tw`text-color-Black1000 font-NunitoSansBold text-[16px]`}>
                Your Groups
              </Text>
              <SimpleButton onPress={() => navigation?.navigate("AllGroups")} title='View All' />
            </View>
          {/*=========================== user cards ===================== */}
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={tw`px-[2%]`}
              data={MessagesData.slice(20, 40)}
              renderItem={({item}) => (
                <>
                  {/* user card here */}
                  <UserCard item={item} />
                </>
              )}
            />
          </View>

        {/*======================= others groups ========================= */}

          <View style={tw`px-[4%] my-2`}>
            <Text
              style={tw`text-color-Black1000 font-NunitoSansBold text-[16px]`}>
              Other groups
            </Text>
          </View>
         <View style={tw`pb-20`}>
         {
            groupMessageData.slice(0, 10).map((item) => (
              
              <MessageCard key={item.id} titleContainerStyle={tw`gap-1`} joinBtn subTitleStyle={tw`text-color-Black500`} titleStyle={tw`text-[#1D1929]`}  item={{
               image : item.image,
               lastMessage : item.following,
               name : item.groupName,
               time : item.time,
               unreadCount : item.unread
              }}/>
             
            ))
          }
         </View>
        
        </ScrollView>
      )}
     {
      options == 'groups' &&  <View style={tw`absolute bottom-3 right-0  px-4 py-2` }>
      <IwtButton onPress={() => setCreateGroupModal(!createGroupModal)} tw={tw} svg={IconPuls} title='Create Group' containerStyle={tw`bg-primary`} />
    </View>
     }
      <ActionModal ref={ActionModalRef} />
      <NormalModal containerStyle={tw`w-full`} setVisible={setSearchVisible} visible={searchVisible} >
          {/*=========== search here =========== */}
           <View style={tw`flex-row items-center py-2 gap-3` }>
             <TouchableOpacity onPress={() => setSearchVisible(!searchVisible)}>
             <SvgXml xml={IconClose}/>
             </TouchableOpacity>
             <InputText
             containerStyle={tw`w-full border-4 border-[#B3C5FF]`}
               placeholder="Search"
               onChangeText={(text) => {
              
               }}
               returnKeyType="done" // you can set returnKeyType like 'done', 'go', etc.
               onSubmitEditing={(e)=>{
                console.log(e.nativeEvent.text);
               }}
               svgFirstIcon={IconSearch}
            
             />
              <IButton
            onPress={() => {
              setSearchVisible(!searchVisible)
              navigation?.navigate('Notification')}}
            svg={IconBell}
            tw={tw}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
            <IButton
          onPress={() => {
            setSearchVisible(!searchVisible)
          }}
            svg={IconMenu}
            tw={tw}
            containerStyle={tw`w-12  h-12 bg-[#F6F6F6] shadow-none`}
          />
           </View>
           {/*============= results here =================*/}
           <FlatList
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pt-2 `}
            data={searchResults}
            renderItem={({item}) => (
              <>
             <SearchCard item={item} offPost offProduct/>
              </>
            
            )} />
      </NormalModal>
      <NormalModal containerStyle={tw`w-[80%] h-[60%] rounded-3xl`} layerContainerStyle={tw`w-full h-full justify-center items-center`} setVisible={setCreateGroupModal} visible={createGroupModal}></NormalModal>
      <StatusBar barStyle="dark-content" backgroundColor="white" />
    </View>
  );
};

export default ChatsScreen;
