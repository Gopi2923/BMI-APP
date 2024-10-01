// HomePageStyles.js
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
