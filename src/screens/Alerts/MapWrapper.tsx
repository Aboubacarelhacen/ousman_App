import React from 'react';
import MapView, { Marker, MapViewProps, MapMarkerProps } from 'react-native-maps';

export const CustomMapView = (props: MapViewProps & { children?: React.ReactNode }) => {
  return <MapView {...props}>{props.children}</MapView>;
};

export const CustomMapMarker = (props: MapMarkerProps) => {
  return <Marker {...props} />;
};
