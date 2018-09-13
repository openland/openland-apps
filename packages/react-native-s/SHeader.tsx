import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';

export type SHeaderAppearance = 'small' | 'large' | 'small-hidden';
export type SHeaderHairline = 'hidden' | 'always' | 'auto';

interface FastHeaderComponentProps {
    title?: string;
    hairline?: SHeaderHairline;
    hidden?: boolean;
}

export class FastHeader extends React.PureComponent<FastHeaderComponentProps> {
    render() {
        return <HeaderConfigRegistrator config={{ title: this.props.title, hairline: this.props.hairline, headerHidden: this.props.hidden }} />;
    }
}