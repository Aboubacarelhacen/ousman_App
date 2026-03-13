import React from 'react';
import { View, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { MaterialIcons } from '@expo/vector-icons';
import Animated, {
  FadeIn,
  FadeOut,
  LinearTransition,
} from 'react-native-reanimated';

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);

// Brand colors
const ACTIVE_COLOR = '#17cf45';
const INACTIVE_COLOR = '#94a3b8';
const BAR_BG = 'rgba(15, 23, 42, 0.88)'; // dark translucent
const ALERT_BG = '#ef4444';
const ALERT_RING = 'rgba(239, 68, 68, 0.25)';

const ICON_MAP: Record<string, string> = {
  Home: 'home',
  HealthData: 'monitor-heart',
  Alerts: 'emergency',
  Contacts: 'people',
  Profile: 'person',
};

const LABEL_MAP: Record<string, string> = {
  Home: 'Home',
  HealthData: 'Health',
  Alerts: 'SOS',
  Contacts: 'Contacts',
  Profile: 'Profile',
};

const CustomNavBar: React.FC<BottomTabBarProps> = ({
  state,
  descriptors,
  navigation,
}) => {
  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        {state.routes.map((route, index) => {
          if (['_sitemap', '+not-found'].includes(route.name)) return null;

          const isFocused = state.index === index;
          const isAlerts = route.name === 'Alerts';

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name, route.params);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const iconName = ICON_MAP[route.name] || 'lens';
          const label = LABEL_MAP[route.name] || route.name;

          // Center SOS/Alerts button — elevated style
          if (isAlerts) {
            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                onLongPress={onLongPress}
                activeOpacity={0.8}
                style={styles.sosButtonOuter}
              >
                {/* Outer pulse/glow ring */}
                <View style={[
                  styles.sosRing,
                  isFocused && styles.sosRingActive,
                ]} />
                <View style={[
                  styles.sosButton,
                  isFocused && styles.sosButtonActive,
                ]}>
                  <MaterialIcons
                    name="emergency"
                    size={28}
                    color={isFocused ? '#ffffff' : 'rgba(239, 68, 68, 0.9)'}
                  />
                </View>
                <Animated.Text
                  style={[
                    styles.sosLabel,
                    { color: isFocused ? ALERT_BG : INACTIVE_COLOR },
                  ]}
                >
                  {label}
                </Animated.Text>
              </TouchableOpacity>
            );
          }

          // Standard tab items
          return (
            <AnimatedTouchableOpacity
              layout={LinearTransition.springify().mass(0.5)}
              key={route.key}
              onPress={onPress}
              onLongPress={onLongPress}
              activeOpacity={0.7}
              style={styles.tabItem}
            >
              {/* Active indicator dot behind icon */}
              {isFocused && (
                <Animated.View
                  entering={FadeIn.duration(250)}
                  exiting={FadeOut.duration(200)}
                  style={styles.activeIndicator}
                />
              )}
              <MaterialIcons
                name={iconName as any}
                size={24}
                color={isFocused ? ACTIVE_COLOR : INACTIVE_COLOR}
              />
              {isFocused ? (
                <Animated.Text
                  entering={FadeIn.duration(200)}
                  exiting={FadeOut.duration(150)}
                  style={styles.labelActive}
                >
                  {label}
                </Animated.Text>
              ) : (
                <Animated.Text
                  style={styles.labelInactive}
                >
                  {label}
                </Animated.Text>
              )}
            </AnimatedTouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  outerContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingBottom: Platform.OS === 'ios' ? 28 : 16,
    paddingHorizontal: 16,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-end',
    backgroundColor: BAR_BG,
    width: '100%',
    borderRadius: 28,
    paddingHorizontal: 8,
    paddingTop: 10,
    paddingBottom: 10,
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 16,
    // Border glow
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.08)',
  },
  // Standard tab item
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    position: 'relative',
  },
  activeIndicator: {
    position: 'absolute',
    top: 0,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(23, 207, 69, 0.12)',
  },
  labelActive: {
    color: ACTIVE_COLOR,
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.3,
  },
  labelInactive: {
    color: INACTIVE_COLOR,
    fontSize: 10,
    fontWeight: '500',
    marginTop: 4,
    opacity: 0.7,
  },
  // SOS / Alerts center button
  sosButtonOuter: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: -28, // elevate above the bar
    position: 'relative',
  },
  sosRing: {
    position: 'absolute',
    top: -4,
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sosRingActive: {
    borderColor: ALERT_RING,
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
  },
  sosButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(239, 68, 68, 0.12)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'rgba(239, 68, 68, 0.3)',
    // Shadow
    shadowColor: '#ef4444',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 12,
    elevation: 8,
  },
  sosButtonActive: {
    backgroundColor: ALERT_BG,
    borderColor: ALERT_BG,
    shadowOpacity: 0.5,
    shadowRadius: 20,
  },
  sosLabel: {
    fontSize: 10,
    fontWeight: '700',
    marginTop: 4,
    letterSpacing: 0.3,
  },
});

export default CustomNavBar;
