import * as React from 'react';
import { FastRouter, FastRouterContext } from '../FastRouter';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { FastHeaderContextDirect } from '../FastHeaderContextDirect';
import { FastRouterProvider } from '../FastRouterProvider';

const styles = StyleSheet.create({
    root: {
        backgroundColor: '#fff',
        width: '100%',
        height: '100%'
    } as ViewStyle
});

export interface PageImmutableContainerProps {
    component: React.ComponentType<{}>;
    router: FastRouter;
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
            <FastRouterContext.Provider value={this.props.router}>
                <FastHeaderContextDirect router={this.props.router}>
                    <View style={styles.root}>
                        <Component />
                    </View>
                </FastHeaderContextDirect >
            </FastRouterContext.Provider>
        );
    }
}