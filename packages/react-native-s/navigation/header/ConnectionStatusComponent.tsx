import * as React from 'react';
import { useClient } from 'openland-api/useClient';
import { debounce } from 'openland-y-utils/timer';
import { SAnimated, SAnimatedShadowView } from 'react-native-fast-animations';
import { Text, Platform } from 'react-native';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { TintOrange } from 'openland-y-utils/themes/tints';
import { NavigationPage } from '../NavigationPage';

export const ConnectionStatusComponent = (props: { k: string, route: NavigationPage | undefined }) => {
    let animate = new SAnimatedShadowView(`header-connecting-status-content-${props.k}`, { opacity: 0, translateY: -8, scale: 0.84 });

    const client = useClient();
    const theme = useTheme();
    React.useEffect(() => {
        if (!client) {
            return;
        }
        const showStatus = (show: boolean) => {
            SAnimated.beginTransaction();
            SAnimated.setDuration(0.15);
            if (Platform.OS === 'ios') {
                SAnimated.setPropertyAnimator((name, prop, from, to) => {
                    SAnimated.spring(name, {
                        property: prop,
                        from: from,
                        to: to,
                    });
                });
            } else {
                SAnimated.setPropertyAnimator((name, prop, from, to) => {
                    SAnimated.timing(name, {
                        property: prop,
                        from: from,
                        to: to,
                        easing: 'material'
                    });
                });
            }

            animate.opacity = show ? 1 : 0;
            animate.translateY = show ? 0 : -8;
            animate.scale = show ? 1 : 0.84;

            SAnimated.commitTransaction();
        };
        // debaunce to prevent flickering on short network problems 
        const showStatusDebaunced = debounce(showStatus, 500);

        // timeout to prevent showing "connecting" on app start
        setTimeout(() => {
            return client.engine.watchStatus(s => {
                showStatusDebaunced(s.status === 'connecting');
            });
        }, 1000);
    }, []);
    if (props.route?.params.hideConnectionStatus) {
        return null;
    }
    return (
        <SAnimated.View name={`header-connecting-status-${props.k}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 36, alignItems: 'center' }} pointerEvents="none">
            <SAnimated.View
                name={`header-connecting-status-content-${props.k}`}
                style={{
                    height: 36,
                    borderRadius: 36,
                    backgroundColor: TintOrange.primary,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    opacity: 0,
                }}
                pointerEvents="none"
            >
                <LoaderSpinner color={theme.foregroundContrast} size="small" /><Text style={{ ...TextStyles.Label2, marginLeft: 8, color: theme.foregroundContrast }} >Connecting</Text>
            </SAnimated.View>
        </SAnimated.View >
    );
};