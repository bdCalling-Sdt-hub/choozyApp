import { Text, TouchableOpacity, View } from 'react-native'

import moment from 'moment-timezone'
import React from 'react'
import FastImage from 'react-native-fast-image'
import tw from '../../lib/tailwind'

interface MessageCardProps{
    item: {
        image: string
        name: string
        lastMessage: string
        unreadCount: number
        time: string
    },
  onPress ?: () => void
}

const MessageCard = ({item,onPress} : MessageCardProps) => {
  return (
    <TouchableOpacity
    onPress={onPress}
    activeOpacity={0.5}
    style={tw`flex-row items-center gap-3 px-[4%] py-2`}>
    <View
      style={tw`w-12 h-12 aspect-square rounded-2xl overflow-hidden`}>
      <FastImage
        source={{uri: item.image}}
        style={tw`w-full h-full`}
      />
    </View>
    <View style={tw`flex-1`}>
      <Text
        style={tw`text-[#1D1929] font-NunitoSansBold text-[16px]`}>
        {item.name}
      </Text>
      <Text style={tw`text-[#A5A3A9] font-NunitoSansRegular text-xs`}>
        {item.lastMessage}
      </Text>
    </View>
    {/* show unread message naumber */}
    <View style={tw`items-center gap-2`}>
      {/* unread message = 0 so dot show  */}
      {item.unreadCount == 0 ? (
        <></>
      ) : (
        <View
          style={tw`w-4 h-4 rounded-full bg-red-500 items-center justify-center`}>
          <Text style={tw`text-white font-NunitoSansBold text-xs`}>
            {item.unreadCount}
          </Text>
        </View>
      )}

      <Text
        style={tw`text-[#A5A3A9] font-NunitoSansRegular text-[14px]`}>
        {/* date format like this 8:10 AM/PM  */}
        {moment(item.time).format('LT')}
      </Text>
    </View>
  </TouchableOpacity>
  )
}

export default MessageCard