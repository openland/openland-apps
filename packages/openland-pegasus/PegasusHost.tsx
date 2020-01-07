import * as React from 'react';
import { View } from 'react-native';

export interface PegasusHostProps {
    children?: any;
}

export const PegasusHost = React.memo((props: PegasusHostProps) => {
    return (
        <View style={{ width: '100%', height: '100%' }}>
            {props.children}
        </View>
    );
});