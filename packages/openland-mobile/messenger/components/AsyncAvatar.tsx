import * as React from 'react';
import { ASImage } from 'react-native-async-view/ASImage';
import { ZAvatarSize, avatarSizes } from 'openland-mobile/components/ZAvatar';
import { getNewAvatar } from 'openland-y-utils/newAvatars';

export interface AsyncAvatarProps {
    id: string;
    size: ZAvatarSize;
    photo?: string | null;
    round?: boolean;
}

export const AsyncAvatar = React.memo((props: AsyncAvatarProps) => {
    const { size } = avatarSizes[props.size];

    let url =
        props.photo && !props.photo.startsWith('ph://')
            ? props.photo
            : 'https://ucarecdn.com/' + getNewAvatar(props.id) + '/';
    url += '-/scale_crop/256x256/center/-/format/jpeg/';

    return (
        <ASImage
            width={size}
            height={size}
            source={{ uri: url }}
            borderRadius={props.round !== false ? size / 2 : undefined}
        />
    );
});
