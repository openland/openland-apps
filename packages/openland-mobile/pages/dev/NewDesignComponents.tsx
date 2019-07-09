import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Button } from 'react-native';
import { withApp } from 'openland-mobile/components/withApp';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { SHeader } from 'react-native-s/SHeader';
import { SScrollView } from 'react-native-s/SScrollView';
import LoaderSpinner from 'openland-mobile/components/LoaderSpinner';
import { Alert, AlertBlanketBuilder } from 'openland-mobile/components/AlertBlanket';
import { showToastLinkCopied, showToastUnknowError } from 'openland-mobile/components/Toast';

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
                        Global Loader
                    </Text>
                    <View>
                        <View style={styles.content}>
                            <Button 
                                title={'Show new global loader'}
                                onPress={() => {
                                    startLoader(true);
                                    setTimeout(() => stopLoader(), 2000);
                                }}
                            />
                        </View>
                    </View>
                    <Text style={styles.headerText}>
                        Toast notifications design
                    </Text>
                    <View style={styles.content}>
                        <Button 
                            title={'Show unknow Error'}
                            onPress={() => showToastUnknowError()}
                        />
                        <Button 
                            title={'Show link copiend'}
                            onPress={() => showToastLinkCopied()}
                        />
                    </View>
                </SScrollView>
            </View>
        </>
    );
});