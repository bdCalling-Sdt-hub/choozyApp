import {Text, View} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind'; // Tailwind helper function

interface PriorityCardProps {
  status: string;
}

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800',
  canceled: 'bg-red-100 text-red-800',
  accepted: 'bg-blue-100 text-blue-800',
  deliveryRequest: 'bg-orange-100 text-orange-800',
  acceptDelivery: 'bg-green-100 text-green-800',
  rejectDelivery: 'bg-gray-100 text-gray-800',
  amountReturned: 'bg-green-100 text-green-800',
};

const PriorityCard = ({status}: PriorityCardProps) => {
  const colorClasses = statusColors[status] || 'bg-gray-100 text-gray-800';

  return (
    <View
      style={tw`rounded-md p-1 px-3 self-start ${colorClasses.split(' ')[0]}`}>
      <Text style={tw`text-sm font-semibold ${colorClasses.split(' ')[1]}`}>
        Status: {status}
      </Text>
    </View>
  );
};

export default PriorityCard;
