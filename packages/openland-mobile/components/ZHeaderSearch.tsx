import * as React from 'react';
import { ZHeaderConfig } from './navigation/ZHeaderConfig';
import { ZHeaderConfigRegistrator } from './navigation/ZHeaderConfigRegistrator';

export class ZHeaderSearch extends React.PureComponent<{ active: boolean, onActivate: () => void, onDeactivate: () => void }> {
    render() {
        return <ZHeaderConfigRegistrator config={new ZHeaderConfig({ search: true, searchActive: this.props.active, searchPress: this.props.onActivate, searchClosed: this.props.onDeactivate })} />;
    }
}