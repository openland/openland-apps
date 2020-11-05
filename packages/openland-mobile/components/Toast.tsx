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
    fn?: Function;
    Success?: () => React.ReactElement;
    Failure?: () => React.ReactElement;
    hide?: () => void;
    hideKeyboardOnOpen?: boolean;
};

const RawToast = ({ text, iconSource, IconComponent, textStyle }: ToastBuildConfig) => {
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

const ToastComponent = ({ text, iconSource, IconComponent, textStyle, fn, Success, Failure, hide, duration }: ToastBuildConfig) => {
    const [content, setContent] = React.useState(
        <RawToast
            text={text}
            iconSource={iconSource}
            IconComponent={IconComponent}
            textStyle={textStyle}
        />
    );

    React.useEffect(() => {
        if (fn && Success && Failure && hide) {
            fn().then(() => {
                setContent(<Success />);
            }).catch(() => {
                setContent(<Failure />);
            }).finally(() => {
                setTimeout(hide, duration);
            });
        }
    }, []);

    React.useEffect(() => {
        if (duration && hide) {
            setTimeout(hide, duration);
        }
    }, []);

    return (
        <>{content}</>
    );
};

function build(config: ToastBuildConfig) {
    let modal: ZModalController;

    const show = () =>
        showBlanketModal(
            ctx => {
                modal = ctx;

                return <ToastComponent {...config} hide={ctx.hide} />;
            },
            {
                withoutWrapper: true,
                overlayStyle: { backgroundColor: 'transparent' },
                cancelable: false,
                hideKeyboardOnOpen: config.hideKeyboardOnOpen,
                viewProps: {
                    pointerEvents: 'none'
                }
            },
        );

    const hide = () => {
        setTimeout(() => modal && modal.hide(), 1);
    };

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

function showSuccess(text: string) {
    success({ text, duration: 1000 }).show();
}

function showCopied() {
    success({ text: 'Copied', duration: 1000 }).show();
}

function showCopiedLink() {
    success({ text: 'Link copied', duration: 1000 }).show();
}

const handle = async (
    fn: Function,
    config: { success?: ToastBuildConfig; failure?: ToastBuildConfig } = {},
) => {
    const toastLoader = build({
        IconComponent: () => <LoaderSpinner size="large" color="#ffffff" />,
        Success: () => <RawToast {...config.success} iconSource={require('assets/ic-done-36.png')} />,
        Failure: () => <RawToast {...config.failure} iconSource={require('assets/ic-error-36.png')} />,
        fn: fn
    });

    toastLoader.show();
};

export default { build, loader, success, failure, showSuccess, showCopiedLink, showCopied, handle };
