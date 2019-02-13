import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { PageProps } from '../../../components/PageProps';
import { ZListItemGroup } from '../../../components/ZListItemGroup';
import { ZListItem } from '../../../components/ZListItem';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';

const SettingsOrganizatonsContent = XMemo<PageProps>((props) => {
    let account = getClient().useAccountSettings();
    let primary = account.organizations.find((v) => v.id === account.me!.primaryOrganization!.id)!!;
    let secondary = account.organizations.filter((v) => v.id !== primary.id);
    secondary.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <>
            <ZListItemGroup>
                <ZListItem
                    text={primary.name}
                    leftAvatar={{ photo: primary.photo, key: primary.id, title: primary.name }}
                    description="Primary"
                    onPress={() => props.router.push('ProfileOrganization', { id: primary.id })}
                    navigationIcon={true}
                />
                {secondary.map((v) => (
                    <ZListItem
                        text={v.name}
                        leftAvatar={{ photo: v.photo, key: v.id, title: v.name }}
                        onPress={() => props.router.push('ProfileOrganization', { id: v.id })}
                        navigationIcon={true}
                    />
                ))}
            </ZListItemGroup>
        </>
    );
});

class SettingsOrganizatonsComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Organizations" />
                <SScrollView>
                    <SettingsOrganizatonsContent {...this.props} />
                </SScrollView>
            </>
        );
    }
}
export const SettingsOrganizations = withApp(SettingsOrganizatonsComponent);