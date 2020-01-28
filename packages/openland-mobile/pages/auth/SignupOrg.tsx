import * as React from 'react';
import { View, Animated, Text, Easing } from 'react-native';
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
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const SignupOrgComponent = React.memo((props: PageProps) => {
    const [errorText, setErrorText] = React.useState('');
    const [shakeAnimation] = React.useState(new Animated.Value(0));
    const theme = React.useContext(ThemeContext);
    const form = useForm();
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
            setErrorText('Please enter organization name');
            shakeAnimation.setValue(0);
            Animated.timing(shakeAnimation, {
                duration: 400,
                toValue: 3,
                easing: Easing.bounce,
                useNativeDriver: true,
            }).start();

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
                <Animated.View
                    paddingHorizontal={16}
                    marginTop={16}
                    style={{
                        transform: [
                            {
                                translateX: shakeAnimation.interpolate({
                                    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                                    outputRange: [0, -15, 0, 15, 0, -15, 0],
                                }),
                            },
                        ],
                    }}
                >
                    <ZInput
                        placeholder="Name"
                        autoFocus={true}
                        description="Please, provide organization name"
                        field={nameField}
                        noWrapper={true}
                        invalid={!!errorText}
                    />
                </Animated.View>
                {!!errorText && (
                    <View paddingHorizontal={32} paddingTop={8} marginBottom={120}>
                        <Text
                            style={[TextStyles.Caption, { color: theme.accentNegative }]}
                            allowFontScaling={false}
                        >
                            {errorText}
                        </Text>
                    </View>
                )}
            </RegistrationContainer>
        </ZTrack>
    );
});

export const SignupOrg = withApp(SignupOrgComponent, {
    navigationAppearance: 'small',
    hideHairline: true,
    backButtonRootFallback: logout,
});
