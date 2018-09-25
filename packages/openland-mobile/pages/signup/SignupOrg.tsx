import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Platform, Button } from 'react-native';
import { ZTextInput } from '../../components/ZTextInput';
import { SSafeAreaView } from 'react-native-s/SSafeArea';
import { ActionButtonAndroid } from 'react-native-s/navigation/buttons/ActionButtonAndroid';
import { ActionButtonIOS } from 'react-native-s/navigation/buttons/ActionButtonIOS';
import { ZLoader } from '../../components/ZLoader';
import { getClient } from '../../utils/apolloClient';
import { CreateOrganizationMutation } from 'openland-api';

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

export class SignupOrg extends React.PureComponent<{ onComplete: () => void }, { name: string, loading: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { name: '', loading: false };
    }

    nameChange = (name: string) => {
        this.setState({ name: name });
    }

    onComplete = () => {
        (async () => {
            this.setState({ loading: true });
            try {
                await getClient().client.mutate<any>({
                    mutation: CreateOrganizationMutation.document,
                    variables: { input: { name: this.state.name, personal: false } }
                });
                this.props.onComplete();

            } catch (e) {
                console.log(e);
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
                    <Text style={styles.title}>Create organziation</Text>
                    <ZTextInput placeholder="Name" style={styles.input} value={this.state.name} onChangeText={this.nameChange} width="100%" />
                </SSafeAreaView>
            </View>
        );
    }
}