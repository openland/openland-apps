import * as React from 'react';
import { View, StyleSheet, ViewStyle, Animated } from 'react-native';
import { PageImmutableContainer } from './PageImmutableContainer';
import { FastRouter } from '../../FastRouter';

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
    component: React.ComponentType<{}>;
    router: FastRouter;
    mounted: boolean;
}

export class PageContainer extends React.PureComponent<PageContainerProps> {
    render() {
        return (
            <View style={[styles.root, !this.props.mounted && styles.rootUnmounted]} collapsable={false}>
                <PageImmutableContainer component={this.props.component} router={this.props.router} />
            </View>
        );
    }
}