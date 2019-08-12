import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatarProps } from './AsyncAvatar';
import { ASAvatar } from './ASAvatar';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { avatarSizes } from 'openland-mobile/components/ZAvatar';

export function UserAvatar(props: AsyncAvatarProps & { online?: boolean, theme: ThemeGlobal }) {
    const { size, dotSize, dotPosition, dotBorderWidth } = avatarSizes[props.size];

    return (
        <ASFlex
            width={size}
            height={size}
            alignItems="center"
            justifyContent="center"
        >
            <ASAvatar {...props} />

            <ASFlex overlay={true} alignItems="flex-end" justifyContent="flex-end">
                {props.online && (
                    <ASFlex width={dotSize} height={dotSize} borderRadius={dotSize / 2} backgroundColor={props.theme.backgroundPrimary} justifyContent="center" marginRight={dotPosition} marginBottom={dotPosition}>
                        <ASFlex width={dotSize - (dotBorderWidth * 2)} height={dotSize - (dotBorderWidth * 2)} borderRadius={(dotSize - (dotBorderWidth * 2)) / 2} backgroundColor={props.theme.accentPrimary} marginLeft={dotBorderWidth} marginTop={dotBorderWidth} marginRight={dotBorderWidth} />
                    </ASFlex>
                )}
            </ASFlex>
        </ASFlex>

    );
}
