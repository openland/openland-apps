import * as React from 'react';
import { UAvatarSize, AvatarSizes } from 'openland-web/components/unicorn/UAvatar';
import { XView } from 'react-mental';
import { css } from 'linaria';

const imageBox = css`
    display: block;
    width: 100%;
    height: 100%;
`;

interface DepositAvatarProps {
    size?: UAvatarSize;
}

export const DepositAvatar = React.memo((props: DepositAvatarProps) => {
    const boxSize = AvatarSizes[props.size || 'medium'].size;

    return (
        <XView width={boxSize} height={boxSize} borderRadius={boxSize / 2} overflow="hidden">
            <img
                className={imageBox}
                src={`https://cdn.openland.com/shared/wallet/ic-deposit-40.png`}
                srcSet={`https://cdn.openland.com/shared/wallet/ic-deposit-40@2x.png 2x, https://cdn.openland.com/shared/wallet/ic-deposit-40@3x.png 3x`}
            />
        </XView>
    );
});