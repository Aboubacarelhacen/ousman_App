import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { BottomTabParamList } from './types';

// Screen placeholders
import HomeScreen from '../screens/Home/HomeScreen';
import CustomNavBar from './CustomNavBar';
import HealthDataScreen from '../screens/HealthData/HealthDataScreen';
import AlertsScreen from '../screens/Alerts/AlertsScreen';
import EmergencyContactsScreen from '../screens/Contacts/EmergencyContactsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';

const Tab = createBottomTabNavigator<BottomTabParamList>();

/**
 * Bottom Tab Navigator configuring the main 5 tabs of the "Guarded" app.
 */
const BottomTabs = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
      }}
      tabBar={(props) => <CustomNavBar {...props} />}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="HealthData" component={HealthDataScreen} />
      <Tab.Screen name="Alerts" component={AlertsScreen} options={{ tabBarBadge: 1 }} />
      <Tab.Screen name="Contacts" component={EmergencyContactsScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
