import * as React from 'react';
import { View, Animated, LayoutChangeEvent, Dimensions, Vibration } from 'react-native';
import { XPImage } from 'openland-xp/XPImage';
import {
    PanGestureHandler,
    PinchGestureHandler,
    State,
    PanGestureHandlerStateChangeEvent,
    PinchGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

function animate(value: Animated.Value, toValue: number | Animated.Value, velocity: number) {
    Animated.spring(value, {
        velocity: velocity,
        tension: 16,
        friction: 7,
        toValue: toValue,
        useNativeDriver: true,
    }).start();
}

export class ZImagePreview extends React.PureComponent<{ src: string, srcWidth: number, srcHeight: number }> {

    private _contentWidth = new Animated.Value(Dimensions.get('window').width);
    private _contentHeight = new Animated.Value(Dimensions.get('window').height);
    private _centerX = new Animated.Value(Dimensions.get('window').width / 2);
    private _centerY = new Animated.Value(Dimensions.get('window').height / 2);
    private _centerXNeg = Animated.multiply(this._contentWidth, -0.5);
    private _centerYNeg = Animated.multiply(this._contentHeight, -0.5);
    private _maxZoom = 2;
    private _minZoom = 1;

    private _panRef = React.createRef<PanGestureHandler>();
    private _panX = new Animated.Value(0);
    private _panY = new Animated.Value(0);
    private _panEvent = Animated.event([{ nativeEvent: { translationY: this._panY, translationX: this._panX } }], { useNativeDriver: true });

    private _pinchRef = React.createRef<PinchGestureHandler>();
    private _pinchScaleLast = 1;
    private _pinchScale = new Animated.Value(1);
    private _punchBaseScale = new Animated.Value(1);
    private _scale = Animated.multiply(this._punchBaseScale, this._pinchScale);
    private _pinchX = new Animated.Value(0);
    private _pinchY = new Animated.Value(0);
    private _pinchEvent = Animated.event([{ nativeEvent: { scale: this._pinchScale } }], { useNativeDriver: true });

    _handleLayout = (event: LayoutChangeEvent) => {
        this._contentWidth.setValue(event.nativeEvent.layout.width);
        this._contentHeight.setValue(event.nativeEvent.layout.height);
        this._centerX.setValue(event.nativeEvent.layout.width / 2);
        this._centerY.setValue(event.nativeEvent.layout.height / 2);

        // Init zoom
        this._minZoom = Math.min(event.nativeEvent.layout.height / this.props.srcHeight, event.nativeEvent.layout.width / this.props.srcWidth);
        this._maxZoom = this._minZoom * 2;
        this._pinchScaleLast = this._minZoom;
        this._punchBaseScale.setValue(this._minZoom);
        this._pinchX.setValue(event.nativeEvent.layout.width / 2);
        this._pinchY.setValue(event.nativeEvent.layout.height / 2);
    }

    _onPandHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {

            // TODO: Persist and align offset

            animate(this._panX, 0, event.nativeEvent.velocityX);
            animate(this._panY, 0, event.nativeEvent.velocityY);

            console.log('pan release');
        }
    }

    _onPinchHandlerStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            this._pinchX.setValue(event.nativeEvent.focalX);
            this._pinchY.setValue(event.nativeEvent.focalY);
        } else if (event.nativeEvent.oldState === State.ACTIVE) {

            // Persist and align zoom
            let preScale = this._pinchScaleLast * event.nativeEvent.scale;
            if (preScale > this._maxZoom) {
                this._pinchScaleLast = this._maxZoom;
                this._punchBaseScale.setValue(this._pinchScaleLast);
                this._pinchScale.setValue(preScale / this._pinchScaleLast);
                animate(this._pinchScale, 1, event.nativeEvent.velocity);
                ReactNativeHapticFeedback.trigger('impactLight', false);
            } else if (preScale < this._minZoom) {
                this._pinchScaleLast = this._minZoom;
                this._punchBaseScale.setValue(this._pinchScaleLast);
                this._pinchScale.setValue(preScale / this._pinchScaleLast);
                animate(this._pinchScale, 1, event.nativeEvent.velocity);
            } else {
                this._pinchScaleLast = preScale;
                this._punchBaseScale.setValue(this._pinchScaleLast);
                this._pinchScale.setValue(1);
            }

            // Reset Offsets
            animate(this._pinchX, this._centerX, event.nativeEvent.velocity);
            animate(this._pinchY, this._centerY, event.nativeEvent.velocity);

            console.log('zoom release');
        }
    }

    render() {
        return (
            <View width="100%" height="100%" backgroundColor="#000" alignItems="center" justifyContent="center" onLayout={this._handleLayout}>
                <View width="100%" height="100%">
                    <PanGestureHandler
                        onGestureEvent={this._panEvent}
                        onHandlerStateChange={this._onPandHandlerStateChange}
                        simultaneousHandlers={[this._panRef as any]}
                        ref={this._panRef}
                        minPointers={1}
                        maxPointers={2}
                        minDist={0}
                        minDeltaX={0}
                        avgTouches
                    >
                        <Animated.View
                            style={{
                                width: '100%',
                                height: '100%',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transform: [
                                    {
                                        translateX: this._panX
                                    },
                                    {
                                        translateY: this._panY
                                    },
                                ]
                            }}
                        >
                            <PinchGestureHandler
                                ref={this._pinchRef}
                                simultaneousHandlers={[this._panRef as any]}
                                onGestureEvent={this._pinchEvent}
                                onHandlerStateChange={this._onPinchHandlerStateChange}
                            >
                                <Animated.View
                                    collapsable={false}
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transform: [

                                            {
                                                translateX: Animated.add(this._pinchX, this._centerXNeg)
                                            },
                                            {
                                                translateY: Animated.add(this._pinchY, this._centerYNeg)
                                            },
                                            {
                                                scale: this._scale
                                            },
                                            {
                                                translateX: Animated.multiply(Animated.add(this._pinchX, this._centerXNeg), -1)
                                            },
                                            {
                                                translateY: Animated.multiply(Animated.add(this._pinchY, this._centerYNeg), -1)
                                            },

                                        ]
                                    }}
                                >
                                    <Animated.View
                                        style={{
                                            width: this.props.srcWidth,
                                            height: this.props.srcHeight
                                        }}
                                    >
                                        <XPImage
                                            source={{ uuid: this.props.src }}
                                            width={this.props.srcWidth}
                                            height={this.props.srcHeight}
                                            imageSize={{ width: this.props.srcWidth, height: this.props.srcHeight }}
                                        />
                                    </Animated.View>
                                </Animated.View>
                            </PinchGestureHandler>
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </View>
        );
    }
}