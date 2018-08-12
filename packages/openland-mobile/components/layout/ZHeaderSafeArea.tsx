import * as React from 'react';
import { ZHeaderAppearance } from '../navigation/ZHeaderAppearance';
import { ZHeaderConfigRegistrator } from '../navigation/ZHeaderConfigRegistrator';
import { ZHeaderConfig } from '../navigation/ZHeaderConfig';
import { ZSafeAreaProvider } from './ZSafeAreaContext';
import { ZAppConfig } from '../ZAppConfig';

export const ZHeaderSafeArea = (props: { appearance: ZHeaderAppearance, children?: any }) => {
    return (
        <>
            <ZHeaderConfigRegistrator config={new ZHeaderConfig({ appearance: props.appearance })} />
            <ZSafeAreaProvider top={props.appearance === 'large' ? ZAppConfig.navigationBarHeightLarge - ZAppConfig.navigationBarHeight : 0}>
                {props.children}
            </ZSafeAreaProvider>
        </>
    );
};