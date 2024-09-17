import { TouchableOpacity, View } from 'react-native';
import { TextField, TextFieldProps } from 'react-native-ui-lib'; // Import the type for TextField props

import React from 'react';
import { SvgXml } from 'react-native-svg';
import tw from '../../lib/tailwind';

interface InputTextProps extends Omit<TextFieldProps, 'containerStyle' | 'fieldStyle'> {
  onPress?: () => void;
  svgFirstIcon?: string;
  svgSecondIcon?: string;
}

const InputText = ({
  onPress,
  svgFirstIcon,
  svgSecondIcon,
  ...inputProps // Spread remaining props to pass to TextField
}: InputTextProps) => {
  return (
    <View
      style={tw`w-full rounded-2xl h-14 px-4 bg-white flex-row items-center gap-3 border border-[#D1D1D1]`}>
      {svgFirstIcon && <SvgXml xml={svgFirstIcon} />}
      <TextField
        containerStyle={tw`flex-1`}
        fieldStyle={tw`pb-4`}
        {...inputProps} // Spread props here
      />
      {svgSecondIcon && (
        <TouchableOpacity onPress={onPress}>
          <SvgXml xml={svgSecondIcon} />
        </TouchableOpacity>
      )}
    </View>
  );
};

export default InputText;
