import * as React from 'react';
import { NavigationScreenProp, NavigationParams } from 'react-navigation';
import { View, Animated, ViewStyle } from 'react-native';
import { ZKeyboardAvoidingView } from './ZKeyboardAvoidingView';

export interface ZAppContentProvider {
    topOffset: number;
    topLargeOffset: number;
    bottomOffset: number;
    registerScroller(value: Animated.AnimatedInterpolation): void;
}

export const ZAppContentContext = React.createContext<ZAppContentProvider | undefined>(undefined);

export interface ZAppContentProps {
    useParent?: boolean;
    navigation: NavigationScreenProp<NavigationParams>;
}

export class ZAppContent extends React.Component<ZAppContentProps> {

    private mounted: boolean = true;
    private provider: ZAppContentProvider;

    constructor(props: ZAppContentProps) {
        super(props);
        this.provider = {
            topOffset: 44 + 22,
            topLargeOffset: 56 + 22,
            bottomOffset: this.props.useParent ? 44 : 0,
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