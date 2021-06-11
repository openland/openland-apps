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
import { ZSelect } from 'openland-mobile/components/ZSelect';
import { useText } from 'openland-mobile/text/useText';

const NewOrganizationComponent = (props: PageProps) => {
    const isCommunity = props.router.params.isCommunity;
    const { t } = useText();

    const form = useForm();
    const nameField = useField('name', '', form);
    const photoField = useField('photoRef', null, form);
    const aboutField = useField('about', '', form);
    const privacyField = useField<'secret' | 'public'>('privacy', 'public', form);

    const handleSave = () => {
        if (nameField.value === '') {
            Alert.builder()
                .title(t('validationEnterName', 'Please enter a name'))
                .button(t('gotIt', 'Got it!'))
                .show();
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
                    isPrivate: privacyField.value === 'secret',
                    ...(isCommunity && { about: aboutField.value })
                },
            });

            await client.refetchMyCommunities();

            if (props.router.params.action) {
                await props.router.params.action(props.router);
            } else {
                props.router.pushAndRemove('ProfileOrganization', { id: res.organization.id });
            }
        });
    };

    return (
        <ZTrack event={isCommunity ? 'navigate_new_community' : 'navigate_new_org'}>
            <SHeader title={isCommunity ? t('newCommunity', 'New community') : t('newOrganization', 'New organization')} />
            <SHeaderButton title={t('create', 'Create')} onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker field={photoField} size="xx-large" />
                </ZListGroup>

                <ZListGroup header={null}>
                    {!isCommunity && (
                        <ZInput
                            placeholder={t('name', 'Name')}
                            field={nameField}
                            autoFocus={true}
                            description={t('createOrganizationDescription', 'Please, provide organization name and optional logo')}
                        />
                    )}

                    {isCommunity && (
                        <>
                            <ZInput placeholder={t('name', 'Name')} field={nameField} autoFocus={true} />
                            <ZInput placeholder={t('description', 'Description')} field={aboutField} multiline={true} />
                            <ZSelect
                                label={t('visibility', 'Visibility')}
                                modalTitle={t('visibility', 'Visibility')}
                                field={privacyField}
                                options={[
                                    {
                                        label: t('createOrganizationPublic', 'Public'),
                                        subtitle: t('createOrganizationPublicDescription', 'Visible in search'),
                                        value: 'public',
                                    },
                                    {
                                        label: t('createOrganizationSecret', 'Secret'),
                                        subtitle: t('createOrganizationSecretDescription', 'Only people with invite link can see it'),
                                        value: 'secret',
                                    },
                                ]}
                            />
                        </>
                    )}
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </ZTrack>
    );
};

export const NewOrganization = withApp(NewOrganizationComponent, { navigationAppearance: 'small' });
