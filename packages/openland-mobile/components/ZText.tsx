import * as React from 'react';
import { preprocessText } from 'openland-y-utils/TextProcessor';
import { Text, Linking, StyleProp, TextStyle, Clipboard } from 'react-native';
import { resolveInternalLink } from '../utils/internalLnksResolver';
import { ActionSheet } from './ActionSheet';

export class ZText extends React.PureComponent<{ text?: string | null | undefined, numberOfLines?: number, style?: StyleProp<TextStyle>, linkify?: boolean }> {
    linkifyPressFallback = (link: string) => {
        return (async () => {
            console.warn('boom', link, await Linking.canOpenURL(link));
            if (await Linking.canOpenURL(link)) {
                await Linking.openURL(link)
            } else {
                await this.openContextMenu(link)
            }
        });
    }

    openContextMenu = async (link: string) => {
        ActionSheet.builder().action('Copy', () => Clipboard.setString(link)).show();
    }
    render() {
        if (this.props.text) {
            let preprocessed = preprocessText(this.props.text);
            let parts = preprocessed.map((v, i) => {
                if (v.type === 'new_line') {
                    return <Text key={'br-' + i} style={this.props.style} >{'\n'}</Text>;
                } else if (v.type === 'link') {
                    return <Text key={'link-' + i} style={[this.props.style, this.props.linkify && { color: '#0084fe' }]} onPress={this.props.linkify !== false ? resolveInternalLink(v.link!, this.linkifyPressFallback(v.link!!)) : undefined}>{v.text}</Text>;
                } else {
                    return <Text key={'text-' + i} style={this.props.style}>{v.text}</Text>;
                }
            });
            return <Text style={this.props.style} numberOfLines={this.props.numberOfLines}>{parts}</Text>;
        } else {
            return <Text style={this.props.style} numberOfLines={this.props.numberOfLines} />;
        }
    }
}