import * as React from 'react';
import { View, Text, Linking } from 'react-native';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { next } from './signup';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { RegistrationContainer } from './RegistrationContainer';
import { ZButton } from 'openland-mobile/components/ZButton';
import { logout } from 'openland-mobile/utils/logout';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZShaker } from 'openland-mobile/components/ZShaker';

const PrivacyText = React.memo(() => {
    const theme = React.useContext(ThemeContext);

    return (
        <View
            padding={16}
            alignItems="center"
            alignSelf="center"
            justifyContent="center"
            maxWidth={310}
        >
            <Text
                allowFontScaling={false}
                style={{
                    ...TextStyles.Caption,
                    textAlign: 'center',
                    color: theme.foregroundTertiary,
                }}
            >
                By creating an account you are accepting our{' '}
                <Text
                    style={{ ...TextStyles.Label3 }}
                    onPress={() => Linking.openURL('https://openland.com/terms')}
                >
                    Terms of service
                </Text>{' '}
                and{' '}
                <Text
                    style={{ ...TextStyles.Label3 }}
                    onPress={() => Linking.openURL('https://openland.com/privacy')}
                >
                    Privacy policy
                </Text>
            </Text>
        </View>
    );
});

const SignupUserComponent = React.memo((props: PageProps) => {
    const ref = React.useRef<{ shake: () => void }>(null);
    const prefill = getClient().useProfilePrefill().prefill;
    const form = useForm({ disableAppLoader: true });
    const photoField = useField('photoRef', null, form);
    const firstNameField = useField('firstName', (prefill && prefill.firstName) || '', form);
    const lastNameField = useField('lastName', (prefill && prefill.lastName) || '', form);

    const handleSave = () => {
        if (!firstNameField.value.trim()) {
            if (ref && ref.current) {
                ref.current.shake();
            }
            return;
        }

        form.doAction(async () => {
            await getClient().mutateProfileCreate({
                input: {
                    firstName: firstNameField.value.trim(),
                    lastName: lastNameField.value.trim(),
                },
            });
            await getClient().refetchAccount();
            await next(props.router);
        });
    };

    return (
        <ZTrack event="signup_profile_view">
            <RegistrationContainer
                title="New account"
                subtitle="Introduce yourself"
                autoScrollToBottom={true}
                floatContent={
                    <ZButton
                        title="Next"
                        size="large"
                        onPress={handleSave}
                        loading={form.loading}
                    />
                }
            >
                <View flexDirection="row" justifyContent="center">
                    <ZAvatarPicker
                        field={photoField}
                        initialUrl={(prefill && prefill.picture) || undefined}
                        size="xx-large"
                    />
                </View>
                <View marginTop={16}>
                    <ZShaker ref={ref}>
                        <ZInput field={firstNameField} placeholder="First name" />
                    </ZShaker>
                    <ZInput
                        field={lastNameField}
                        placeholder="Last name"
                        description="Please, provide your name. This information is part of your public profile."
                    />
                    <PrivacyText />
                </View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const SignupUser = withApp(SignupUserComponent, {
    navigationAppearance: 'small-hidden',
    backButtonRootFallback: logout,
});
