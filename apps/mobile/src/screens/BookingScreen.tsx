import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface BookingScreenProps {
  route: {
    params: {
      service: {
        id: string;
        title: string;
        icon: string;
        description: string;
      };
    };
  };
  navigation: any;
}

const BookingScreen: React.FC<BookingScreenProps> = ({ route, navigation }) => {
  const { service } = route.params;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    date: '',
    time: '',
    notes: '',
  });

  const handleSubmit = () => {
    // Validate form data
    if (!formData.name || !formData.email || !formData.phone || !formData.address || !formData.date || !formData.time) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }

    // TODO: Send booking data to backend
    Alert.alert(
      'Success',
      'Your booking has been submitted successfully!',
      [{ text: 'OK', onPress: () => navigation.navigate('Home') }]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Icon name={service.icon} size={40} color="#f4511e" />
          <Text style={styles.serviceTitle}>{service.title}</Text>
          <Text style={styles.serviceDescription}>{service.description}</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Full Name *</Text>
            <TextInput
              style={styles.input}
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              placeholder="Enter your full name"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Email *</Text>
            <TextInput
              style={styles.input}
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              placeholder="Enter your email"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Phone Number *</Text>
            <TextInput
              style={styles.input}
              value={formData.phone}
              onChangeText={(text) => setFormData({ ...formData, phone: text })}
              placeholder="Enter your phone number"
              keyboardType="phone-pad"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address *</Text>
            <TextInput
              style={styles.input}
              value={formData.address}
              onChangeText={(text) => setFormData({ ...formData, address: text })}
              placeholder="Enter your address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Date *</Text>
            <TextInput
              style={styles.input}
              value={formData.date}
              onChangeText={(text) => setFormData({ ...formData, date: text })}
              placeholder="Enter preferred date (YYYY-MM-DD)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Time *</Text>
            <TextInput
              style={styles.input}
              value={formData.time}
              onChangeText={(text) => setFormData({ ...formData, time: text })}
              placeholder="Enter preferred time (HH:MM)"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.label}>Additional Notes</Text>
            <TextInput
              style={[styles.input, styles.textArea]}
              value={formData.notes}
              onChangeText={(text) => setFormData({ ...formData, notes: text })}
              placeholder="Any special requirements or notes"
              multiline
              numberOfLines={4}
            />
          </View>

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Submit Booking</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 20,
    backgroundColor: '#f4511e',
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 12,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  form: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#f4511e',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default BookingScreen; 