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
    const organizationId = props.router.params.id;
    const profile = getClient().useOrganizationProfile({ organizationId }, { fetchPolicy: 'network-only' }).organizationProfile;

    return (
        <>
            <SHeader title="Edit organization" />
            <SHeaderButton title="Save" onPress={() => { ref.current!.submitForm(); }} />
            <ZForm
                ref={ref}
                action={async src => {
                    let client = getClient();
                    await client.mutateUpdateOrganization(src);
                    await client.refetchOrganizationProfile({ organizationId });
                    await client.refetchOrganization({ organizationId });
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
                    organizationId
                }}
                onSuccess={() => {
                    props.router.back();
                }}
            >
                <ZListItemGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field="input.photoRef" />
                </ZListItemGroup>
                <ZListItemGroup header="Info" headerMarginTop={0}>
                    <ZInput
                        placeholder="Organization name"
                        field="input.name"
                    />
                    <ZInput
                        field="input.about"
                        placeholder="About"
                        multiline={true}
                        description="Publicly describe this organization for all to see"
                    />
                </ZListItemGroup>
                <View height={15} />
                <ZListItemGroup header="Shortname" headerMarginTop={0}>
                    <ZPickField
                        label="Shortname"
                        value={profile.shortname ? '@' + profile.shortname : undefined}
                        path="SetOrgShortname"
                        pathParams={{ id: organizationId }}
                        description="People will be able to find your organization by this shortname"
                    />
                </ZListItemGroup>
                <ZListItemGroup header="Contacts" headerMarginTop={0}>
                    <ZInput
                        placeholder="Website"
                        field="input.website"
                    />
                    <ZInput
                        placeholder="Twitter"
                        field="input.twitter"
                    />
                    <ZInput
                        placeholder="Facebook"
                        field="input.facebook"
                    />
                    <ZInput
                        placeholder="LinkedIn"
                        field="input.linkedin"
                    />
                </ZListItemGroup>
            </ZForm>
        </>
    );
});

export const EditOrganization = withApp(EditOrganizationComponent, { navigationAppearance: 'small' });
