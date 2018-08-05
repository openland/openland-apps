import * as React from 'react';
import PropTypes from 'prop-types';
import { TextProps, Text } from 'react-native';

export class XPText extends React.Component<TextProps> {
    static contextTypes = {
        __enforce_white_text: PropTypes.bool
    };
    render() {
        console.log(this.context.__enforce_white_text);
        return (<Text {...this.props} style={[this.props.style, this.context.__enforce_white_text && { color: '#fff' }]}>{this.props.children}</Text>);
    }
}