import React from 'react';
import { View, StyleSheet, ViewStyle, TextStyle, Text, Image, ImageStyle, ImageSourcePropType } from 'react-native';
import { showBlanketModal } from './showBlanketModal';
import { ZModalController } from './ZModal';
import LoaderSpinner from './LoaderSpinner';

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
    } as ViewStyle,
    toastIcon: {
        marginBottom: 5
    } as ImageStyle
});

type ToastBuildConfig = {
    text?: string;
    iconSource?: ImageSourcePropType;
    IconComponent?: () => React.ReactElement;
    duration?: number;
}

const ToastComponent = ({ text, iconSource, IconComponent }: ToastBuildConfig) => (
    <View style={styles.modalWrapper}>
        <View style={styles.toastContainer}>
            <View style={styles.toast}>
                {iconSource && (
                    <View style={styles.toastIcon}>
                        <Image source={iconSource} />
                    </View>
                )}
                {IconComponent && (
                    <View style={styles.toastIcon}>
                        {IconComponent()}
                    </View>
                )}

                {text && (
                    <Text style={styles.toastText}>
                        {text}
                    </Text>
                )}
            </View>
        </View>
    </View>
);

export function build(config: ToastBuildConfig) {
    let modal: ZModalController;

    const show = () => showBlanketModal(ctx => {
        modal = ctx;

        if (config.duration) {
            setTimeout(() => modal.hide(), config.duration);
        }

        return <ToastComponent {...config} />;
    }, false, true);

    const hide = () => modal && modal.hide();

    return { show, hide };
}

export function loader(config: ToastBuildConfig = {}) {
    return build({
        IconComponent: () => <LoaderSpinner />,
        ...config
    });
}

export function success(config: ToastBuildConfig = {}) {
    return build({
        iconSource: require('assets/ic-toast-checkmark-32.png'),
        ...config
    });
}

export function failure(config: ToastBuildConfig = {}) {
    return build({
        iconSource: require('assets/ic-toast-attention-32.png'),
        ...config
    });
}

export default { build, loader, success, failure };