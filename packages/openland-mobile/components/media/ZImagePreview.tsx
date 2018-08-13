import * as React from 'react';
import { View, Animated, Text, Platform } from 'react-native';
import { XPImage } from 'openland-xp/XPImage';
import {
    PanGestureHandler,
    PinchGestureHandler,
    State,
    PanGestureHandlerStateChangeEvent,
    PinchGestureHandlerStateChangeEvent,
    TapGestureHandler,
    TapGestureHandlerStateChangeEvent,
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

    private _tapRef = React.createRef<TapGestureHandler>();
    private _doubleTapRef = React.createRef<TapGestureHandler>();

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

        this._minZoom = Math.max(this.props.height / this.props.srcHeight, this.props.width / this.props.srcWidth);
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
        const visibleInsetTop = (containerHeight - this.props.srcHeight * this._minZoom) / 2;
        const visibleInsetBottom = (containerHeight - this.props.srcHeight * this._minZoom) / 2;
        const visibleInsetLeft = (containerWidth - this.props.srcWidth * this._minZoom) / 2;
        const visibleInsetRight = (containerWidth - this.props.srcWidth * this._minZoom) / 2;

        // Animate out of bounds location
        if (visibleLeft > visibleInsetLeft) {
            this._lastPan.x -= visibleLeft - visibleInsetLeft;
            this._panMoverX.setOffset(0);
            this._panMoverX.setValue(visibleLeft - visibleInsetLeft);
            animate(this._panMoverX, 0, 0);
        } else if (visibleRight > visibleInsetRight) {
            this._lastPan.x += visibleRight - visibleInsetRight;
            this._panMoverX.setOffset(0);
            this._panMoverX.setValue(-visibleRight + visibleInsetRight);
            animate(this._panMoverX, 0, 0);
        }
        if (visibleTop > visibleInsetTop) {
            this._lastPan.y -= visibleTop - visibleInsetTop;
            this._panMoverY.setOffset(0);
            this._panMoverY.setValue(visibleTop - visibleInsetTop);
            animate(this._panMoverY, 0, 0);
        } else if (visibleBottom > visibleInsetBottom) {
            this._lastPan.y += visibleBottom - visibleInsetBottom;
            this._panMoverY.setOffset(0);
            this._panMoverY.setValue(-visibleBottom + visibleInsetBottom);
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

    _handleTap = (event: TapGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            console.log('tap');
        }
    }

    _handleDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if ((this._pinchScaleLast - this._minZoom) / 2 < (this._maxZoom - this._minZoom) / 2) {
                this._punchBaseScale.setOffset(0);
                this._punchBaseScale.setValue(this._pinchScaleLast);
                this._pinchScaleLast = this._maxZoom;
                animate(this._punchBaseScale, this._maxZoom, 0);
            } else {
                this._punchBaseScale.setOffset(0);
                this._punchBaseScale.setValue(this._pinchScaleLast);
                this._pinchScaleLast = this._minZoom;
                animate(this._punchBaseScale, this._minZoom, 0);

                this._panX.setOffset(0);
                this._panX.setValue(this._panXCached);
                this._panY.setOffset(0);
                this._panY.setValue(this._panYCached);
                animate(this._panX, 0, 0);
                animate(this._panY, 0, 0);
            }
        }
    }

    render() {

        const content = (
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
        );

        const panZoomedContent = (
            <Animated.View style={{ width: '100%', height: '100%' }}>
                <PanGestureHandler
                    onGestureEvent={this._panEvent}
                    onHandlerStateChange={this._onPandHandlerStateChange}
                    simultaneousHandlers={[this._pinchRef as any]}
                    waitFor={[this._tapRef as any, this._doubleTapRef as any]}
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
                    <Animated.View style={{ width: '100%', height: '100%' }}>
                        <PinchGestureHandler
                            ref={this._pinchRef}
                            simultaneousHandlers={[this._panRef as any]}
                            onGestureEvent={this._pinchEvent}
                            onHandlerStateChange={this._onPinchHandlerStateChange}
                            waitFor={[this._tapRef as any, this._doubleTapRef as any]}
                        >
                            {content}
                        </PinchGestureHandler>
                    </Animated.View>
                </PanGestureHandler>
            </Animated.View>
        );

        let platformContent = panZoomedContent;

        if (Platform.OS === 'ios') {
            platformContent = (
                <TapGestureHandler
                    ref={this._tapRef}
                    maxDeltaX={15}
                    maxDeltaY={15}
                    minPointers={1}
                    maxDurationMs={100}
                    onHandlerStateChange={this._handleTap}
                >
                    <Animated.View style={{ width: '100%', height: '100%' }}>
                        <TapGestureHandler
                            ref={this._doubleTapRef}
                            maxDeltaX={15}
                            maxDeltaY={15}
                            minPointers={1}
                            numberOfTaps={2}
                            maxDurationMs={100}
                            onHandlerStateChange={this._handleDoubleTap}
                            waitFor={[this._tapRef as any]}
                        >
                            {panZoomedContent}
                        </TapGestureHandler>
                    </Animated.View>
                </TapGestureHandler>
            );
        }

        return (
            <View width={this.props.width} height={this.props.height} alignItems="center" justifyContent="center">
                <View width="100%" height="100%" overflow="hidden">
                    {platformContent}
                </View>
            </View>
        );
    }
}