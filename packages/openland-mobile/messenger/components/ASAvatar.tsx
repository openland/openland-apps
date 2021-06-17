import * as React from 'react';
import { ASImage } from 'react-native-async-view/ASImage';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { ZAvatarSize, avatarSizes } from 'openland-mobile/components/ZAvatar';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { Image } from 'react-native';
import { PlaceholderOrange } from 'openland-y-utils/themes/placeholders';
import { getNewAvatar } from 'openland-y-utils/newAvatars';

interface ASAvatarProps {
    id: string;
    photo?: string | null;
    size: ZAvatarSize;
    marginLeft?: number;
    marginRight?: number;
    marginTop?: number;
    marginBottom?: number;
    borderRadius?: number;
    theme: ThemeGlobal;
}

const getBorder = (size: ZAvatarSize) => {
    let res = null;
    if (size === 'small' || size === 'medium' || size === 'large') {
        const borderImage =
            size === 'small'
                ? require('assets/borders/bg-avatar-border-32.png')
                : size === 'medium'
                ? require('assets/borders/bg-avatar-border-40.png')
                : require('assets/borders/bg-avatar-border-56.png');

        res = Image.resolveAssetSource(borderImage);
    }

    return res ? res.uri : undefined;
};

export function ASAvatarSavedMessages(props: { size: ZAvatarSize; theme: ThemeGlobal }) {
    const { size, iconSize } = avatarSizes[props.size];
    const borderRadius = size / 2;

    return (
        <ASFlex
            width={size}
            height={size}
            alignItems="center"
            justifyContent="center"
            backgroundColor={PlaceholderOrange.start}
            {...{
                backgroundGradient: { start: PlaceholderOrange.start, end: PlaceholderOrange.end },
            }}
            borderRadius={borderRadius}
        >
            <ASImage
                source={require('assets/ic-bookmark-filled-24.png')}
                width={iconSize}
                height={iconSize}
                tintColor={props.theme.foregroundContrast}
            />
        </ASFlex>
    );
}

export function ASAvatar(props: ASAvatarProps) {
    const { size } = avatarSizes[props.size];
    const borderRadius = props.borderRadius || size / 2;

    let url =
        props.photo && !props.photo.startsWith('ph://')
            ? props.photo
            : 'https://ucarecdn.com/' + getNewAvatar(props.id) + '/';
    url += '-/scale_crop/256x256/center/-/format/jpeg/';

    const border = getBorder(props.size);

    return (
        <ASFlex
            marginLeft={props.marginLeft}
            marginRight={props.marginRight}
            marginTop={props.marginTop}
            marginBottom={props.marginBottom}
            width={size}
            height={size}
            borderRadius={borderRadius}
            backgroundColor={props.theme.backgroundTertiaryTrans}
        >
            {!!border && (
                <ASFlex overlay={true} width={size} height={size}>
                    <ASImage
                        width={size}
                        height={size}
                        source={{ uri: border }}
                        tintColor={props.theme.border}
                    />
                </ASFlex>
            )}
            <ASImage width={size} height={size} source={{ uri: url }} borderRadius={borderRadius} />
        </ASFlex>
    );
}
