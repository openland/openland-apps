import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { View, Animated, ViewStyle } from 'react-native';
import { ZAppConfig } from './ZAppConfig';
import { isAndroid } from '../utils/isAndroid';

export interface ZAppContentProvider {
    topContentInset: number;
    bottomContentInset: number;
    registerScroller(value: Animated.AnimatedInterpolation): void;
}

export const ZAppContentContext = React.createContext<ZAppContentProvider | undefined>(undefined);

export interface ZAppContentProps {
    useParent?: boolean;
    navigationStyle: 'large' | 'small';
    navigation: NavigationScreenProp<NavigationParams>;
}

export class ZAppContent extends React.Component<ZAppContentProps> {

    private mounted: boolean = true;
    private provider: ZAppContentProvider;

    constructor(props: ZAppContentProps) {
        super(props);
        this.provider = {
            topContentInset: (this.props.useParent && isAndroid) ? 16 : (props.navigationStyle === 'large' ? ZAppConfig.navigationBarContentInset : ZAppConfig.navigationBarContentInsetSmall),
            bottomContentInset: ((this.props.useParent && !isAndroid) ? 44 : 0) + ZAppConfig.bottomNavigationBarInset,
            registerScroller: this.registerScroller
        };
    }

    registerScroller = (value: Animated.Value) => {
        if (this.mounted) {
            if (this.props.useParent) {
                let parent = (this.props.navigation as any).dangerouslyGetParent() as NavigationScreenProp<NavigationParams>;
                let routeName = this.props.navigation.state.routeName;
                if (parent) {
                    parent.setParams({ ['__z_header_' + routeName + 'actions_search_offset']: value });
                }
            } else {
                this.props.navigation.setParams({ '__z_header_actions_search_offset': value });
            }
        }
        //
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    render() {
        return (
            <ZAppContentContext.Provider value={this.provider}>
                {this.props.children}
            </ZAppContentContext.Provider>
        );
    }
}