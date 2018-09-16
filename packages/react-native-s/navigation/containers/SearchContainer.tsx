import * as React from 'react';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimated } from '../../SAnimated';
import { AnimatedViewKeys } from '../AnimatedViewKeys';
import { HeaderState } from '../HeaderState';
import { HeaderContextNone } from '../HeaderContextNone';
import { SRouterContext } from '../../SRouterContext';

export class SearchContainer extends React.PureComponent<{ page: NavigationPage }, { config: HeaderConfig, state: HeaderState }> {
    constructor(props: { page: NavigationPage }) {
        super(props);
        this.state = {
            config: props.page.config.getState()!,
            state: props.page.state.getState()!
        };
        props.page.config.watch((v) => this.setState({ config: v }));
        props.page.state.watch((v) => this.setState({ state: v }));
    }
    render() {
        if (this.state.state.searchMounted) {
            let SearchComponent = this.state.config.searchRender!!;
            return (
                <SAnimated.View name={AnimatedViewKeys.pageSearch(this.props.page.key)} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#f00' }} pointerEvents="box-none">
                    <HeaderContextNone>
                        <SRouterContext.Provider value={this.props.page.router}>
                            <SearchComponent query={this.state.state.searchQuery} />
                        </SRouterContext.Provider>
                    </HeaderContextNone>
                </SAnimated.View>
            );
        } else {
            return null;
        }
    }
}