import * as React from 'react';
import { SScrollView } from 'react-native-s/SScrollView';

export const PScrollView = React.memo((props: { children?: any }) => {
    return (
        <SScrollView>
            {props.children}
        </SScrollView>
    );
});