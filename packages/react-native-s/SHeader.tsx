import * as React from 'react';
import { HeaderConfigRegistrator } from './navigation/HeaderConfigRegistrator';

export type SHeaderAppearance = 'small' | 'large' | 'small-hidden';
export type SHeaderHairline = 'hidden' | 'always' | 'auto';

interface SHeaderComponentProps {
    title?: string;
    hairline?: SHeaderHairline;
    hidden?: boolean;
    accentColor?: string;
    iconColor?: string;
    hideBackText?: boolean;
    backButtonRootFallback?: () => void;
    searchPlaceholder?: string;
}

export class SHeader extends React.PureComponent<SHeaderComponentProps> {
    render() {
        return (
            <HeaderConfigRegistrator
                config={{
                    title: this.props.title,
                    iconColor: this.props.iconColor,
                    accentColor: this.props.accentColor,
                    hairline: this.props.hairline,
                    headerHidden: this.props.hidden,
                    hideBackText: this.props.hideBackText,
                    backButtonRootFallback: this.props.backButtonRootFallback,
                    searchPlaceholder: this.props.searchPlaceholder
                }}
            />
        );
    }
}
