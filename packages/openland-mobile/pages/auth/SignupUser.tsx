import * as React from 'react';
import { StyleSheet, TextStyle } from 'react-native';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { next } from './signup';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import Alert from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZInput } from 'openland-mobile/components/ZInput';
import { ZListGroup } from 'openland-mobile/components/ZListGroup';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';
import { useField } from 'openland-form/useField';
import { useForm } from 'openland-form/useForm';
import { KeyboardAvoidingScrollView } from 'openland-mobile/components/KeyboardAvoidingScrollView';

export const signupStyles = StyleSheet.create({
    input: {
        fontWeight: '300',
        color: '#000',
        fontSize: 18,
        height: 48,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 8,
        borderBottomColor: '#e0e3e7',
        borderBottomWidth: 0.5,
        marginLeft: 16,
        paddingRight: 16
    } as TextStyle,
});

const SignupUserContent = XMemo<PageProps>((props) => {
    const prefill = getClient().useProfilePrefill().prefill;

    const form = useForm();
    const photoField = useField('photoRef', null, form);
    const firstNameField = useField('firstName', prefill && prefill.firstName || '', form);
    const lastNameField = useField('lastName', prefill && prefill.lastName || '', form);

    const handleSave = () => {
        if (firstNameField.value === '') {
            Alert.builder().title('Please enter your name').button('GOT IT!').show();
            return;
        }

        form.doAction(async () => {
            await getClient().mutateProfileCreate({
                input: {
                    firstName: firstNameField.value,
                    lastName: lastNameField.value
                }
            });
            await getClient().refetchAccount();
            await next(props.router);
        });
    };

    return (
        <>
            <SHeaderButton title="Next" onPress={handleSave} />
            <KeyboardAvoidingScrollView>
                <ZListGroup header={null} alignItems="center">
                    <ZAvatarPicker field={photoField} initialUrl={prefill && prefill.picture || undefined} size="xx-large" />
                </ZListGroup>
                <ZListGroup header={null}>
                    <ZInput
                        field={firstNameField}
                        placeholder="First name"
                    />
                    <ZInput
                        field={lastNameField}
                        placeholder="Last name"
                        description="Please, provide your name. This information is part of your public profile."
                    />
                </ZListGroup>
            </KeyboardAvoidingScrollView>
        </>
    );
});

class SignupUserComponent extends React.PureComponent<PageProps> {

    render() {
        return (
            <ZTrack event="signup_profile_view">
                <SHeader title="Full name" />
                <SignupUserContent {...this.props} />
            </ZTrack>
        );
    }
}

export const SignupUser = withApp(SignupUserComponent);