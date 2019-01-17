import * as React from 'react';
import { css } from 'linaria';

const showMobileClassName = css`
    width: 100%;
    @media (min-width: 700px) {
        color: red;
        display: none;
    }
    @media (max-width: 700px) {
        color: blue;
        display: block;
    }
`;
const showDesktopClassName = css`
    width: 100%;
    @media (min-width: 700px) {
        color: red;
        display: block;
    }
    @media (max-width: 700px) {
        color: blue;
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
