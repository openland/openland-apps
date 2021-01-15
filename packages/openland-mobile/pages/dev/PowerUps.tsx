import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';

export const PowerUps = withApp(() => {
    return (
        <>
            <SHeader title="PowerUp" />
        </>
    );
}, { navigationAppearance: 'small' });