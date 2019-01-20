import * as React from 'react';
import { ZModalController, showModal, ZModal } from './ZModal';
import { View, TouchableWithoutFeedback, Platform, Animated, LayoutChangeEvent, BackHandler } from 'react-native';
import { SSafeAreaContext, SSafeArea } from 'react-native-s/SSafeArea';
import { SAnimated } from 'react-native-s/SAnimated';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';

class SheetModal extends React.PureComponent<{ modal: ZModal, ctx: ZModalController, safe: SSafeArea }> implements ZModalController {

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
        if (this.ended) {
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
        this.contentView.translateY = event.nativeEvent.layout.height;
        this.contentView.opacity = 1;
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
        this.contentView.translateY = 0;
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
        this.contentView.translateY = this.contentHeight;
        this.bgView.opacity = 0;
        SAnimated.commitTransaction(() => { this.props.ctx.hide(); });
    }

    render() {
        return (
            <View width="100%" height="100%" flexDirection="column" alignItems="stretch" justifyContent="flex-end">

                <TouchableWithoutFeedback onPress={this.hide}>
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
                        borderTopRightRadius={16}
                        borderTopLeftRadius={16}
                        paddingTop={8}
                        paddingBottom={this.props.safe.bottom + 8}
                        onLayout={this.onLayout}
                    >
                        {this.contents}
                    </View>
                </SAnimated.View>
            </View>
        )
    }
}

export function showSheetModal(render: (ctx: ZModalController) => React.ReactElement<{}>) {
    showModal((modal) => {
        return (
            <SSafeAreaContext.Consumer>
                {safe => (<SheetModal ctx={modal} modal={render} safe={safe} />)}
            </SSafeAreaContext.Consumer>
        )
    });
}