import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  Image,
  Platform,
  Linking,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const contactsData = [
  {
    id: '1',
    name: 'Sarah Jenkins',
    role: 'Spouse',
    phone: '5550123456',
    formattedPhone: '(555) 012-3456',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDG_IiVeS0w43imqdRlA4jNTkwwAAm9zpRmub1sunVVktUIalfenYBEWGM-kJRzmFslnPuEXJVbUS1ZH7lygNNS-ZT_T-l5gJoEeQ5mooB0evtDUfvjtxit9BDANuTMjW4WkdG2tqyW4mcXgkP3AtTpj3Lio3yDhoG6LRTyFQsGBgikM-mdM_KruA4hALgVf9shAtajfWczYzn3BGFcior827yGu4jFWZWfrgG4JBJnIS3h1Z26uGKecY_Gl1HzgjztLYgpwaAbUfFv',
  },
  {
    id: '2',
    name: 'Dr. Michael Chen',
    role: 'Primary Physician',
    phone: '5550987654',
    formattedPhone: '(555) 098-7654',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuA41v8nkAmeRhEOc8q87xy_d_yADkCScG6Zu0DFSto8VclGGhDtedOfUz7q8rRwharFevzbaaZEe2XYJhZXclXG5sqNbLqBc0BxI8ztZ4NqfBESAnC6FYEyBS5t-01zRr64xaUI68jUlvm8u-xoMoc5OaKQ12TMgNQQzk1M3KxQRqnc8-3Q9ZjFyPlyx_sTIoD7jY20mGLf8CNp5j70VNJazh8OeK-J6RxKfNr6mQFnILekAkD7tN05Vg-LhMLpCrHwYjfpLMRJJxfc',
  },
  {
    id: '3',
    name: 'David Wilson',
    role: 'Brother',
    phone: '5552345678',
    formattedPhone: '(555) 234-5678',
    imageUrl:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuArw_gES-MvNxTIPuep0jSZkCMhz4SAT5byvTVR6K5w5YnE1p4vuITGNoROJTh5L4VcBsZO4U-aDcNCmdrCGPySBU2sNa6At9Fzk34thawdi4tuBjDzjO_fuknxDlO9pKs5OAbVvOoUb6x4YgQOAVnuGFN3ouMLq1hCEpFAIJCDBeOMJ8ZHX32izkrQ5SpUZpKolKPmTpvkp-akGDxNsMx9UB0LPodp9WuQh8e-szBkLSjvbJ93tXpwvU7njnH-HrxBnaH56r9T00xd',
  },
];

const EmergencyContactsScreen = () => {
  const navigation = useNavigation<any>();
  const handleCall = (phoneNumber: string) => {
    Linking.openURL(`tel:${phoneNumber}`);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.goBack()}>
          <MaterialIcons name="arrow-back" size={24} color="#17cf45" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Emergency Contacts</Text>
        <TouchableOpacity style={styles.iconButton} onPress={() => navigation.navigate('Profile')}>
          <MaterialIcons name="settings" size={24} color="#17cf45" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.container} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Hero Card / Summary */}
        <View style={styles.heroCard}>
          <View style={styles.heroCardTopRow}>
            <Text style={styles.heroCardSubtitle}>QUICK ACCESS</Text>
            <MaterialIcons name="emergency" size={20} color="#ffffff" />
          </View>
          <Text style={styles.heroCardTitle}>Priority Alerts Active</Text>
          <Text style={styles.heroCardDescription}>
            Contacts will be notified immediately in case of an incident detection.
          </Text>
        </View>

        {/* List Section Header */}
        <View style={styles.listSectionHeader}>
          <Text style={styles.listTitle}>Primary Contacts</Text>
          <Text style={styles.listCount}>3 Saved</Text>
        </View>

        {/* Contact Cards */}
        <View style={styles.contactsList}>
          {contactsData.map((contact) => (
            <TouchableOpacity key={contact.id} style={styles.contactCard} activeOpacity={0.7}>
              <View style={styles.contactInfoRow}>
                <View style={styles.avatarContainer}>
                  <Image source={{ uri: contact.imageUrl }} style={styles.avatar} />
                </View>
                <View style={styles.contactTextContainer}>
                  <Text style={styles.contactName}>{contact.name}</Text>
                  <Text style={styles.contactRole}>{contact.role}</Text>
                  <Text style={styles.contactPhone}>{contact.formattedPhone}</Text>
                </View>
              </View>
              
              <TouchableOpacity 
                style={styles.callButton} 
                onPress={() => handleCall(contact.phone)}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <MaterialIcons name="call" size={20} color="#17cf45" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </View>

        {/* Add Button Section */}
        <View style={styles.addSection}>
          <TouchableOpacity style={styles.addButton} activeOpacity={0.8}>
            <MaterialIcons name="person-add" size={24} color="#ffffff" />
            <Text style={styles.addButtonText}>Add New Contact</Text>
          </TouchableOpacity>
          <Text style={styles.addSectionDescription}>
            Registered emergency contacts can receive your location and health vitals during an alert.
          </Text>
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
    backgroundColor: 'rgba(246, 248, 246, 0.9)',
    zIndex: 10,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(23, 207, 69, 0.1)', // bg-primary/10
    justifyContent: 'center',
    alignItems: 'center',
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
    paddingBottom: 140, // substantial padding for the bottom tab nav
  },
  heroCard: {
    backgroundColor: '#0f172a', // matched dark div from HomeScreen
    borderRadius: 24, // xl
    padding: 24,
    marginTop: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 8,
  },
  heroCardTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  heroCardSubtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 14,
    fontWeight: '500',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  heroCardTitle: {
    color: '#17cf45', // change text to green to contrast dark bg
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 4,
  },
  heroCardDescription: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 14,
    lineHeight: 20,
  },
  listSectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 32,
    marginBottom: 16,
  },
  listTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  listCount: {
    fontSize: 14,
    fontWeight: '500',
    color: '#17cf45',
  },
  contactsList: {
    gap: 16,
  },
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 20, // slightly less than xl
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0', // slate-200
  },
  contactInfoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatarContainer: {
    width: 56, // size-14 (14 * 4px)
    height: 56,
    borderRadius: 28,
    borderWidth: 2,
    borderColor: 'rgba(23, 207, 69, 0.2)', // border-primary/20
    overflow: 'hidden',
    marginRight: 16,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  contactTextContainer: {
    flex: 1,
  },
  contactName: {
    fontSize: 16, // text-base
    fontWeight: '700', // font-bold
    color: '#0f172a',
    lineHeight: 20,
  },
  contactRole: {
    fontSize: 14, // text-sm
    fontWeight: '500', // font-medium
    color: '#17cf45', // text-primary
    marginTop: 2,
  },
  contactPhone: {
    fontSize: 12, // text-xs
    color: '#64748b', // text-slate-500
    marginTop: 4,
  },
  callButton: {
    width: 40, // size-10
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(23, 207, 69, 0.1)', // bg-primary/10
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 12,
  },
  addSection: {
    alignItems: 'center',
    marginTop: 40,
  },
  addButton: {
    width: '100%',
    maxWidth: 320, // max-w-xs
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#17cf45', // bg-primary
    paddingVertical: 16,
    borderRadius: 9999, // rounded-full
    shadowColor: '#17cf45',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2, // shadow-primary/20
    shadowRadius: 15,
    elevation: 6,
  },
  addButtonText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
    marginLeft: 12,
  },
  addSectionDescription: {
    textAlign: 'center',
    color: '#94a3b8', // text-slate-400
    fontSize: 12,
    marginTop: 16,
    paddingHorizontal: 32,
    lineHeight: 18,
  },
});

export default EmergencyContactsScreen;
