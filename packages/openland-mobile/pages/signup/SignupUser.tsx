import * as React from 'react';
import { StyleSheet, TextStyle, Platform, Button, View } from 'react-native';
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

export const signupStyles = StyleSheet.create({
    input: {
        fontWeight: '300',
        color: '#000',
        fontSize: 18,
        height: 52,
        lineHeight: 18,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 15,
        borderBottomColor: '#e0e3e7',
        borderBottomWidth: 0.5,
        marginLeft: 17

    } as TextStyle,
});

export const HeaderButton = (props: { title: string, handlePress: () => void }) => {
    if (Platform.OS === 'android') {
        return (
            <ActionButtonAndroid title={props.title} onPress={props.handlePress} tintColor="#4747ec" />
        );
    } else if (Platform.OS === 'ios') {
        return (
            <ActionButtonIOS title={props.title} tintColor="#4747ec" onPress={props.handlePress} />
        );
    }
    return (<Button color="#000" onPress={props.handlePress} title={props.title} />);
};
class SignupUserComponent extends React.PureComponent<PageProps> {

    private ref = React.createRef<ZForm>();

    render() {
        return (
            <>
                <SHeader title="Your full name" />
                <SHeaderButton title="Next" onPress={() => this.ref.current!.submitForm()} />
                <View style={{ marginTop: 23 }}>
                    <YMutation mutation={ProfileCreateMutation}>
                        {create => (
                            <ZForm
                                ref={this.ref}
                                defaultData={{ input: { firstName: '' } }}
                                action={async (src) => {
                                    // await delay(1000);
                                    await create({ variables: { input: { firstName: src.input.firstName, lastName: src.input.lastName } } });
                                    await next(this.props.router);
                                }}
                            >
                                <ZTextInput field="input.firstName" placeholder="First name" style={signupStyles.input} width="100%" />
                                <ZTextInput field="input.lastName" placeholder="Last name" style={signupStyles.input} width="100%" />
                            </ZForm>
                        )}
                    </YMutation>
                </View>
            </>
        );
    }
}

export const SignupUser = withApp(SignupUserComponent);