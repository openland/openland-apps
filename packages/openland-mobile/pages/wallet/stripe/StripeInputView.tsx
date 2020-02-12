import * as React from 'react';
import uuid from 'uuid/v4';
import { requireNativeComponent, StyleProp, ViewStyle, View, NativeModules, DeviceEventEmitter, Platform, NativeEventEmitter } from 'react-native';

const StripeInputViewNative = requireNativeComponent<{ style?: StyleProp<ViewStyle>; callbackKey: string }>('RNStripeCardView');
const StripeModule = NativeModules.RNStripe as { confirmSetupIntent(callbackKey: string, clientSecret: string): void };
const StripeModuleEmitter = new NativeEventEmitter(NativeModules.RNStripe);

const awaitForSetupIntent = async (secret: string) => {
    let resResolver: (res: {
        status: 'success' | 'failed',
        id?: string,
        message?: string
    }) => void;
    let resPromise = new Promise<{
        status: 'success' | 'failed',
        id?: string,
        message?: string
    }>(resolver => resResolver = resolver);

    if (Platform.OS === 'android') {
        let subs = DeviceEventEmitter.addListener('openland_stripe_setup_intent', (args: {
            clientSecret: string,
            status: 'success' | 'failed',
            id?: string,
            message?: string
        }) => {
            if (args.clientSecret === secret) {
                resResolver({ status: args.status, message: args.message, id: args.id });
            }
        });
        try {
            return await resPromise;
        } finally {
            subs.remove();
        }
    } else {
        let subs = StripeModuleEmitter.addListener('setup_intent', (args: {
            clientSecret: string,
            status: 'success' | 'failed',
            id?: string,
            message?: string
        }) => {
            if (args.clientSecret === secret) {
                resResolver({ status: args.status, message: args.message, id: args.id });
            }
        });
        try {
            return await resPromise;
        } finally {
            subs.remove();
        }
    }
};

export interface StripeInputViewInstance {
    confirmSetupIntent: (clientSecret: string) => Promise<{
        status: 'success' | 'failed',
        message?: string,
        id?: string
    }>;
}

export const StripeInputView = React.memo(React.forwardRef<StripeInputViewInstance>((props, ref) => {
    const callbackKey = React.useMemo(() => uuid(), []);
    React.useImperativeHandle(ref, () => ({
        confirmSetupIntent: async (clientSecret: string) => {
            let res = awaitForSetupIntent(clientSecret);
            StripeModule.confirmSetupIntent(callbackKey, clientSecret);
            return await res;
        }
    }));

    return (
        <View height={Platform.OS === 'android' ? 128 + 16 : 50}>
            <StripeInputViewNative callbackKey={callbackKey} style={{ height: '100%', width: '100%' }} />
        </View>
    );
}));