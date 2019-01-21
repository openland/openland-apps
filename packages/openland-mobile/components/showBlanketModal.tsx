import * as React from 'react';
import { ZModalController, showModal, ZModal } from './ZModal';
import { View, TouchableWithoutFeedback, Platform, Animated, LayoutChangeEvent, BackHandler } from 'react-native';
import { SSafeAreaContext, SSafeArea } from 'react-native-s/SSafeArea';
import { SAnimated } from 'react-native-s/SAnimated';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';

class BlanketModal extends React.PureComponent<{ modal: ZModal, ctx: ZModalController, safe: SSafeArea, cancalable?: boolean }> implements ZModalController {

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
        if (this.ended || this.props.cancalable === false) {
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

        SAnimated.commitTransaction();

        // Srtart
        SAnimated.beginTransaction();
        SAnimated.setPropertyAnimator((name, prop, from, to) => {
            SAnimated.timing(name, {
                property: prop,
                from: from,
                to: to,
                easing: 'material'
            });
        });
        this.contentView.opacity = 1;
        this.bgView.opacity = 1;

        SAnimated.commitTransaction();
    }

    hide = () => {
        if (this.ended) {
            return;
        }
        this.ended = true;

        SAnimated.beginTransaction();
        SAnimated.setPropertyAnimator((name, prop, from, to) => {
            SAnimated.timing(name, {
                property: prop,
                from: from,
                to: to,
                easing: 'material'
            });
        });
        this.contentView.opacity = 0;
        this.bgView.opacity = 0;

        SAnimated.commitTransaction(() => { this.props.ctx.hide(); });
    }

    render() {
        return (
            <View width="100%" height="100%" flexDirection="column" alignItems="stretch" justifyContent="center">

                <TouchableWithoutFeedback onPress={this.props.cancalable !== false ? this.hide : undefined}>
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
                                backgroundColor: 'rgba(0,0,0,0.3)',
                                opacity: 0
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <SAnimated.View
                    name={this.key + '--ctns'}
                    style={{ opacity: 0 }}
                >
                    <View
                        backgroundColor="#fff"
                        borderRadius={16}
                        marginHorizontal={16}
                        onLayout={this.onLayout}
                    >
                        {this.contents}
                    </View>
                </SAnimated.View>
            </View>
        )
    }
}

export function showBlanketModal(render: (ctx: ZModalController) => React.ReactElement<{}>, cancalable?: boolean) {
    showModal((modal) => {
        return (
            <SSafeAreaContext.Consumer>
                {safe => (<BlanketModal ctx={modal} modal={render} safe={safe} cancalable={cancalable} />)}
            </SSafeAreaContext.Consumer>
        )
    });
}