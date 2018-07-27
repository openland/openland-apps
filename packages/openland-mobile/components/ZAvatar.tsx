import * as React from 'react';
import { Image, View, Text, PixelRatio } from 'react-native';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { isAndroid } from '../utils/isAndroid';

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

export class ZAvatar extends React.PureComponent<{ size: 60 | 56 | 40 | 32 | 30, src?: string | null, placeholderKey?: string, placeholderTitle?: string }> {
    render() {
        if (this.props.src) {
            let s = PixelRatio.getPixelSizeForLayoutSize(this.props.size);
            let url = this.props.src;
            url += '-/scale_crop/' + s + 'x' + s + '/';
            return (
                <View style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2, backgroundColor: '#fff' }}>
                    <Image source={{ uri: url }} style={{ width: this.props.size, height: this.props.size, borderRadius: this.props.size / 2 }} />
                    {!isAndroid && <View style={{ position: 'absolute', top: 0.5, left: 0.5, bottom: 0.5, right: 0.5, borderRadius: this.props.size / 2, borderColor: '#f1f1f1', borderWidth: 0.5 }} />}
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