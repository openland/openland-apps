import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Platform, Button, Alert } from 'react-native';
import { ZTextInput } from '../../components/ZTextInput';
import { SSafeAreaView } from 'react-native-s/SSafeArea';
import { ActionButtonAndroid } from 'react-native-s/navigation/buttons/ActionButtonAndroid';
import { ActionButtonIOS } from 'react-native-s/navigation/buttons/ActionButtonIOS';
import { ZLoader } from '../../components/ZLoader';
import { getClient } from '../../utils/apolloClient';
import { ProfileCreateMutation } from 'openland-api';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        flex: 1,
        // backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'flex-start',
    } as ViewStyle,
    title: {
        fontWeight: '500',
        color: '#000',
        fontSize: 22,
        height: 26,
        lineHeight: 26,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 20
    } as TextStyle,
    input: {
        fontWeight: '500',
        color: '#000',
        fontSize: 22,
        height: 26,
        lineHeight: 26,
        textAlign: 'left',
        alignSelf: 'flex-start',
        marginBottom: 20

    } as TextStyle,
});

const HeaderButton = (props: { title: string, handlePress: () => void }) => {
    if (Platform.OS === 'android') {
        return (
            <ActionButtonAndroid title={props.title} onPress={props.handlePress} tintColor="#000" />
        );
    } else if (Platform.OS === 'ios') {
        return (
            <ActionButtonIOS title={props.title} tintColor="#000" onPress={props.handlePress} />
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
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flexDirection: 'column', margin: 20, marginTop: 102, alignContent: 'flex-start' }}>
                <SSafeAreaView style={styles.container} >
                    <HeaderButton title="Next" handlePress={this.onComplete} />
                    <Text style={styles.title}>Your full name</Text>
                    <ZTextInput placeholder="First name" style={styles.input} value={this.state.firstName} onChangeText={this.nameChange} width="100%" />
                    <ZTextInput placeholder="Last name" style={styles.input} value={this.state.lastName} onChangeText={this.lastNameChange} width="100%" />
                </SSafeAreaView>
            </View>
        );
    }
}