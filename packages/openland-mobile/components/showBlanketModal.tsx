import * as React from 'react';
import { ZModalController, showModal, ZModal } from './ZModal';
import { View, TouchableWithoutFeedback, LayoutChangeEvent, BackHandler, Platform } from 'react-native';
import { SAnimated } from 'react-native-s/SAnimated';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';
import { ASSafeAreaContext, ASSafeArea } from 'react-native-async-view/ASSafeAreaContext';
import { isPad } from 'openland-mobile/pages/Root';
import { AppTheme } from 'openland-mobile/themes/themes';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

interface BlanketModalProps {
    modal: ZModal;
    ctx: ZModalController;
    safe: ASSafeArea;
    cancelable?: boolean;
}

class BlanketModal extends React.PureComponent<BlanketModalProps & { theme: AppTheme }> implements ZModalController {
    key = randomKey();
    contents: any;

    started = false;
    ended = false;
    bgView = new SAnimatedShadowView(this.key + '--bg', { opacity: 0 })
    contentView = new SAnimatedShadowView(this.key + '--ctns', { opacity: 0 });
    contentHeight = 0;

    componentWillMount() {
        this.contents = this.props.modal(this);
        BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    }

    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
    }

    handleBackPress = () => {
        if (this.ended || this.props.cancelable === false) {
            return false;
        }
        this.hide();
        return true;
    }

    private onLayout = (event: LayoutChangeEvent) => {
        this.contentHeight = event.nativeEvent.layout.height;
        if (this.started) {
            return;
        }
        this.started = true;

        // Prepare
        SAnimated.beginTransaction();
        this.contentView.opacity = 0;
        this.bgView.opacity = 0;
        // this.contentView.translateY = 200;

        SAnimated.commitTransaction();

        // Start
        SAnimated.beginTransaction();
        if (Platform.OS === 'ios') {
            SAnimated.setPropertyAnimator((name, prop, from, to) => {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to
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
        this.contentView.opacity = 1;
        this.bgView.opacity = 1;
        // this.contentView.translateY = 0;

        SAnimated.commitTransaction();
    }

    hide = () => {
        if (this.ended) {
            return;
        }
        this.ended = true;

        SAnimated.beginTransaction();
        if (Platform.OS === 'ios') {
            SAnimated.setPropertyAnimator((name, prop, from, to) => {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to
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
        this.bgView.opacity = 0;
        // this.contentView.translateY = 200;

        SAnimated.commitTransaction(() => { this.props.ctx.hide(); });
    }

    render() {
        const { theme } = this.props;

        return (
            <View width="100%" height="100%" flexDirection="column" alignItems="stretch">
                <TouchableWithoutFeedback onPress={this.props.cancelable !== false ? this.hide : undefined}>
                    <View
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            right: 0,
                            bottom: 0,
                        }}
                    >
                        <SAnimated.View
                            name={this.key + '--bg'}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                backgroundColor: theme.modalOverlay,
                                opacity: 0
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <SAnimated.View
                    name={this.key + '--ctns'}
                    style={{
                        opacity: 0,
                        flexGrow: 1,
                        flexBasis: 0,
                        minHeight: 0,
                        alignItems: 'stretch',
                    }}
                >
                    <View flexGrow={1} flexBasis={0} minHeight={0} minWidth={0} alignItems="stretch" alignSelf="stretch" flexDirection="column" justifyContent="center" marginBottom={this.props.safe.bottom} marginTop={this.props.safe.top + 48}>
                        {!isPad && (
                            <View
                                backgroundColor={theme.modalBackground}
                                borderRadius={16}
                                marginHorizontal={16}
                                onLayout={this.onLayout}
                            >
                                {this.contents}
                            </View>
                        )}
                        {isPad && (
                            <View width={420} alignSelf="center">
                                <View
                                    backgroundColor={theme.modalBackground}
                                    borderRadius={16}
                                    marginHorizontal={16}
                                    onLayout={this.onLayout}
                                >
                                    {this.contents}
                                </View>
                            </View>
                        )}
                    </View>
                </SAnimated.View>
            </View>
        )
    }
}

const ThemedBlanketModal = XMemo((props: BlanketModalProps) => {
    let theme = React.useContext(ThemeContext);
    return <BlanketModal {...props} theme={theme} />
})

export function showBlanketModal(render: (ctx: ZModalController) => React.ReactElement<{}>, cancelable?: boolean) {
    showModal((modal) => {
        return (
            <ASSafeAreaContext.Consumer>
                {safe => (<ThemedBlanketModal ctx={modal} modal={render} safe={safe} cancelable={cancelable} />)}
            </ASSafeAreaContext.Consumer>
        )
    });
}