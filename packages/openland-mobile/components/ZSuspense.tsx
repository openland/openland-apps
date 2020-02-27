import * as React from 'react';
import { ZLoaderEnabler, ZLoaderContaienr } from './ZLoaderProvider';
import { StyleProp, ViewStyle } from 'react-native';

const Container = React.memo((props: { children?: any }) => {
    return (
        <React.Suspense fallback={<ZLoaderEnabler />}>
            {props.children}
        </React.Suspense>
    );
});

export const ZSuspense = React.memo((props: { style?: StyleProp<ViewStyle>, children?: any }) => {
    return (
        <ZLoaderContaienr loaderStyle={props.style} >
            <Container>
                {props.children}
            </Container>
        </ZLoaderContaienr>
    );
});