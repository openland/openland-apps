import * as React from 'react';
import { ZModalController, showModal, ZModal } from './ZModal';
import { View, TouchableWithoutFeedback, LayoutChangeEvent, BackHandler, Platform, ScrollView, Dimensions } from 'react-native';
import { SAnimated } from 'react-native-s/SAnimated';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';
import { ASSafeAreaContext, ASSafeArea } from 'react-native-async-view/ASSafeAreaContext';
import { ZActionSheetItem } from './ZActionSheetItem';
import { ZBlurredView } from './ZBlurredView';

class SheetModal extends React.PureComponent<{ modal: ZModal, ctx: ZModalController, safe: ASSafeArea }> implements ZModalController {

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
            if (Platform.OS === 'ios') {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to,
                });
            } else {
                SAnimated.timing(name, {
                    property: prop,
                    from: from,
                    to: to,
                    easing: 'material'
                });
            }
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
            if (Platform.OS === 'ios') {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to,
                });
            } else {
                SAnimated.timing(name, {
                    property: prop,
                    from: from,
                    to: to,
                    easing: 'material'
                });
            }
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
                                backgroundColor: Platform.OS === 'android' ? 'rgba(0,0,0,0.3)' : 'rgba(4, 4, 15, 0.4)',
                                opacity: 0
                            }}
                        />
                    </View>
                </TouchableWithoutFeedback>

                <SAnimated.View
                    name={this.key + '--ctns'}
                    style={{ opacity: 0 }}
                >
                    {Platform.OS === 'android' && (
                        <View
                            backgroundColor="#ffffff"
                            borderTopRightRadius={12}
                            borderTopLeftRadius={12}
                            paddingBottom={this.props.safe.bottom + 8}
                            onLayout={this.onLayout}
                            overflow="hidden"
                        >
                            <ScrollView maxHeight={Dimensions.get('screen').height - this.props.safe.top - this.props.safe.bottom - 100}>
                                {this.contents}
                            </ScrollView>
                        </View>
                    )}
                    {Platform.OS === 'ios' && (
                        <View onLayout={this.onLayout}>
                            <ZBlurredView
                                intensity="high"
                                borderRadius={14}
                                marginHorizontal={10}
                                overflow="hidden"
                            >
                                <ScrollView maxHeight={Dimensions.get('screen').height - this.props.safe.top - this.props.safe.bottom - 100}>
                                    {this.contents}
                                </ScrollView>
                            </ZBlurredView>
                            <View
                                borderRadius={14}
                                backgroundColor="#ffffff"
                                marginBottom={this.props.safe.bottom}
                                marginTop={10}
                                marginHorizontal={10}
                                overflow="hidden"
                            >
                                <ZActionSheetItem name="Cancel" onPress={this.hide} appearance="cancel" separator={false} />
                            </View>
                        </View>
                    )}
                </SAnimated.View>
            </View>
        )
    }
}

export function showSheetModal(render: (ctx: ZModalController) => React.ReactElement<{}>) {
    showModal((modal) => {
        return (
            <ASSafeAreaContext.Consumer>
                {safe => (<SheetModal ctx={modal} modal={render} safe={safe} />)}
            </ASSafeAreaContext.Consumer>
        )
    });
}