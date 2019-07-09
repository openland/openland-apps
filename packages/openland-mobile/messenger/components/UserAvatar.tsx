import * as React from 'react';
import { ASFlex } from 'react-native-async-view/ASFlex';
import { AsyncAvatarProps } from './AsyncAvatar';
import { ASAvatar } from './ASAvatar';
import { ThemeGlobal } from 'openland-y-utils/themes/types';

export function UserAvatar(props: AsyncAvatarProps & { online?: boolean, theme: ThemeGlobal }) {
    return (
        <ASFlex
            width={props.size}
            height={props.size}
            alignItems="center"
            justifyContent="center"
        >
            <ASAvatar {...props} />

            <ASFlex overlay={true} alignItems="flex-end" justifyContent="flex-end">
                {props.online && (props.size > 30) && (
                    <ASFlex width={11} height={11} borderRadius={5} backgroundColor={props.theme.backgroundPrimary} justifyContent="center" marginRight={3} marginBottom={3}>
                        <ASFlex width={7} height={7} borderRadius={3} backgroundColor={props.theme.accentPrimary} marginLeft={2} marginTop={2} marginRight={2} />
                    </ASFlex>
                )}
                {props.online && (props.size <= 30) && (
                    <ASFlex width={10} height={10} borderRadius={5} backgroundColor={props.theme.backgroundPrimary} justifyContent="center" marginRight={-1} marginBottom={-1}>
                        <ASFlex width={6} height={6} borderRadius={3} backgroundColor={props.theme.accentPrimary} marginLeft={2} marginTop={2} marginRight={2} />
                    </ASFlex>
                )}
            </ASFlex>
        </ASFlex>

    );
}
