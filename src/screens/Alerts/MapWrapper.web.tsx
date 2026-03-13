import React from 'react';
import { View, Text } from 'react-native';

export const CustomMapView = (props: any) => {
  return (
    <View style={[{ flex: 1, backgroundColor: '#f1f5f9', justifyContent: 'center', alignItems: 'center' }, props.style]}>
      <Text style={{ color: '#64748b', fontSize: 12, textAlign: 'center' }}>Map preview available on native app</Text>
      {props.children}
    </View>
  );
};

export const CustomMapMarker = (props: any) => {
  return null;
};
