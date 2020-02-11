import * as React from 'react';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { PageProps } from 'openland-mobile/components/PageProps';

const SubscriptionsComponent = React.memo<PageProps>((props) => {
    return (
        <>
            <SHeader title="Subscriptions" />
        </>
    );
});

export const Subscriptions = withApp(SubscriptionsComponent, { navigationAppearance: 'small' });