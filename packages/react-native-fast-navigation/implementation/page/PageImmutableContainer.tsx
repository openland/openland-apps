import * as React from 'react';
import { FastRouter, FastRouterContext } from '../../FastRouter';
import { StyleSheet, ViewStyle } from 'react-native';
import { FastHeaderContextDirect } from '../../FastHeaderContextDirect';
import { PageKeyboard } from './PageKeyboard';
import { SAnimated } from 'react-native-s/SAnimated';

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

    componentWillMount() {
        SAnimated.timing('page-content-container--' + this.props.router.key, {
            property: 'opacity',
            from: 0,
            to: 1,
            easing: 'material'
        });
    }

    render() {
        let Component = this.props.component;

        return (
            <FastRouterContext.Provider value={this.props.router}>
                <FastHeaderContextDirect router={this.props.router}>
                    <SAnimated.View name={'page-content-container--' + this.props.router.key} style={{ width: '100%', height: '100%' }}>
                        <PageKeyboard style={styles.root} contextKey={this.props.router.key}>
                            <Component />
                        </PageKeyboard>
                    </SAnimated.View>
                </FastHeaderContextDirect>
            </FastRouterContext.Provider>
        );
    }
}