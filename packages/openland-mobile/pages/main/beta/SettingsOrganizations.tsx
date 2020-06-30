import * as React from 'react';
import { withApp } from '../../../components/withApp';
import { PageProps } from '../../../components/PageProps';
import { ZListGroup } from '../../../components/ZListGroup';
import { ZListItem } from '../../../components/ZListItem';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';
import { getClient } from 'openland-mobile/utils/graphqlClient';

const SettingsOrganizatonsContent = React.memo((props: PageProps) => {
    let account = getClient().useAccountSettings();
    let primary = account.organizations.find((v) => v.id === account.me!.primaryOrganization!.id)!!;
    let secondary = account.organizations.filter((v) => v.id !== primary.id);
    secondary.sort((a, b) => a.name.localeCompare(b.name));
    return (
        <>
            <ZListGroup>
                <ZListItem
                    text={primary.name}
                    leftAvatar={{ photo: primary.photo, id: primary.id, title: primary.name }}
                    description="Primary"
                    onPress={() => props.router.push('ProfileOrganization', { id: primary.id })}
                />
                {secondary.map((v) => (
                    <ZListItem
                        text={v.name}
                        leftAvatar={{ photo: v.photo, id: v.id, title: v.name }}
                        onPress={() => props.router.push('ProfileOrganization', { id: v.id })}
                    />
                ))}
            </ZListGroup>
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