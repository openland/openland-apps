import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import Alert from 'openland-mobile/components/AlertBlanket';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';

const NewOrganizationComponent = (props: PageProps) => {
    const isCommunity = props.router.params.isCommunity;

    const form = useForm();
    const nameField = useField('name', '', form);
    const photoField = useField('photoRef', null, form);
    const aboutField = useField('about', '', form);

    const handleSave = () => {
        if (nameField.value === '') {
            Alert.builder().title('Please enter a name for this ' + (isCommunity ? 'community' : 'organization')).button('GOT IT!').show();
            return;
        }

        form.doAction(async () => {
            const client = getClient();

            let res = await client.mutateCreateOrganization({
                input: {
                    personal: false,
                    isCommunity: isCommunity,
                    name: nameField.value,
                    photoRef: photoField.value,
                    ...(isCommunity && { about: aboutField.value })
                },
            });

            await client.refetchAccount();
            await client.refetchAccountSettings();

            if (props.router.params.action) {
                await props.router.params.action(props.router);
            } else {
                props.router.pushAndRemove('ProfileOrganization', { id: res.organization.id });
            }
        });
    };

    return (
        <ZTrack event="new_org_view">
            <SHeader title={isCommunity ? 'New community' : 'New organization'} />
            <SHeaderButton title={isCommunity ? 'Create' : 'Next'} onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker field={photoField} size="xx-large" />
                </ZListGroup>

                <ZListGroup header={null}>
                    {!isCommunity && (
                        <ZInput
                            placeholder="Organization name"
                            field={nameField}
                            autoFocus={true}
                            description="Please, provide organization name and optional logo"
                        />
                    )}

                    {isCommunity && (
                        <>
                            <ZInput placeholder="Community name" field={nameField} autoFocus={true} />
                            <ZInput placeholder="About" field={aboutField} multiline={true} />
                        </>
                    )}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </ZTrack>
    );
};

export const NewOrganization = withApp(NewOrganizationComponent);