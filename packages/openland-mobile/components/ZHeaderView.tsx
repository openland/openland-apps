import * as React from 'react';
import { ZHeaderConfig } from './navigation/ZHeaderConfig';
import { ZHeaderConfigRegistrator } from './navigation/ZHeaderConfigRegistrator';

export class ZHeaderView extends React.PureComponent {

    renderHeader = () => {
        return (
            <>
                {this.props.children}
            </>
        );
    }

    render() {
        return <ZHeaderConfigRegistrator config={new ZHeaderConfig({ titleView: this.renderHeader })} />;
    }
}