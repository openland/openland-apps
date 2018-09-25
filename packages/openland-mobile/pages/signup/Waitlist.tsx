import * as React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Platform, Button, AsyncStorage } from 'react-native';
import { SSafeAreaView } from 'react-native-s/SSafeArea';
import { ZLoader } from '../../components/ZLoader';
import { AppUpdateTracker } from '../../utils/UpdateTracker';

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

export class Waitlist extends React.PureComponent {

    handleLogout = () => {
        (async () => {
            AsyncStorage.clear();
            AppUpdateTracker.restartApp();
        })();
    }

    render() {
        return (
            <View style={{ backgroundColor: '#fff', width: '100%', height: '100%', flexDirection: 'column', margin: 20, marginTop: 102, alignContent: 'flex-start' }}>
                <SSafeAreaView style={styles.container} >
                    <Text style={styles.title}>You have joined the waitlist</Text>
                    <Text style={styles.title} onPress={this.handleLogout}>Logout</Text>
                </SSafeAreaView>
            </View>
        );
    }
}