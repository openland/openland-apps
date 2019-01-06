import * as React from 'react';
import { ASSafeAreaProvider } from 'react-native-async-view/ASSafeAreaContext';
import { SHeaderAppearance } from './SHeader';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';
import { SDevice } from './SDevice';
import { Platform } from 'react-native';

export const SHeaderSafeArea = (props: { appearance: SHeaderAppearance, children?: any }) => {
    return (
        <>
            <HeaderConfigRegistrator config={{ appearance: props.appearance }} />
            <ASSafeAreaProvider
                top={
                    props.appearance === 'large' && Platform.OS === 'ios'
                        ? SDevice.navigationBarHeightExpanded - SDevice.navigationBarHeight /* Add difference from large and small headers*/
                        : 0
                }
            >
                {props.children}
            </ASSafeAreaProvider>
        </>
    );
};