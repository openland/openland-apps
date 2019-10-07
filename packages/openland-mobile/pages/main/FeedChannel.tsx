import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from 'openland-mobile/components/PageProps';
import { SHeader } from 'react-native-s/SHeader';

const FeedChannelComponent = React.memo((props: PageProps) => {
    const { id } = props.router.params;

    return (
        <>
            <SHeader title={id} />
        </>
    );
});

export const FeedChannel = withApp(FeedChannelComponent, { navigationAppearance: 'small' });
