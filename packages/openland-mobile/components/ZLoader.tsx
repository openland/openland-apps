import * as React from 'react';
import { ActivityIndicator, View } from 'react-native';
import { AppStyles } from '../styles/AppStyles';

export const ZLoader = (props: { inverted?: boolean }) => {
    return (
        <View style={{ position: 'absolute', left: 0, top: 0, right: 0, bottom: 0, backgroundColor: props.inverted ? AppStyles.primaryColor : '#fff', justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator color={props.inverted ? '#fff' : undefined} />
        </View>
    );
};