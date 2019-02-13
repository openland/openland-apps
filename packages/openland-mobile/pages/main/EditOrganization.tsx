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
import { sanitizeImageRef } from 'openland-y-utils/sanitizeImageRef';
import { ListItemEdit } from './SettingsProfile';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { XMemo } from 'openland-y-utils/XMemo';

const EditOrganizationComponent = XMemo<PageProps>((props) => {
    let ref = React.useRef<ZForm | null>(null);
    let org = getClient().useOrganizationProfile({ organizationId: props.router.params.id });
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
                        name: org.organizationProfile.name,
                        photoRef: sanitizeImageRef(
                            org.organizationProfile.photoRef,
                        ),
                        about: org.organizationProfile.about,
                        website: org.organizationProfile.website,
                        twitter: org.organizationProfile.twitter,
                        facebook: org.organizationProfile.facebook,
                        linkedin: org.organizationProfile.linkedin,
                    },
                }}
                staticData={{
                    organizationId: props.router.params.id,
                }}
                onSuccess={() => {
                    props.router.back();
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
        </>
    )
});

export const EditOrganization = withApp(EditOrganizationComponent);
