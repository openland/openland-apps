import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { View } from 'react-native';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { ZTextInput } from '../../components/ZTextInput';
import { AppStyles } from '../../styles/AppStyles';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import {
    OrganizationProfileQuery,
} from 'openland-api';
import { ZQuery } from '../../components/ZQuery';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { ListItemEdit } from './SettingsProfile';
import { getClient } from 'openland-mobile/utils/apolloClient';

class EditOrganizationComponent extends React.PureComponent<PageProps> {
    private ref = React.createRef<ZForm>();
    render() {
        return (
            <>
                <SHeader title="Edit organization" />
                <SHeaderButton
                    title="Save"
                    onPress={() => {
                        this.ref.current!.submitForm();
                    }}
                />
                <ZQuery
                    query={OrganizationProfileQuery}
                    variables={{ organizationId: this.props.router.params.id }}
                >
                    {resp => {
                        return (
                            <ZForm
                                ref={this.ref}
                                action={async src => {
                                    let client = getClient();
                                    await client.mutateUpdateOrganization(src);
                                    await client.refetchOrganizationProfile({ organizationId: this.props.router.params.id });
                                    await client.refetchOrganization({ organizationId: this.props.router.params.id });
                                }}
                                defaultData={{
                                    input: {
                                        name: resp.data!!.organizationProfile.name,
                                        photoRef: sanitizeImageRef(
                                            resp.data!!.organizationProfile.photoRef,
                                        ),
                                        about: resp.data!!.organizationProfile.about,
                                        website: resp.data!!.organizationProfile.website,
                                        twitter: resp.data!!.organizationProfile.twitter,
                                        facebook: resp.data!!.organizationProfile.facebook,
                                        linkedin: resp.data!!.organizationProfile.linkedin,
                                    },
                                }}
                                staticData={{
                                    organizationId: this.props.router.params.id,
                                }}
                                onSuccess={() => {
                                    this.props.router.back();
                                }}
                            >
                                <View>
                                    <View
                                        alignSelf="center"
                                        marginTop={30}
                                        marginBottom={10}
                                    >
                                        <ZAvatarPicker field="input.photoRef" />
                                    </View>
                                    <ZTextInput
                                        marginLeft={16}
                                        marginTop={21}
                                        placeholder="Organization name"
                                        field="input.name"
                                        height={44}
                                        style={{ fontSize: 16 }}
                                    />
                                    <View
                                        marginLeft={16}
                                        height={1}
                                        alignSelf="stretch"
                                        backgroundColor={AppStyles.separatorColor}
                                    />
                                    <ZListItemGroup>
                                        <ListItemEdit
                                            title="About"
                                            field="input.about"
                                        />
                                        <ListItemEdit
                                            title="Link"
                                            field="input.website"
                                        />
                                        <ListItemEdit
                                            title="Twitter"
                                            field="input.twitter"
                                        />
                                        <ListItemEdit
                                            title="Facebook"
                                            field="input.facebook"
                                        />
                                        <ListItemEdit
                                            title="Linkedin"
                                            field="input.linkedin"
                                        />
                                    </ZListItemGroup>
                                </View>
                            </ZForm>
                        );
                    }}
                </ZQuery>
            </>
        );
    }
}
export const EditOrganization = withApp(EditOrganizationComponent);
