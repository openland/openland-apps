import * as React from 'react';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeader } from 'react-native-s/SHeader';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { XMemo } from 'openland-y-utils/XMemo';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { SScrollView } from 'react-native-s/SScrollView';

const SignupOrgComponent = XMemo<PageProps>((props) => {
    const form = useForm();
    const nameField = useField('name', '', form);
    const photoField = useField('photoRef', null, form);

    const canSkip = nameField.value.length <= 0;

    const handleSave = () => 
        form.doAction(async () => {
            const client = getClient();

            await client.mutateCreateOrganization({
                input: {
                    name: canSkip ? getMessenger().engine.user.name : nameField.value,
                    photoRef: photoField.value,
                    personal: false,
                    isCommunity: false
                },
            });

            await client.refetchAccount();
            await client.refetchAccountSettings();

            if (props.router.params.action) {
                await props.router.params.action(props.router);
            }
        });

    return (
        <ZTrack event="signup_org_view">
            <SHeader title="New organization" />
            <SHeaderButton key={'btn-' + canSkip} title={canSkip ? 'Skip' : 'Next'} onPress={handleSave} />
            <SScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker field={photoField} size="xx-large" />
                </ZListGroup>

                <ZListGroup header={null}>
                    <ZInput
                        placeholder="Organization name"
                        autoFocus={true}
                        description="Please, provide organization name and optional logo"
                        field={nameField}
                    />
                </ZListGroup>
            </SScrollView>
        </ZTrack>
    );
});

export const SignupOrg = withApp(SignupOrgComponent);