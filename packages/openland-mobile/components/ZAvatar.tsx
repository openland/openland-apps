import * as React from 'react';
import { View, Text } from 'react-native';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { isAndroid } from '../utils/isAndroid';
import { ZImage } from './ZImage';

let colors = [
    '#ffab00',
    '#654bfa',
    '#d75454',
    '#4285f4',
    '#00c851',
    '#717fa1',
    '#334562',
    '#c72ce1'
];

export class ZAvatar extends React.PureComponent<{ size: 60 | 56 | 40 | 32 | 30, src?: string | null, placeholderKey?: string | null, placeholderTitle?: string | null }> {
    render() {
        if (this.props.src) {
            return (
                <View style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2, backgroundColor: '#fff' }}>
                    <ZImage width={this.props.size} height={this.props.size} source={{ uri: this.props.src }} style={{ borderRadius: this.props.size / 2 }} />
                    {!isAndroid && <View style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0, borderRadius: this.props.size / 2, borderColor: '#000', opacity: 0.03, borderWidth: 0.5 }} />}
                </View>
            );
        } else {
            let placeholderIndex = 0;
            if (this.props.placeholderKey) {
                placeholderIndex = doSimpleHash(this.props.placeholderKey);
            }
            let placeholderText = '?';
            if (this.props.placeholderTitle) {
                placeholderText = extractPlaceholder(this.props.placeholderTitle);
            }
            let textSize = 28;
            if (this.props.size === 40) {
                textSize = 16;
            }
            if (this.props.size === 32) {
                textSize = 14;
            }
            if (this.props.size === 30) {
                textSize = 13;
            }
            if (this.props.size === 56) {
                textSize = 26;
            }
            return (
                <View style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2, backgroundColor: colors[placeholderIndex % colors.length] }} alignContent="center" justifyContent="center">
                    <Text style={{ fontSize: textSize, width: '100%', textAlign: 'center', textAlignVertical: 'center', color: '#fff' }}>{placeholderText}</Text>
                </View>
            );
        }
    }
}