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
import { ZButton } from 'openland-mobile/components/ZButton';
import { logout } from 'openland-mobile/utils/logout';
import { ZShaker } from 'openland-mobile/components/ZShaker';

const SignupOrgComponent = React.memo((props: PageProps) => {
    const ref = React.useRef<{ shake: () => void }>(null);
    const form = useForm({ disableAppLoader: true });
    const nameField = useField('name', '', form);

    const endSaving = async () => {
        const client = getClient();

        await client.refetchAccount();
        await client.refetchAccountSettings();

        if (props.router.params.action) {
            await props.router.params.action(props.router);
        }
    };

    const handleSkip = async () => {
        const client = getClient();
        await client.mutateCreateOrganization({
            input: {
                name: getMessenger().engine.user.name,
                personal: false,
                isCommunity: false,
            },
        });
        await endSaving();
    };

    const handleSave = () => {
        if (!nameField.value.trim()) {
            if (ref && ref.current) {
                ref.current.shake();
            }
            return;
        }
        form.doAction(async () => {
            const client = getClient();

            await client.mutateCreateOrganization({
                input: {
                    name: nameField.value.trim(),
                    personal: false,
                    isCommunity: false,
                },
            });
            await endSaving();
        });
    };

    return (
        <ZTrack event="signup_org_view">
            <RegistrationContainer
                title="Where do you work?"
                subtitle="Give others a bit of context about you"
                autoScrollToBottom={true}
                header={<SHeaderButton key="btn-create-org" title="Skip" onPress={handleSkip} />}
                floatContent={
                    <ZButton
                        title="Next"
                        size="large"
                        onPress={handleSave}
                        loading={form.loading}
                    />
                }
            >
                <View marginTop={16}>
                    <ZShaker ref={ref}>
                        <ZInput
                            placeholder="Organization name"
                            autoFocus={true}
                            description="Please, provide organization name"
                            field={nameField}
                        />
                    </ZShaker>
                </View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const SignupOrg = withApp(SignupOrgComponent, {
    navigationAppearance: 'small-hidden',
    backButtonRootFallback: logout,
});
