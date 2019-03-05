import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { View } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZAvatarPickerInputsGroup } from 'openland-mobile/components/ZAvatarPickerInputsGroup';
import { ZTextInput2 } from 'openland-mobile/components/ZTextInput2';
import { ZListItem } from 'openland-mobile/components/ZListItem';
import { Alert } from 'openland-mobile/components/AlertBlanket';

const EditOrganizationComponent = XMemo<PageProps>((props) => {
    let ref = React.useRef<ZForm | null>(null);
    let organization = getClient().useOrganization({ organizationId: props.router.params.id }).organization;
    let profile = getClient().useOrganizationProfile({ organizationId: props.router.params.id }).organizationProfile;
    return (
        <>
            <SHeader title="Edit organization" />
            <SHeaderButton title="Save" onPress={() => { ref.current!.submitForm(); }} />
            <ZForm
                ref={ref}
                action={async src => {
                    let client = getClient();
                    await client.mutateUpdateOrganization(src);
                    await client.refetchOrganizationProfile({ organizationId: props.router.params.id });
                    await client.refetchOrganization({ organizationId: props.router.params.id });
                }}
                defaultData={{
                    input: {
                        name: profile.name,
                        photoRef: sanitizeImageRef(
                            profile.photoRef,
                        ),
                        about: profile.about,
                        website: profile.website,
                        twitter: profile.twitter,
                        facebook: profile.facebook,
                        linkedin: profile.linkedin,
                    },
                }}
                staticData={{
                    organizationId: props.router.params.id,
                }}
                onSuccess={() => {
                    props.router.back();
                }}
            >
                <ZAvatarPickerInputsGroup avatarField="input.photoRef">
                    <ZTextInput2
                        placeholder="Organization name"
                        field="input.name"
                        border={true}
                    />
                </ZAvatarPickerInputsGroup>
                <View height={20} />
                <ZTextInput2
                    field="input.about"
                    placeholder="Add a short description"
                    multiline={true}
                    border={true}
                />
                <View height={30} />
                <ZListItemGroup>
                    <ZListItem text="Shortname" description={organization.shortname ? '@' + organization.shortname : 'Create'} path="SetOrgShortname" pathParams={{ id: organization.id }} />
                </ZListItemGroup>
                <View height={30} />
                <View>
                    <ZTextInput2
                        title="Website"
                        field="input.website"
                        placeholder="Add a link"
                        border={true}
                    />
                    <ZTextInput2
                        title="Twitter"
                        field="input.twitter"
                        placeholder="Add Twitter handle"
                        border={true}
                    />
                    <ZTextInput2
                        title="Facebook"
                        field="input.facebook"
                        placeholder="Add Facebook account"
                        border={true}
                    />
                    <ZTextInput2
                        title="Linkedin"
                        field="input.linkedin"
                        placeholder="Add Linkedin account"
                        border={true}
                    />
                </View>
            </ZForm>
        </>
    )
});

export const EditOrganization = withApp(EditOrganizationComponent, { navigationAppearance: 'small' });
