import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import Alert from 'openland-mobile/components/AlertBlanket';
import { SilentError } from 'openland-y-forms/errorHandling';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SScrollView } from 'react-native-s/SScrollView';

const NewOrganizationComponent = (props: PageProps) => {
    const isCommunity = props.router.params.isCommunity;

    const form = useForm();
    const nameField = useField('name', '', form);
    const photoField = useField('photoRef', null, form);
    const aboutField = useField('about', '', form);

    const handleSave = () => 
        form.doAction(async () => {
            if (nameField.value === '') {
                Alert.builder().title('Please enter a name for this ' + (isCommunity ? 'community' : 'organization')).button('GOT IT!').show();    

                throw new SilentError();
            }

            let client = getClient();

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

    return (
        <ZTrack event="new_org_view">
            <SHeader title={isCommunity ? 'New community' : 'New organization'} />
            <SHeaderButton title={isCommunity ? 'Create' : 'Next'} onPress={handleSave} />
            <SScrollView>
                <ZListItemGroup header={null} alignItems="center">
                    <ZAvatarPicker field={photoField} size="xx-large" />
                </ZListItemGroup>

                <ZListItemGroup header={null}>
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
                </ZListItemGroup>
            </SScrollView>
        </ZTrack>
    );
}

export const NewOrganization = withApp(NewOrganizationComponent);