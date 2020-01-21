import * as React from 'react';
import { View } from 'react-native';
import { PageProps } from '../../components/PageProps';
import { withApp } from '../../components/withApp';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { getMessenger } from 'openland-mobile/utils/messenger';
import { useForm } from 'openland-form/useForm';
import { useField } from 'openland-form/useField';
import { RegistrationContainer } from './RegistrationContainer';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';

const SignupOrgComponent = React.memo((props: PageProps) => {
    const form = useForm();
    const nameField = useField('name', '', form);

    const canSkip = nameField.value.length <= 0;

    const handleSave = () =>
        form.doAction(async () => {
            const client = getClient();

            await client.mutateCreateOrganization({
                input: {
                    name: canSkip ? getMessenger().engine.user.name : nameField.value,
                    personal: false,
                    isCommunity: false,
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
            <RegistrationContainer
                title="Where do you work?"
                subtitle="Give others a bit of context about you"
                autoScrollToBottom={true}
                header={
                    <SHeaderButton
                        key={'btn-' + canSkip}
                        title={canSkip ? 'Skip' : 'Next'}
                        onPress={handleSave}
                    />
                }
                floatContent={
                    <ZRoundedButton
                        title={canSkip ? 'Skip' : 'Next'}
                        size="large"
                        onPress={handleSave}
                    />
                }
            >
                <View marginTop={16} marginBottom={100}>
                    <ZInput
                        placeholder="Name"
                        autoFocus={true}
                        description="Please, provide organization name and optional logo"
                        field={nameField}
                    />
                </View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const SignupOrg = withApp(SignupOrgComponent, {
    navigationAppearance: 'small',
    hideHairline: true,
});
