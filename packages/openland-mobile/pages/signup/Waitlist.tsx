import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Platform, Button, AsyncStorage } from 'react-native';
import { SSafeAreaView } from 'react-native-s/SSafeArea';
import { AppUpdateTracker } from '../../utils/UpdateTracker';
import { signupStyles } from './SignupUser';

export class Waitlist extends React.PureComponent {

    handleLogout = () => {
        (async () => {
            AsyncStorage.clear();
            AppUpdateTracker.restartApp();
        })();
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', marginTop: 42, alignContent: 'flex-start' }}>
                <SSafeAreaView style={signupStyles.container} >
                    <Text style={signupStyles.title}>You have joined the waitlist</Text>
                    <Text style={signupStyles.title} onPress={this.handleLogout}>Logout</Text>
                </SSafeAreaView>
            </View>
        );
    }
}