import * as React from 'react';
import { View, PanResponderGestureState, PanResponder, Dimensions, Platform, ScrollView, StyleSheet, ViewStyle } from 'react-native';
import { SAnimated, SAnimatedPropertyName } from 'react-native-s/SAnimated';
import { SAnimatedView } from 'react-native-s/SAnimatedView';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

const SWIPE_BOX_WIDTH = 64;
const IGNORE_DISTANCE = 25;

const styles = StyleSheet.create({
    swipeBox: {
        position: 'absolute',
        top: 0, bottom: 0,
        width: SWIPE_BOX_WIDTH + 16,
        alignItems: 'center',
        justifyContent: 'center'
    } as ViewStyle,
    swipeIcon: {
        width: 48, height: 48,
        borderRadius: 24,
    } as ViewStyle,
    swipeIconBig: {
        position: 'absolute',
        top: -6, left: -6,
        width: 60, height: 60,
        borderRadius: 30,
        opacity: 0
    } as ViewStyle,
});

interface FeedSwipeViewProps {
    id: string;
    theme: ThemeGlobal;
    onLeftSwiped: () => void;
    onRightSwiped: () => void;
    scrollRef: React.RefObject<ScrollView>;
}

type AnimNamesV = 'container' | 'leftBox' | 'leftIconBig' | 'rightBox' | 'rightIconBig';

export class FeedSwipeView extends React.PureComponent<FeedSwipeViewProps> {
    private names: { [key in AnimNamesV]: string };
    private wasSwiped = false;
    private leftIconShowed = false;
    private rightIconShowed = false;
    private scrollEnabled = true;

    constructor(props: FeedSwipeViewProps) {
        super(props);

        this.names = {
            container: `f-${props.id}-container`,
            leftBox: `f-${props.id}-left`,
            leftIconBig: `f-${props.id}-left-icon-big`,
            rightBox: `f-${props.id}-right`,
            rightIconBig: `f-${props.id}-right-icon-big`,
        };
    }

    scroll = (scrollEnabled: boolean) => {
        const { current } = this.props.scrollRef;

        if (current) {
            this.scrollEnabled = scrollEnabled;

            (current as any).setNativeProps({ scrollEnabled });
        }
    }

    disableScroll = () => {
        if (this.scrollEnabled) {
            this.scroll(false);
        }
    }

    enableScroll = () => {
        if (!this.scrollEnabled) {
            this.scroll(true);
        }
    }

    filterDx = (dx: number) => {
        if (dx > 0) {
            return dx < IGNORE_DISTANCE ? 0 : dx - IGNORE_DISTANCE;
        }

        return dx > -IGNORE_DISTANCE ? 0 : dx + IGNORE_DISTANCE;
    }

    calcDelta = (dx: number) => dx / 2;
    transSwipeBox = (type: 'left' | 'right', dx: number) => (this.calcDelta(dx) + (type === 'left' ? -SWIPE_BOX_WIDTH : SWIPE_BOX_WIDTH)) / 2;
    needTransSwipeBox = (type: 'left' | 'right', dx: number) => (type === 'left') ? (this.calcDelta(dx) > SWIPE_BOX_WIDTH) : (this.calcDelta(dx) < -SWIPE_BOX_WIDTH);

    animate = (name: AnimNamesV, property: SAnimatedPropertyName, from: number, to: number, duration?: number) => {
        if (Platform.OS === 'ios') {
            SAnimated.spring(this.names[name], { property, from, to, duration });
        } else {
            SAnimated.timing(this.names[name], { property, from, to });
        }
    }

    onSwipe = (type: 'left' | 'right') => {
        if (!this.wasSwiped) {
            this.wasSwiped = true;

            ReactNativeHapticFeedback.trigger('impactLight', { ignoreAndroidSystemSettings: false });

            SAnimated.beginTransaction();

            if (type === 'left') {
                SAnimated.setValue(this.names.leftIconBig, 'opacity', 1);
                this.leftIconShowed = true;

                this.props.onLeftSwiped();
            }

            if (type === 'right') {
                SAnimated.setValue(this.names.rightIconBig, 'opacity', 1);
                this.rightIconShowed = true;

                this.props.onRightSwiped();
            }

            SAnimated.commitTransaction();
        }
    }

    onGestureCancelled = (gesture: PanResponderGestureState) => {
        this.enableScroll();
        this.wasSwiped = false;

        const { vx } = gesture;
        const dx = this.filterDx(gesture.dx);
        const translate = this.calcDelta(dx);

        const width = Dimensions.get('screen').width;
        const duration = Math.max(0.05, Math.min(0.2, Math.abs(-width / 3 + dx / 3) / Math.abs(vx * width)));
        const durationSpring = duration * 1000;

        SAnimated.beginTransaction();

        this.animate('container', 'translateX', translate, 0, durationSpring);

        if (this.needTransSwipeBox('left', dx)) {
            this.animate('leftBox', 'translateX', this.transSwipeBox('left', dx), 0, durationSpring);
        }

        if (this.leftIconShowed) {
            SAnimated.setValue(this.names.leftIconBig, 'opacity', 0);
            this.leftIconShowed = false;
        }

        if (this.needTransSwipeBox('right', dx)) {
            this.animate('rightBox', 'translateX', this.transSwipeBox('right', dx), 0, durationSpring);
        }

        if (this.rightIconShowed) {
            SAnimated.setValue(this.names.rightIconBig, 'opacity', 0);
            this.rightIconShowed = false;
        }

        SAnimated.commitTransaction();
    }

    panResponder = PanResponder.create({
        onPanResponderGrant: () => {
            // console.warn('boom onPanResponderGrant');
        },
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (event, gesture) => {
            const dx = this.filterDx(gesture.dx);

            if (dx !== 0) {
                this.disableScroll();
            }

            SAnimated.beginTransaction();
            SAnimated.setValue(this.names.container, 'translateX', this.calcDelta(dx));

            if (this.needTransSwipeBox('left', dx)) {
                this.onSwipe('left');

                SAnimated.setValue(this.names.leftBox, 'translateX', this.transSwipeBox('left', dx));
            }

            if (this.needTransSwipeBox('right', dx)) {
                this.onSwipe('right');

                SAnimated.setValue(this.names.rightBox, 'translateX', this.transSwipeBox('right', dx));
            }

            SAnimated.commitTransaction();
        },
        onPanResponderRelease: (event, gesture) => {
            this.onGestureCancelled(gesture);
        },
        onPanResponderTerminate: (event, gesture) => {
            this.onGestureCancelled(gesture);
        },
        onPanResponderReject: (event, gesture) => {
            this.onGestureCancelled(gesture);
        },
        onPanResponderTerminationRequest: () => false,
    });

    render() {
        const { theme, children } = this.props;

        return (
            <View {...this.panResponder.panHandlers}>
                <SAnimatedView
                    name={this.names.leftBox}
                    style={[styles.swipeBox, { left: 0 }]}
                >
                    <View style={[styles.swipeIcon, { backgroundColor: theme.backgroundTertiary }]}>
                        <SAnimatedView
                            name={this.names.leftIconBig}
                            style={[styles.swipeIconBig, { backgroundColor: theme.accentNegative }]}
                        />
                    </View>
                </SAnimatedView>

                <SAnimatedView
                    name={this.names.rightBox}
                    style={[styles.swipeBox, { right: 0 }]}
                >
                    <View style={[styles.swipeIcon, { backgroundColor: theme.backgroundTertiary }]}>
                        <SAnimatedView
                            name={this.names.rightIconBig}
                            style={[styles.swipeIconBig, { backgroundColor: theme.accentNegative }]}
                        />
                    </View>
                </SAnimatedView>

                <SAnimatedView name={this.names.container}>
                    {children}
                </SAnimatedView>
            </View>
        );
    }
}