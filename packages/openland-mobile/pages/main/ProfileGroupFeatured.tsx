import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { ZListGroup } from '../../components/ZListGroup';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { UserView } from './components/UserView';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const ProfileGroupFeaturedComponent = XMemo<PageProps>((props) => {
    const theme = React.useContext(ThemeContext);
    const members = getClient().useRoomFeaturedMembers({ roomId: props.router.params.id }, { fetchPolicy: 'network-only' }).roomFeaturedMembers;

    return (
        <>
            <SHeader title="Featured members" />
            <SScrollView>
                <ZListGroup>
                    {members.map((item, index) => (
                        <UserView
                            user={item.user}
                            subtitle={item.badge ? item.badge.name : undefined}
                            subtitleColor={theme.foregroundPrimary}
                            onPress={() => props.router.push('ProfileUser', { id: item.user.id })}
                        />
                    ))}
                </ZListGroup>
            </SScrollView>
        </>
    );
});

export const ProfileGroupFeatured = withApp(ProfileGroupFeaturedComponent, { navigationAppearance: 'small-hidden' });
