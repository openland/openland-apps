import * as React from 'react';
import { View, Image, Text, Platform, Linking } from 'react-native';
import { ModalProps } from 'react-native-fast-modal';
import Version from 'react-native-version-number';

import { showBottomSheet } from 'openland-mobile/components/BottomSheet';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZButton } from 'openland-mobile/components/ZButton';
import { AppStorage } from 'openland-y-runtime-native/AppStorage';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ReleasePlatform } from 'openland-api/spacex.types';

const APPLE_APP_ID = '1435537685';
const GOOGLE_PACKAGE_NAME = 'com.openland.app';
const STORAGE_KEY = 'last-skipped-release';

const getLastSkippedRelease = async () => await AppStorage.readKey<string>(STORAGE_KEY);

const UpdateApp = (props: { ctx: ModalProps; newVersion: string }) => {
    const theme = useTheme();

    const handleSkipPress = React.useCallback(async () => {
        await AppStorage.writeKey<string>(STORAGE_KEY, props.newVersion);
        props.ctx.hide();
    }, []);

    const handleUpdatePress = React.useCallback(async () => {
        if (Platform.OS === 'ios') {
            await Linking.openURL(
                `https://apps.apple.com/ru/app/openland-messenger/id${APPLE_APP_ID}`,
            );
        } else {
            await Linking.openURL(`market://details?id=${GOOGLE_PACKAGE_NAME}`);
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
                    alignSelf: 'center',
                }}
            />
            <View style={{ paddingHorizontal: 32, marginTop: 16 }}>
                <Text
                    style={{
                        ...TextStyles.Title2,
                        color: theme.foregroundPrimary,
                        textAlign: 'center',
                    }}
                    allowFontScaling={false}
                >
                    Update available
                </Text>
                <Text
                    style={{
                        ...TextStyles.Body,
                        color: theme.foregroundSecondary,
                        textAlign: 'center',
                        marginTop: 6,
                    }}
                    allowFontScaling={false}
                >
                    Upgrade your app to get great new features
                </Text>
            </View>
            <View style={{ paddingHorizontal: 16, marginTop: 32, flexDirection: 'row' }}>
                <View style={{ flex: 1 }}>
                    <ZButton
                        title="Maybe later"
                        style="secondary"
                        size="large"
                        onPress={handleSkipPress}
                    />
                </View>
                <View style={{ flex: 1, marginLeft: 16 }}>
                    <ZButton
                        title="Update now"
                        style="primary"
                        size="large"
                        onPress={handleUpdatePress}
                    />
                </View>
            </View>
        </View>
    );
};

export const showUpdateAppModal = (newVersion: string) => {
    showBottomSheet({ view: (ctx) => <UpdateApp ctx={ctx} newVersion={newVersion} /> });
};

export const checkForUpdates = async () => {
    try {
        const currentVersion = Version.appVersion;
        const currentMinorVersion = Number(currentVersion.split('.').reverse()[0]);
        const isTestBuild = currentVersion.split('.')[0] === '999';
        const platform = (isTestBuild ? 'TEST' : Platform.OS.toUpperCase()) as ReleasePlatform;

        const latestAppRelease = await getClient().queryLatestAppReleaseCheck({ platform });
        const latestVersion = latestAppRelease.latestAppRelease!.version;
        const latestMinorVersion = Number(latestVersion.split('.').reverse()[0]);

        if (
            latestMinorVersion > currentMinorVersion &&
            latestVersion !== await getLastSkippedRelease()
        ) {
            showUpdateAppModal(latestVersion);
        }
    } catch (e) {
        console.log(e);
    }
};
