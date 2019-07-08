import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text } from 'react-native';
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
        fontWeight: 'bold',
        textAlign: 'center',
        lineHeight: 20,
        letterSpacing: -0.24
    } as TextStyle
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

export const showUnknowError = (duration = 2000) => {
    showToastModal(
        <>
            <Text style={styles.toastText}>
                Unknow error
            </Text>
        </>
        ,
        duration
    );
}

export const showLinkCopied = (duration = 2000) => {
    showToastModal(
        <>
            <Text style={styles.toastText}>
                Link copied
            </Text>
        </>,
        duration
    );
}
