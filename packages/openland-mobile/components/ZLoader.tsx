import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';

export const ZLoader = () => {
    return (
        <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator />
        </View>
    );
};