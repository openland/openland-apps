import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';

export type SHeaderAppearance = 'small' | 'large' | 'small-hidden';
export type SHeaderHairline = 'hidden' | 'always' | 'auto';

interface SHeaderComponentProps {
    title?: string;
    hairline?: SHeaderHairline;
    hidden?: boolean;
    accentColor?: string;
    hideBackText?: boolean;
}

export class SHeader extends React.PureComponent<SHeaderComponentProps> {
    render() {
        return <HeaderConfigRegistrator config={{ title: this.props.title, accentColor: this.props.accentColor, hairline: this.props.hairline, headerHidden: this.props.hidden, hideBackText: this.props.hideBackText }} />;
    }
}