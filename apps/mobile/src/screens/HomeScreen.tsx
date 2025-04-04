import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface HomeScreenProps {
  navigation: any;
}

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const services = [
    {
      id: '1',
      title: 'Residential Cleaning',
      icon: 'home',
      description: 'Professional home cleaning services',
    },
    {
      id: '2',
      title: 'Commercial Cleaning',
      icon: 'business',
      description: 'Office and commercial space cleaning',
    },
    {
      id: '3',
      title: 'Deep Cleaning',
      icon: 'cleaning-services',
      description: 'Thorough deep cleaning services',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.welcomeText}>Welcome to All Service Hemma</Text>
          <Text style={styles.subtitle}>Professional cleaning services at your doorstep</Text>
        </View>

        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate('Booking', { service })}
            >
              <Icon name={service.icon} size={40} color="#f4511e" />
              <Text style={styles.serviceTitle}>{service.title}</Text>
              <Text style={styles.serviceDescription}>{service.description}</Text>
            </TouchableOpacity>
          ))}
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
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  servicesContainer: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    alignItems: 'center',
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 4,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});

export default HomeScreen; 