import * as React from 'react';
import { ZHeaderConfig } from './navigation/ZHeaderConfig';
import { ZHeaderConfigRegistrator } from './navigation/ZHeaderConfigRegistrator';

interface ZHeaderComponentProps {
    title?: string;
}

export class ZHeader extends React.PureComponent<ZHeaderComponentProps> {
    render() {
        return <ZHeaderConfigRegistrator config={new ZHeaderConfig({ title: this.props.title })}/>;
    }
}