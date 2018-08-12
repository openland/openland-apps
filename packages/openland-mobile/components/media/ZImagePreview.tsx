import * as React from 'react';
import { View, Animated } from 'react-native';
import { XPImage } from 'openland-xp/XPImage';
import {
    PanGestureHandler,
    PinchGestureHandler,
    RotationGestureHandler,
    State,
    RotationGestureHandlerStateChangeEvent,
    PanGestureHandlerStateChangeEvent,
    PinchGestureHandlerStateChangeEvent,
} from 'react-native-gesture-handler';

export class ZImagePreview extends React.PureComponent<{ src: string, srcWidth: number, srcHeight: number }> {

    private _panRef = React.createRef<PanGestureHandler>();
    private _panX = new Animated.Value(0);
    private _panY = new Animated.Value(0);
    private _panEvent = Animated.event([{ nativeEvent: { translationY: this._panY, translationX: this._panX } }], { useNativeDriver: true });

    private _rotationRef = React.createRef<RotationGestureHandler>();
    private _rotate = new Animated.Value(0);
    private _rotateX = new Animated.Value(0);
    private _rotateY = new Animated.Value(0);
    private _rotateInterpolated = this._rotate.interpolate({
        inputRange: [-100, 100],
        outputRange: ['-100rad', '100rad'],
    });
    private _rotateEvent = Animated.event([{ nativeEvent: { rotation: this._rotate } }], { useNativeDriver: true });

    private _pinchRef = React.createRef<PinchGestureHandler>();
    private _pinchScale = new Animated.Value(1);
    private _pinchX = new Animated.Value(0);
    private _pinchY = new Animated.Value(0);
    private _pinchEvent = Animated.event([{ nativeEvent: { scale: this._pinchScale } }], { useNativeDriver: true });

    _onRotateHandlerStateChange = (event: RotationGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            this._rotateX.setValue(event.nativeEvent.anchorX);
            this._rotateY.setValue(event.nativeEvent.anchorY);
        } else if (event.nativeEvent.oldState === State.ACTIVE) {

            // TODO: Normalize angle

            Animated.spring(this._rotate, {
                velocity: event.nativeEvent.velocity,
                tension: 3,
                friction: 3.7,
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }

    _onPandHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {

            // TODO: Persist and align offset

            Animated.spring(this._panX, {
                velocity: event.nativeEvent.velocityX,
                tension: 3,
                friction: 3.7,
                toValue: 0,
                useNativeDriver: true,
            }).start();
            Animated.spring(this._panY, {
                velocity: event.nativeEvent.velocityY,
                tension: 3,
                friction: 3.7,
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }

    _onPinchHandlerStateChange = (event: PinchGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            this._pinchX.setValue(event.nativeEvent.focalX);
            this._pinchY.setValue(event.nativeEvent.focalY);
        } else if (event.nativeEvent.oldState === State.ACTIVE) {

            // TODO: Persist and align zoom

            Animated.spring(this._pinchScale, {
                velocity: event.nativeEvent.velocity,
                tension: 3,
                friction: 3.7,
                toValue: 1,
                useNativeDriver: true,
            }).start();
        }
    }

    render() {
        return (
            <View width="100%" height="100%" backgroundColor="#f00" alignItems="center" justifyContent="center">
                <View width={300} height={300}>
                    <PanGestureHandler
                        onGestureEvent={this._panEvent}
                        onHandlerStateChange={this._onPandHandlerStateChange}
                        simultaneousHandlers={[this._rotationRef as any, this._panRef as any]}
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
                            <RotationGestureHandler
                                ref={this._rotationRef}
                                simultaneousHandlers={[this._panRef as any, this._pinchRef as any]}
                                onGestureEvent={this._rotateEvent}
                                onHandlerStateChange={this._onRotateHandlerStateChange}
                            >
                                <Animated.View
                                    style={{
                                        width: '100%',
                                        height: '100%',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        transform: [
                                            {
                                                translateX: Animated.add(this._rotateX, -300 / 2)
                                            },
                                            {
                                                translateY: Animated.add(this._rotateY, -300 / 2)
                                            },
                                            {
                                                rotate: this._rotateInterpolated
                                            },
                                            {
                                                translateX: Animated.multiply(Animated.add(this._rotateX, -300 / 2), -1)
                                            },
                                            {
                                                translateY: Animated.multiply(Animated.add(this._rotateY, -300 / 2), -1)
                                            }
                                        ]
                                    }}
                                >
                                    <PinchGestureHandler
                                        ref={this._pinchRef}
                                        simultaneousHandlers={[this._panRef as any, this._rotationRef as any]}
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
                                                        translateX: Animated.add(this._pinchX, -300 / 2)
                                                    },
                                                    {
                                                        translateY: Animated.add(this._pinchY, -300 / 2)
                                                    },
                                                    {
                                                        scale: this._pinchScale
                                                    },
                                                    {
                                                        translateX: Animated.multiply(Animated.add(this._pinchX, -300 / 2), -1)
                                                    },
                                                    {
                                                        translateY: Animated.multiply(Animated.add(this._pinchY, -300 / 2), -1)
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

                            </RotationGestureHandler>
                        </Animated.View>
                    </PanGestureHandler>
                </View>
            </View>
        );
    }
}