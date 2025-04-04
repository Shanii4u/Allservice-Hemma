import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/MaterialIcons';

interface ServicesScreenProps {
  navigation: any;
}

const ServicesScreen: React.FC<ServicesScreenProps> = ({ navigation }) => {
  const services = [
    {
      id: '1',
      title: 'Residential Cleaning',
      icon: 'home',
      description: 'Professional home cleaning services',
      price: 'From 299 kr/hour',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '2',
      title: 'Commercial Cleaning',
      icon: 'business',
      description: 'Office and commercial space cleaning',
      price: 'From 399 kr/hour',
      image: 'https://via.placeholder.com/300x200',
    },
    {
      id: '3',
      title: 'Deep Cleaning',
      icon: 'cleaning-services',
      description: 'Thorough deep cleaning services',
      price: 'From 499 kr/hour',
      image: 'https://via.placeholder.com/300x200',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Our Services</Text>
          <Text style={styles.headerSubtitle}>
            Professional cleaning services for your home and office
          </Text>
        </View>

        <View style={styles.servicesContainer}>
          {services.map((service) => (
            <TouchableOpacity
              key={service.id}
              style={styles.serviceCard}
              onPress={() => navigation.navigate('Booking', { service })}
            >
              <Image source={{ uri: service.image }} style={styles.serviceImage} />
              <View style={styles.serviceContent}>
                <View style={styles.serviceHeader}>
                  <Icon name={service.icon} size={24} color="#f4511e" />
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                </View>
                <Text style={styles.serviceDescription}>
                  {service.description}
                </Text>
                <Text style={styles.servicePrice}>{service.price}</Text>
              </View>
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
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  servicesContainer: {
    padding: 16,
  },
  serviceCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  serviceImage: {
    width: '100%',
    height: 200,
  },
  serviceContent: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    color: '#333',
  },
  serviceDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  servicePrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f4511e',
  },
});

export default ServicesScreen; 