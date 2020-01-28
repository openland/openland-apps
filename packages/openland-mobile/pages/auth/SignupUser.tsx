import * as React from 'react';
import { View, Animated, Text, Easing } from 'react-native';
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
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const SignupUserComponent = React.memo((props: PageProps) => {
    const [errorText, setErrorText] = React.useState('');
    const [shakeAnimation] = React.useState(new Animated.Value(0));
    const theme = React.useContext(ThemeContext);
    const prefill = getClient().useProfilePrefill().prefill;
    const form = useForm();
    const photoField = useField('photoRef', null, form);
    const firstNameField = useField('firstName', (prefill && prefill.firstName) || '', form);
    const lastNameField = useField('lastName', (prefill && prefill.lastName) || '', form);

    const handleSave = () => {
        if (!firstNameField.value.trim()) {
            setErrorText('Please enter your name');
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
                title="What’s your name?"
                subtitle="Help others recognize you"
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
                <View marginTop={16} marginBottom={100}>
                    <Animated.View
                        paddingHorizontal={16}
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
                            field={firstNameField}
                            placeholder="First name"
                            noWrapper={true}
                            invalid={!!errorText}
                        />
                    </Animated.View>
                    {!!errorText && (
                        <View paddingHorizontal={32} paddingTop={8}>
                            <Text
                                style={[TextStyles.Caption, { color: theme.accentNegative }]}
                                allowFontScaling={false}
                            >
                                {errorText}
                            </Text>
                        </View>
                    )}
                    <View marginTop={16}>
                        <ZInput
                            field={lastNameField}
                            placeholder="Last name"
                            description="Please, provide your name. This information is part of your public profile."
                        />
                    </View>
                </View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const SignupUser = withApp(SignupUserComponent, {
    navigationAppearance: 'small',
    hideHairline: true,
    backButtonRootFallback: logout,
});
