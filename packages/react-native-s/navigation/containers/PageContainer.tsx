import * as React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { PageImmutableContainer } from './PageImmutableContainer';
import { SRouter } from '../../SRouter';
import { SRouterContext } from '../../SRouterContext';
import { HeaderContextDirect } from '../HeaderContextDirect';
import { PageKeyboard } from './PageKeyboard';
import { SNavigationViewStyle } from '../../SNavigationView';

const styles = StyleSheet.create({
    root: {
        width: '100%',
        height: '100%',
        opacity: 1,
        backgroundColor: '#fff',
        overflow: 'hidden'
    } as ViewStyle,
    rootUnmounted: {
        opacity: 0
    } as ViewStyle
});

export interface PageContainerProps {
    component: React.ComponentType<{}>;
    router: SRouter;
    mounted: boolean;
    style: SNavigationViewStyle;
}

export class PageContainer extends React.PureComponent<PageContainerProps> {
    render() {
        return (
            <View style={[styles.root, !this.props.mounted && styles.rootUnmounted]} collapsable={false}>
                <SRouterContext.Provider value={this.props.router}>
                    <HeaderContextDirect router={this.props.router}>
                        <PageKeyboard contextKey={this.props.router.key} style={this.props.style}>
                            <PageImmutableContainer component={this.props.component} />
                        </PageKeyboard>
                    </HeaderContextDirect>
                </SRouterContext.Provider>
            </View>
        );
    }
}