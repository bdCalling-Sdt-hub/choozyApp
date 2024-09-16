import { Text, View } from 'react-native'

import React from 'react'
import { TailwindFn } from 'twrnc'

interface IOR {
    tw  : TailwindFn,
    containerStyle ?: {},
}

const Or = ({tw,containerStyle} : IOR) => {
  return (
    <View style={tw`items-center gap-3 justify-center flex-row `}>
      <View style={tw`border-[.6px] flex-1 border-[#888888]`} />
      <Text style={tw`text-[16px] font-bold text-black`}>Or</Text>
      <View style={tw`border-[.6px] flex-1 border-[#888888]`} />
    </View>
  )
}

export default Or