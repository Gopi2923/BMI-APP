import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';

const ParameterList = () => {
  return (
    <View style={styles.container}>
      <View style={styles.listContainer}>
        <View style={styles.list}>
          <Text style={styles.item}><Icon name="user" size={24} /> Age / ವಯಸ್ಸು</Text>
          <Text style={styles.item}><Icon name="ruler-vertical" size={24} /> Height / ಎತ್ತರ</Text>
          <Text style={styles.item}><Icon name="weight" size={24} /> Weight / ತೂಕ</Text>
          <Text style={styles.item}><Icon name="calculator" size={24} /> Body Mass Index / ದೇಹದ ಮಾಪಕ</Text>
          <Text style={styles.item}><Icon name="apple-alt" size={24} /> Nutritional Status / ಪೋಷಕ ಸ್ಥಿತಿ</Text>
          <Text style={styles.item}><Icon name="weight-hanging" size={24} /> Ideal Body Weight / ಆದರ್ಶ ದೇಹದ ತೂಕ</Text>
          <Text style={styles.item}><Icon name="percentage" size={24} /> Body Fat / ದೇಹದ ಕೊಬ್ಬು</Text>
        </View>
        <View style={styles.list}>
          <Text style={styles.item}><Icon name="water" size={24} /> Total Body Water / ಒಟ್ಟು ದೇಹದ ನೀರು</Text>
          <Text style={styles.item}><Icon name="burn" size={24} /> Basal Metabolic Rate / ಮೂಲವ್ಯೂಪಚಯ ದರ</Text>
          <Text style={styles.item}><Icon name="weight" size={24} /> Fat Mass / ಕೊಬ್ಬಿನ ಪ್ರಮಾಣ</Text>
          <Text style={styles.item}><Icon name="dumbbell" size={24} /> Lean/Skeletal Body Mass / ಕುಳಿತ ದೇಹದ ಪ್ರಮಾಣ</Text>
          <Text style={styles.item}><Icon name="exclamation-circle" size={24} /> Overweight By / ಅಧಿಕ ತೂಕದ ಮೂಲಕ</Text>
          <Text style={styles.item}><Icon name="clipboard-check" size={24} /> Recommendations / ಶಿಫಾರಸುಗಳು</Text>
          <Text style={styles.item}><Icon name="star" size={24} /> Your Lucky Message / ನಿಮ್ಮ ಭಾಗ್ಯದ ಸಂದೇಶ</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 80,
    backgroundColor: '#f5f5f5',  // Customize this for TV view
  },
  listContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  list: {
    marginHorizontal: 20,
  },
  item: {
    fontSize: 32, // Adjust size for better readability on TV
    color: '#333',
    marginVertical: 10,
  },
});

export default ParameterList;
