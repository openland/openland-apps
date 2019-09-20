import * as React from 'react';
import { ASImage } from 'react-native-async-view/ASImage';
import { doSimpleHash } from 'openland-y-utils/hash';
import { ZStyles } from 'openland-mobile/components/ZStyles';
import { extractPlaceholder } from 'openland-y-utils/extractPlaceholder';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ASText } from 'react-native-async-view/ASText';
import { ZAvatarSize, avatarSizes } from 'openland-mobile/components/ZAvatar';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { Image } from 'react-native';

interface ASAvatarProps {
    size: ZAvatarSize;
    src?: string | null;
    placeholderKey?: string | null;
    placeholderTitle?: string | null;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    theme: ThemeGlobal;
}

const getBorder = (size: ZAvatarSize) => {
    let res = null;
    if (size === 'small' || size === 'medium' || size === 'large') {
        const borderImage = size === 'small' ? require('assets/borders/bg-avatar-border-32.png') :
            size === 'medium' ? require('assets/borders/bg-avatar-border-40.png') :
                require('assets/borders/bg-avatar-border-56.png');

        res = Image.resolveAssetSource(borderImage);
    }

    return res ? res.uri : undefined;
};

export function ASAvatar(props: ASAvatarProps) {
    const { size, placeholder: textSize } = avatarSizes[props.size];

    if (props.src && !props.src.startsWith('ph://')) {
        let url = props.src;
        url += '-/scale_crop/' + 256 + 'x' + 256 + '/center/';

        const border = getBorder(props.size);

        return (
            <ASFlex
                marginLeft={props.marginLeft}
                marginRight={props.marginRight}
                marginTop={props.marginTop}
                marginBottom={props.marginBottom}
                width={size}
                height={size}
                borderRadius={size / 2}
                backgroundColor={props.theme.backgroundTertiary}
            >
                {!!border && (
                    <ASFlex
                        overlay={true}
                        width={size}
                        height={size}
                    >
                        <ASImage
                            width={size}
                            height={size}
                            source={{ uri: border }}
                            tintColor={props.theme.border}
                        />
                    </ASFlex>
                )}
                <ASImage
                    width={size}
                    height={size}
                    source={{ uri: url }}
                    borderRadius={size / 2}
                />
            </ASFlex>
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

    return (
        <ASFlex
            width={size}
            height={size}
            alignItems="center"
            justifyContent="center"
            backgroundColor={placeholderStyle.placeholderColor}
            backgroundGradient={{ start: placeholderStyle.placeholderColorStart, end: placeholderStyle.placeholderColorEnd }}
            borderRadius={size / 2}
        >
            <ASText fontSize={textSize} color="#fff">{placeholderText}</ASText>
        </ASFlex>
    );
}
