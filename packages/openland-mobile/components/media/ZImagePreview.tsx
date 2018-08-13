import * as React from 'react';
import { View, Animated, Text } from 'react-native';
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
    // Animated.timing(value, {
    //     toValue: toValue,
    //     duration: 300,
    //     useNativeDriver: true
    // }).start();
}

export interface ZImagePreviewProps {
    src: string;
    srcWidth: number;
    srcHeight: number;
    width: number;
    height: number;
}

export class ZImagePreview extends React.PureComponent<ZImagePreviewProps, { debug: string }> {

    private _maxZoom = 2;
    private _minZoom = 1;

    private _panMoverX = new Animated.Value(0);
    private _panMoverY = new Animated.Value(0);
    private _pinchMoverY = new Animated.Value(1);

    private _panStarted = false;
    private _panCompleted = false;
    private _panRef = React.createRef<PanGestureHandler>();
    private _panX = new Animated.Value(0);
    private _panXCached = 0;
    private _panY = new Animated.Value(0);
    private _panYCached = 0;
    private _lastPan: { x: number, y: number } = { x: 0, y: 0 };
    private _panEvent = Animated.event([{ nativeEvent: { translationY: this._panY, translationX: this._panX } }], { useNativeDriver: true });

    private _pinchStarted = false;
    private _pinchCompleted = false;
    private _pinchRef = React.createRef<PinchGestureHandler>();
    private _pinchScaleLast = 1;
    private _pinchScaleLastTransform = 1;
    private _pinchScale = new Animated.Value(1);
    private _punchBaseScale = new Animated.Value(1);

    private _pinchX = new Animated.Value(0);
    private _pinchXRaw = 0;
    private _pinchY = new Animated.Value(0);
    private _pinchYRaw = 0;

    private _pinchEvent = Animated.event([{ nativeEvent: { scale: this._pinchScale } }], { useNativeDriver: true });

    constructor(props: ZImagePreviewProps) {
        super(props);

        this._minZoom = Math.min(this.props.height / this.props.srcHeight, this.props.width / this.props.srcWidth);
        this._maxZoom = this._minZoom * 2;
        this._pinchScaleLast = this._minZoom;
        this._punchBaseScale.setValue(this._minZoom);
        this._pinchX.setValue(0);
        this._pinchY.setValue(0);

        this._panX.addListener((state) => {
            this._panXCached = state.value;
        });
        this._panY.addListener((state) => {
            this._panYCached = state.value;
        });
        this.state = {
            debug: ''
        };
    }

    _onPandHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {

        // Mark pan as started
        if (event.nativeEvent.state === State.ACTIVE) {
            this._panStarted = true;
        }

        // Handle completition
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastPan.x += event.nativeEvent.translationX;
            this._lastPan.y += event.nativeEvent.translationY;

            this._panCompleted = true;
            if ((this._pinchStarted && this._pinchCompleted) || !this._pinchStarted) {
                this._panCompleted = false;
                this._panStarted = false;
                this._pinchStarted = false;
                this._pinchCompleted = false;
                this._handleCompleted();
            }
        }
    }

    _onPinchHandlerStateChange = (event: PinchGestureHandlerStateChangeEvent) => {

        // Start Pinching
        if (event.nativeEvent.state === State.ACTIVE) {
            this._pinchXRaw = (event.nativeEvent.focalX - this.props.width / 2) - this._panXCached;
            this._pinchYRaw = (event.nativeEvent.focalY - this.props.height / 2) - this._panYCached;
            this._pinchX.setValue(this._pinchXRaw);
            this._pinchY.setValue(this._pinchYRaw);
            this._pinchStarted = true;
        }

        // Handle completition
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._pinchScaleLastTransform = event.nativeEvent.scale;
            this._pinchScaleLast = this._pinchScaleLast * event.nativeEvent.scale;
            this._pinchCompleted = true;
            if ((this._panStarted && this._panCompleted) || !this._panStarted) {
                this._panCompleted = false;
                this._panStarted = false;
                this._pinchStarted = false;
                this._pinchCompleted = false;
                this._handleCompleted();
            }
        }
    }

    _handleCompleted = () => {

        //
        // Correct Pan Offset according to our zoom operation
        //

        let px = this._pinchXRaw * (1 - this._pinchScaleLastTransform);
        let py = this._pinchYRaw * (1 - this._pinchScaleLastTransform);
        this._lastPan.x += px;
        this._lastPan.y += py;

        //
        // Commit Pan
        //

        //
        // Commit Pinch
        //

        this._pinchX.setValue(0);
        this._pinchY.setValue(0);
        this._pinchXRaw = 0;
        this._pinchYRaw = 0;
        this._punchBaseScale.setValue(this._pinchScaleLast);
        this._pinchScale.setValue(1);
        this._pinchScaleLastTransform = 1;

        //
        // Fix zoom
        //

        if (this._pinchScaleLast > this._maxZoom) {
            let scale = this._pinchScaleLast / this._maxZoom;
            this._pinchScaleLast = this._maxZoom;
            this._punchBaseScale.setValue(this._pinchScaleLast);
            this._pinchMoverY.setValue(scale);
            animate(this._pinchMoverY, 1, 0);
            ReactNativeHapticFeedback.trigger('impactLight', false);
        } else if (this._pinchScaleLast < this._minZoom) {
            let scale = this._pinchScaleLast / this._minZoom;
            this._pinchScaleLast = this._minZoom;
            this._punchBaseScale.setValue(this._pinchScaleLast);
            this._pinchMoverY.setValue(scale);
            animate(this._pinchMoverY, 1, 0);
            ReactNativeHapticFeedback.trigger('impactLight', false);
        }

        //     let scale = this._pinchScaleLast / this._maxZoom;
        //     console.log('fixed scale from: ' + this._pinchScaleLast);
        //     console.log('fixed scale by: ' + scale);
        //     console.log('fixed scale to: ' + this._maxZoom);

        //     // let px2 = pinchX / this._pinchScaleLast;
        //     // let py2 = pinchY * (1 - scale);
        //     // console.log('px: (' + px2 + ', ' + py2 + ')');

        //     this._punchBaseScale.setValue(this._maxZoom);
        //     this._pinchScaleLast = this._maxZoom;

        //     // this._lastPan.x += pinchX * (1 - scale);
        //     // this._lastPan.y += pinchY * (1 - scale);

        //     // this._panX.setOffset(this._lastPan.x);
        //     // this._panX.setValue(px2);
        //     // this._panXCached = this._lastPan.x;
        //     // this._panY.setOffset(this._lastPan.y);
        //     // this._panY.setValue(py2);
        //     // this._panYCached = this._lastPan.y;

        //     this._pinchScale.setValue(scale);
        //     this._pinchX.setValue(pinchX);
        //     this._pinchY.setValue(pinchY);

        //     animate(this._pinchScale, 1, 0);
        //     animate(this._pinchX, 0, 0);
        //     animate(this._panY, 0, 0);
        // }

        //
        // Fix paddings
        //

        // This calculations are verivied and correct
        const containerWidth = this.props.width;
        const containerHeight = this.props.height;
        const visibleWidth = this.props.srcWidth * this._pinchScaleLast;
        const visibleHeight = this.props.srcHeight * this._pinchScaleLast;
        const visibleLeft = this._lastPan.x + containerWidth / 2 - visibleWidth / 2;
        const visibleTop = this._lastPan.y + containerHeight / 2 - visibleHeight / 2;
        const visibleRight = -(this._lastPan.x - containerWidth / 2 + visibleWidth / 2);
        const visibleBottom = -(this._lastPan.y - containerHeight / 2 + visibleHeight / 2);

        // Animate out of bounds location
        if (visibleLeft > 0) {
            this._lastPan.x -= visibleLeft;
            this._panMoverX.setOffset(0);
            this._panMoverX.setValue(visibleLeft);
            animate(this._panMoverX, 0, 0);
        } else if (visibleRight > 0) {
            this._lastPan.x += visibleRight;
            this._panMoverX.setOffset(0);
            this._panMoverX.setValue(-visibleRight);
            animate(this._panMoverX, 0, 0);
        }
        if (visibleTop > 0) {
            this._lastPan.y -= visibleTop;
            this._panMoverY.setOffset(0);
            this._panMoverY.setValue(visibleTop);
            animate(this._panMoverY, 0, 0);
        } else if (visibleBottom > 0) {
            this._lastPan.y += visibleBottom;
            this._panMoverY.setOffset(0);
            this._panMoverY.setValue(-visibleBottom);
            animate(this._panMoverY, 0, 0);
        }

        // Commit pan
        this._panX.setOffset(this._lastPan.x);
        this._panX.setValue(0);
        this._panXCached = this._lastPan.x;
        this._panY.setOffset(this._lastPan.y);
        this._panY.setValue(0);
        this._panYCached = this._lastPan.y;
    }

    render() {
        return (
            <View width={this.props.width} height={this.props.height} backgroundColor="#000" alignItems="center" justifyContent="center">
                <View width="100%" height="100%" overflow="hidden">
                    <PinchGestureHandler
                        ref={this._pinchRef}
                        simultaneousHandlers={[this._panRef as any]}
                        onGestureEvent={this._pinchEvent}
                        onHandlerStateChange={this._onPinchHandlerStateChange}
                    >
                        <Animated.View
                            style={{
                                width: '100%',
                                height: '100%',
                                backgroundColor: '#f00'
                            }}
                        >
                            <PanGestureHandler
                                onGestureEvent={this._panEvent}
                                onHandlerStateChange={this._onPandHandlerStateChange}
                                simultaneousHandlers={[this._panRef as any]}
                                ref={this._panRef}
                                minPointers={1}
                                maxPointers={2}
                                minDist={0}
                                minDeltaX={0}
                                minDeltaY={0}
                                minOffsetX={0}
                                minOffsetY={0}
                                minVelocityX={0}
                                minVelocityY={0}
                                minVelocity={0}
                                avgTouches={true}
                            >
                                <Animated.View style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center', }}>
                                    <Animated.View
                                        style={{
                                            width: this.props.srcWidth,
                                            height: this.props.srcHeight,
                                            transform: [
                                                {
                                                    translateX: Animated.add(this._panX, this._panMoverX)
                                                },
                                                {
                                                    translateY: Animated.add(this._panY, this._panMoverY)
                                                },
                                                {
                                                    translateX: this._pinchX
                                                },
                                                {
                                                    translateY: this._pinchY
                                                },
                                                {
                                                    scale: this._pinchScale
                                                },
                                                {
                                                    translateX: Animated.multiply(this._pinchX, -1)
                                                },
                                                {
                                                    translateY: Animated.multiply(this._pinchY, -1)
                                                },
                                                {
                                                    scale: Animated.multiply(this._punchBaseScale, this._pinchMoverY)
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
                                </Animated.View>
                            </PanGestureHandler>
                        </Animated.View>
                    </PinchGestureHandler>
                </View>
                <View
                    style={{
                        position: 'absolute',
                        top: 10,
                        left: 10,
                        padding: 10,
                        backgroundColor: '#fff'
                    }}
                >
                    <Text>{this.state.debug}</Text>
                </View>
            </View>
        );
    }
}