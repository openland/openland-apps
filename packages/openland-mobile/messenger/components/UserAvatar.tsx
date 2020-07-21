import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatarProps } from './AsyncAvatar';
import { ASAvatar, ASAvatarSavedMessages } from './ASAvatar';
import { ThemeGlobal } from 'openland-y-utils/themes/ThemeGlobal';
import { avatarSizes } from 'openland-mobile/components/ZAvatar';

export function UserAvatar(props: AsyncAvatarProps & { online?: boolean, theme: ThemeGlobal, savedMessages?: boolean }) {
    const { size, dotSize, dotPosition, dotBorderWidth } = avatarSizes[props.size];

    return (
        <ASFlex
            width={size}
            height={size}
            alignItems="center"
            justifyContent="center"
        >
            {props.savedMessages ? <ASAvatarSavedMessages size={props.size} theme={props.theme} /> : <ASAvatar {...props} />}

            {!props.savedMessages && (
                <ASFlex overlay={true} alignItems="flex-end" justifyContent="flex-end">
                    {props.online && (
                        <ASFlex width={dotSize} height={dotSize} borderRadius={dotSize / 2} backgroundColor={props.theme.backgroundPrimary} justifyContent="center" marginRight={dotPosition} marginBottom={dotPosition}>
                            <ASFlex width={dotSize - (dotBorderWidth * 2)} height={dotSize - (dotBorderWidth * 2)} borderRadius={(dotSize - (dotBorderWidth * 2)) / 2} backgroundColor={props.theme.accentPrimary} marginLeft={dotBorderWidth} marginTop={dotBorderWidth} marginRight={dotBorderWidth} />
                        </ASFlex>
                    )}
                </ASFlex>
            )}
        </ASFlex>

    );
}
