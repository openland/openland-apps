import * as React from 'react';
import { css, cx } from 'linaria';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { RenderedOnceContext } from 'openland-web/components/Scaffold/RenderedOnceContext';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';

const noFlexShrinkClassName = css`
    flex-shrink: 0;
`;

const fullWidthClassName = css`
    width: 100%;
`;

const fullHeightClassName = css`
    height: 100%;
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

const showMobileClassName = css`
    @media (min-width: 750px) {
        display: none;
    }
    @media (max-width: 750px) {
        display: flex;
        flex-direction: column;
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
        const renderedOnce = React.useContext(RenderedOnceContext);
        const isMobile = React.useContext(IsMobileContext);

        return (
            <>
                <div
                    className={cx(
                        showMobileClassName,
                        noFlexShrinkClassName,
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
                        noFlexShrinkClassName,
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
