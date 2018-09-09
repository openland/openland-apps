import * as React from 'react';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';
import { FastHeaderAppearance } from 'react-native-fast-navigation/FastHeaderAppearance';
import { DeviceConfig } from 'react-native-fast-navigation/DeviceConfig';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';

export const FastHeaderSafeArea = (props: { appearance: FastHeaderAppearance, children?: any }) => {
    return (
        <>
            <FastHeaderConfigRegistrator config={new FastHeaderConfig({ appearance: props.appearance })} />
            <ASSafeAreaProvider top={props.appearance === 'large' ? DeviceConfig.navigationBarHeightLarge - DeviceConfig.navigationBarHeight : 0}>
                {props.children}
            </ASSafeAreaProvider>
        </>
    );
};