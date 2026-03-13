import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Platform,
  StatusBar,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../navigation/types';

type OnboardingScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Onboarding'>;

interface Props {
  navigation: OnboardingScreenNavigationProp;
}

const { width } = Dimensions.get('window');

const OnboardingScreen: React.FC<Props> = ({ navigation }) => {
  const handleGetStarted = () => {
    navigation.replace('ConnectDevice');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" backgroundColor="#f6f8f6" />
      <View style={styles.container}>
        
        {/* Header Name */}
        <View style={styles.header}>
          <Text style={styles.headerText}>VitalGuard Pro</Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroContainer}>
          <Image
            source={require('../../assets/images/onboarding.png')}
            style={styles.heroImage}
            resizeMode="contain"
          />
        </View>

        {/* Bottom Content Area */}
        <View style={styles.contentContainer}>
          <View style={styles.titleContainer}>
            <Text style={styles.titleText}>Your Health,</Text>
            <Text style={styles.titleTextHighlighted}>Smarter</Text>
          </View>
          <Text style={styles.descriptionText}>
            Experience the next generation of personal health monitoring. Advanced tracking, 
            instant alerts, and comprehensive insights right on your wrist.
          </Text>

          {/* Action Button */}
          <View style={styles.buttonWrapper}>
            <TouchableOpacity 
              style={styles.button} 
              activeOpacity={0.8}
              onPress={handleGetStarted}
            >
              <Text style={styles.buttonText}>Get Started</Text>
            </TouchableOpacity>
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
    alignItems: 'center',
    paddingHorizontal: 24,
    maxWidth: 448, // matching matching max-w-md
    width: '100%',
    alignSelf: 'center',
  },
  header: {
    marginTop: Platform.OS === 'android' ? 24 : 16,
    marginBottom: 24,
    alignItems: 'center',
  },
  headerText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a', // slate-900
    letterSpacing: 0.5,
  },
  heroContainer: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 32,
    marginBottom: 40,
  },
  heroImage: {
    width: width * 1.6,
    height: width * 1.6,
    maxHeight: 460,
    maxWidth: 460,
    transform: [{ scale: 1.3 }],
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 25 },
    shadowOpacity: 0.15,
    shadowRadius: 50,
  },
  contentContainer: {
    width: '100%',
    paddingBottom: 40,
  },
  titleContainer: {
    marginBottom: 16, // mb-4
  },
  titleText: {
    fontSize: 40, // text-5xl (slightly smaller for RN to fit nicely)
    fontWeight: '300',
    letterSpacing: -1,
    color: '#0f172a', // slate-900
    lineHeight: 48,
  },
  titleTextHighlighted: {
    fontSize: 40,
    fontWeight: '700', // font-bold
    color: '#0f172a',
    letterSpacing: -1,
    lineHeight: 48,
  },
  descriptionText: {
    fontSize: 16, // text-base
    color: '#475569', // text-slate-600
    lineHeight: 24, // leading-relaxed
    marginBottom: 32, // mb-8
  },
  buttonWrapper: {
    width: '100%',
    alignItems: 'center', // group-hover context
  },
  button: {
    backgroundColor: '#000000', // bg-primary
    width: '100%',
    paddingVertical: 20, // py-5
    borderRadius: 9999, // rounded-full
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonText: {
    color: '#FFFFFF', // text-white
    fontSize: 16,
    fontWeight: '600', // font-semibold
  },
});

export default OnboardingScreen;
