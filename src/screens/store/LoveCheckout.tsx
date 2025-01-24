import {
  CardField,
  useConfirmPayment,
  useStripe,
} from '@stripe/stripe-react-native';
import {
  useConfirmPaymentMutation,
  usePaymentIntentMutation,
} from '../../redux/apiSlices/paymentSlices';

import React from 'react';
import {View} from 'react-native';
import {SvgXml} from 'react-native-svg';
import TButton from '../../components/buttons/TButton';
import {useToast} from '../../components/modals/Toaster';
import {AIconSuccess} from '../../icons/AnimateICons';
import tw from '../../lib/tailwind';

interface Props {
  navigation: any;
  love: any;
  totalAmount: any;
  setPaymentModal: any;
  customerEmail: string; // Added customer email prop
  customerName: string; // Added customer name prop
}

function CheckoutScreen({
  navigation,
  love,
  totalAmount,
  setPaymentModal,
  customerEmail,
  customerName,
}: Props) {
  const {closeToast, showToast} = useToast();

  // console.log(love, totalAmount);

  const [extraLoding, setExtraLoding] = React.useState(false);
  const [cardDetails, setCardDetails] = React.useState(false);

  const [paymentInent] = usePaymentIntentMutation();
  const [confirmPaymentBackend] = useConfirmPaymentMutation();

  const {confirmPayment, loading} = useConfirmPayment();

  const {createToken} = useStripe();

  const handlePayPress = async () => {
    try {
      setExtraLoding(true);

      const {token, error} = await createToken({
        type: 'Card', // Specify the type of token
        card: cardDetails, // Pass the card details from CardField
      });

      console.log(token);

      // Gather the customer's billing information
      const billingDetails = {
        name: customerName, // Adding customer name
        email: customerEmail, // Adding customer email
      };

      // Fetch the intent client secret from the backend
      const paymentInt = await paymentInent({
        amount: totalAmount * 100,
        payment_method: 'pm_card_visa',
        customer_email: customerEmail, // Pass email to backend if necessary
        customer_name: customerName, // Pass name to backend if necessary
      });
      if (paymentInt?.error) {
        console.log(paymentInt.error);
        console.warn(paymentInt.error?.message);
      }
      if (paymentInt?.data?.data?.client_secret) {
        // Confirm the payment with the card details
        const {paymentIntent, error} = await confirmPayment(
          paymentInt?.data?.data?.client_secret,
          {
            paymentMethodType: 'Card',
            paymentMethodData: {
              billingDetails,
            },
          },
        );

        if (error) {
          console.log('Payment confirmation error', error);
          setPaymentModal(false);
          showToast({
            title: 'Warning',
            titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
            contentStyle: tw`text-sm`,
            content: 'Payment failed',
            btnDisplay: true,
          });
        } else if (paymentIntent) {
          setPaymentModal(false);
          showToast({
            title: 'Success',
            titleStyle: tw`text-green-700 text-base font-NunitoSansBold`,
            contentStyle: tw`text-sm`,
            svgIcon: <SvgXml xml={AIconSuccess} />,
            content: 'Payment successful',
            buttonText: 'OK',
            onPress: () => {
              navigation?.goBack();
              closeToast();
            },
            buttonStyle: tw`bg-green-600`,
          });
          await confirmPaymentBackend({
            amount: totalAmount,
            total_love: love,
            payment_method: 'card',
            customer_email: customerEmail, // Log or save customer email
            customer_name: customerName, // Log or save customer name
          });
        }
      } else {
        showToast({
          title: 'Warning',
          titleStyle: tw`text-yellow-500 text-base font-NunitoSansBold`,
          contentStyle: tw`text-sm`,
          content: 'Payment failed',
          btnDisplay: true,
        });
      }
      setExtraLoding(false);
    } catch (error) {
      setExtraLoding(false);
      console.log(error);
    }
  };

  return (
    <View>
      <CardField
        postalCodeEnabled={true}
        placeholders={{
          number: '4242 4242 4242 4242',
        }}
        cardStyle={{
          backgroundColor: '#FFFFFF',
          textColor: '#000000',
          borderColor: '#D1D1D1',
          borderWidth: 1,
          borderRadius: 8,
        }}
        style={tw`w-full h-16 rounded-2xl border border-[#D1D1D1]  pt-3 pb-3 pl-3 pr-3 mt-5`}
        onCardChange={cardDetails => {
          // console.log('cardDetails', cardDetails);
          setCardDetails(cardDetails);
        }}
        onFocus={focusedField => {
          // console.log('focusField', focusedField);
        }}
      />
      <TButton
        title={totalAmount ? 'Pay $' + totalAmount : 'Pay'}
        containerStyle={tw`mt-12  mb-5 bg-primary w-full shadow-none`}
        titleStyle={tw`font-NunitoSansBold text-white`}
        loadingColor="#fff"
        onPress={() => {
          handlePayPress();
        }}
        isLoading={loading || extraLoding}
      />
    </View>
  );
}

export default CheckoutScreen;
