import * as React from 'react';
import { StyleProp, ViewStyle, View, } from 'react-native';
import { supportsAsyncRendering } from './platform/config';
import { ASViewRender } from './platform/ASViewRender';
import { AsyncRenderer } from './internals/renderer';
import UUID from 'uuid/v4';
import { RNAsyncConfigManager } from './platform/ASConfigManager';

export interface ASViewProps {
    style?: StyleProp<ViewStyle>;
    children?: any;
}
export class ASView extends React.PureComponent<ASViewProps> {

    private renderer?: AsyncRenderer;
    private key = UUID();

    constructor(props: ASViewProps) {
        super(props);
        if (supportsAsyncRendering) {
            let start = Date.now();
            this.renderer = new AsyncRenderer(this.handleChanged, this.props.children);
            console.log('Rendered in ' + (Date.now() - start) + ' ms');
            RNAsyncConfigManager.setConfig(this.key, JSON.stringify(this.renderer.getState()));
            // this.state = { config: JSON.stringify(this.renderer.getState()) };
        }
    }

    private handleChanged = (state: any) => {
        RNAsyncConfigManager.setConfig(this.key, JSON.stringify(state));
    }
    componentWillUpdate(nextProps: ASViewProps) {
        if (this.props.children !== nextProps.children) {
            if (supportsAsyncRendering) {
                this.renderer!!.render(nextProps.children);
            }
        }
    }

    render() {
        if (supportsAsyncRendering) {
            return <ASViewRender style={this.props.style} configKey={this.key} />;
        }
        return (
            <View style={this.props.style}>
                {this.props.children}
            </View>
        );
    }
}