import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';
import { CustomMapView, CustomMapMarker } from './MapWrapper';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';

const AlertsScreen = () => {
  const navigation = useNavigation<any>();
  // Timer state
  const [secondsLeft, setSecondsLeft] = useState(10);
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  
  // Pulse animation for the ECG background
  const pulseScale = useSharedValue(1);
  const pulseOpacity = useSharedValue(0.25);

  useEffect(() => {
    pulseScale.value = withRepeat(
      withTiming(1.3, { duration: 1000, easing: Easing.out(Easing.ease) }),
      -1,
      true
    );
    pulseOpacity.value = withRepeat(
      withTiming(0, { duration: 1000, easing: Easing.out(Easing.ease) }),
      -1,
      true
    );
    
    // Countdown Timer logic
    const timer = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
    })();
  }, []);

  const animatedPulseStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: pulseScale.value }],
      opacity: pulseOpacity.value,
    };
  });

  // Helper to pad single digits
  const formatTime = (num: number) => {
    return num < 10 ? `0${num}` : `${num}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.closeButton} onPress={() => navigation.navigate('Home')}>
            <MaterialIcons name="close" size={24} color="#475569" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Emergency Alert</Text>
          {/* Empty view for flex balancing */}
          <View style={{ width: 48 }} /> 
        </View>

        {/* Main Alert Section */}
        <View style={styles.mainAlertContent}>
          
          <View style={styles.alertContentTop}>
            {/* Animated Heart Icon */}
            <View style={styles.iconContainer}>
              <Animated.View style={[styles.iconPulseRing, animatedPulseStyle]} />
              <MaterialIcons name="monitor-heart" size={48} color="#ef4444" />
            </View>
            
            <Text style={styles.alertTitle}>
              ABNORMAL HEART RATE DETECTED
            </Text>
            
            <Text style={styles.alertDescription}>
              Your heart rate has exceeded <Text style={styles.alertHighlight}>120 bpm</Text> while at rest. Emergency services will be notified automatically.
            </Text>

            {/* Countdown Timer */}
            <View style={styles.timerContainer}>
              <View style={styles.timerCardLight}>
                <Text style={styles.timerValueLight}>00</Text>
                <Text style={styles.timerUnitLight}>MINUTES</Text>
              </View>
              <View style={styles.timerCardDark}>
                <Text style={styles.timerValueDark}>{formatTime(secondsLeft)}</Text>
                <Text style={styles.timerUnitDark}>SECONDS</Text>
              </View>
            </View>
          </View>
          
          <View style={styles.bottomSection}>
            
            {/* Map Snippet overlay */}
            <View style={styles.mapContainer}>
              {location ? (
                <CustomMapView
                  style={styles.mapView}
                  initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                  }}
                  scrollEnabled={false}
                  zoomEnabled={false}
                >
                  <CustomMapMarker coordinate={location.coords} />
                </CustomMapView>
              ) : (
                <View style={styles.mapPlaceholder}>
                  <Text style={styles.mapPlaceholderText}>Locating...</Text>
                </View>
              )}
                
              <View style={styles.mapGradientMask} />
              
              <View style={styles.mapLabelContainer}>
                <MaterialIcons name="location-pin" size={16} color="#17cf45" />
                <Text style={styles.mapLabelText}>Current Location Shared</Text>
              </View>
            </View>

            {/* Action Buttons */}
            <View style={styles.actionButtonsContainer}>
              <TouchableOpacity style={styles.cancelButton}>
                <MaterialIcons name="cancel" size={24} color="#ffffff" />
                <Text style={styles.cancelButtonText}>CANCEL ALERT</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.callButton}>
                <MaterialIcons name="call" size={24} color="#ef4444" />
                <Text style={styles.callButtonText}>CALL NOW</Text>
              </TouchableOpacity>
            </View>
          </View>

        </View>

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
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Platform.OS === 'android' ? 32 : 16,
    paddingBottom: 24,
  },
  closeButton: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  mainAlertContent: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingBottom: 100, // padding for the bottom tab nav
  },
  alertContentTop: {
    alignItems: 'center',
    paddingTop: 16,
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
    position: 'relative',
  },
  iconPulseRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 48,
    borderWidth: 4,
    borderColor: '#ef4444',
  },
  alertTitle: {
    fontSize: 30, // text-3xl
    fontWeight: '900', // font-black
    color: '#0f172a', // text-slate-900
    textAlign: 'center',
    textTransform: 'uppercase',
    marginBottom: 16,
    lineHeight: 36,
  },
  alertDescription: {
    fontSize: 16, // text-base
    fontWeight: '500', // font-medium
    color: '#475569', // text-slate-600
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
    maxWidth: '85%',
  },
  alertHighlight: {
    fontWeight: '700', // font-bold
    color: '#ef4444', // text-emergency
  },
  timerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  timerCardLight: {
    flex: 1,
    backgroundColor: 'rgba(239, 68, 68, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.1)',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginRight: 8,
  },
  timerValueLight: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ef4444',
    letterSpacing: -2,
    marginBottom: 8,
  },
  timerUnitLight: {
    fontSize: 12,
    fontWeight: '700',
    color: '#64748b',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  timerCardDark: {
    flex: 1,
    backgroundColor: '#ef4444',
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    marginLeft: 8,
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  timerValueDark: {
    fontSize: 40,
    fontWeight: '900',
    color: '#ffffff',
    letterSpacing: -2,
    marginBottom: 8,
  },
  timerUnitDark: {
    fontSize: 12,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.8)',
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  bottomSection: {
    width: '100%',
  },
  mapContainer: {
    height: 96, // h-24
    width: '100%',
    borderRadius: 16, // rounded-xl
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#e2e8f0', // border-slate-200
    marginBottom: 24,
    position: 'relative',
  },
  mapView: {
    width: '100%',
    height: '100%',
  },
  mapPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f1f5f9',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  mapPlaceholderText: {
    color: '#64748b',
    fontSize: 12,
    textAlign: 'center',
  },
  mapGradientMask: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(246, 248, 246, 0.6)', // Fades the map so the text is legible
  },
  mapLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 12,
    left: 12,
  },
  mapLabelText: {
    fontSize: 12, // text-xs
    fontWeight: '700', // font-bold
    color: '#0f172a', // text-slate-900
    marginLeft: 8,
  },
  actionButtonsContainer: {
    flexDirection: 'column',
  },
  cancelButton: {
    width: '100%',
    height: 64, // h-16
    backgroundColor: '#0f172a', // text-slate-900
    borderRadius: 16, // rounded-xl
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 6,
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    marginLeft: 8,
  },
  callButton: {
    width: '100%',
    height: 64,
    backgroundColor: 'rgba(239, 68, 68, 0.1)', // bg-emergency/10
    borderRadius: 16,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  callButtonText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ef4444',
    marginLeft: 8,
  },
});

export default AlertsScreen;
