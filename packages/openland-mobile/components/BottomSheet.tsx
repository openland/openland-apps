import * as React from 'react';
import { View, Text, Platform, Keyboard, ViewStyle } from 'react-native';
import { ZButton } from 'openland-mobile/components/ZButton';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { GQLClientContext } from 'openland-api/useClient';
import { getClient } from 'openland-mobile/utils/graphqlClient';
import { ZLoader } from './ZLoader';
import { showModal, ModalProps, ModalConfiguration } from 'react-native-fast-modal';
import { ThemeController } from '../themes/ThemeControler';
import { resolveTheme, ThemeContext } from 'openland-mobile/themes/ThemeContext';
import { SAnimated } from 'react-native-fast-animations';

export interface BottomSheetConfig {
    view: (ctx: ModalProps) => React.ReactElement;
    cancelable?: boolean;
    title?: string;
    titleAlign?: 'left';
    buttonTitle?: string;
    containerStyle?: ViewStyle;
    showAnimation?: ModalConfiguration['showAnimation'];
    disableMargins?: boolean;
}

export function showBottomSheet(config: BottomSheetConfig) {
    let theme = resolveTheme(ThemeController.appearance);
    Keyboard.dismiss();
    showModal((ctx) => {
        return (
            <ThemeContext.Provider value={theme}>
                {!!config.title && (
                    <View paddingTop={16} paddingLeft={16} paddingRight={16} paddingBottom={10} alignItems={config.titleAlign ? undefined : 'center'}>
                        <Text style={{ ...TextStyles.Title2, color: theme.foregroundPrimary }} allowFontScaling={false}>
                            {config.title}
                        </Text>
                    </View>
                )}
                {!config.title && !config.containerStyle && <View marginTop={16} />}
                <GQLClientContext.Provider value={getClient()}>
                    <React.Suspense fallback={<ZLoader />}>
                        {config.view(ctx)}
                    </React.Suspense>
                </GQLClientContext.Provider>
                {config.cancelable ? (
                    <View padding={16} >
                        <ZButton
                            title={config.buttonTitle ? config.buttonTitle : 'Cancel'}
                            size="large"
                            style="secondary"
                            onPress={() => ctx.hide()}
                        />
                    </View>
                ) : (
                        <View height={16} />
                    )
                }
            </ThemeContext.Provider >
        );
    }, {
        containerStyle: {
            backgroundColor: theme.backgroundSecondary,
            padding: 0,
            ...(config.disableMargins ? {} : {marginHorizontal: 8, marginBottom: Platform.OS === 'android' ? 8 : undefined}),
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
    });
}
