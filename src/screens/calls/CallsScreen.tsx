import { FlatList, Text, TouchableOpacity, View } from 'react-native'
import { IconCallBlue, IconSearch, IconVideo } from '../../icons/icons'

import React from 'react'
import { SvgXml } from 'react-native-svg'
import friends from '../../assets/database/friends.json'
import MessageCard from '../../components/cards/MessageCard'
import InputText from '../../components/inputs/InputText'
import { NavigProps } from '../../interfaces/NaviProps'
import tw from '../../lib/tailwind'

const CallsScreen = ({navigation} : NavigProps<null>) => {
  
  return (
    <View style={tw`flex-1 bg-base`}>
      {/*================== header part ================= */}
    <View style={tw`bg-white px-[4%] py-2`}>
      <View style={tw` gap-3  flex-row justify-center items-center`}>
        <Text style={tw`text-2xl text-Primary900 font-NunitoSansExtraBold`}>Calls</Text>
        <View style={tw` h-14 flex-1 ` }>
            <InputText
              placeholder="Search.."
              svgSecondIcon={IconSearch}
            />
            </View>
            
      </View>
    
    </View>

    <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={tw`pb-6 bg-white gap-2 px-[2%]`}
        data={friends.slice(0, 30)}
        renderItem={({item, index}) => (
          <>
            <MessageCard
            disabled
            //   onPress={() => navigation?.navigate('Message')}
              offPartThree
              titleContainerStyle={tw`gap-1`}
              joinBtn
              subTitleStyle={tw`text-color-Black500`}
              titleStyle={tw`text-[#1D1929] text-[14px]`}
              item={{
                image: item.avatar,
                name: item.name,
                lastMessage : "1 month ago"  
              }}
              Component={
              
                 <View style={tw`flex-row-reverse`}>
                  <TouchableOpacity  style={tw`px-3`} activeOpacity={0.5}>
                    <SvgXml height={23} width={23} xml={IconVideo} fill={"#4964C6"} />
                  </TouchableOpacity>
                  <TouchableOpacity style={tw`px-3`}  activeOpacity={0.5}>
                    <SvgXml height={18} width={18} xml={IconCallBlue} fill={"#4964C6"} />
                  </TouchableOpacity>
        
                </View>
              }
            />
          </>
        )}
      />
  
    </View>
  )
}

export default CallsScreen