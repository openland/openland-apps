import * as React from 'react';
import { css, cx } from 'linaria';

const fullWidthClassName = css`
    width: 100%;
`;

const fullHeightClassName = css`
    height: 100%;
`;

const hideMobileClassName = css`
    @media (max-width: 700px) {
        display: none;
    }
`;

export const HideOnMobile = ({
    children,
    fullWidth,
    fullHeight,
}: {
    children: any;
    fullWidth: boolean;
    fullHeight: boolean;
}) => (
    <>
        <div
            className={cx(
                hideMobileClassName,
                fullWidth && fullWidthClassName,
                fullHeight && fullHeightClassName,
            )}
        >
            {children}
        </div>
    </>
);

const hideDesktopClassName = css`
    @media (min-width: 700px) {
        display: none;
    }
`;

export const HideOnDesktop = ({
    children,
    fullWidth,
    fullHeight,
}: {
    children: any;
    fullWidth: boolean;
    fullHeight: boolean;
}) => (
    <>
        <div
            className={cx(
                hideDesktopClassName,
                fullWidth && fullWidthClassName,
                fullHeight && fullHeightClassName,
            )}
        >
            {children}
        </div>
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
    fullHeight,
}: {
    desktop: any;
    mobile: any;
    fullWidth: boolean;
    fullHeight: boolean;
}) => (
    <>
        <div
            className={cx(
                showMobileClassName,
                fullWidth && fullWidthClassName,
                fullHeight && fullHeightClassName,
            )}
        >
            {mobile}
        </div>
        <div
            className={cx(
                showDesktopClassName,
                fullWidth && fullWidthClassName,
                fullHeight && fullHeightClassName,
            )}
        >
            {desktop}
        </div>
    </>
);

export const AdaptiveHOC = ({
    DesktopComponent,
    MobileComponent,
    fullWidth,
    fullHeight,
}: {
    DesktopComponent: any;
    MobileComponent: any;
    fullWidth: boolean;
    fullHeight: boolean;
}) => {
    const Component: any = (props: any) => (
        <>
            <div
                className={cx(
                    showMobileClassName,
                    fullWidth && fullWidthClassName,
                    fullHeight && fullHeightClassName,
                )}
            >
                <MobileComponent {...props} />
            </div>
            <div
                className={cx(
                    showDesktopClassName,
                    fullWidth && fullWidthClassName,
                    fullHeight && fullHeightClassName,
                )}
            >
                <DesktopComponent {...props} />
            </div>
        </>
    );

    Component.displayName = `AdaptiveHOC(${DesktopComponent.displayName},
    ${MobileComponent.displayName})`;
    return Component;
};
