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
        // backgroundColor: '#fff',
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

export const PageContainer = React.memo<PageContainerProps>((props) => {
    return (
        <View style={[styles.root, !props.mounted && styles.rootUnmounted, { backgroundColor: props.style.backgroundColor }]} collapsable={false}>
            <SRouterContext.Provider value={props.router}>
                <HeaderContextDirect router={props.router}>
                    <PageKeyboard contextKey={props.router.key}>
                        <PageImmutableContainer component={props.component} />
                    </PageKeyboard>
                </HeaderContextDirect>
            </SRouterContext.Provider>
        </View>
    );
});