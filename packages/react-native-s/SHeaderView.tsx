import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';

export class SHeaderView extends React.PureComponent<{ iconColor?: string, accentColor?: string; }> {

    renderHeader = () => {
        return (
            <>
                {this.props.children}
            </>
        );
    }

    render() {
        return <HeaderConfigRegistrator config={{ titleView: this.renderHeader, iconColor: this.props.iconColor, accentColor: this.props.accentColor }} />;
    }
}