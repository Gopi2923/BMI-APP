import React, { useState, useEffect } from 'react';
import { View, ScrollView, Text, Image, TouchableOpacity, Modal, ActivityIndicator, StyleSheet, ToastAndroid } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import ParameterList from '../app/Components/ParameterList';
import qrimg1 from '../assets/images/qr-img-40.jpeg';
import qrimg2 from '../assets/images/qr-img-99.jpeg';

const HomePage = () => {
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentOption, setPaymentOption] = useState('');
  const [amountOption, setAmountOption] = useState(null);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const [isLoading, setIsLoading] = useState(false);

  const handleInstantReportClick = () => {
    setShowPaymentModal(true);
  };

  const handlePaymentOptionClick = (option) => {
    setPaymentOption(option);
    setAmountOption(null); // Reset the amount selection
  };

  const handleAmountOptionClick = (amount) => {
    setAmountOption(amount);
  };

  const handleConfirmPayment = () => {
    const payload = {
      amount: amountOption,
      name: 'Dhanush',
      mobile: 1234567890,
      paymentMethod: paymentOption,
    };

    setIsLoading(true);

    // Check if online
    if (navigator.onLine) {
      // Proceed with online payment
      processPayment(payload);
    } else {
      // Show an offline message
      ToastAndroid.show('You are offline. Payment will be processed once online.', ToastAndroid.LONG);
      setIsLoading(false);
      setPaymentStatus('success');
    }
  };

  const processPayment = (payload) => {
    fetch('https://kiosk-q5q4.onrender.com/user-reciept/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Failed to process payment. Please try again.');
        }
        return response.json();
      })
      .then((data) => {
        setIsLoading(false);
        setPaymentStatus('success');
        ToastAndroid.show('Payment successful!', ToastAndroid.LONG);
      })
      .catch((error) => {
        setIsLoading(false);
        ToastAndroid.show('Payment failed. Please try again.', ToastAndroid.LONG);
        setPaymentStatus('failed');
      });
  };

  useEffect(() => {
    if (paymentStatus === 'success') {
      setTimeout(() => {
        // Replace with Android deep linking mechanism
        console.log('Redirecting to Android app...');
      }, 3000); // Redirect after 3 seconds
    }
  }, [paymentStatus]);

  const closeModal = () => {
    setShowPaymentModal(false);
    setPaymentOption('');
    setAmountOption(null);
    setPaymentStatus('pending'); // Reset payment status when closing the modal
  };

  return (
    <ScrollView>
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Image source={require('../assets/images/logo.png')} style={styles.logo} />
        <Text style={styles.title}>Health ATM (Vitals Checking Machine)</Text>
      </View>

      <Text style={styles.subtitle}>Check Your Vitals, Instant Report</Text>

      <View style={styles.instantReportSection}>
        <TouchableOpacity style={styles.instantReportButton} onPress={handleInstantReportClick}>
          <Text style={styles.buttonText}>Check Your Vitals</Text>
          <Image source={require('../assets/images/click.gif')} style={styles.clickIcon} />
        </TouchableOpacity>
      </View>

      <Modal visible={showPaymentModal} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={closeModal} style={styles.closeButton}>
              <Text style={styles.closeText}>&times;</Text>
            </TouchableOpacity>

            {paymentStatus === 'pending' && (
              <>
                {!paymentOption ? (
                  <>
                    <Text style={styles.modalTitle}>Select Payment Option</Text>
                    <View style={styles.paymentOptions}>
                      <TouchableOpacity onPress={() => handlePaymentOptionClick('QR')}>
                        <Text style={styles.optionButton}>QR Code</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handlePaymentOptionClick('Cash')}>
                        <Text style={styles.optionButton}>Cash</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                ) : null}

                {paymentOption && !amountOption && (
                  <>
                    <Text style={styles.modalTitle}>Select Amount</Text>
                    <View style={styles.amountOptions}>
                      <TouchableOpacity onPress={() => handleAmountOptionClick(40)}>
                        <Text style={styles.optionButton}>&#8377; 40/-</Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => handleAmountOptionClick(99)}>
                        <Text style={styles.optionButton}>&#8377; 99/-</Text>
                      </TouchableOpacity>
                    </View>
                  </>
                )}

                {amountOption && paymentOption === 'QR' && (
                  <>
                    <Text style={styles.modalTitle}>Scan the QR Code for {amountOption}/-</Text>
                    <Image source={amountOption === 40 ? qrimg1 : qrimg2} style={styles.qrCodeImage} />
                    <TouchableOpacity style={styles.confirmPaymentButton} onPress={handleConfirmPayment} disabled={isLoading}>
                      <Text style={styles.buttonText}>{isLoading ? 'Processing...' : 'Confirm Payment'}</Text>
                    </TouchableOpacity>
                  </>
                )}

                {amountOption && paymentOption === 'Cash' && (
                  <>
                    <Text style={styles.modalTitle}>You have selected to pay {amountOption}/- by Cash</Text>
                    <TouchableOpacity style={styles.confirmPaymentButton} onPress={handleConfirmPayment} disabled={isLoading}>
                      <Text style={styles.buttonText}>{isLoading ? 'Processing...' : 'Confirm Payment'}</Text>
                    </TouchableOpacity>
                  </>
                )}
              </>
            )}

            {paymentStatus === 'success' && (
              <View style={styles.successModal}>
                <Text style={styles.modalTitle}>Payment Successful!</Text>
                <FontAwesomeIcon icon={faCircleCheck} size={48} color="#218838" />
              </View>
            )}
          </View>
        </View>
      </Modal>

      <ParameterList />
    </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 24,
    marginVertical: 10,
  },
  instantReportSection: {
    marginVertical: 20,
  },
  instantReportButton: {
    backgroundColor: '#007BFF',
    padding: 10,
    borderRadius: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    marginRight: 10,
  },
  clickIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    width: '80%',
    alignItems: 'center',
  },
  closeButton: {
    alignSelf: 'flex-end',
  },
  closeText: {
    fontSize: 24,
    color: '#333',
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  paymentOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  optionButton: {
    fontSize: 18,
    padding: 10,
    backgroundColor: '#007BFF',
    color: '#fff',
    borderRadius: 5,
    textAlign: 'center',
    margin: 10,
    minWidth: '40%',
  },
  amountOptions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  qrCodeImage: {
    width: 300,
    height: 400,
    marginVertical: 10,
    borderRadius: 30,
  },
  confirmPaymentButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
  },
  successModal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomePage;
