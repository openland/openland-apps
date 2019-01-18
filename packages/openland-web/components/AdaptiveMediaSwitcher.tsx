import * as React from 'react';
import { css } from 'linaria';

const showMobileClassName = css`
    width: 100%;
    @media (min-width: 700px) {
        display: none;
    }
    @media (max-width: 700px) {
        display: block;
    }
`;
const showDesktopClassName = css`
    width: 100%;
    @media (min-width: 700px) {
        display: block;
    }
    @media (max-width: 700px) {
        display: none;
    }
`;

export const AdaptiveMediaSwitcher = ({
    DesktopComponent,
    MobileComponent,
}: {
    DesktopComponent: any;
    MobileComponent: any;
}) => (props: any) => {
    return (
        <>
            <div className={showMobileClassName}>
                <MobileComponent {...props} />
            </div>
            <div className={showDesktopClassName}>
                <DesktopComponent {...props} />
            </div>
        </>
    );
};
