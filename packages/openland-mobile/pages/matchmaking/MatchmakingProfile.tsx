import * as React from 'react';
import { PageProps } from 'openland-mobile/components/PageProps';
import { withApp } from 'openland-mobile/components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { Platform } from 'react-native';
import { useClient } from 'openland-mobile/utils/useClient';

const MatchmakingProfileComponent = React.memo((props: PageProps) => {
    const client = useClient();
    let res = client.useMatchmakingProfile({ peerId: props.router.params.peerId, uid: props.router.params.userId });
    if (!res.matchmakingProfile) {
        // todo sort of 404
        return null;
    }
    const user = res.matchmakingProfile.user;
    return <>
        <SHeader title={Platform.OS === 'android' ? 'Info' : user.name} />

    </>;
});

export const MatchmakingProfile = withApp(MatchmakingProfileComponent, { navigationAppearance: 'small' });
