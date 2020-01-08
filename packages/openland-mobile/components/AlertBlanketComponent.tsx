import * as React from 'react';
import { Platform, View, Text, Image } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { RadiusStyles, TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZModalController } from './ZModal';
import { delay } from 'openland-y-utils/timer';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { SAnimated } from 'react-native-s/SAnimated';
import { formatError } from 'openland-y-forms/errorHandling';
import { AlertBlanketBuilder } from './AlertBlanket';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

export const AlertBlanketComponent = XMemo<{ builder: AlertBlanketBuilder, modalController: ZModalController }>((props) => {
    let theme = React.useContext(ThemeContext);
    let [state, setState] = React.useState<'initial' | 'done' | 'error'>('initial');
    let key = randomKey();

    let contentView = new SAnimatedShadowView(key + '--ctns', { opacity: 1 });
    let overlayView = new SAnimatedShadowView(key + '--overlay', { opacity: 0 });

    let onSuccess = React.useCallback(async (originalCallback?: () => void) => {
        setState('done');
        SAnimated.beginTransaction();
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

        contentView.opacity = 0;
        overlayView.opacity = 1;

        SAnimated.commitTransaction(async () => {
            if (originalCallback) {
                originalCallback();
            }
            await delay(250);
            props.modalController.hide();
        });
    }, []);

    let onError = React.useCallback(async (e: Error, originalCallback?: (e: Error) => void) => {
        if (originalCallback) {
            originalCallback(e);
        }
        new AlertBlanketBuilder().alert(formatError(e));
        props.modalController.hide();
    }, []);

    return (
        <View
            flexDirection="column"
            justifyContent="center"
            backgroundColor={state === 'error' ? theme.accentNegative : theme.backgroundSecondary}
            borderRadius={RadiusStyles.Large}
        >
            <SAnimated.View
                name={key + '--ctns'}
                style={{
                    backgroundColor: theme.backgroundSecondary,
                    borderRadius: 16,
                    padding: 24,
                }}
            >
                {props.builder._title && <Text style={{ ...TextStyles.Title2, marginBottom: props.builder._message ? 4 : 16, color: theme.foregroundPrimary }} allowFontScaling={false}>{props.builder._title}</Text>}
                {props.builder._message && <Text style={{ ...TextStyles.Body, marginBottom: 16, color: theme.foregroundPrimary }} allowFontScaling={false}>{props.builder._message}</Text>}
                {props.builder._view}
                <View flexDirection="row" alignItems="flex-end" alignSelf="flex-end" >
                    {props.builder._cancelAction && !props.builder._actions.find(a => a.name.toLowerCase() === 'cancel') && (
                        <>
                            <View style={{ width: 8 }} />
                            <ZRoundedButton
                                key={'cancel-ac'}
                                style="secondary"
                                title="Cancel"
                                onPress={async () => {
                                    props.modalController.hide();
                                    if (props.builder._onCancel) {
                                        props.builder._onCancel();
                                    }
                                }}
                            />
                        </>
                    )}
                    {props.builder._actions.map((a, i) => (
                        <>
                            <View style={{ width: 8 }} />
                            <ZRoundedButton
                                key={i + '-ac'}
                                style={a.style === 'cancel' ? 'secondary' : a.style === 'destructive' ? 'danger' : 'primary'}
                                title={a.name}
                                onPress={async () => {
                                    if (a.callback) {
                                        await a.callback();
                                    }
                                    if (!a.action) {
                                        props.modalController.hide();
                                    }
                                }}
                                action={a.action}
                                onActionSuccess={() => onSuccess(a.onActionSuccess)}
                                onActionError={(e) => onError(e, a.onActionError)}
                            />
                        </>
                    ))}
                </View>
            </SAnimated.View>
            <View position="absolute" alignSelf="center" pointerEvents="none">
                <SAnimated.View
                    name={key + '--overlay'}
                    style={{ opacity: 0 }}
                >
                    <View borderRadius={40} width={40} height={40} backgroundColor="white" justifyContent="center" alignItems="center">
                        <View borderRadius={36} width={36} height={36} backgroundColor="#69d06d" justifyContent="center" alignItems="center">
                            <Image source={require('assets/ic-checkmark.png')} />
                        </View>
                    </View>
                </SAnimated.View>
            </View>
        </View>
    );
});