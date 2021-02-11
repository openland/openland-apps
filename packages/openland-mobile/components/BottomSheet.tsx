import * as React from 'react';
import { View, Text, Platform, Keyboard, ViewStyle, TouchableOpacity, Image } from 'react-native';
import { HighlightAlpha, TextStyles } from 'openland-mobile/styles/AppStyles';
import { GQLClientContext } from 'openland-api/useClient';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from './ZLoader';
import { showModal, ModalProps, ModalConfiguration } from 'react-native-fast-modal';
import { ThemeController } from '../themes/ThemeControler';
import { resolveTheme, ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SAnimated } from 'react-native-fast-animations';
import { QueryCacheProvider } from '@openland/spacex';

export interface BottomSheetConfig {
    view: (ctx: ModalProps) => React.ReactElement;
    cancelable?: boolean;
    title?: string;
    titleAlign?: 'left';
    buttonTitle?: string;
    containerStyle?: ViewStyle;
    showAnimation?: ModalConfiguration['showAnimation'];
    disableMargins?: boolean;
    disableBottomSafeArea?: boolean;
}

export function showBottomSheet(config: BottomSheetConfig) {
    let theme = resolveTheme(ThemeController.appearance);
    Keyboard.dismiss();
    showModal((ctx) => {
        return (
            <ThemeContext.Provider value={theme}>
                {!!config.title && (
                    <>
                        <View
                            style={{
                                paddingLeft: 16,
                                paddingRight: config.cancelable ? 0 : 16,
                                paddingVertical: config.cancelable ? 0 : 15,
                                flexDirection: 'row',
                                justifyContent: config.cancelable ? 'space-between' : (config.titleAlign ? 'flex-start' : 'center'),
                                alignItems: 'center'
                            }}
                        >
                            <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }}>{config.title}</Text>
                            {config.cancelable && (
                                <TouchableOpacity
                                    activeOpacity={HighlightAlpha}
                                    style={{ justifyContent: 'center', alignItems: 'center', width: 56, height: 56 }}
                                    onPress={ctx.hide}
                                >
                                    <View
                                        style={{
                                            backgroundColor: theme.backgroundTertiaryTrans,
                                            borderRadius: 100,
                                            width: 28,
                                            height: 28,
                                            justifyContent: 'center',
                                            alignItems: 'center'
                                        }}
                                    >
                                        <Image style={{ width: 16, height: 16, tintColor: theme.foregroundTertiary }} source={require('assets/ic-close-bold-16.png')} />
                                    </View>
                                </TouchableOpacity>
                            )}
                        </View>
                    </>
                )}
                {!config.title && !config.containerStyle && <View style={{ marginTop: 16 }} />}
                <GQLClientContext.Provider value={getClient()}>
                    <QueryCacheProvider>
                        <React.Suspense fallback={<ZLoader />}>
                            {config.view(ctx)}
                        </React.Suspense>
                    </QueryCacheProvider>
                </GQLClientContext.Provider>
                <View style={{ height: 16 }} />
            </ThemeContext.Provider >
        );
    }, {
        containerStyle: {
            backgroundColor: theme.backgroundSecondary,
            padding: 0,
            ...(config.disableMargins ? {} : { marginHorizontal: 8, marginBottom: Platform.OS === 'android' ? 8 : undefined }),
            ...config.containerStyle
        },
        showAnimation: (contentHeight, views) => {
            if (config.showAnimation) {
                config.showAnimation(contentHeight, views);
                return;
            }

            SAnimated.timing(views.background, { property: 'opacity', from: 0, to: 1, duration: 0.35 });
            SAnimated.setValue(views.container, 'opacity', 1);
            if (Platform.OS === 'ios') {
                SAnimated.spring(views.container, { property: 'translateY', from: contentHeight, to: 0, duration: 0.25 });
            } else {
                SAnimated.timing(views.container, { property: 'translateY', easing: 'material', from: contentHeight, to: 0, duration: 0.25 });
            }
        },
        hideAnimation: (contentHeight, views) => {
            SAnimated.timing(views.background, { property: 'opacity', from: 1, to: 0, duration: 0.3 });
            SAnimated.timing(views.container, { property: 'translateY', easing: { bezier: [0.23, 1, 0.32, 1] }, from: 0, to: contentHeight, duration: 0.15 });
        },
        disableBottomSafeArea: config.disableBottomSafeArea
    });
}
