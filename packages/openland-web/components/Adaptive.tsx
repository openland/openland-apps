import * as React from 'react';
import { css, cx } from 'linaria';

const fullWidthClassName = css`
    width: 100%;
`;

const hideMobileClassName = css`
    @media (max-width: 700px) {
        display: none;
    }
`;

export const HideOnMobile = ({ children, fullWidth }: { children: any; fullWidth: boolean }) => (
    <>
        <div className={cx(hideMobileClassName, fullWidth && fullWidthClassName)}>{children}</div>
    </>
);

const hideDesktopClassName = css`
    @media (min-width: 700px) {
        display: none;
    }
`;

export const HideOnDesktop = ({ children, fullWidth }: { children: any; fullWidth: boolean }) => (
    <>
        <div className={cx(hideDesktopClassName, fullWidth && fullWidthClassName)}>{children}</div>
    </>
);

const showMobileClassName = css`
    @media (min-width: 700px) {
        display: none;
    }
    @media (max-width: 700px) {
        display: block;
    }
`;
const showDesktopClassName = css`
    @media (min-width: 700px) {
        display: block;
    }
    @media (max-width: 700px) {
        display: none;
    }
`;

export const AdaptiveComponent = ({
    desktop,
    mobile,
    fullWidth,
}: {
    desktop: any;
    mobile: any;
    fullWidth: boolean;
}) => (
    <>
        <div className={cx(showMobileClassName, fullWidth && fullWidthClassName)}>{mobile}</div>
        <div className={cx(showDesktopClassName, fullWidth && fullWidthClassName)}>{desktop}</div>
    </>
);

export const AdaptiveHOC = ({
    DesktopComponent,
    MobileComponent,
    fullWidth,
}: {
    DesktopComponent: any;
    MobileComponent: any;
    fullWidth: boolean;
}) => (props: any) => (
    <>
        <div className={cx(showMobileClassName, fullWidth && fullWidthClassName)}>
            <MobileComponent {...props} />
        </div>
        <div className={cx(showDesktopClassName, fullWidth && fullWidthClassName)}>
            <DesktopComponent {...props} />
        </div>
    </>
);
