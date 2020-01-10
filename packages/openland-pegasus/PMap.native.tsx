import * as React from 'react';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw');

export const PMyLocation = React.memo((props: { latitude: number, longitude: number }) => {
    // return (
    //     <MapboxGL.
    //         className="mapboxgl-user-location-dot"
    //         longitude={props.longitude}
    //         latitude={props.latitude}
    //         // onContextMenu={e => e.preventDefault()}
    //         captureDrag={false}
    //         captureDoubleClick={false}
    //     />
    // );
    return null;
});

export const PMap = React.memo((props: { children?: any }) => {
    return (
        <View flexGrow={1} flexShrink={1} alignSelf="stretch" backgroundColor="purple">
            <MapboxGL.MapView
                style={{ width: '100%', height: '100%' }}
            >
                {props.children}
            </MapboxGL.MapView>
        </View>
    );
});