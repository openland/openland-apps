import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Image, ImageStyle } from 'react-native';
import { showBlanketModal } from './showBlanketModal';

const styles = StyleSheet.create({
    modalWrapper: { 
        justifyContent: 'center', 
        alignItems: 'center' 
    } as ViewStyle,
    toastContainer: {
        paddingVertical: 20,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        borderRadius: 18
    } as ViewStyle,
    toastText: {
        color: '#78808F',
        fontSize: 15,
        fontWeight: '600',
        textAlign: 'center',
        lineHeight: 20,
    } as TextStyle,
    toast: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    toastIcon: {
        marginBottom: 5
    } as ImageStyle
});

export const showToastModal = (content: React.ReactElement, duration: number) => {
    showBlanketModal(ctx => {
        setTimeout(() => ctx.hide(), duration);

        return (
            <View style={styles.modalWrapper}>
                <View style={styles.toastContainer}>
                    {content}
                </View>
            </View>
        )
    }, false, true);
}

export const showToastUnknowError = (duration = 2000) => {
    showToastModal(
        <View style={styles.toast}>
            <View style={styles.toastIcon}>
                <Image source={require('assets/ic-toast-attention-32.png')} />
            </View>
            <Text style={styles.toastText}>
                Unknown error
            </Text>
        </View>,
        duration
    );
}

export const showToastLinkCopied = (duration = 2000) => {
    showToastModal(
        <View style={styles.toast}>
            <View style={styles.toastIcon}>
                <Image source={require('assets/ic-toast-checkmark-32.png')} />
            </View>
            <Text style={styles.toastText}>
                Link copied
            </Text>
        </View>,
        duration
    );
}
