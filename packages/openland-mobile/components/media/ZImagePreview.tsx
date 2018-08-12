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
} from 'react-native-gesture-handler';

export class ZImagePreview extends React.PureComponent<{ src: string, srcWidth: number, srcHeight: number }> {

    private _panRef = React.createRef<PanGestureHandler>();
    private _lastPan: { x: number, y: number } = { x: 0, y: 0 };
    private _panX = new Animated.Value(0);
    private _panY = new Animated.Value(0);
    private _panEvent = Animated.event(
        [{ nativeEvent: { translationY: this._panY, translationX: this._panX } }],
        { useNativeDriver: true }
    );

    private _rotationRef = React.createRef<RotationGestureHandler>();
    private _lastRotate = 0;
    private _rotate = new Animated.Value(0);
    private _rotateX = new Animated.Value(0);
    private _rotateY = new Animated.Value(0);
    private _rotateInterpolated = this._rotate.interpolate({
        inputRange: [-100, 100],
        outputRange: ['-100rad', '100rad'],
    });
    private _rotateEvent = Animated.event(
        [
            { nativeEvent: { rotation: this._rotate } }
        ],
        { useNativeDriver: true }
    );

    _onRotateHandlerStateChange = (event: RotationGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            this._rotateX.setValue(event.nativeEvent.anchorX);
            this._rotateY.setValue(event.nativeEvent.anchorY);
        } else if (event.nativeEvent.oldState === State.ACTIVE) {
            // this._lastRotate += event.nativeEvent.rotation;
            // this._rotate.setOffset(this._lastRotate);
            // this._rotate.setValue(0);

            Animated.spring(this._rotate, {
                velocity: event.nativeEvent.velocity,
                tension: 3,
                friction: 3.7,
                // bounciness: 0.3,
                // mass: 10,
                // damping: 0.7,
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }

    // componentWillMount() {
    //     this._panX.addListener((v) => {
    //         console.log(v);
    //     });
    //     this._panY.addListener((v) => {
    //         console.log(v);
    //     });
    // }

    _onPandHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.oldState === State.ACTIVE) {
            // this._lastPan = { x: this._lastPan.x + event.nativeEvent.};
            // this._rotate.setOffset(this._lastRotate);
            // this._rotate.setValue(0);

            Animated.spring(this._panX, {
                velocity: event.nativeEvent.velocityX,
                tension: 3,
                friction: 3.7,
                // bounciness: 0.3,
                // mass: 10,
                // damping: 0.7,
                toValue: 0,
                useNativeDriver: true,
            }).start();
            Animated.spring(this._panY, {
                velocity: event.nativeEvent.velocityY,
                tension: 3,
                friction: 3.7,
                // bounciness: 0.3,
                // mass: 10,
                // damping: 0.7,
                toValue: 0,
                useNativeDriver: true,
            }).start();
        }
    }

    render() {
        return (
            <View width="100%" height="100%" backgroundColor="#f00" alignItems="center" justifyContent="center">
                <PanGestureHandler
                    onGestureEvent={this._panEvent}
                    onHandlerStateChange={this._onPandHandlerStateChange}
                    simultaneousHandlers={this._rotationRef as any}
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
                            justifyContent: 'center'
                        }}
                    >
                        <RotationGestureHandler
                            ref={this._rotationRef}
                            simultaneousHandlers={this._panRef as any}
                            onGestureEvent={this._rotateEvent}
                            onHandlerStateChange={this._onRotateHandlerStateChange}
                        >
                            <Animated.View
                                style={{
                                    width: this.props.srcWidth,
                                    height: this.props.srcHeight,
                                    transform: [
                                        {
                                            translateX: this._panX
                                        },
                                        {
                                            translateY: this._panY
                                        },
                                        {
                                            translateX: Animated.add(this._rotateX, -this.props.srcWidth / 2)
                                        },
                                        {
                                            translateY: Animated.add(this._rotateY, -this.props.srcHeight / 2)
                                        },
                                        {
                                            rotate: this._rotateInterpolated
                                        },
                                        {
                                            translateX: Animated.multiply(Animated.add(this._rotateX, -this.props.srcWidth / 2), -1)
                                        },
                                        {
                                            translateY: Animated.multiply(Animated.add(this._rotateY, -this.props.srcHeight / 2), -1)
                                        },
                                    ]
                                }}
                            >
                                <XPImage
                                    source={{ uuid: this.props.src }}
                                    width={this.props.srcWidth}
                                    height={this.props.srcHeight}
                                    imageSize={{ width: this.props.srcWidth, height: this.props.srcHeight }}
                                />
                            </Animated.View>
                        </RotationGestureHandler>
                    </Animated.View>
                </PanGestureHandler>
            </View>
        );
    }
}