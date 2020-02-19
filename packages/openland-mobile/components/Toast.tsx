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
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

const styles = StyleSheet.create({
    modalWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
    } as ViewStyle,
    toastContainer: {
        paddingVertical: 16,
        paddingHorizontal: 24,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: RadiusStyles.Large,
    } as ViewStyle,
    toastContainerWithoutText: {
        paddingHorizontal: 32,
        paddingVertical: 32,
    } as ViewStyle,
    toastText: {
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
        marginBottom: 4,
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
    const theme = React.useContext(ThemeContext);
    const textIndent = !!(iconSource || IconComponent) && { marginTop: 8 };
    const toastContainerStyle = !text && styles.toastContainerWithoutText;

    return (
        <View style={styles.modalWrapper}>
            <View style={[styles.toastContainer, toastContainerStyle, { backgroundColor: theme.overlayHeavy, }]}>
                <View style={styles.toast}>
                    {iconSource && <Image source={iconSource} />}
                    {IconComponent && IconComponent()}

                    {text && <Text style={[styles.toastText, textIndent, textStyle, { color: theme.foregroundContrast }]}>{text}</Text>}
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
                overlayStyle: { backgroundColor: 'transparent' },
                cancelable: false
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
    return build({ IconComponent: () => <LoaderSpinner size="large" color="#ffffff" /> });
}

function success(config: ToastBuildConfig = {}) {
    return build({
        iconSource: require('assets/ic-done-36.png'),
        ...config,
    });
}

function failure(config: ToastBuildConfig = {}) {
    return build({
        iconSource: require('assets/ic-error-36.png'),
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
    const toastLoader = build({ IconComponent: () => <LoaderSpinner size="large" color="#ffffff" /> });

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
