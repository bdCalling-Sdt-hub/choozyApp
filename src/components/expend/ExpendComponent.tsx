import {Text, View} from 'react-native';

import React from 'react';
import {SvgXml} from 'react-native-svg';
import {ExpandableSection} from 'react-native-ui-lib';
import {IconDownArrow} from '../../icons/icons';
import tw from '../../lib/tailwind';
import {IFaq} from '../../redux/interface/additional';

const ExpendComponent = ({item}: {item: IFaq}) => {
  const [expend, setExpended] = React.useState(false);
  return (
    <View style={tw`mx-[4%] gap-2 py-5 border-b border-b-color-Black100`}>
      <ExpandableSection
        expanded={expend}
        sectionHeader={
          <View style={tw`flex-row justify-between items-center`}>
            <Text style={tw`text-color-Black900 font-NunitoSansBold text-base`}>
              {item.question}
            </Text>
            <SvgXml xml={IconDownArrow} />
          </View>
        }
        onPress={() => setExpended(!expend)}>
        <View style={tw`my-2`}>
          <Text style={tw`text-color-Black600 font-NunitoSansRegular text-sm`}>
            {item.answer}
          </Text>
        </View>
      </ExpandableSection>
    </View>
  );
};

export default ExpendComponent;
