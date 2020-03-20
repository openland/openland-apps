import * as React from 'react';
import { View, Text, Platform } from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SDevice } from 'react-native-s/SDevice';
import { GQLClientContext } from 'openland-api/useClient';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from './ZLoader';
import { showModal, ModalProps } from 'react-native-fast-modal';
import { ThemeController } from '../themes/ThemeControler';
import { resolveTheme, ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface BuildConfig {
    view: (ctx: ModalProps) => React.ReactElement;
    cancelable?: boolean;
    title?: string;
    buttonTitle?: string;
}

export function showBottomSheet(config: BuildConfig) {
    let theme = resolveTheme(ThemeController.appearance);
    showModal((ctx) => {
        return (
            <ThemeContext.Provider value={theme}>
                {Platform.OS === 'ios' && <View width={48} height={4} backgroundColor={theme.foregroundQuaternary} marginBottom={15} borderRadius={4} alignSelf="center" />}
                {!!config.title && (
                    <View paddingTop={6} paddingBottom={10} alignItems="center">
                        <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} allowFontScaling={false}>
                            {config.title}
                        </Text>
                    </View>
                )}
                <GQLClientContext.Provider value={getClient()}>
                    <React.Suspense fallback={<ZLoader />}>
                        {config.view(ctx)}
                    </React.Suspense>
                </GQLClientContext.Provider>
                <View padding={16} paddingBottom={(Platform.OS === 'ios' ? SDevice.safeArea.bottom : undefined) || undefined}>
                    {config.cancelable &&
                        <ZButton
                            title={config.buttonTitle ? config.buttonTitle : 'Cancel'}
                            size="large"
                            style="secondary"
                            onPress={() => ctx.hide()}
                        />
                    }
                </View>
            </ThemeContext.Provider >
        );
    }, { containerStyle: { marginBottom: -SDevice.safeArea.bottom, backgroundColor: theme.backgroundSecondary, ...(Platform.OS === 'android' ? { borderBottomLeftRadius: 0, borderBottomRightRadius: 0 } : {}) } });
}
