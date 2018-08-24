import * as React from 'react';
import { ZSafeAreaProvider } from './ZSafeAreaContext';
import { ZAppConfig } from '../ZAppConfig';
import { FastHeaderConfigRegistrator } from 'react-native-fast-navigation/FastHeaderConfigRegistrator';
import { FastHeaderConfig } from 'react-native-fast-navigation/FastHeaderConfig';
import { FastHeaderAppearance } from 'react-native-fast-navigation/FastHeaderAppearance';

export const ZHeaderSafeArea = (props: { appearance: FastHeaderAppearance, children?: any }) => {
    return (
        <>
            <FastHeaderConfigRegistrator config={new FastHeaderConfig({ appearance: props.appearance })} />
            <ZSafeAreaProvider top={props.appearance === 'large' ? ZAppConfig.navigationBarHeightLarge - ZAppConfig.navigationBarHeight : 0}>
                {props.children}
            </ZSafeAreaProvider>
        </>
    );
};