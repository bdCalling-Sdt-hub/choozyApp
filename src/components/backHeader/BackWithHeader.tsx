import { Text, TouchableOpacity, View } from 'react-native'

import React from 'react'
import { SvgXml } from 'react-native-svg'
import { TailwindFn } from 'twrnc'
import { IconBasicsleft } from '../../icons/icons.config'
import { NavigProps } from '../../interfaces/NaviProps'

interface IBackWithHeader extends NavigProps<null> {
    tw : TailwindFn,
    svgIcon ?: any,
    title : string,
    titleStyle ?: any,
    containerStyle ?: any,
}
const BackWithHeader = ({tw,navigation,svgIcon,title,titleStyle,containerStyle} : IBackWithHeader) => {
  return (
    <View style={[tw`px-[4%] py-8 flex-row gap-3 items-center`,containerStyle]}>
    <TouchableOpacity  onPress={() => navigation?.goBack()}>
      <SvgXml xml={svgIcon || IconBasicsleft}/>
      </TouchableOpacity>
      <Text style={[tw`text-[24px] text-color-Black950 font-NunitoSansExtraBold `,titleStyle]}>
       {title}
      </Text>
    </View>
  )
}

export default BackWithHeader
