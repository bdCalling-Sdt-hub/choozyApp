import { TouchableOpacity, View } from 'react-native'
import { IconBell, IconClose, IconSearch } from '../../icons/icons'

import React from 'react'
import { SvgXml } from 'react-native-svg'
import IButton from '../../components/buttons/IButton'
import InputText from '../../components/inputs/InputText'
import { NavigProps } from '../../interfaces/NaviProps'
import tw from '../../lib/tailwind'

const SearchScreen = ({navigation} : NavigProps<null>) => {
  return (
    <View>
    <View style={tw`flex-row items-center py-2 gap-3 bg-white px-[4%]`}>
          <TouchableOpacity onPress={() =>{navigation?.goBack()} }>
            <SvgXml xml={IconClose} />
          </TouchableOpacity>
          <InputText
            containerStyle={tw`w-full border-0 bg-color-Black50`}
            placeholder="Search"
            onChangeText={text => {}}
            returnKeyType="done" // you can set returnKeyType like 'done', 'go', etc.
            onSubmitEditing={() => {
              
            }}
            svgFirstIcon={IconSearch}
          />
          <IButton
            onPress={() => {
            
            }}
            svg={IconBell}
            containerStyle={tw`w-12  h-12 bg-color-Black50 shadow-none`}
          />
          {/* <IButton
            onPress={() => {
              setSearchVisible(!searchVisible);
            }}
            svg={IconMenu}
            
            containerStyle={tw`w-12  h-12 bg-color-Black50 shadow-none`}
          /> */}
        </View>
    </View>
  )
}

export default SearchScreen