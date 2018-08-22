import * as React from 'react';
import { StyleProp, ViewStyle, View } from 'react-native';
import { supportsAsyncRendering } from './platform/config';
import { ASViewRender } from './platform/ASViewRender';
import { AsyncRenderer } from './internals/renderer';

export interface ASViewProps {
    style?: StyleProp<ViewStyle>;
    children?: any;
}

export class ASView extends React.PureComponent<ASViewProps, { config?: string }> {

    private renderer?: AsyncRenderer;

    constructor(props: ASViewProps) {
        super(props);
        if (supportsAsyncRendering) {
            this.renderer = new AsyncRenderer(this.handleChanged, this.props.children);
            this.state = { config: JSON.stringify(this.renderer.getState()) };
        }
    }

    private handleChanged = (state: any) => {
        this.setState({ config: JSON.stringify(state) });
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
            return <ASViewRender style={this.props.style} config={this.state.config!} />;
        }
        return (
            <View style={this.props.style}>
                {this.props.children}
            </View>
        );
    }
}