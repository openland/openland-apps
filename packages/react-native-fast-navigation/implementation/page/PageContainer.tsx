import * as React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { PageImmutableContainer } from './PageImmutableContainer';
import { interpolateContent } from '../utils/interpolateContent';
import { interpolateOverlayShadow } from '../utils/interpolateOverlayShadow';
import { FastRouter } from '../../FastRouter';
import { ASAnimatedView, animateOpacity, animateTranslateX } from 'react-native-async-view/ASAnimatedView';

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        opacity: 1
    } as ViewStyle,
    rootUnmounted: {
        opacity: 0
    } as ViewStyle
});

export interface PageContainerProps {
    progress: Animated.AnimatedInterpolation;
    component: React.ComponentType<{}>;
    router: FastRouter;
    mounted: boolean;
}

function buildInterpolations(src: Animated.AnimatedInterpolation) {
    return {
        progressTranslate: interpolateContent(src),
        overlayOpacity: interpolateOverlayShadow(src)
    };
}

export class PageContainer extends React.PureComponent<PageContainerProps, { progressTranslate: Animated.AnimatedInterpolation, overlayOpacity: Animated.AnimatedInterpolation }> {

    private handledProgress: Animated.AnimatedInterpolation;

    constructor(props: PageContainerProps) {
        super(props);
        this.handledProgress = this.props.progress;
        this.state = buildInterpolations(this.props.progress);
    }

    componentWillReceiveProps(nextProps: PageContainerProps) {
        if (nextProps.progress !== this.handledProgress) {
            this.handledProgress = nextProps.progress;
            this.setState(buildInterpolations(nextProps.progress));
        }
    }

    render() {
        return (
            <View collapsable={false}>
                <View
                    key="page"
                    style={[styles.root, !this.props.mounted && styles.rootUnmounted]}
                // style={{
                //     position: 'absolute',
                //     top: 0,
                //     bottom: 0,
                //     right: 0,
                //     left: 0,
                //     // transform: [{ translateX: this.state.progressTranslate }]
                // }}
                >
                    <PageImmutableContainer component={this.props.component} router={this.props.router} />
                </View>
                {/* <Animated.View
                    key="shadow"
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        right: 0,
                        left: 0,
                        opacity: this.props.mounted ? this.state.overlayOpacity : 0,
                        backgroundColor: '#000'
                    }}
                    pointerEvents="none"
                /> */}
            </View>
        );
    }
}