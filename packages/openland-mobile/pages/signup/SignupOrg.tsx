import * as React from 'react';
import { View, Text, Alert, Image } from 'react-native';
import { ZTextInput } from '../../components/ZTextInput';
import { SSafeAreaView } from 'react-native-s/SSafeArea';
import { ZLoader } from '../../components/ZLoader';
import { getClient } from '../../utils/apolloClient';
import { CreateOrganizationMutation } from 'openland-api';
import { HeaderButton, signupStyles } from './SignupUser';

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
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', marginTop: 42, alignContent: 'flex-start' }}>
                <SSafeAreaView style={signupStyles.container} >
                    <View style={signupStyles.logo}><Image source={require('assets/logo.png')} style={{ width: 38, height: 24 }} /></View>
                    <View flexDirection="row" alignSelf="flex-end" >
                        <HeaderButton title="Next" handlePress={this.onComplete} />
                    </View>
                    <Text style={signupStyles.title}>Create organziation</Text>
                    <ZTextInput placeholder="Name" style={signupStyles.input} value={this.state.name} onChangeText={this.nameChange} width="100%" />
                </SSafeAreaView>
            </View>
        );
    }
}