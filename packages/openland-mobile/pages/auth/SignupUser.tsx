import * as React from 'react';
import { StyleSheet, TextStyle, Platform, Button, View, Text, Alert } from 'react-native';
import { ZTextInput } from '../../components/ZTextInput';
import { ActionButtonAndroid } from 'react-native-s/navigation/buttons/ActionButtonAndroid';
import { ActionButtonIOS } from 'react-native-s/navigation/buttons/ActionButtonIOS';
import { ProfileCreateMutation } from 'openland-api';
import { withApp } from '../../components/withApp';
import { PageProps } from '../../components/PageProps';
import { SHeader } from 'react-native-s/SHeader';
import { SHeaderButton } from 'react-native-s/SHeaderButton';
import { ZForm } from '../../components/ZForm';
import { YMutation } from 'openland-y-graphql/YMutation';
import { next } from './signup';
import { XPStyles } from 'openland-xp/XPStyles';
import { ZAvatarPicker } from '../../components/ZAvatarPicker';

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

export const HeaderButton = (props: { title: string, handlePress: () => void }) => {
    if (Platform.OS === 'android') {
        return (
            <ActionButtonAndroid title={props.title} onPress={props.handlePress} tintColor={XPStyles.colors.brand} />
        );
    } else if (Platform.OS === 'ios') {
        return (
            <ActionButtonIOS title={props.title} tintColor={XPStyles.colors.brand} onPress={props.handlePress} />
        );
    }
    return (<Button color="#000" onPress={props.handlePress} title={props.title} />);
};
class SignupUserComponent extends React.PureComponent<PageProps> {

    private ref = React.createRef<ZForm>();

    render() {
        return (
            <>
                <SHeader title="Full name" />
                <SHeaderButton title="Next" onPress={() => this.ref.current!.submitForm()} />

                <YMutation mutation={ProfileCreateMutation}>
                    {create => (
                        <ZForm
                            ref={this.ref}
                            defaultData={{ input: { firstName: '' } }}
                            action={async (src) => {
                                // await delay(1000);
                                if (!src.input.firstName) {
                                    Alert.alert('Name can\'t be empty');
                                    return;
                                }
                                await create({ variables: { input: { firstName: src.input.firstName, lastName: src.input.lastName } } });
                                await next(this.props.router);
                            }}
                        >
                            <View alignSelf="center" marginTop={30} marginBottom={10}>
                                <ZAvatarPicker field="input.photoRef" />
                            </View>
                            <ZTextInput
                                field="input.firstName"
                                placeholder="First name"
                                style={signupStyles.input}
                                width="100%"
                            />
                            <ZTextInput
                                field="input.lastName"
                                placeholder="Last name"
                                style={signupStyles.input}
                                width="100%"
                            />

                            <Text style={styles.hint}>
                                Please, provide your name. This information is part of your public profile.
                            </Text>
                        </ZForm>
                    )}
                </YMutation>
            </>
        );
    }
}

export const SignupUser = withApp(SignupUserComponent);