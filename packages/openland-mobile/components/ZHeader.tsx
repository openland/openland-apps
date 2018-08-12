import * as React from 'react';
import { ZHeaderConfig } from './navigation/ZHeaderConfig';
import { ZHeaderConfigRegistrator } from './navigation/ZHeaderConfigRegistrator';
import { ZHeaderHairline } from './navigation/ZHeaderAppearance';

interface ZHeaderComponentProps {
    title?: string;
    hairline?: ZHeaderHairline;
}

export class ZHeader extends React.PureComponent<ZHeaderComponentProps> {
    render() {
        return <ZHeaderConfigRegistrator config={new ZHeaderConfig({ title: this.props.title, hairline: this.props.hairline })} />;
    }
}