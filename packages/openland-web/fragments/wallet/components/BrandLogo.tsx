import * as React from 'react';
import { css } from 'linaria';
import { getBrandSafe } from 'openland-y-utils/wallet/brands';

const box = css`
    width: 40px; height: 28px;
    border-radius: 4px;
    overflow: hidden;
    position: relative;

    &:after {
        content: '';
        position: absolute;
        top: 0; right: 0; bottom: 0; left: 0;
        border: 1px solid var(--border);
        border-radius: 3px;
    }

    img {
        width: 40px;
        height: 28px;
    }
`;

interface BrandLogoProps {
    brand: string;
}

export const BrandLogo = React.memo((props: BrandLogoProps) => {
    const brand = getBrandSafe(props.brand);

    return (
        <div className={box}>
            <img
                src={`https://cdn.openland.com/shared/wallet/ic-${brand}-40.png`}
                srcSet={`https://cdn.openland.com/shared/wallet/ic-${brand}-40@2x.png 2x, https://cdn.openland.com/shared/wallet/ic-${brand}-40@3x.png 3x`}
            />
        </div>
    );
});