import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Svg, { Path, Circle } from 'react-native-svg';

const HomeScreen = () => {
  const navigation = useNavigation<any>();
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f8fafc" />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.profileSection}>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Image
            source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB4zpHZuUb9t9BIwPpiZIO5vOaLf66aSeawTHCT0KOytwksVVCxxCZbdnK5F_qik1rLmdVFrXQEazGomAGUAI2VwgiNWTN_HA0J-EH08KoTLiazZVz4O2uiHp3-Yg6X2qt95wn9o822NN6jIu1bvG_zMTWrktFsmpGJM4Vnx1Q9AxggUXIRIAwHbRxsDKPVtVnJqDXK_0RlVgaN7yTlyjrYcPef1rqSMY0MYPsBt8NAC5JGa-G1Bi-HOYmNQZ4oGT15VEESM2H_iHuZ' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
          <View>
            <Text style={styles.greetingText}>Welcome back,</Text>
            <Text style={styles.nameText}>Sarah</Text>
          </View>
        </View>
        
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('HealthData')}>
            <MaterialIcons name="search" size={24} color="#475569" />
          </TouchableOpacity>
          <TouchableOpacity style={[styles.iconButton, { marginLeft: 12 }]} onPress={() => navigation.navigate('Alerts')}>
            <MaterialIcons name="notifications" size={24} color="#475569" />
            <View style={styles.notificationDot} />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Device Status Card */}
        <View style={styles.deviceCardContainer}>
          <LinearGradient
            colors={['#0f172a', '#1e293b']}
            style={styles.deviceCard}
          >
            <View style={styles.deviceCardContent}>
              
              {/* Left Column */}
              <View style={styles.deviceCardLeft}>
                <View style={styles.connectedRow}>
                  <View style={styles.greenDot} />
                  <Text style={styles.connectedText}>CONNECTED</Text>
                </View>
                
                <Text style={styles.deviceTitle}>VitalGuard Pro</Text>
                <Text style={styles.syncText}>Last synced 2 mins ago</Text>
                
                <View style={styles.batteryBadge}>
                  <MaterialIcons name="battery-full" size={14} color="#22c55e" />
                  <Text style={styles.batteryText}>84% Battery</Text>
                </View>
              </View>

              {/* Right Column */}
              <View style={styles.deviceCardRight}>
                <TouchableOpacity style={styles.manageButton} onPress={() => navigation.navigate('ConnectDevice')}>
                  <Text style={styles.manageButtonText}>Manage</Text>
                </TouchableOpacity>
              </View>

              {/* Absolute Watch Image */}
              <Image 
                source={require('../../assets/images/onboarding.png')} 
                style={styles.floatingWatchImage}
                resizeMode="contain"
              />

            </View>
          </LinearGradient>
        </View>

        {/* Live Metrics Header */}
        <View style={styles.metricsHeader}>
          <Text style={styles.metricsTitle}>Live Metrics</Text>
          <TouchableOpacity onPress={() => navigation.navigate('HealthData')}>
            <Text style={styles.viewHistoryText}>View History</Text>
          </TouchableOpacity>
        </View>

        {/* Heart Rate Card */}
        <View style={styles.metricCardLarge}>
          <View style={styles.hrTopRow}>
            <View style={styles.hrTitleContainer}>
              <MaterialIcons name="favorite" size={20} color="#ef4444" style={styles.hrIcon} />
              <Text style={styles.hrTitleText}>Heart Rate</Text>
            </View>
            <View style={styles.normalBadge}>
              <Text style={styles.normalBadgeText}>NORMAL</Text>
            </View>
          </View>
          
          <Text style={styles.hrValueText}>
            72 <Text style={styles.hrValueUnit}>bpm</Text>
          </Text>

          <View style={styles.hrChartContainer}>
            <Svg height="60" width="100%" viewBox="0 0 100 40" preserveAspectRatio="none">
              <Path 
                d="M0,20 L15,20 L20,10 L30,35 L40,5 L45,25 L50,20 L65,20 L70,10 L80,35 L90,5 L95,25 L100,20" 
                stroke="#86efac" 
                strokeWidth="2.5" 
                fill="none" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />
            </Svg>
          </View>
        </View>

        {/* TEMP and ACTIVITY Row */}
        <View style={styles.metricsRow}>
          
          {/* TEMP Card */}
          <View style={styles.metricCardSmall}>
            <View style={styles.smallTopRow}>
              <View style={styles.iconBgBlue}>
                <MaterialIcons name="thermostat" size={20} color="#3b82f6" />
              </View>
              <Text style={styles.smallCardTitle}>TEMP</Text>
            </View>
            <Text style={styles.smallCardValue}>36.5<Text style={styles.smallCardUnit}>°C</Text></Text>
            <Text style={styles.smallCardStatusGreen}>Stable</Text>
          </View>

          {/* ACTIVITY Card */}
          <View style={styles.metricCardSmall}>
            <View style={styles.smallTopRow}>
              <View style={styles.iconBgOrange}>
                <MaterialIcons name="directions-run" size={20} color="#f97316" />
              </View>
              <Text style={styles.smallCardTitle}>ACTIVITY</Text>
            </View>
            <Text style={styles.smallCardValue}>Active</Text>
            <Text style={styles.smallCardStatusGreen}>Target 80%</Text>
          </View>

        </View>

        {/* Steps Card */}
        <View style={styles.stepsCard}>
          <View style={styles.stepsLeftRow}>
            <MaterialIcons name="directions-walk" size={32} color="#15803d" />
            <View style={styles.stepsTextCol}>
              <Text style={styles.stepsValue}>8,432 Steps</Text>
              <Text style={styles.stepsGoalText}>Goal: 10,000</Text>
            </View>
          </View>
          <View style={styles.stepsProgressCircle}>
            <Svg height="48" width="48" viewBox="0 0 48 48">
              <Circle cx="24" cy="24" r="18" stroke="#a7f3d0" strokeWidth="6" fill="none" />
              <Circle cx="24" cy="24" r="18" stroke="#15803d" strokeWidth="6" fill="none" strokeDasharray="113" strokeDashoffset="22.6" strokeLinecap="round" transform="rotate(-90 24 24)" />
            </Svg>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 32 : 16,
    paddingBottom: 24,
    backgroundColor: '#f8fafc',
    zIndex: 10,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#34d399',
    marginRight: 12,
  },
  greetingText: {
    fontSize: 14,
    color: '#64748b',
    fontWeight: '500',
  },
  nameText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  headerActions: {
    flexDirection: 'row',
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e2e8f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  notificationDot: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#34d399',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  deviceCardContainer: {
    marginHorizontal: 16,
    marginBottom: 24,
    borderRadius: 32,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 8,
  },
  deviceCard: {
    borderRadius: 32,
    overflow: 'hidden',
  },
  deviceCardContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 24,
    position: 'relative',
  },
  deviceCardLeft: {
    flex: 1,
  },
  connectedRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  greenDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#22c55e',
    marginRight: 8,
  },
  connectedText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#22c55e',
    letterSpacing: 1,
  },
  deviceTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#ffffff',
    marginBottom: 4,
  },
  syncText: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 32,
  },
  batteryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    backgroundColor: '#1e293b',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  batteryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#f8fafc',
    marginLeft: 6,
  },
  deviceCardRight: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  manageButton: {
    backgroundColor: '#22c55e',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  manageButtonText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#020617',
  },
  floatingWatchImage: {
    position: 'absolute',
    right: 24,
    top: 24,
    width: 60,
    height: 60,
  },
  metricsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 24,
    marginBottom: 16,
  },
  metricsTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
  },
  viewHistoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#22c55e',
  },
  metricCardLarge: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    marginHorizontal: 16,
    marginBottom: 16,
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 4,
  },
  hrTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  hrTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  hrIcon: {
    marginRight: 8,
  },
  hrTitleText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748b',
  },
  normalBadge: {
    backgroundColor: '#d1fae5',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  normalBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#059669',
  },
  hrValueText: {
    fontSize: 40,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 16,
  },
  hrValueUnit: {
    fontSize: 16,
    fontWeight: '500',
    color: '#64748b',
  },
  hrChartContainer: {
    width: '100%',
    height: 60,
    backgroundColor: '#f8fafc',
    borderRadius: 16,
    overflow: 'hidden',
    justifyContent: 'center',
  },
  metricsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  metricCardSmall: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 20,
    width: '48%',
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.8,
    shadowRadius: 15,
    elevation: 4,
  },
  smallTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  iconBgBlue: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#eff6ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  iconBgOrange: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fff7ed',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  smallCardTitle: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748b',
  },
  smallCardValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  smallCardUnit: {
    fontSize: 16,
    color: '#64748b',
    fontWeight: '500',
  },
  smallCardStatusGreen: {
    fontSize: 12,
    fontWeight: '500',
    color: '#22c55e',
  },
  stepsCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#d1fae5',
    borderRadius: 24,
    padding: 20,
    marginHorizontal: 16,
  },
  stepsLeftRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  stepsTextCol: {
    marginLeft: 12,
  },
  stepsValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#022c22',
  },
  stepsGoalText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#065f46',
    marginTop: 2,
  },
  stepsProgressCircle: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;
