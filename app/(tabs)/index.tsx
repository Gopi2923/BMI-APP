import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, Button, Image, TouchableOpacity, Modal, StyleSheet, Linking, ScrollView } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import axios from 'axios';

const HomePage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [upiLink, setUpiLink] = useState('');
  const [transactionId, setTransactionId] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('pending');

  const checkPaymentSuccess = useCallback(async () => {
    if (paymentStatus !== 'pending') return;

    try {
      const response = await axios.get(`https://kiosk-q5q4.onrender.com/payment-gateway/paymentStatus/${transactionId}`);
      if (response.data.data === true) {
        setPaymentStatus('success');
      }
    } catch (error) {
      console.error('Error checking payment status:', error);
      setPaymentStatus('failure');
    }
  }, [transactionId, paymentStatus]);

  useEffect(() => {
    let timeoutId;
    let intervalId;

    if (showPaymentModal && transactionId && paymentStatus === 'pending') {
      intervalId = setInterval(checkPaymentSuccess, 3000); // Check every 3 seconds

      timeoutId = setTimeout(() => {
        if (paymentStatus === 'pending') {
          setPaymentStatus('failure'); // Set to failure if still pending after 2 minutes
        }
      }, 120000); // 2 minutes timeout
    }

    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [transactionId, showPaymentModal, paymentStatus, checkPaymentSuccess]);

  const generateOrderId = () => {
    return Math.floor(1000000000 + Math.random() * 9000000000).toString();
  };

  const handleInstantReportClick = async () => {
    setShowPaymentModal(true);
    const orderId = generateOrderId();
    try {
      const token = '367|qM5tv66Rhk8Tm13DlvDkc92KNwVMvAhOuljLB8tA';
      const transactionData = {
        amount: '1',
        description: 'Health ATM Report',
        name: 'Gopi',
        email: 'dhanushnm07@gmail.com',
        mobile: Number('1234567890'),
        enabledModesOfPayment: 'upi',
        payment_method: 'UPI_INTENT',
        source: 'api',
        order_id: orderId,
        user_uuid: 'swp_sm_903dd099-3a9e-4243-ac1e-f83f83c30725',
        other_info: 'api',
        encrypt_response: 0
      };

      const formData2 = new FormData();
      for (const key in transactionData) {
        formData2.append(key, transactionData[key]);
      }

      const transactionResponse = await axios.post('https://www.switchpay.in/api/createTransaction', formData2, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      const { upi_intent_link, transaction_id } = transactionResponse.data;
      setUpiLink(upi_intent_link);
      setTransactionId(transaction_id);
    } catch (error) {
      console.error('Error submitting form:', error.response ? error.response.data : error.message);
      setPaymentStatus('failure'); // Set payment status to failure on error
    }
  };

  const redirectToAndroidApp = () => {
    Linking.openURL('intent://launch/#Intent;scheme=https;package=com.burra.cowinemployees;end');
  };

  const closeModal = () => {
    setShowPaymentModal(false);
    setPaymentStatus('pending'); // Reset payment status when closing the modal
  };

  useEffect(() => {
    if (paymentStatus === 'success') {
      setTimeout(() => {
        redirectToAndroidApp();
      }, 2000); // Redirect after showing success modal for 2 seconds
    } else if (paymentStatus === 'failure') {
      setTimeout(() => {
        setShowPaymentModal(false);
        setPaymentStatus('pending');
      }, 2000); // Close modal after showing failure modal for 2 seconds
    }
  }, [paymentStatus]);

  console.log("UPI Link:", upiLink); // Debugging UPI Link

  return (
    <ScrollView style={styles.container}>
      {/* Logo and Title */}
      <View style={styles.headerContainer}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Health ATM (Vitals Checking Machine)</Text>
      </View>

      <Text style={styles.subtitle}>Check Your Vitals, Instant Report</Text>

      <TouchableOpacity style={styles.instantReportButton} onPress={handleInstantReportClick}>
        <Text style={styles.buttonText}>Check Your Vitals</Text>
        <Image source={require('../../assets/images/click.gif')} style={styles.clickImage} />
      </TouchableOpacity>

      {/* Payment Modal */}
      <Modal visible={showPaymentModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {paymentStatus === 'pending' && (
              <>
                <Text style={styles.paymentText}>Pay 99/- INR to Proceed</Text>
                {upiLink ? (
                  <QRCode value={upiLink} size={328} />
                ) : (
                  <Text>Loading payment link...</Text>
                )}
                <Button title="Close" onPress={closeModal} />
              </>
            )}
            {paymentStatus === 'success' && (
              <Text style={styles.successText}>Payment Successful!</Text>
            )}
            {paymentStatus === 'failure' && (
              <Text style={styles.failureText}>Payment Failed, Please Try Again</Text>
            )}
          </View>
        </View>
      </Modal>

      {/* Parameters List */}
      <View style={styles.parametersSection}>
        <Text>Age / ವಯಸ್ಸು</Text>
        <Text>Height / ಎತ್ತರ</Text>
        <Text>Weight / ತೂಕ</Text>
        <Text>Body Mass Index / ದೇಹದ ಮಾಪಕ</Text>
        <Text>Nutritional Status / ಪೋಷಕ ಸ್ಥಿತಿ</Text>
        <Text>Ideal Body Weight / ಆದರ್ಶ ದೇಹದ ತೂಕ</Text>
        <Text>Body Fat / ದೇಹದ ಕೊಬ್ಬು</Text>
      </View>

    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  subtitle: {
    textAlign: 'center',
    fontSize: 18,
    marginBottom: 20,
  },
  instantReportButton: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 10,
  },
  clickImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: 300,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 18,
    marginBottom: 20,
  },
  successText: {
    fontSize: 24,
    color: 'green',
  },
  failureText: {
    fontSize: 24,
    color: 'red',
  },
  parametersSection: {
    marginTop: 20,
  },
});

export default HomePage;
