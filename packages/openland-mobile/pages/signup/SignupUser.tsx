import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Platform, Button, Alert, Image } from 'react-native';
import { ZTextInput } from '../../components/ZTextInput';
import { SSafeAreaView } from 'react-native-s/SSafeArea';
import { ActionButtonAndroid } from 'react-native-s/navigation/buttons/ActionButtonAndroid';
import { ActionButtonIOS } from 'react-native-s/navigation/buttons/ActionButtonIOS';
import { ZLoader } from '../../components/ZLoader';
import { getClient } from '../../utils/apolloClient';
import { ProfileCreateMutation } from 'openland-api';

export const signupStyles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        paddingLeft: 20,
        paddingRight: 15,
        alignItems: 'center',
        justifyContent: 'flex-start',
    } as ViewStyle,
    logo: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        marginTop: 10,
        alignItems: 'center',
    } as ViewStyle,
    title: {
        fontWeight: '600',
        color: '#000',
        fontSize: 28,
        height: 28,
        lineHeight: 28,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginTop: 22,
        marginBottom: 32,
    } as TextStyle,
    input: {
        fontWeight: '300',
        color: '#000',
        fontSize: 18,
        height: 52,
        lineHeight: 52,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 15,
        borderBottomColor: '#e0e3e7',
        borderBottomWidth: 0.5

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

export class SignupUser extends React.PureComponent<{ onComplete: () => void }, { firstName: string, lastName: string, loading: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { firstName: '', lastName: '', loading: false };
    }

    nameChange = (name: string) => {
        this.setState({ firstName: name });
    }

    lastNameChange = (name: string) => {
        this.setState({ lastName: name });
    }

    onComplete = () => {
        (async () => {
            this.setState({ loading: true });
            try {
                await getClient().client.mutate<any>({
                    mutation: ProfileCreateMutation.document,
                    variables: { input: { firstName: this.state.firstName, lastName: this.state.lastName } }
                });
                this.props.onComplete();

            } catch (e) {
                Alert.alert('Error', e.message);
                this.setState({ loading: false });
            }

        })();
    }

    render() {
        if (this.state.loading) {
            return <ZLoader appearance="large" />;
        }
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flexDirection: 'column', marginTop: 42, alignContent: 'flex-start' }}>
                <SSafeAreaView style={signupStyles.container} >
                    <View style={signupStyles.logo}><Image source={require('assets/logo.png')} style={{ width: 38, height: 24 }} /></View>
                    <View flexDirection="row" alignSelf="flex-end" >
                        <HeaderButton title="Next" handlePress={this.onComplete} />
                    </View>
                    <Text style={signupStyles.title}>Your full name</Text>
                    <ZTextInput placeholder="First name" style={signupStyles.input} value={this.state.firstName} onChangeText={this.nameChange} width="100%" />
                    <ZTextInput placeholder="Last name" style={signupStyles.input} value={this.state.lastName} onChangeText={this.lastNameChange} width="100%" />
                </SSafeAreaView>
            </View>
        );
    }
}