import * as React from 'react';
import { Platform, View } from 'react-native';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { next } from './signup';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { RegistrationContainer } from './RegistrationContainer';
import { ZRoundedButton } from 'openland-mobile/components/ZRoundedButton';

const SignupUserComponent = React.memo((props: PageProps) => {
    const prefill = getClient().useProfilePrefill().prefill;
    const form = useForm();
    const photoField = useField('photoRef', null, form);
    const firstNameField = useField('firstName', (prefill && prefill.firstName) || '', form);
    const lastNameField = useField('lastName', (prefill && prefill.lastName) || '', form);

    const handleSave = () => {
        if (firstNameField.value === '') {
            Alert.builder()
                .title('Please enter your name')
                .button('GOT IT!')
                .show();
            return;
        }

        form.doAction(async () => {
            await getClient().mutateProfileCreate({
                input: {
                    firstName: firstNameField.value,
                    lastName: lastNameField.value,
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
                floatContent={<ZRoundedButton title="Next" size="large" onPress={handleSave} />}
                scalableContent={
                    <ZAvatarPicker
                        field={photoField}
                        initialUrl={(prefill && prefill.picture) || undefined}
                        size="xx-large"
                    />
                }
            >
                <View marginTop={16} marginBottom={100}>
                    <ZInput field={firstNameField} placeholder="First name" />
                    <ZInput
                        field={lastNameField}
                        placeholder="Last name"
                        description="Please, provide your name. This information is part of your public profile."
                    />
                </View>
            </RegistrationContainer>
        </ZTrack>
    );
});

export const SignupUser = withApp(SignupUserComponent, {
    navigationAppearance: Platform.OS === 'ios' ? 'small' : undefined,
});
