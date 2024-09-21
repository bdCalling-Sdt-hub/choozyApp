import {StyleSheet, Text, View} from 'react-native';

import React from 'react';
import tw from '../lib/tailwind';

const TestScreen = () => {
  return (
    <View style={tw`flex-1 bg-white`}>
      <Text>TestScreen</Text>
    </View>
  );
};

export default TestScreen;

const styles = StyleSheet.create({});
