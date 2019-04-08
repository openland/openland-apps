import * as React from 'react';
import { StyleSheet, TextStyle, View, Text } from 'react-native';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZForm } from '../../components/ZForm';
import { next } from './signup';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';
import { Alert } from 'openland-mobile/components/AlertBlanket';
import { getClient } from 'openland-mobile/utils/apolloClient';
import { SilentError } from 'openland-y-forms/errorHandling';
import { XMemo } from 'openland-y-utils/XMemo';
import { ZTextInput } from 'openland-mobile/components/ZTextInput';
import { ZListItemGroup } from 'openland-mobile/components/ZListItemGroup';
import { ZTrack } from 'openland-mobile/analytics/ZTrack';

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

const styles = StyleSheet.create({
    hint: {
        paddingHorizontal: 16,
        fontSize: 13,
        lineHeight: 17,
        fontWeight: '300',
        color: '#666666',
        opacity: 0.8
    } as TextStyle
});

const SignupUserContent = XMemo<PageProps>((props) => {
    let prefill = getClient().useProfilePrefill().prefill;
    let ref = React.useRef<ZForm | null>(null);

    return (
        <>
            <SHeaderButton title="Next" onPress={() => ref.current && ref.current.submitForm()} />
            <ZForm
                ref={ref}
                defaultData={{
                    input: {
                        firstName: prefill && prefill.firstName || '',
                        lastName: prefill && prefill.firstName || undefined,

                    }
                }}
                action={async (src) => {
                    // await delay(1000);
                    if (!src.input.firstName) {
                        Alert.builder().title('Please enter your name').button('GOT IT!').show();
                        throw new SilentError();
                    }
                    await getClient().mutateProfileCreate({ input: { firstName: src.input.firstName, lastName: src.input.lastName } });
                    await getClient().refetchAccount();
                    await next(props.router);
                }}
            >
                <View alignSelf="center" marginTop={30} marginBottom={10}>
                    <ZAvatarPicker field="input.photoRef" initialUrl={prefill && prefill.picture || undefined} />
                </View>
                <ZListItemGroup
                    divider={false}
                    footer="Please, provide your name. This information is part of your public profile."
                >
                    <ZTextInput
                        field="input.firstName"
                        placeholder="First name"
                    />
                    <ZTextInput
                        field="input.lastName"
                        placeholder="Last name"
                    />
                </ZListItemGroup>
            </ZForm>
        </>
    )
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