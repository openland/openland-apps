import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { ZQuery } from '../../components/ZQuery';
import { AccountSettingsQuery } from 'openland-api';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemFooter } from '../../components/ZListItemFooter';
import { SScrollView } from 'react-native-s/SScrollView';
import { SHeader } from 'react-native-s/SHeader';

class SettingsOrganizatonsComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <SHeader title="Organizations" />
                <SScrollView>
                    <ZQuery query={AccountSettingsQuery}>
                        {resp => {
                            let primary = resp.data.organizations.find((v) => v.id === resp.data.me!.primaryOrganization!.id)!!;
                            let secondary = resp.data.organizations.filter((v) => v.id !== primary.id);
                            secondary.sort((a, b) => a.name.localeCompare(b.name));
                            return (
                                <>
                                    <ZListItemGroup>
                                        <ZListItem
                                            text={primary.name}
                                            leftAvatar={{ photo: primary.photo, key: primary.id, title: primary.name }}
                                            description="Primary"
                                            onPress={() => this.props.router.push('ProfileOrganization', { id: primary.id })}
                                            navigationIcon={true}
                                        />
                                        {secondary.map((v) => (
                                            <ZListItem
                                                text={v.name}
                                                leftAvatar={{ photo: v.photo, key: v.id, title: v.name }}
                                                onPress={() => this.props.router.push('ProfileOrganization', { id: v.id })}
                                                navigationIcon={true}
                                            />
                                        ))}
                                    </ZListItemGroup>
                                    <ZListItemFooter />
                                </>
                            );
                        }}
                    </ZQuery>
                </SScrollView>
            </>
        );
    }
}
export const SettingsOrganizations = withApp(SettingsOrganizatonsComponent);