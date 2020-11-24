import * as React from 'react';
import { withApp } from '../../components/withApp';
import { ZListGroup } from '../../components/ZListGroup';
import { ZListItem } from '../../components/ZListItem';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { MyCommunities_myCommunities } from 'openland-api/spacex.types';
import { SScrollView } from 'react-native-s/SScrollView';
import { plural } from 'openland-y-utils/plural';
import { SRouterContext } from 'react-native-s/SRouterContext';
import { SRouter } from 'react-native-s/SRouter';
import { View } from 'react-native';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

const Item = React.memo((props: { community: MyCommunities_myCommunities, router: SRouter, theme: ThemeGlobal }) => {
    const { id, photo, name, membersCount, featured } = props.community;

    return (
        <ZListItem
            text={name}
            subTitle={plural(membersCount, ['member', 'members'])}
            leftAvatar={{ photo, id, title: name }}
            onPress={() => props.router.push('ProfileOrganization', { id })}
            {...featured && props.theme.displayFeaturedIcon ? { descriptionIcon: require('assets/ic-verified-16.png'), descriptionColor: '#3DA7F2' } : {}}
        />
    );
});

const SettingsCommunitiesContent = React.memo(() => {
    const client = getClient();
    const router = React.useContext(SRouterContext)!;
    const theme = useTheme();
    const communities = client.useMyCommunities({ fetchPolicy: 'cache-and-network' }).myCommunities;
    const adminCommunities = communities.filter(c => c.isOwner || c.isAdmin);
    const memberCommunities = communities.filter(c => !c.isOwner && !c.isAdmin);

    return (
        <SScrollView>
            <View height={16} />

            <ZListItem
                leftIcon={require('assets/ic-add-glyph-24.png')}
                text="Create community"
                path="NewOrganization"
                pathParams={{ isCommunity: true }}
            />

            <ZListGroup header="Admin">
                {adminCommunities.map(c => <Item key={c.id} community={c} router={router} theme={theme} />)}
            </ZListGroup>

            <ZListGroup header="Member">
                {memberCommunities.map(c => <Item key={c.id} community={c} router={router} theme={theme} />)}
            </ZListGroup>

            <View height={32} />
        </SScrollView>
    );
});

class SettingsCommunitiesComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Communities" />
                <SettingsCommunitiesContent />
            </>
        );
    }
}

export const SettingsCommunities = withApp(SettingsCommunitiesComponent);
