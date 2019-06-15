import * as React from 'react';
import { ASImage } from 'react-native-async-view/ASImage';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ZStyles } from 'openland-mobile/components/ZStyles';

export interface AsyncAvatarProps {
    size: number;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
    round?: boolean;
}

export class AsyncAvatar extends React.PureComponent<AsyncAvatarProps> {
    render() {
        if (this.props.src && !this.props.src.startsWith('ph://')) {
            let url = this.props.src;
            url += '-/scale_crop/' + 256 + 'x' + 256 + '/';
            return (
                <ASImage
                    width={this.props.size}
                    height={this.props.size}
                    source={{ uri: url }}
                    borderRadius={this.props.round !== false ? this.props.size / 2 : undefined}
                />
            );
        }

        let placeholderIndex = 0;
        if (this.props.placeholderKey) {
            placeholderIndex = doSimpleHash(this.props.placeholderKey);
        }
        let placeholderStyle = ZStyles.avatars[placeholderIndex % ZStyles.avatars.length];
        let placeholderText = '?';
        if (this.props.placeholderTitle) {
            placeholderText = extractPlaceholder(this.props.placeholderTitle);
        }
        let textSize = 28;
        if (this.props.size === 18) {
            textSize = 10;
        }
        if (this.props.size === 40) {
            textSize = 16;
        }
        if (this.props.size === 32) {
            textSize = 14;
        }
        if (this.props.size === 28) {
            textSize = 12;
        }
        if (this.props.size === 30) {
            textSize = 13;
        }
        if (this.props.size === 56) {
            textSize = 26;
        }
        if (this.props.size === 96) {
            textSize = 28;
        }
        if (this.props.size === 36) {
            textSize = 14;
        }

        return (
            <ASFlex
                width={this.props.size}
                height={this.props.size}
                alignItems="center"
                justifyContent="center"
                backgroundColor={placeholderStyle.placeholderColor}
                backgroundGradient={{ start: placeholderStyle.placeholderColorStart, end: placeholderStyle.placeholderColorEnd }}
                borderRadius={this.props.round !== false ? this.props.size / 2 : undefined}
            >
                <ASText fontSize={textSize} color="#fff">{placeholderText}</ASText>
            </ASFlex>
        );
    }
}