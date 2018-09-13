import * as React from 'react';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { SHeaderAppearance } from './SHeader';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { DeviceConfig } from './navigation/DeviceConfig';

export const SHeaderSafeArea = (props: { appearance: SHeaderAppearance, children?: any }) => {
    return (
        <>
            <HeaderConfigRegistrator config={{ appearance: props.appearance }} />
            <ASSafeAreaProvider top={props.appearance === 'large' ? DeviceConfig.navigationBarHeightLarge - DeviceConfig.navigationBarHeight : 0}>
                {props.children}
            </ASSafeAreaProvider>
        </>
    );
};