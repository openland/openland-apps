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
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
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
                    <ZTextInput
                        placeholder="Organization name"
                        field="input.name"
                    />
                </ZAvatarPickerInputsGroup>
                <View height={20} />
                <ZTextInput
                    field="input.about"
                    placeholder="Add a short description"
                    multiline={true}
                />
                <View height={30} />
                <ZListItemGroup>
                    <ZListItem text="Shortname" description={organization.shortname ? '@' + organization.shortname : 'Create'} path="SetOrgShortname" pathParams={{ id: organization.id }} />
                </ZListItemGroup>
                <View height={30} />
                <View>
                    <ZTextInput
                        title="Website"
                        field="input.website"
                        placeholder="Add a link"
                    />
                    <ZTextInput
                        title="Twitter"
                        field="input.twitter"
                        placeholder="Add Twitter handle"
                    />
                    <ZTextInput
                        title="Facebook"
                        field="input.facebook"
                        placeholder="Add Facebook account"
                    />
                    <ZTextInput
                        title="Linkedin"
                        field="input.linkedin"
                        placeholder="Add LinkedIn account"
                    />
                </View>
            </ZForm>
        </>
    )
});

export const EditOrganization = withApp(EditOrganizationComponent, { navigationAppearance: 'small' });
