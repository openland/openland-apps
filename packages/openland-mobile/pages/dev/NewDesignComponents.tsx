import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Button } from 'react-native';
import { withApp } from 'openland-mobile/components/withApp';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import LoaderSpinner from 'openland-mobile/components/LoaderSpinner';
import { Alert, AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import Toast from 'openland-mobile/components/Toast';
import { delay } from 'openland-y-utils/timer';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    } as ViewStyle,
    content: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center'
    } as ViewStyle,
    headerText: {
        padding: 20,
        fontSize: 20,
        textAlign: 'center'
    } as TextStyle
});

const showProcessing = () => {
    Toast.handle(
        async () => {
            await delay(1000);
            throw new Error();

        },
        { success: { text: 'Error load data' } }
    );
};

export default withApp(() => {
    return (
        <>
            <SHeader title="New design components" />
            <View style={styles.container}>
                <SScrollView>
                    <Text style={styles.headerText}>
                        Loader Spinner
                    </Text>
                    <View>
                        <View style={styles.content}>
                            <LoaderSpinner />
                        </View>

                        <View style={styles.content}>
                            <LoaderSpinner size={'small'} />
                        </View>
                    </View>
                    <Text style={styles.headerText}>
                        Toast processing
                    </Text>
                    <View>
                        <View style={styles.content}>
                            <Button
                                title={'Show processing'}
                                onPress={() => showProcessing()}
                            />
                        </View>
                    </View>
                    <Text style={styles.headerText}>
                        Toast notifications design
                    </Text>
                    <View style={styles.content}>
                        <Button
                            title={'Show unknow Error'}
                            onPress={() => {
                                Toast.failure({ text: 'Unknown error', duration: 1000 }).show();
                            }}
                        />
                        <Button
                            title={'Show link copiend'}
                            onPress={() => {
                                Toast
                                    .build({
                                        text: 'Link copiend',
                                        iconSource: require('assets/ic-toast-checkmark-32.png'),
                                        duration: 1000
                                    })
                                    .show();
                            }}
                        />
                    </View>
                </SScrollView>
            </View>
        </>
    );
});