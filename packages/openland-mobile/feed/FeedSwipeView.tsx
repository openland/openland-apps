
import * as React from 'react';
import { View, PanResponderGestureState, PanResponder, Dimensions, Platform } from 'react-native';
import { SAnimated, SAnimatedPropertyName } from 'react-native-s/SAnimated';
import { SAnimatedView } from 'react-native-s/SAnimatedView';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';

interface FeedSwipeViewProps {
    id: string;
    theme: ThemeGlobal;
    onLeftSwiped: () => void;
    onRightSwiped: () => void;
}

type AnimNamesV = 'container' | 'leftBox' | 'leftIconBig' | 'rightBox' | 'rightIconBig';

export class FeedSwipeView extends React.PureComponent<FeedSwipeViewProps> {
    private names: { [key in AnimNamesV]: string };
    private swipeBoxWidth = 64;
    private wasSwiped = false;
    private leftIconShowed = false;
    private rightIconShowed = false;

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

    calcDelta = (dx: number) => dx / 2.5;
    transSwipeBox = (type: 'left' | 'right', dx: number) => (this.calcDelta(dx) + (type === 'left' ? -this.swipeBoxWidth : this.swipeBoxWidth)) / 2;
    needTransSwipeBox = (type: 'left' | 'right', dx: number) => (type === 'left') ? (this.calcDelta(dx) > this.swipeBoxWidth) : (this.calcDelta(dx) < -this.swipeBoxWidth);

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
                this.animate('leftIconBig', 'opacity', 0, 1);
                this.leftIconShowed = true;

                this.props.onLeftSwiped();
            }

            if (type === 'right') {
                this.animate('rightIconBig', 'opacity', 0, 1);
                this.rightIconShowed = true;

                this.props.onRightSwiped();
            }

            SAnimated.commitTransaction();
        }
    }

    onGestureCancelled = (gesture: PanResponderGestureState) => {
        this.wasSwiped = false;

        const { dx, vx } = gesture;
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
            this.animate('leftIconBig', 'opacity', 1, 0);
            this.leftIconShowed = false;
        }

        if (this.needTransSwipeBox('right', dx)) {
            this.animate('rightBox', 'translateX', this.transSwipeBox('right', dx), 0, durationSpring);
        }

        if (this.rightIconShowed) {
            this.animate('rightIconBig', 'opacity', 1, 0);
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
            const { dx } = gesture;

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
                    style={{ position: 'absolute', top: 0, width: this.swipeBoxWidth + 16, bottom: 0, left: 0, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: theme.backgroundTertiary }}>
                        <SAnimatedView
                            name={this.names.leftIconBig}
                            style={{ position: 'absolute', top: -6, left: -6, width: 60, height: 60, borderRadius: 30, backgroundColor: theme.accentNegative, opacity: 0 }}
                        />
                    </View>
                </SAnimatedView>

                <SAnimatedView
                    name={this.names.rightBox}
                    style={{ position: 'absolute', top: 0, width: this.swipeBoxWidth + 16, bottom: 0, right: 0, alignItems: 'center', justifyContent: 'center' }}
                >
                    <View style={{ width: 48, height: 48, borderRadius: 24, backgroundColor: theme.backgroundTertiary }}>
                        <SAnimatedView
                            name={this.names.rightIconBig}
                            style={{ position: 'absolute', top: -6, left: -6, width: 60, height: 60, borderRadius: 30, backgroundColor: theme.accentNegative, opacity: 0 }}
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