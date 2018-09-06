import * as React from 'react';
import { FastHeaderConfig } from './FastHeaderConfig';
import { FastHeaderHairline } from './FastHeaderAppearance';
import { FastHeaderConfigRegistrator } from './FastHeaderConfigRegistrator';

interface FastHeaderComponentProps {
    title?: string;
    hairline?: FastHeaderHairline;
    hidden?: boolean;
}

export class FastHeader extends React.PureComponent<FastHeaderComponentProps> {
    render() {
        return <FastHeaderConfigRegistrator config={new FastHeaderConfig({ title: this.props.title, hairline: this.props.hairline, headerHidden: this.props.hidden })} />;
    }
}