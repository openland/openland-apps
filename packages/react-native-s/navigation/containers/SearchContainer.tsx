import * as React from 'react';
import { NavigationPage } from '../NavigationPage';
import { HeaderConfig } from '../HeaderConfig';
import { SAnimated } from '../../SAnimated';
import { AnimatedViewKeys } from '../AnimatedViewKeys';

export class SearchContainer extends React.PureComponent<{ page: NavigationPage }, { config: HeaderConfig }> {
    constructor(props: { page: NavigationPage }) {
        super(props);
        this.state = {
            config: props.page.config.getState()!
        };
        props.page.config.watch((v) => this.setState({ config: v }));
    }
    render() {
        return (<SAnimated.View name={AnimatedViewKeys.pageSearch(this.props.page.key)} style={{ position: 'absolute', top: 0, right: 0, bottom: 0, left: 0, backgroundColor: '#f00' }} pointerEvents="none"/>);
    }
}