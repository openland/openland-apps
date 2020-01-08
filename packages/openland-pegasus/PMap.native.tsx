import * as React from 'react';
import { View } from 'react-native';
import MapboxGL from '@react-native-mapbox-gl/maps';

MapboxGL.setAccessToken('pk.eyJ1Ijoic3RldmUta2l0ZSIsImEiOiJjamNlbnR2cGswdnozMzNuemxzMHNlN200In0.WHk4oWuFM4zOGBPwju74sw');

export const PMap = React.memo(() => {
    return (
        <View flexGrow={1} flexShrink={1} alignSelf="stretch" backgroundColor="purple">
            <MapboxGL.MapView
                style={{ width: '100%', height: '100%' }}
            />
        </View>
    );
});