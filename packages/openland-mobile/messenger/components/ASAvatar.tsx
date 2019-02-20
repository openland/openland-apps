import * as React from 'react';
import { ASImage } from 'react-native-async-view/ASImage';
import { doSimpleHash } from 'openland-y-utils/hash';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';

interface ASAvatarProps {
    size: number;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
}

export function ASAvatar(props: ASAvatarProps) {
    if (props.src && !props.src.startsWith('ph://')) {
        let url = props.src;
        url += '-/scale_crop/' + 256 + 'x' + 256 + '/';
        return (
            <ASImage
                width={props.size}
                height={props.size}
                source={{ uri: url }}
                borderRadius={props.size / 2}
            />
        );
    }

    let placeholderIndex = 0;
    if (props.placeholderKey) {
        placeholderIndex = doSimpleHash(props.placeholderKey);
    }
    let placeholderStyle = ZStyles.avatars[placeholderIndex % ZStyles.avatars.length];
    let placeholderText = '?';
    if (props.placeholderTitle) {
        placeholderText = extractPlaceholder(props.placeholderTitle);
    }
    let textSize = 28;
    if (props.size === 38 || props.size === 40) {
        textSize = 16;
    }
    if (props.size === 32) {
        textSize = 14;
    }
    if (props.size === 28) {
        textSize = 12;
    }
    if (props.size === 30) {
        textSize = 13;
    }
    if (props.size === 56) {
        textSize = 26;
    }
    if (props.size === 96) {
        textSize = 28;
    }
    if (props.size === 36) {
        textSize = 14;
    }

    return (
        <ASFlex
            width={props.size}
            height={props.size}
            alignItems="center"
            justifyContent="center"
            backgroundColor={placeholderStyle.placeholderColor}
            backgroundGradient={{ start: placeholderStyle.placeholderColorStart, end: placeholderStyle.placeholderColorEnd }}
            borderRadius={props.size / 2}
        >
            <ASText fontSize={textSize} color="#fff">{placeholderText}</ASText>
        </ASFlex>
    );
}
