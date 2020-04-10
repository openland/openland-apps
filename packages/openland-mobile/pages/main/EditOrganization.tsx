import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZListGroup } from '../../components/ZListGroup';
import { View } from 'react-native';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZAvatarPicker } from 'openland-mobile/components/ZAvatarPicker';
import { ZPickField } from 'openland-mobile/components/ZPickField';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';

const EditOrganizationComponent = XMemo<PageProps>((props) => {
    const organizationId = props.router.params.id;
    const client = getClient();
    const profile = client.useOrganizationProfile({ organizationId }, { fetchPolicy: 'network-only' }).organizationProfile;

    const form = useForm();
    const nameField = useField('name', profile.name || '', form);
    const photoField = useField('photoRef', profile.photoRef, form);
    const aboutField = useField('about', profile.about || '', form);
    const websiteField = useField('website', profile.website || '', form);
    const twitterField = useField('twitter', profile.twitter || '', form);
    const facebookField = useField('facebook', profile.facebook || '', form);
    const linkedinField = useField('linkedin', profile.linkedin || '', form);
    const instagramField = useField('instagram', profile.instagram || '', form);

    const handleSave = () =>
        form.doAction(async () => {
            await client.mutateUpdateOrganization({
                organizationId,
                input: {
                    name: nameField.value,
                    photoRef: sanitizeImageRef(photoField.value),
                    about: aboutField.value,
                    website: websiteField.value,
                    twitter: twitterField.value,
                    facebook: facebookField.value,
                    linkedin: linkedinField.value,
                    instagram: instagramField.value,
                }
            });
            await client.refetchOrganizationProfile({ organizationId });

            props.router.back();
        });

    return (
        <>
            <SHeader title="Edit organization" />
            <SHeaderButton title="Save" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker size="xx-large" field={photoField} />
                </ZListGroup>
                <ZListGroup header="Info" headerMarginTop={0}>
                    <ZInput
                        placeholder="Name"
                        field={nameField}
                    />
                    <ZInput
                        field={aboutField}
                        placeholder="Description"
                        multiline={true}
                        description="Publicly describe this organization for all to see"
                    />
                </ZListGroup>
                <View height={15} />
                <ZListGroup header="Shortname" headerMarginTop={0}>
                    <ZPickField
                        label="Shortname"
                        value={profile.shortname ? '@' + profile.shortname : undefined}
                        path="SetShortname"
                        pathParams={{ id: organizationId, isGroup: false }}
                        description="People will be able to find your organization by this shortname"
                    />
                </ZListGroup>
                <ZListGroup header="Contacts" headerMarginTop={0}>
                    <ZInput
                        placeholder="Website"
                        field={websiteField}
                    />
                    <ZInput
                        placeholder="Instagram"
                        field={instagramField}
                    />
                    <ZInput
                        placeholder="Twitter"
                        field={twitterField}
                    />
                    <ZInput
                        placeholder="Facebook"
                        field={facebookField}
                    />
                    <ZInput
                        placeholder="LinkedIn"
                        field={linkedinField}
                    />
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

export const EditOrganization = withApp(EditOrganizationComponent, { navigationAppearance: 'small' });
