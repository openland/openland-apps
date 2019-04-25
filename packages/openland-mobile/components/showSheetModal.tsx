import * as React from 'react';
import { ZModalController, showModal, ZModal } from './ZModal';
import { View, TouchableWithoutFeedback, LayoutChangeEvent, BackHandler, Platform, ScrollView, Dimensions, PlatformIOS } from 'react-native';
import { SAnimated } from 'react-native-s/SAnimated';
import { randomKey } from 'react-native-s/utils/randomKey';
import { SAnimatedShadowView } from 'react-native-s/SAnimatedShadowView';
import { ASSafeAreaContext, ASSafeArea } from 'react-native-async-view/ASSafeAreaContext';
import { ZActionSheetItem } from './ZActionSheetItem';
import { ZBlurredView } from './ZBlurredView';
import { isPad } from 'openland-mobile/pages/Root';
import { AppTheme } from 'openland-mobile/themes/themes';
import { XMemo } from 'openland-y-utils/XMemo';
import { ThemeContext } from 'openland-mobile/themes/ThemeContext';

class SheetModal extends React.PureComponent<{ modal: ZModal, ctx: ZModalController, safe: ASSafeArea, flat: boolean, theme: AppTheme }> implements ZModalController {

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

        if (!isPad) {
            this.contentView.translateY = event.nativeEvent.layout.height;
        } else {
            SAnimated.setPropertyAnimator((name, prop, from, to) => {
                SAnimated.spring(name, {
                    property: prop,
                    from: from,
                    to: to,
                });
            });
        }

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

        if (!isPad) {
            this.contentView.translateY = 0;
        }

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

        if (!isPad) {
            this.contentView.translateY = this.contentHeight;
        }

        this.contentView.opacity = 0;
        this.bgView.opacity = 0;
        SAnimated.commitTransaction(() => { this.props.ctx.hide(); });
    }

    render() {
        const maxScrollHeight = Dimensions.get('screen').height - this.props.safe.top - this.props.safe.bottom - 100;

        return (
            <View width="100%" height="100%" flexDirection="column" alignItems="stretch" justifyContent={isPad ? 'center' : 'flex-end'}>
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
                    pointerEvents={isPad ? 'box-none' : undefined}
                >
                    {this.props.flat && (
                        <>
                            {!isPad && (
                                <View
                                    backgroundColor="#ffffff"
                                    borderTopRightRadius={12}
                                    borderTopLeftRadius={12}
                                    paddingBottom={Platform.select({ ios: undefined, android: this.props.safe.bottom + 8 })}
                                    onLayout={this.onLayout}
                                    overflow="hidden"
                                >
                                    <ScrollView alwaysBounceVertical={false} maxHeight={maxScrollHeight} contentContainerStyle={{ paddingBottom: Platform.select({ ios: this.props.safe.bottom, android: undefined }) }}>
                                        {this.contents}
                                    </ScrollView>
                                </View>
                            )}
                            {isPad && (
                                <View
                                    borderRadius={14}
                                    marginHorizontal={10}
                                    overflow="hidden"
                                    width={350}
                                    alignSelf="center"
                                    backgroundColor="#ffffff"
                                    onLayout={this.onLayout}
                                >
                                    <ScrollView alwaysBounceVertical={false} maxHeight={maxScrollHeight}>
                                        {this.contents}
                                    </ScrollView>
                                </View>
                            )}
                        </>
                    )}
                    {!this.props.flat && (
                        <View onLayout={this.onLayout} pointerEvents={isPad ? 'box-none' : undefined}>
                            {!isPad && (
                                <>
                                    <ZBlurredView
                                        intensity="high"
                                        borderRadius={14}
                                        marginHorizontal={10}
                                        overflow="hidden"
                                    >
                                        <ScrollView alwaysBounceVertical={false} maxHeight={maxScrollHeight}>
                                            {this.contents}
                                        </ScrollView>
                                    </ZBlurredView>
                                    <ZBlurredView
                                        borderRadius={14}
                                        marginBottom={this.props.safe.bottom || 10}
                                        marginTop={10}
                                        marginHorizontal={10}
                                        overflow="hidden"
                                    >
                                        <ZActionSheetItem name="Cancel" onPress={this.hide} appearance="cancel" separator={false} />
                                    </ZBlurredView>
                                </>
                            )}
                            {isPad && (
                                <ZBlurredView
                                    intensity="high"
                                    borderRadius={14}
                                    overflow="hidden"
                                    width={350}
                                    alignSelf="center"
                                >
                                    <ScrollView alwaysBounceVertical={false} maxHeight={maxScrollHeight}>
                                        {this.contents}

                                        <ZActionSheetItem name="Cancel" onPress={this.hide} appearance="cancel" separator={false} />
                                    </ScrollView>
                                </ZBlurredView>
                            )}
                        </View>
                    )}
                </SAnimated.View>
            </View>
        )
    }
}

const ThemedSheetModal = XMemo((props: { modal: ZModalController, render: (ctx: ZModalController) => React.ReactElement<{}>, flat: boolean, safe: ASSafeArea }) => {
    let theme = React.useContext(ThemeContext);
    return <SheetModal ctx={props.modal} modal={props.render} safe={props.safe} flat={props.flat} theme={theme} />
})

export function showSheetModal(render: (ctx: ZModalController) => React.ReactElement<{}>, flat: boolean) {
    showModal((modal) => {
        return (
            <ASSafeAreaContext.Consumer>
                {safe => <ThemedSheetModal render={render} safe={safe} flat={flat} modal={modal} />}
            </ASSafeAreaContext.Consumer>
        )
    });
}