import * as React from 'react';
import { View, Animated, Platform } from 'react-native';
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

export interface FastImageViewerProps {
    srcWidth: number;
    srcHeight: number;
    width: number;
    height: number;
    startLayout?: { x: number, y: number, height: number, width: number };
    startLayoutRenderer?: (onLoad: () => void) => React.ReactElement<{}>;
    children: (onLoad: () => void) => React.ReactElement<{}>;
    background?: boolean;
    onTap?: () => void;
    onStarting?: () => void;
    onClosed?: () => void;
    onClosing?: () => void;
}

export class FastImageViewer extends React.PureComponent<FastImageViewerProps> {

    private _tapRef = React.createRef<TapGestureHandler>();
    private _doubleTapRef = React.createRef<TapGestureHandler>();

    private _imageLoaded = false;
    private _imagePreviewLoaded = false;

    private _loadingOpacity = new Animated.Value(0);
    private _transitionOpacity = new Animated.Value(1);
    private _transitionOpacityMain = this._transitionOpacity.interpolate({
        inputRange: [0.2, 1],
        outputRange: [0, 1],
        extrapolate: 'clamp'
    });
    private _transitionOpacityPreview = this._transitionOpacity.interpolate({
        inputRange: [0, 0.9, 1],
        outputRange: [1, 1, 0],
        extrapolate: 'clamp'
    });
    private _transitionZoomMoverX = new Animated.Value(1);
    private _transitionZoomMoverY = new Animated.Value(1);
    private _transitionOffsetMoverX = new Animated.Value(0);
    private _transitionOffsetMoverY = new Animated.Value(0);

    private _maxZoom = 2;
    private _minZoom = 1;

    private _panMoverX = new Animated.Value(0);
    private _panMoverY = new Animated.Value(0);
    private _pinchMover = new Animated.Value(1);

    private _panStarted = false;
    private _panCompleted = false;
    private _panRef = React.createRef<PanGestureHandler>();
    private _panX = new Animated.Value(0);
    private _panXCached = 0;
    private _panY = new Animated.Value(0);
    private _panYCached = 0;
    private _lastPan: { x: number, y: number } = { x: 0, y: 0 };
    private _panEvent = Animated.event([{ nativeEvent: { translationY: this._panY, translationX: this._panX } }], { useNativeDriver: true });
    private _panLastVelocityX = 0;
    private _panLastVelocityY = 0;

    private _pinchStarted = false;
    private _pinchCompleted = false;
    private _pinchRef = React.createRef<PinchGestureHandler>();
    private _pinchScaleLast = 1;
    private _pinchScaleLastTransform = 1;
    private _pinchScale = new Animated.Value(1);
    private _punchBaseScale = new Animated.Value(1);
    private _pinchLastVelocity = 0;

    private _pinchX = new Animated.Value(0);
    private _pinchXRaw = 0;
    private _pinchY = new Animated.Value(0);
    private _pinchYRaw = 0;

    private _pinchEvent = Animated.event([{ nativeEvent: { scale: this._pinchScale } }], { useNativeDriver: true });

    private transitioning = false;

    constructor(props: FastImageViewerProps) {
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

        // 
        if (this.props.startLayout) {
            if (!this.props.startLayoutRenderer) {
                this._imagePreviewLoaded = true;
            }
            this.transitioning = true;
        } else {
            this.transitioning = false;
        }
    }

    private handlePreviewLoaded = () => {
        if (this._imagePreviewLoaded) {
            return;
        }
        this._imagePreviewLoaded = true;
        if (this._imageLoaded) {
            this.handleReady();
        }
    }

    private handleFullLoaded = () => {
        if (this._imageLoaded) {
            return;
        }
        this._imageLoaded = true;
        if (this._imagePreviewLoaded) {
            this.handleReady();
        }
    }

    private handleReady = () => {
        this._loadingOpacity.setValue(1);
        if (this.props.startLayout) {
            this._transitionOffsetMoverX.setValue(this.props.startLayout.x - this.props.width / 2 + this.props.startLayout.width / 2);
            this._transitionOffsetMoverY.setValue(this.props.startLayout.y - this.props.height / 2 + this.props.startLayout.height / 2);
            this._transitionZoomMoverX.setValue(this.props.startLayout.width / this.props.srcWidth / this._minZoom);
            this._transitionZoomMoverY.setValue(this.props.startLayout.height / this.props.srcHeight / this._minZoom);
            this._transitionOpacity.setValue(0);

            Animated.parallel([
                Animated.spring(this._transitionOpacity, {
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.spring(this._transitionOffsetMoverX, {
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.spring(this._transitionOffsetMoverY, {
                    toValue: 0,
                    useNativeDriver: true
                }),
                Animated.spring(this._transitionZoomMoverX, {
                    toValue: 1,
                    useNativeDriver: true
                }),
                Animated.spring(this._transitionZoomMoverY, {
                    toValue: 1,
                    useNativeDriver: true
                })
            ]).start();

            setTimeout(() => {
                if (this.props.onStarting) {
                    this.props.onStarting();
                }
            });

            setTimeout(
                () => {
                    this.transitioning = false;
                },
                100
            );
        }
    }

    close = () => {
        if (this.transitioning) {
            return;
        }
        if (this.props.startLayout) {
            if (this.props.onClosing) {
                this.props.onClosing();
            }
            // Reset all varialbles and reverse starting animation
            this._panX.flattenOffset();
            this._panY.flattenOffset();
            this._pinchX.flattenOffset();
            this._pinchY.flattenOffset();
            Animated.parallel([
                Animated.spring(this._transitionOpacity, {
                    toValue: 0,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._panX, {
                    toValue: 0,
                    useNativeDriver: true,
                    overshootClamping: true,
                    velocity: this._panLastVelocityX,
                }),
                Animated.spring(this._panY, {
                    toValue: 0,
                    useNativeDriver: true,
                    overshootClamping: true,
                    velocity: this._panLastVelocityY
                }),
                Animated.spring(this._pinchX, {
                    toValue: 0,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._pinchY, {
                    toValue: 0,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._panMoverX, {
                    toValue: 0,
                    velocity: this._panLastVelocityX,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._panMoverY, {
                    toValue: 0,
                    velocity: this._panLastVelocityY,
                    useNativeDriver: true,
                    overshootClamping: true
                }),

                Animated.spring(this._pinchScale, {
                    toValue: 1,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._punchBaseScale, {
                    toValue: this._minZoom,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._pinchMover, {
                    toValue: 1,
                    useNativeDriver: true,
                    overshootClamping: true
                }),

                Animated.spring(this._transitionOffsetMoverX, {
                    toValue: (this.props.startLayout.x - this.props.width / 2 + this.props.startLayout.width / 2),
                    velocity: this._panLastVelocityX,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._transitionOffsetMoverY, {
                    toValue: (this.props.startLayout.y - this.props.height / 2 + this.props.startLayout.height / 2),
                    velocity: this._panLastVelocityY,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._transitionZoomMoverX, {
                    toValue: this.props.startLayout.width / this.props.srcWidth / this._minZoom,
                    useNativeDriver: true,
                    overshootClamping: true
                }),
                Animated.spring(this._transitionZoomMoverY, {
                    toValue: this.props.startLayout.height / this.props.srcHeight / this._minZoom,
                    useNativeDriver: true,
                    overshootClamping: true
                })
            ]).start();

            this.transitioning = true;
            setTimeout(() => { this.props.onClosed!!(); }, 350);
        } else {
            if (this.props.onClosed) {
                this.props.onClosed();
            }
        }
    }

    private _onPandHandlerStateChange = (event: PanGestureHandlerStateChangeEvent) => {

        // Mark pan as started
        if (event.nativeEvent.state === State.ACTIVE) {
            this._panStarted = true;
        }

        // Handle completition
        if (event.nativeEvent.oldState === State.ACTIVE) {
            this._lastPan.x += event.nativeEvent.translationX;
            this._lastPan.y += event.nativeEvent.translationY;

            this._panLastVelocityX = event.nativeEvent.velocityX;
            this._panLastVelocityY = event.nativeEvent.velocityY;

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

    private _onPinchHandlerStateChange = (event: PinchGestureHandlerStateChangeEvent) => {

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
            this._pinchLastVelocity = event.nativeEvent.velocity;
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

    private _handleCompleted = () => {
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

        let canCancel = false;
        if (this._pinchScaleLast > this._maxZoom) {
            let scale = this._pinchScaleLast / this._maxZoom;
            this._pinchScaleLast = this._maxZoom;
            this._punchBaseScale.setValue(this._pinchScaleLast);
            this._pinchMover.setValue(scale);
            animate(this._pinchMover, 1, this._pinchLastVelocity);
            ReactNativeHapticFeedback.trigger('impactLight', false);
        } else if (this._pinchScaleLast < this._minZoom) {
            let scale = this._pinchScaleLast / this._minZoom;
            this._pinchScaleLast = this._minZoom;
            this._punchBaseScale.setValue(this._pinchScaleLast);
            this._pinchMover.setValue(scale);
            animate(this._pinchMover, 1, this._pinchLastVelocity);
            ReactNativeHapticFeedback.trigger('impactLight', false);
        } else if (this._pinchScaleLast === this._minZoom) {
            canCancel = true;
        }
        this._pinchLastVelocity = 0;

        // Closing
        if (canCancel) {

            // Simple fling
            let conditionsMet = false;
            if (Math.abs(this._panLastVelocityY) > 10) {
                conditionsMet = true;
            }

            // Zooming
            // TODO: Implement

            if (conditionsMet) {
                this._panX.setOffset(this._lastPan.x);
                this._panX.setValue(0);
                this._panXCached = this._lastPan.x;
                this._panY.setOffset(this._lastPan.y);
                this._panY.setValue(0);
                this._panYCached = this._lastPan.y;
                this.close();
                return;
            }
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
            animate(this._panMoverX, 0, this._panLastVelocityX);
        } else if (visibleRight > visibleInsetRight) {
            this._lastPan.x += visibleRight - visibleInsetRight;
            this._panMoverX.setOffset(0);
            this._panMoverX.setValue(-visibleRight + visibleInsetRight);
            animate(this._panMoverX, 0, this._panLastVelocityX);
        }
        if (visibleTop > visibleInsetTop) {
            this._lastPan.y -= visibleTop - visibleInsetTop;
            this._panMoverY.setOffset(0);
            this._panMoverY.setValue(visibleTop - visibleInsetTop);
            animate(this._panMoverY, 0, this._panLastVelocityY);
        } else if (visibleBottom > visibleInsetBottom) {
            this._lastPan.y += visibleBottom - visibleInsetBottom;
            this._panMoverY.setOffset(0);
            this._panMoverY.setValue(-visibleBottom + visibleInsetBottom);
            animate(this._panMoverY, 0, this._panLastVelocityY);
        }
        this._panLastVelocityX = 0;
        this._panLastVelocityY = 0;

        // Commit pan
        this._panX.setOffset(this._lastPan.x);
        this._panX.setValue(0);
        this._panXCached = this._lastPan.x;
        this._panY.setOffset(this._lastPan.y);
        this._panY.setValue(0);
        this._panYCached = this._lastPan.y;
    }

    private _handleTap = (event: TapGestureHandlerStateChangeEvent) => {
        if (event.nativeEvent.state === State.ACTIVE) {
            if (this.props.onTap) {
                this.props.onTap();
            }
        }
    }

    private _handleDoubleTap = (event: TapGestureHandlerStateChangeEvent) => {
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
                        opacity: this._loadingOpacity,
                        transform: [
                            {
                                translateX: this._transitionOffsetMoverX
                            },
                            {
                                translateY: this._transitionOffsetMoverY
                            },
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
                                scale: Animated.multiply(this._punchBaseScale, this._pinchMover)
                            },
                            {
                                scaleX: this._transitionZoomMoverX
                            },
                            {
                                scaleY: this._transitionZoomMoverY
                            }
                        ]
                    }}
                >
                    <Animated.View
                        style={{
                            opacity: this._transitionOpacityMain
                        }}
                    >
                        {this.props.children(this.handleFullLoaded)}
                    </Animated.View>
                    {this.props.startLayoutRenderer && this.props.startLayout && (
                        <Animated.View
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: this.props.srcWidth,
                                height: this.props.srcHeight,
                                opacity: this._transitionOpacityPreview
                            }}
                        >
                            <View
                                style={{
                                    width: this.props.startLayout.width,
                                    height: this.props.startLayout.height,
                                    transform: [
                                        {
                                            translateX: this.props.srcWidth / 2 - this.props.startLayout.width / 2
                                        },
                                        {
                                            translateY: this.props.srcHeight / 2 - this.props.startLayout.height / 2
                                        },
                                        {
                                            scaleX: this.props.srcWidth / this.props.startLayout.width
                                        },
                                        {
                                            scaleY: this.props.srcHeight / this.props.startLayout.height
                                        },
                                    ]
                                }}
                            >
                                {this.props.startLayoutRenderer(this.handlePreviewLoaded)}
                            </View>
                        </Animated.View>
                    )}
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
                    waitFor={[this._doubleTapRef as any]}
                >
                    <Animated.View style={{ width: '100%', height: '100%' }}>
                        <TapGestureHandler
                            ref={this._doubleTapRef}
                            maxDeltaX={15}
                            maxDeltaY={15}
                            minPointers={1}
                            numberOfTaps={2}
                            // maxDurationMs={100}
                            onHandlerStateChange={this._handleDoubleTap}
                        >
                            {panZoomedContent}
                        </TapGestureHandler>
                    </Animated.View>
                </TapGestureHandler>
            );
        }

        const sourceOffsetX = Animated.add(this._panX, this._panMoverX);
        const sourceOffsetY = Animated.add(this._panY, this._panMoverY);
        const containerWidth = this.props.width;
        const containerHeight = this.props.height;
        const visibleWidth = Animated.multiply(this.props.srcWidth, this._punchBaseScale);
        const visibleHeight = Animated.multiply(this.props.srcHeight, this._punchBaseScale);
        const visibleLeft = Animated.add(Animated.add(sourceOffsetX, containerWidth / 2), Animated.multiply(visibleWidth, -1 / 2));
        const visibleTop = Animated.add(Animated.add(sourceOffsetY, containerHeight / 2), Animated.multiply(visibleHeight, -1 / 2));
        const visibleRight = Animated.multiply(Animated.add(Animated.add(sourceOffsetX, -containerWidth / 2), Animated.multiply(visibleWidth, 1 / 2)), -1);
        const visibleBottom = Animated.multiply(Animated.add(Animated.add(sourceOffsetY, -containerHeight / 2), Animated.multiply(visibleHeight, 1 / 2)), -1);
        const visibleInsetTop = (containerHeight - this.props.srcHeight * this._minZoom) / 2;
        const visibleInsetBottom = (containerHeight - this.props.srcHeight * this._minZoom) / 2;
        const visibleInsetLeft = (containerWidth - this.props.srcWidth * this._minZoom) / 2;
        const visibleInsetRight = (containerWidth - this.props.srcWidth * this._minZoom) / 2;

        const overscrollTop = visibleTop.interpolate({
            inputRange: [visibleInsetTop - 44, visibleInsetTop],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const overscrollLeft = visibleLeft.interpolate({
            inputRange: [visibleInsetLeft - 44, visibleInsetLeft],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const overscrolRight = visibleRight.interpolate({
            inputRange: [visibleInsetRight - 44, visibleInsetRight],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });
        const overscrolBottom = visibleBottom.interpolate({
            inputRange: [visibleInsetBottom - 44, visibleInsetTop],
            outputRange: [0, 1],
            extrapolate: 'clamp'
        });

        const zoom = Animated.multiply(Animated.multiply(this._pinchScale, this._punchBaseScale), this._pinchMover)
            .interpolate({
                inputRange: [this._minZoom, this._minZoom + 0.001],
                outputRange: [1, 0],
                extrapolate: 'clamp'
            });

        const overscroll = Animated.multiply(Animated.multiply(Animated.multiply(overscrollLeft, overscrollTop), overscrolBottom), overscrolRight);
        const backgroundOpacity = Animated.multiply(this._loadingOpacity, Animated.multiply(this._transitionOpacity, Animated.add(Animated.multiply(zoom, overscroll), Animated.add(1, Animated.multiply(zoom, -1)))));

        return (
            <View width={this.props.width} height={this.props.height} alignItems="center" justifyContent="center">
                <Animated.View style={{ backgroundColor: '#000', position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, opacity: backgroundOpacity }} />
                <View width="100%" height="100%" overflow="hidden">
                    {platformContent}
                </View>
            </View>
        );
    }
}