import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';

export class SHeaderView extends React.PureComponent<{ accentColor?: string }> {

    renderHeader = () => {
        return (
            <>
                {this.props.children}
            </>
        );
    }

    render() {
        return <HeaderConfigRegistrator config={{ titleView: this.renderHeader, accentColor: this.props.accentColor }} />;
    }
}