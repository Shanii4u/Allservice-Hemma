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

interface ProfileScreenProps {
  navigation: any;
}

const ProfileScreen: React.FC<ProfileScreenProps> = ({ navigation }) => {
  const userProfile = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+46 123 456 789',
    address: '123 Main St, Stockholm',
  };

  const menuItems = [
    {
      id: '1',
      title: 'My Bookings',
      icon: 'calendar-today',
      onPress: () => navigation.navigate('MyBookings'),
    },
    {
      id: '2',
      title: 'Payment Methods',
      icon: 'payment',
      onPress: () => navigation.navigate('PaymentMethods'),
    },
    {
      id: '3',
      title: 'Notifications',
      icon: 'notifications',
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: '4',
      title: 'Settings',
      icon: 'settings',
      onPress: () => navigation.navigate('Settings'),
    },
    {
      id: '5',
      title: 'Help & Support',
      icon: 'help',
      onPress: () => navigation.navigate('Help'),
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://via.placeholder.com/100' }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.name}>{userProfile.name}</Text>
          <Text style={styles.email}>{userProfile.email}</Text>
          <Text style={styles.phone}>{userProfile.phone}</Text>
          <Text style={styles.address}>{userProfile.address}</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={styles.menuItem}
              onPress={item.onPress}
            >
              <View style={styles.menuItemLeft}>
                <Icon name={item.icon} size={24} color="#666" />
                <Text style={styles.menuItemTitle}>{item.title}</Text>
              </View>
              <Icon name="chevron-right" size={24} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
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
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#fff',
    padding: 2,
    marginBottom: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  phone: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    marginBottom: 4,
  },
  address: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  menuContainer: {
    padding: 16,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemTitle: {
    fontSize: 16,
    marginLeft: 16,
    color: '#333',
  },
  logoutButton: {
    margin: 16,
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 