import * as React from 'react';
import { useClient } from 'openland-mobile/utils/useClient';
import { debounce } from 'openland-y-utils/timer';
import { SAnimated } from 'react-native-s/SAnimated';
import { Text, Platform } from 'react-native';
import { useTheme } from 'openland-mobile/themes/ThemeContext';
import { LoaderSpinner } from 'openland-mobile/components/LoaderSpinner';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';

export const ConnectionStatusComponent = (props: { k: string }) => {
    let animate = new SAnimatedShadowView(`header-connecting-status-content-${props.k}`, { opacity: 0, translateY: -8, scale: 0.84 });

    const client = useClient().client;
    const theme = useTheme();
    React.useEffect(() => {
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
            return client.watchStatus(s => {
                showStatusDebaunced(s.status === 'connecting');
            });
        }, 1000);
    }, []);
    return (
        <SAnimated.View name={`header-connecting-status-${props.k}`} style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 36, alignItems: 'center' }}>
            <SAnimated.View
                name={`header-connecting-status-content-${props.k}`}
                style={{
                    height: 36,
                    borderRadius: 36,
                    backgroundColor: theme.tintOrange,
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'row',
                    paddingVertical: 8,
                    paddingHorizontal: 16,
                    opacity: 0,
                }}
            >
                <LoaderSpinner color={theme.foregroundContrast} size="small" /><Text style={{ ...TextStyles.Label2, marginLeft: 8, color: theme.foregroundContrast }} >Connecting</Text>
            </SAnimated.View>
        </SAnimated.View >
    );
};