import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Animated,
  Platform,
  StatusBar,
  Easing,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../navigation/types';

type ConnectDeviceScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'ConnectDevice'>;

interface Props {
  navigation: ConnectDeviceScreenNavigationProp;
}

const ConnectDeviceScreen: React.FC<Props> = ({ navigation }) => {
  // Animation for the scanning icon
  const spinValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Infinite spin animation
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true, // Use native driver for rotation
      })
    ).start();
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const handleConnect = () => {
    // Proceed to BottomTabs upon connection
    navigation.replace('BottomTabs');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8f6" />
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={handleBack} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#17cf45" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Connect Device</Text>
          <View style={{ width: 40 }} /> {/* Spacer for alignment */}
        </View>

        {/* Scanning Status */}
        <View style={styles.statusSection}>
          <View style={styles.statusCard}>
            <View style={styles.statusRow}>
              <Text style={styles.statusTitle}>Searching for devices...</Text>
              <Animated.View style={{ transform: [{ rotate: spin }] }}>
                <MaterialIcons name="sync" size={24} color="#17cf45" />
              </Animated.View>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarFill} />
            </View>
            
            <Text style={styles.statusSubtitle}>
              Make sure your VitalGuard device is turned on and nearby.
            </Text>
          </View>
        </View>

        {/* Section Title & Refresh */}
        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Nearby Devices</Text>
          <TouchableOpacity style={styles.refreshButton}>
            <MaterialIcons name="refresh" size={16} color="#17cf45" />
            <Text style={styles.refreshText}>Refresh</Text>
          </TouchableOpacity>
        </View>

        {/* Device List */}
        <ScrollView style={styles.deviceList} showsVerticalScrollIndicator={false} contentContainerStyle={styles.listContent}>
          
          {/* Recommended Device Card */}
          <View style={styles.recommendedCard}>
             <View style={styles.recommendedBadge}>
                <Text style={styles.recommendedBadgeText}>RECOMMENDED</Text>
            </View>
            <View style={styles.deviceRow}>
              <View style={styles.deviceInfo}>
                <Text style={styles.deviceStatus}>READY TO PAIR</Text>
                <Text style={styles.deviceNameHighlight}>VitalGuard Pro</Text>
                <View style={styles.signalRow}>
                  <MaterialIcons name="signal-cellular-alt" size={16} color="#17cf45" />
                  <Text style={styles.signalText}>Strong signal</Text>
                </View>
              </View>
              <View style={styles.deviceIconBoxHighlight}>
                <MaterialIcons name="watch" size={32} color="#17cf45" />
              </View>
            </View>
            <TouchableOpacity style={styles.connectButton} activeOpacity={0.8} onPress={handleConnect}>
              <MaterialIcons name="bluetooth-connected" size={18} color="#FFFFFF" />
              <Text style={styles.connectButtonText}>Connect</Text>
            </TouchableOpacity>
          </View>

          {/* Other Device Card: Unknown */}
          <View style={styles.otherCard}>
            <View style={styles.deviceRowCompact}>
              <View style={styles.deviceIconBox}>
                <MaterialIcons name="devices-other" size={24} color="#64748b" />
              </View>
              <View style={styles.deviceInfoCompact}>
                <Text style={styles.deviceName}>Unknown Device</Text>
                <Text style={styles.deviceSubDetail}>MAC: 4A:3B:22:91</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.pairButton}>
              <Text style={styles.pairButtonText}>PAIR</Text>
            </TouchableOpacity>
          </View>

          {/* Other Device Card: SoundFlow Buds */}
          <View style={styles.otherCard}>
            <View style={styles.deviceRowCompact}>
              <View style={styles.deviceIconBox}>
                <MaterialIcons name="earbuds" size={24} color="#64748b" />
              </View>
              <View style={styles.deviceInfoCompact}>
                <Text style={styles.deviceName}>SoundFlow Buds</Text>
                <Text style={styles.deviceSubDetail}>Weak signal</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.pairButton}>
              <Text style={styles.pairButtonText}>PAIR</Text>
            </TouchableOpacity>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 448,
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 24 : 16,
    paddingBottom: 24,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(23, 207, 69, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    flex: 1,
  },
  statusSection: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  statusCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(23, 207, 69, 0.1)', // primary/10
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  statusRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  statusTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  progressBarContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#f1f5f9', // slate-100
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 16,
  },
  progressBarFill: {
    height: '100%',
    width: '66%',
    backgroundColor: '#17cf45', // primary
    borderRadius: 4,
  },
  statusSubtitle: {
    fontSize: 12,
    color: '#64748b', // slate-500
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 8,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  refreshButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  refreshText: {
    color: '#17cf45',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 4,
  },
  deviceList: {
    flex: 1,
    paddingHorizontal: 24,
  },
  listContent: {
    paddingBottom: 40,
    paddingTop: 8,
  },
  recommendedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    borderWidth: 2,
    borderColor: '#17cf45', // primary
    shadowColor: '#17cf45',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 5,
    marginBottom: 16,
    marginTop: 12, // for badge overlap
    position: 'relative',
  },
  recommendedBadge: {
    position: 'absolute',
    top: -10,
    left: 20,
    backgroundColor: '#17cf45',
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderRadius: 12,
  },
  recommendedBadgeText: {
    color: '#FFFFFF',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  deviceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  deviceInfo: {
    flex: 1,
  },
  deviceStatus: {
    color: '#17cf45',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  deviceNameHighlight: {
    fontSize: 20,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 6,
  },
  signalRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  signalText: {
    color: '#64748b',
    fontSize: 14,
    marginLeft: 4,
  },
  deviceIconBoxHighlight: {
    width: 64,
    height: 64,
    borderRadius: 16,
    backgroundColor: 'rgba(23, 207, 69, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  connectButton: {
    backgroundColor: '#17cf45',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 9999,
    shadowColor: '#17cf45',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.8,
    shadowRadius: 10,
    elevation: 8,
  },
  connectButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 8,
  },
  otherCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    borderRadius: 20,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0', // slate-200
    marginBottom: 12,
  },
  deviceRowCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  deviceIconBox: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#f1f5f9', // slate-100
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  deviceInfoCompact: {
    flex: 1,
  },
  deviceName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 2,
  },
  deviceSubDetail: {
    fontSize: 12,
    color: '#64748b',
  },
  pairButton: {
    backgroundColor: 'rgba(23, 207, 69, 0.1)',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 9999,
  },
  pairButtonText: {
    color: '#17cf45',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
});

export default ConnectDeviceScreen;
