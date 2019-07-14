import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZForm } from '../../components/ZForm';
import { ZListItemGroup } from '../../components/ZListItemGroup';
import { View } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZPickField } from 'openland-mobile/components/ZPickField';

const EditOrganizationComponent = XMemo<PageProps>((props) => {
    const ref = React.useRef<ZForm | null>(null);
    const organization = getClient().useOrganizationWithoutMembers({ organizationId: props.router.params.id }, { fetchPolicy: 'network-only' }).organization;
    const profile = getClient().useOrganizationProfile({ organizationId: props.router.params.id }, { fetchPolicy: 'network-only' }).organizationProfile;

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
                <View alignItems="center" marginTop={10}>
                    <ZAvatarPicker size="xx-large" field="input.photoRef" />
                </View>
                <ZListItemGroup header="Info" marginTop={0}>
                    <ZInput
                        label="Organization name"
                        field="input.name"
                    />
                    <ZInput
                        field="input.about"
                        label="About"
                        multiline={true}
                        description="Publicly describe this organization for all to see"
                    />
                </ZListItemGroup>
                <View height={15} />
                <ZListItemGroup header="Shortname" marginTop={0}>
                    <ZPickField
                        label="Shortname"
                        value={organization.shortname ? '@' + organization.shortname : undefined}
                        path="SetOrgShortname"
                        pathParams={{ id: organization.id }}
                        description="People will be able to find your organization by this shortname"
                    />
                </ZListItemGroup>
                <ZListItemGroup header="Contacts" marginTop={0}>
                    <ZInput
                        label="Website"
                        field="input.website"
                    />
                    <ZInput
                        label="Twitter"
                        field="input.twitter"
                    />
                    <ZInput
                        label="Facebook"
                        field="input.facebook"
                    />
                    <ZInput
                        label="Linkedin"
                        field="input.linkedin"
                    />
                </ZListItemGroup>
            </ZForm>
        </>
    );
});

export const EditOrganization = withApp(EditOrganizationComponent, { navigationAppearance: 'small' });
