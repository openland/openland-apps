import * as React from 'react';
import { ASImage } from 'react-native-async-view/ASImage';
import { doSimpleHash } from 'openland-y-utils/hash';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { ZAvatarSize, avatarSizes } from 'openland-mobile/components/ZAvatar';

export interface AsyncAvatarProps {
    size: ZAvatarSize;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
    round?: boolean;
}

export class AsyncAvatar extends React.PureComponent<AsyncAvatarProps> {
    render() {
        const { size, placeholder: textSize } = avatarSizes[this.props.size];

        if (this.props.src && !this.props.src.startsWith('ph://')) {
            let url = this.props.src;
            url += '-/scale_crop/' + 256 + 'x' + 256 + '/';
            return (
                <ASImage
                    width={size}
                    height={size}
                    source={{ uri: url }}
                    borderRadius={this.props.round !== false ? size / 2 : undefined}
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

        return (
            <ASFlex
                width={size}
                height={size}
                alignItems="center"
                justifyContent="center"
                backgroundColor={placeholderStyle.placeholderColor}
                {...{ backgroundGradient: { start: placeholderStyle.placeholderColorStart, end: placeholderStyle.placeholderColorEnd } }}
                borderRadius={this.props.round !== false ? size / 2 : undefined}
            >
                <ASText fontSize={textSize} color="#fff">{placeholderText}</ASText>
            </ASFlex>
        );
    }
}