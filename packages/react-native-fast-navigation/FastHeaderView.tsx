import * as React from 'react';
import { FastHeaderConfigRegistrator } from './FastHeaderConfigRegistrator';
import { FastHeaderConfig } from './FastHeaderConfig';

export class FastHeaderView extends React.PureComponent {

    renderHeader = () => {
        return (
            <>
                {this.props.children}
            </>
        );
    }

    render() {
        return <FastHeaderConfigRegistrator config={new FastHeaderConfig({ titleView: this.renderHeader })} />;
    }
}