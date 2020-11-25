import * as React from 'react';
import { View, Image, Text, Platform, Linking } from 'react-native';
import Rate from 'react-native-rate';
import { ModalProps } from 'react-native-fast-modal';
import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { AppStorage } from 'openland-y-runtime-native/AppStorage';

export type RateAppInfo = {
    appOpenedCount: number;
    stopShowingRating: boolean;
    firstSeenTimestamp?: number;
};

export const getRateAppInfo = async () => {
    let rateAppMeta = await AppStorage.readKey<RateAppInfo>('rate-app-meta');
    if (rateAppMeta === undefined) {
        let initialValue = {
            appOpenedCount: 1,
            stopShowingRating: false,
        };
        await AppStorage.writeKey<RateAppInfo>('rate-app-meta', initialValue);
        return initialValue as RateAppInfo;
    } else {
        return rateAppMeta;
    }
};

export const setRateAppInfo = async (value: Partial<RateAppInfo> | ((value: RateAppInfo) => Partial<RateAppInfo>)) => {
    let rateAppMeta = await getRateAppInfo();
    AppStorage.writeKey<RateAppInfo>('rate-app-meta', {
        ...rateAppMeta,
        ...typeof value === 'function' ? value(rateAppMeta) : value,
    });
};

const rateOptions = {
    AppleAppID: '1435537685',
    GooglePackageName: 'com.openland.app',
    preferInApp: true,
};

const RateApp = (props: { ctx: ModalProps }) => {
    const theme = useTheme();
    const handleRatePress = React.useCallback(() => {
        props.ctx.hide();
        setRateAppInfo({ stopShowingRating: true });
        if (Platform.OS === 'ios') {
            Rate.rate({ ...rateOptions, openAppStoreIfInAppFails: true }, () => props.ctx.hide());
            return;
        } else if (Platform.OS === 'android') {
            let url = `http://play.google.com/store/apps/details?id=${rateOptions.GooglePackageName}`;
            Linking.canOpenURL(url).then((supported) => {
                if (supported) {
                    Linking.openURL(url);
                }
            });
        }
    }, []);
    return (
        <View>
            <Image
                source={require('assets/logo-cropped.png')}
                style={{
                    width: 96,
                    height: 96,
                    marginTop: 16,
                    borderRadius: 100,
                    borderWidth: 1,
                    borderColor: theme.border,
                    alignSelf: 'center'
                }}
            />
            <View paddingHorizontal={32} marginTop={16}>
                <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary, textAlign: 'center' }}>
                    Enjoying Openland?
                </Text>
                <Text style={{ ...TextStyles.Body, color: theme.foregroundSecondary, textAlign: 'center', marginTop: 6 }}>
                    Rate the app on {Platform.select({ ios: 'App Store', android: 'Google Play' })}
                </Text>
            </View>
            <View paddingHorizontal={16} marginTop={32} flexDirection="row">
                <View flex={1}>
                    <ZButton
                        title="Maybe later"
                        style="secondary"
                        size="large"
                        onPress={() => props.ctx.hide()}
                    />
                </View>
                <View flex={1} marginLeft={16}>
                    <ZButton
                        title="Rate now"
                        style="primary"
                        size="large"
                        onPress={handleRatePress}
                    />
                </View>
            </View>
        </View>
    );
};

const showRateAppModal = () => {
    showBottomSheet({ view: (ctx) => <RateApp ctx={ctx} /> });
};

export const rateApp = async () => {
    try {
        Rate.rate(rateOptions, (didNativeRatingOpen) => {
            if (!didNativeRatingOpen) {
                showRateAppModal();
            }
        });
        return;
    } catch (e) {
        showRateAppModal();
    }
};
