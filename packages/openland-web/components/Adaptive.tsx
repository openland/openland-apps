import * as React from 'react';
import { css, cx } from 'linaria';
import { MobileSidebarContext } from 'openland-web/components/Scaffold/MobileSidebarContext';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

const fullWidthClassName = css`
    width: 100%;
`;

const fullHeightClassName = css`
    height: 100%;
`;

const hideMobileClassName = css`
    @media (max-width: 750px) {
        display: none;
    }
`;

const shouldRenderForMobile = ({
    renderedOnce,
    isMobile,
}: {
    renderedOnce: boolean;
    isMobile: boolean;
}) => {
    return (renderedOnce && isMobile) || !canUseDOM;
};

const shouldRenderForDesktop = (params: { renderedOnce: boolean; isMobile: boolean }) =>
    !shouldRenderForMobile(params);

export const HideOnMobile = ({
    children,
    fullWidth,
    fullHeight,
}: {
    children: any;
    fullWidth?: boolean;
    fullHeight?: boolean;
}) => {
    const { renderedOnce, isMobile } = React.useContext(MobileSidebarContext);
    return (
        <>
            <div
                className={cx(
                    hideMobileClassName,
                    fullWidth && fullWidthClassName,
                    fullHeight && fullHeightClassName,
                )}
            >
                {!shouldRenderForMobile({ renderedOnce, isMobile }) && children}
            </div>
        </>
    );
};

const hideDesktopClassName = css`
    @media (min-width: 750px) {
        display: none;
    }
`;

export const HideOnDesktop = ({
    children,
    fullWidth,
    fullHeight,
}: {
    children: any;
    fullWidth?: boolean;
    fullHeight?: boolean;
}) => {
    const { renderedOnce, isMobile } = React.useContext(MobileSidebarContext);
    return (
        <>
            <div
                className={cx(
                    hideDesktopClassName,
                    fullWidth && fullWidthClassName,
                    fullHeight && fullHeightClassName,
                )}
            >
                {!shouldRenderForDesktop({ renderedOnce, isMobile }) && children}
            </div>
        </>
    );
};
const showMobileClassName = css`
    @media (min-width: 750px) {
        display: none;
    }
    @media (max-width: 750px) {
        display: block;
    }
`;
const showDesktopClassName = css`
    @media (min-width: 750px) {
        display: block;
    }
    @media (max-width: 750px) {
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
    fullWidth?: boolean;
    fullHeight?: boolean;
}) => {
    const { renderedOnce, isMobile } = React.useContext(MobileSidebarContext);
    return (
        <>
            <div
                className={cx(
                    showMobileClassName,
                    fullWidth && fullWidthClassName,
                    fullHeight && fullHeightClassName,
                )}
            >
                {shouldRenderForMobile({ renderedOnce, isMobile }) && mobile}
            </div>
            <div
                className={cx(
                    showDesktopClassName,
                    fullWidth && fullWidthClassName,
                    fullHeight && fullHeightClassName,
                )}
            >
                {shouldRenderForDesktop({ renderedOnce, isMobile }) && desktop}
            </div>
        </>
    );
};

export const AdaptiveHOC = ({
    DesktopComponent,
    MobileComponent,
    fullWidth,
    fullHeight,
}: {
    DesktopComponent: any;
    MobileComponent: any;
    fullWidth?: boolean;
    fullHeight?: boolean;
}) => {
    const Component: any = (props: any) => {
        const { renderedOnce, isMobile } = React.useContext(MobileSidebarContext);

        return (
            <>
                <div
                    className={cx(
                        showMobileClassName,
                        fullWidth && fullWidthClassName,
                        fullHeight && fullHeightClassName,
                    )}
                >
                    {shouldRenderForMobile({ renderedOnce, isMobile }) && (
                        <MobileComponent {...props} />
                    )}
                </div>
                <div
                    className={cx(
                        showDesktopClassName,
                        fullWidth && fullWidthClassName,
                        fullHeight && fullHeightClassName,
                    )}
                >
                    {shouldRenderForDesktop({ renderedOnce, isMobile }) && (
                        <DesktopComponent {...props} />
                    )}
                </div>
            </>
        );
    };

    Component.displayName = `AdaptiveHOC(${DesktopComponent.displayName},
    ${MobileComponent.displayName})`;
    return Component;
};
