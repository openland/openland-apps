import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { KeyboardSafeAreaView } from 'react-native-async-view/ASSafeAreaView';
import LoaderSpinner from 'openland-mobile/components/LoaderSpinner';

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        left: 0,
        top: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    } as ViewStyle,
});

export const ZLoader = React.memo(() => (
    <View style={styles.container}>
        <KeyboardSafeAreaView >
            <LoaderSpinner size={'large'} />
        </KeyboardSafeAreaView>
    </View>
));