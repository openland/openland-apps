import React from 'react';
import {
    View,
    StyleSheet,
    ViewStyle,
    TextStyle,
    Text,
    Image,
    ImageSourcePropType,
} from 'react-native';
import { showBlanketModal } from './showBlanketModal';
import { ZModalController } from './ZModal';
import { LoaderSpinner } from './LoaderSpinner';
import { RadiusStyles } from 'openland-mobile/styles/AppStyles';

const styles = StyleSheet.create({
    modalWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    toastContainer: {
        paddingVertical: 25,
        paddingHorizontal: 30,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F0F2F5',
        borderRadius: RadiusStyles.Large,
    } as ViewStyle,
    toastContainerWithoutText: {
        paddingHorizontal: 32,
        paddingVertical: 32,
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
    toastIconWrapper: {
        marginBottom: 5,
    } as ViewStyle,
});

type ToastBuildConfig = {
    text?: string;
    iconSource?: ImageSourcePropType;
    IconComponent?: () => React.ReactElement;
    duration?: number;
    textStyle?: TextStyle;
};

const ToastComponent = ({ text, iconSource, IconComponent, textStyle }: ToastBuildConfig) => {
    const textIndent = !!(iconSource || IconComponent) && { marginTop: 8 };
    const toastContainerStyle = !text && styles.toastContainerWithoutText;

    return (
        <View style={styles.modalWrapper}>
            <View style={[styles.toastContainer, toastContainerStyle]}>
                <View style={styles.toast}>
                    {iconSource && <Image source={iconSource} />}
                    {IconComponent && IconComponent()}

                    {text && <Text style={[styles.toastText, textIndent, textStyle]}>{text}</Text>}
                </View>
            </View>
        </View>
    );
};

function build(config: ToastBuildConfig) {
    let modal: ZModalController;

    const show = () =>
        showBlanketModal(
            ctx => {
                modal = ctx;

                return <ToastComponent {...config} />;
            },
            { 
                withoutWrapper: true,
                overlayStyle: { backgroundColor: 'transparent' }
            },
        );

    const hide = () => {
        setTimeout(() => modal && modal.hide(), 1);
    };

    if (config.duration) {
        setTimeout(hide, config.duration);
    }

    return { show, hide };
}

function loader() {
    return build({ IconComponent: () => <LoaderSpinner size="large" /> });
}

function success(config: ToastBuildConfig = {}) {
    return build({
        iconSource: require('assets/ic-done-32.png'),
        ...config,
    });
}

function failure(config: ToastBuildConfig = {}) {
    return build({
        iconSource: require('assets/ic-error-32.png'),
        ...config,
    });
}

function showCopiedLink() {
    success({ text: 'Link copied', duration: 1000 }).show();
}

const handle = async (
    fn: Function,
    config: { success?: ToastBuildConfig; failure?: ToastBuildConfig } = {},
) => {
    const toastLoader = build({ IconComponent: () => <LoaderSpinner size="large" /> });

    try {
        toastLoader.show();

        await fn();

        toastLoader.hide();
        success({ duration: 1000, ...config.success }).show();
    } catch (err) {
        toastLoader.hide();
        failure({ duration: 1000, ...config.failure }).show();
    }
};

export default { build, loader, success, failure, showCopiedLink, handle };
