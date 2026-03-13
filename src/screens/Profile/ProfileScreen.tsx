import React from 'react';
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
import { useNavigation, CommonActions } from '@react-navigation/native';

const ProfileScreen = () => {
  const navigation = useNavigation<any>();

  const handleSignOut = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'Splash' }],
      })
    );
  };
  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#0f172a" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity style={styles.iconButtonRight}>
          <MaterialIcons name="settings" size={24} color="#0f172a" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Hero */}
        <View style={styles.heroSection}>
          <View style={styles.avatarContainer}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCE74fhnrTA27wwHD-yCqJCpou2hnme98lDkxyT9qw-xaXarKJm11F6pnktUATyshb0oGh7hcq6zsNtjQiTvfZIGVRiJWdyX6UaNyOeO6fMtlgY2nPxhxdChQ0A0EMdJicYFXI3a0lSqy_5Xg4HIzOwK6FlljiC7dvbkaiPEX2H9gQP2EGOfcIIyqEaWaOPhTAe6utYnpm3VuANAJgV386iyMdCgENUsxCJzuKMQfwqOPz-FEacaaxaahRWIMJd8DmYuebYiuJGxhfL' }} 
              style={styles.avatarImage} 
            />
            <View style={styles.editBadge}>
              <MaterialIcons name="edit" size={16} color="#ffffff" />
            </View>
          </View>

          <Text style={styles.userName}>Sarah Johnson</Text>
          <Text style={styles.userStatus}>Premium Member since 2022</Text>
          
          <View style={styles.locationContainer}>
            <MaterialIcons name="location-pin" size={16} color="#64748b" />
            <Text style={styles.locationText}>New York, USA</Text>
          </View>
        </View>

        {/* Medical Information Section */}
        <View style={styles.sectionContainer}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Medical Information</Text>
            <TouchableOpacity>
              <Text style={styles.updateText}>Update</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.medicalCardsList}>
            
            {/* Blood Type Card */}
            <View style={styles.infoCard}>
              <View style={[styles.infoIconBg, { backgroundColor: 'rgba(23, 207, 69, 0.1)' }]}>
                <MaterialIcons name="water-drop" size={24} color="#17cf45" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Blood Type</Text>
                <Text style={styles.infoValue}>O Positive (O+)</Text>
              </View>
            </View>

            {/* Allergies Card */}
            <View style={styles.infoCard}>
              <View style={[styles.infoIconBg, { backgroundColor: '#fef3c7' }]}>
                <MaterialIcons name="warning" size={24} color="#d97706" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Known Allergies</Text>
                <Text style={styles.infoValue}>Penicillin, Peanuts</Text>
              </View>
            </View>

            {/* Conditions Card */}
            <View style={styles.infoCard}>
              <View style={[styles.infoIconBg, { backgroundColor: '#dbeafe' }]}>
                <MaterialIcons name="medical-services" size={24} color="#2563eb" />
              </View>
              <View style={styles.infoTextContainer}>
                <Text style={styles.infoLabel}>Active Conditions</Text>
                <Text style={styles.infoValue}>Mild Asthma</Text>
              </View>
            </View>

          </View>
        </View>

        {/* App Settings Section */}
        <View style={styles.sectionContainer}>
          <Text style={[styles.sectionTitle, { marginBottom: 16 }]}>App Settings</Text>
          
          <View style={styles.settingsCard}>
            
            <TouchableOpacity style={styles.settingsRow}>
              <MaterialIcons name="notifications" size={24} color="#94a3b8" />
              <Text style={styles.settingsRowText}>Notifications</Text>
              <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingsRow}>
              <MaterialIcons name="lock" size={24} color="#94a3b8" />
              <Text style={styles.settingsRowText}>Privacy & Security</Text>
              <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.settingsRow}>
              <MaterialIcons name="help" size={24} color="#94a3b8" />
              <Text style={styles.settingsRowText}>Help Center</Text>
              <MaterialIcons name="chevron-right" size={24} color="#cbd5e1" />
            </TouchableOpacity>

          </View>
        </View>

        {/* Logout Button */}
        <View style={styles.logoutWrapper}>
          <TouchableOpacity style={styles.logoutButton} onPress={handleSignOut}>
            <Text style={styles.logoutButtonText}>Sign Out</Text>
          </TouchableOpacity>
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
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'android' ? 32 : 16,
    paddingBottom: 16,
    backgroundColor: 'rgba(246, 248, 246, 0.9)',
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconButtonRight: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  headerTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 120, // ample space for the custom bottom navigation bar
  },
  heroSection: {
    alignItems: 'center',
    paddingVertical: 24,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatarImage: {
    width: 128, // h-32
    height: 128, // w-32
    borderRadius: 64,
    borderWidth: 4,
    borderColor: 'rgba(23, 207, 69, 0.2)', // ring-primary/20
  },
  editBadge: {
    position: 'absolute',
    bottom: 4,
    right: 4,
    backgroundColor: '#17cf45', // primary
    width: 32,
    height: 32,
    borderRadius: 16,
    borderWidth: 4,
    borderColor: '#f6f8f6', // background-light
    justifyContent: 'center',
    alignItems: 'center',
  },
  userName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  userStatus: {
    fontSize: 14,
    fontWeight: '500',
    color: '#17cf45',
    marginTop: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  locationText: {
    fontSize: 14,
    color: '#64748b',
    marginLeft: 4,
  },
  sectionContainer: {
    paddingHorizontal: 24,
    paddingVertical: 12, // py-3 approximate
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  updateText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#17cf45',
  },
  medicalCardsList: {
    gap: 16,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16, // rounded-xl
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#f1f5f9', // border-slate-100
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  infoIconBg: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  infoTextContainer: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#64748b',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  settingsCard: {
    backgroundColor: '#ffffff',
    borderRadius: 16, // rounded-xl
    padding: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
    shadowColor: '#e2e8f0',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 2,
  },
  settingsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
  },
  settingsRowText: {
    flex: 1,
    fontSize: 16,
    fontWeight: '500',
    color: '#0f172a',
    marginLeft: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginHorizontal: 12,
  },
  logoutWrapper: {
    paddingHorizontal: 24,
    paddingTop: 8,
    paddingBottom: 24,
  },
  logoutButton: {
    width: '100%',
    paddingVertical: 16,
    borderRadius: 16, // rounded-xl
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.3)', // red-200 / red-900/30 estimate
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#ef4444', // red-500
    fontSize: 16,
    fontWeight: '700',
  },
});

export default ProfileScreen;
