import * as React from 'react';
import { StyleSheet, ViewStyle, View } from 'react-native';
import { SRouter } from '../../SRouter';
import { SRouterContext } from '../../SRouterContext';
import { HeaderContextDirect } from '../HeaderContextDirect';
// import { FastRouter, FastRouterContext } from '../../FastRouter';
// import { FastHeaderContextDirect } from '../../FastHeaderContextDirect';

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    } as ViewStyle
});

export interface PageImmutableContainerProps {
    component: React.ComponentType<{}>;
    router: SRouter;
}

/**
 * PageImmutableContainer asserts that we will never ever re-render page.
 */
export class PageImmutableContainer extends React.Component<PageImmutableContainerProps> {
    shouldComponentUpdate(nextProps: PageImmutableContainerProps) {
        if (nextProps.component !== this.props.component) {
            throw Error('Page Container props shouldn\'t change');
        }
        if (nextProps.router !== this.props.router) {
            throw Error('Page Container props shouldn\'t change');
        }
        return false;
    }

    render() {
        let Component = this.props.component;
        return (
            <SRouterContext.Provider value={this.props.router}>
                <HeaderContextDirect router={this.props.router}>
                    <View style={styles.root}>
                        <Component />
                    </View>
                </HeaderContextDirect>
                {/* <FastHeaderContextDirect router={this.props.router}>
                    <PageKeyboard style={styles.root} contextKey={this.props.router.key}> */}
                {/* </PageKeyboard>
                </FastHeaderContextDirect> */}
            </SRouterContext.Provider>
        );
    }
}