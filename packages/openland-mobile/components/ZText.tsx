import * as React from 'react';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { Text, Linking, StyleProp, TextStyle } from 'react-native';

export class ZText extends React.PureComponent<{ text?: string | null | undefined, numberOfLines?: number, style?: StyleProp<TextStyle>, linkify?: boolean }> {
    render() {
        if (this.props.text) {
            let preprocessed = preprocessText(this.props.text);
            let parts = preprocessed.map((v, i) => {
                if (v.type === 'new_line') {
                    return <Text key={'br-' + i} >{'\n'}</Text>;
                } else if (v.type === 'link') {
                    return <Text key={'link-' + i} style={{ color: '#654bfa' }} onPress={this.props.linkify !== false ? () => Linking.openURL(v.link!!) : undefined}>{v.text}</Text>;
                } else {
                    return <Text key={'text-' + i}>{v.text}</Text>;
                }
            });
            return <Text style={this.props.style} numberOfLines={this.props.numberOfLines}>{parts}</Text>;
        } else {
            return <Text style={this.props.style} numberOfLines={this.props.numberOfLines} />;
        }
    }
}