import * as React from 'react';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { FastHeader } from 'react-native-fast-navigation/FastHeader';
import { ZScrollView } from '../../components/ZScrollView';
import { ZQuery } from '../../components/ZQuery';
import { AccountSettingsQuery } from 'openland-api';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { ZListItem } from '../../components/ZListItem';
import { ZListItemFooter } from '../../components/ZListItemFooter';

class SettingsOrganizatonsComponent extends React.Component<PageProps> {
    render() {
        return (
            <>
                <FastHeader title="Organizations" />
                <ZScrollView>
                    <ZQuery query={AccountSettingsQuery}>
                        {resp => {
                            let primary = resp.data.organizations.find((v) => v.id === resp.data.primaryOrganization!!.id)!!;
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
                                        />
                                        {secondary.map((v) => (
                                            <ZListItem
                                                text={v.name}
                                                leftAvatar={{ photo: v.photo, key: v.id, title: v.name }}
                                                onPress={() => this.props.router.push('ProfileOrganization', { id: v.id })}
                                            />
                                        ))}
                                    </ZListItemGroup>
                                    <ZListItemFooter />
                                </>
                            );
                        }}
                    </ZQuery>
                </ZScrollView>
            </>
        );
    }
}
export const SettingsOrganizations = withApp(SettingsOrganizatonsComponent);