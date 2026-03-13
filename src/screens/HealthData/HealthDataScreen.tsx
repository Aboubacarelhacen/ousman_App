import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import Svg, { Path, Defs, LinearGradient as SvgLinearGradient, Stop } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withRepeat,
  withTiming,
  Easing,
} from 'react-native-reanimated';

const HealthDataScreen = () => {
  const navigation = useNavigation<any>();
  // Simple pulse animation for the chart dot
  const pulseValue = useSharedValue(1);

  useEffect(() => {
    pulseValue.value = withRepeat(
      withTiming(0.4, { duration: 800, easing: Easing.inOut(Easing.ease) }),
      -1,
      true
    );
  }, []);

  const animatedDotStyle = useAnimatedStyle(() => {
    return {
      opacity: pulseValue.value,
      transform: [{ scale: pulseValue.value * 1.5 }],
    };
  });

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="arrow-back" size={24} color="#475569" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Health Monitoring</Text>
        <TouchableOpacity style={styles.iconButton}>
          <MaterialIcons name="settings" size={24} color="#475569" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero BPM Section (with user's provided heart image) */}
        <View style={styles.heroSection}>
          <View style={styles.heroImageContainer}>
            <Image 
              source={require('../../assets/images/Default_Create_a_modern_elegant_heart_illustration_designed_fo_0_f4145a39-15f0-4230-8e49-44f47678c78d_0.png')} 
              style={styles.heroImage}
              resizeMode="contain"
            />
          </View>
          
          <Text style={styles.heroBpmValue}>
            72<Text style={styles.heroBpmUnit}> BPM</Text>
          </Text>
          
          <View style={styles.liveTrackingRow}>
            <View style={styles.liveIndicatorRing}>
              <View style={styles.liveIndicatorDot} />
            </View>
            <Text style={styles.liveTrackingText}>Live Tracking • Optimized</Text>
          </View>
        </View>

        {/* Real-time Graph Card */}
        <View style={styles.cardSection}>
          <View style={styles.cardHeader}>
            <View>
              <Text style={styles.cardTitle}>Heart Rate</Text>
              <Text style={styles.cardSubTitle}>Last 15 minutes</Text>
            </View>
            <View style={styles.realtimeBadge}>
              <Text style={styles.realtimeText}>REAL-TIME</Text>
            </View>
          </View>
          
          <View style={styles.chartContainer}>
            <Svg height="150" width="100%" viewBox="0 0 400 150" preserveAspectRatio="none">
              <Defs>
                <SvgLinearGradient id="line-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <Stop offset="0%" stopColor="#17cf45" stopOpacity="0.2" />
                  <Stop offset="100%" stopColor="#17cf45" stopOpacity="0" />
                </SvgLinearGradient>
              </Defs>
              {/* Area */}
              <Path d="M0,100 Q50,80 100,110 T200,70 T300,90 T400,60 V150 H0 Z" fill="url(#line-grad)" />
              {/* Line */}
              <Path d="M0,100 Q50,80 100,110 T200,70 T300,90 T400,60" fill="none" stroke="#17cf45" strokeLinecap="round" strokeWidth="3" />
            </Svg>
            
            {/* Animated Dot at end of line */}
            <Animated.View style={[styles.chartDotContainer, animatedDotStyle]}>
              <View style={styles.chartDot} />
            </Animated.View>

            <View style={styles.chartXAxis}>
              <Text style={styles.axisLabel}>14:00</Text>
              <Text style={styles.axisLabel}>14:05</Text>
              <Text style={styles.axisLabel}>14:10</Text>
              <Text style={styles.axisLabel}>14:15</Text>
            </View>
          </View>
        </View>

        {/* Stats Grid */}
        <View style={styles.statsGrid}>
          {/* Max Today */}
          <View style={styles.statCard}>
            <View style={styles.statIconOrange}>
              <MaterialIcons name="trending-up" size={20} color="#ea580c" />
            </View>
            <Text style={styles.statLabel}>MAX TODAY</Text>
            <Text style={styles.statValue}>142 <Text style={styles.statUnit}>BPM</Text></Text>
          </View>
          
          {/* Average */}
          <View style={styles.statCard}>
            <View style={styles.statIconBlue}>
              <MaterialIcons name="leaderboard" size={20} color="#2563eb" />
            </View>
            <Text style={styles.statLabel}>AVERAGE</Text>
            <Text style={styles.statValue}>68 <Text style={styles.statUnit}>BPM</Text></Text>
          </View>
        </View>

        {/* Health Alert Info */}
        <View style={styles.alertCard}>
          <View style={styles.alertIconBg}>
            <MaterialIcons name="verified-user" size={24} color="#ffffff" />
          </View>
          <View style={styles.alertContent}>
            <Text style={styles.alertTitle}>Status: Stable</Text>
            <Text style={styles.alertDesc}>Your heart rate has been consistent for the last 4 hours.</Text>
          </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f6f8f6',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingTop: Platform.OS === 'android' ? 32 : 16,
    paddingBottom: 16,
    backgroundColor: '#f6f8f6',
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingBottom: 120, // ample space for animated bottom nav
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  heroImageContainer: {
    width: 120, // increased from 80
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  heroBpmValue: {
    fontSize: 60,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -2,
  },
  heroBpmUnit: {
    fontSize: 24,
    fontWeight: '500',
    color: '#94a3b8',
  },
  liveTrackingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  liveIndicatorRing: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: 'rgba(23, 207, 69, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 8,
  },
  liveIndicatorDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#17cf45',
  },
  liveTrackingText: {
    color: '#17cf45',
    fontWeight: '500',
    fontSize: 14,
  },
  cardSection: {
    backgroundColor: '#ffffff',
    borderRadius: 24, // xl
    padding: 24,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: '#f1f5f9', // slate-100
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  cardSubTitle: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 2,
  },
  realtimeBadge: {
    backgroundColor: 'rgba(23, 207, 69, 0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  realtimeText: {
    color: '#17cf45',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
  },
  chartContainer: {
    height: 192, // h-48 = 192px
    width: '100%',
    position: 'relative',
  },
  chartDotContainer: {
    position: 'absolute',
    right: -2, // rough estimation for matching end of path T400,60 in a relative view
    top: 57,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#17cf45',
  },
  chartXAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  axisLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 1,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    backgroundColor: '#ffffff',
    padding: 20,
    borderRadius: 24,
    width: '48%',
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 2,
  },
  statIconOrange: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#ffedd5', // orange-100
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statIconBlue: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#dbeafe', // blue-100
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#64748b',
    letterSpacing: 1,
  },
  statValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 4,
  },
  statUnit: {
    fontSize: 14,
    fontWeight: '400',
    color: '#94a3b8',
  },
  alertCard: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(23, 207, 69, 0.05)',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: 'rgba(23, 207, 69, 0.1)',
    flexDirection: 'row',
    alignItems: 'center',
  },
  alertIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#17cf45',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  alertContent: {
    flex: 1,
  },
  alertTitle: {
    fontWeight: '700',
    fontSize: 14,
    color: '#0f172a',
  },
  alertDesc: {
    fontSize: 12,
    color: '#475569',
    marginTop: 4,
    lineHeight: 18,
  },
});

export default HealthDataScreen;
