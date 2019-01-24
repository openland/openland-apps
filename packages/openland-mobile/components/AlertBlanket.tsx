/* tslint:disable */ 

import * as React from 'react';
import { Platform, View, Text, Alert as AlertReact, Image } from 'react-native';
import { ZRoundedButton } from './ZRoundedButton';
import { showBlanketModal } from './showBlanketModal';
import { TextStyles } from 'openland-mobile/styles/AppStyles';
import { ZModalController } from './ZModal';
import { delay } from 'openland-y-utils/timer';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';
import { randomKey } from 'openland-mobile/utils/randomKey';
import { SAnimated } from 'react-native-s/SAnimated';
import { formatError } from 'openland-y-forms/errorHandling';

type BlanketButtonsStyle = 'destructive' | 'cancel' | 'default';

export class Alert {
    static alert = (message: string) => {
        new AlertBlanketBuilder().alert(message);
    }

    static builder = () => {
        return new AlertBlanketBuilder();
    }
}

class AlertBlanketBuilderComponent extends React.PureComponent<{ builder: AlertBlanketBuilder, modalController: ZModalController }, { state?: 'initila' | 'done' | 'error' }> {
    state = { state: 'initial' as 'initila' | 'done' | 'error' }
    key = randomKey();

    contentView = new SAnimatedShadowView(this.key + '--ctns', { opacity: 1 });
    overlayView = new SAnimatedShadowView(this.key + '--overlay', { opacity: 0 })

    onScuccess = async (originalCallback?: () => void) => {
        this.setState({ state: 'done' });
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
        this.contentView.opacity = 0;
        this.overlayView.opacity = 1;

        SAnimated.commitTransaction(async () => {
            if (originalCallback) {
                originalCallback();
            }
            await delay(250);
            this.props.modalController.hide();

        });

    }

    onError = async (e: Error, originalCallback?: (e: Error) => void) => {
        if (originalCallback) {
            originalCallback(e);
        }
        Alert.alert(formatError(e));
        this.props.modalController.hide();

    }

    render() {
        return <View
            flexDirection="column"
            justifyContent="center"
            backgroundColor={this.state.state === 'done' ? '#69d06d' : this.state.state === 'error' ? '#d75454' : 'white'}
            borderRadius={16}
        >
            <SAnimated.View
                name={this.key + '--ctns'}
                style={{
                    backgroundColor: 'white',
                    borderRadius: 16,
                    paddingHorizontal: 24,
                    paddingVertical: 20,
                }}
            >
                {this.props.builder._title && <Text style={{ marginBottom: this.props.builder._message ? 12 : 16, color: '#000', fontSize: 20, fontWeight: TextStyles.weight.medium as any }}>{this.props.builder._title}</Text>}
                {this.props.builder._message && <Text style={{ marginBottom: 16, color: '#000', fontSize: 16 }}>{this.props.builder._message}</Text>}
                <View flexDirection="row" alignItems="flex-end" alignSelf="flex-end" >
                    {this.props.builder._actions.map((a, i) => (
                        <>
                            <View style={{ width: 4 }} />
                            <ZRoundedButton
                                key={i + '-ac'}
                                size="big"
                                style={a.style === 'cancel' ? 'flat' : a.style === 'destructive' ? 'danger' : 'default'}
                                title={a.name}
                                onPress={async () => {
                                    if (a.callback) {
                                        await a.callback();
                                    }
                                    if (!a.action) {
                                        this.props.modalController.hide();
                                    }
                                }}
                                action={a.action}
                                onActionSuccess={() => this.onScuccess(a.onActionSuccess)}
                                onActionError={(e) => this.onError(e, a.onActionError)}
                            />
                        </>
                    ))}
                </View>
            </SAnimated.View>
            <View position="absolute" alignSelf="center">
                <SAnimated.View
                    name={this.key + '--overlay'}
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
    }
}
export class AlertBlanketBuilder {
    _title?: string;
    _message?: string;
    _cancalable?: boolean;
    _actions: { name: string, callback?: () => void, style?: BlanketButtonsStyle, action?: () => void, onActionSuccess?: () => void, onActionError?: (e: Error) => void }[] = [];

    alert(message: string) {
        this._title = message;
        this._actions = [{ name: 'Cancel' }]
        this.show();
    }

    title(title: string): AlertBlanketBuilder {
        this._title = title;
        return this;
    }

    cancalable(cancalable: boolean): AlertBlanketBuilder {
        this._cancalable = cancalable;
        return this;
    }

    message(message: string): AlertBlanketBuilder {
        this._message = message;
        return this;
    }

    button(name: string, style?: BlanketButtonsStyle, callback?: () => void): AlertBlanketBuilder {
        this._actions.push({ name, callback, style });
        return this;
    }

    action(name: string, style?: BlanketButtonsStyle, action?: () => void): AlertBlanketBuilder {
        this._actions.push({ name, action, style });
        return this;
    }

    show() {
        showBlanketModal((ctx) => {
            return (
                <AlertBlanketBuilderComponent builder={this} modalController={ctx} />

            )
        }, this._cancalable);
    }
}