import * as React from 'react';
import { css } from 'linaria';
import {
    AuthSidebarComponent,
    AuthMobileHeader,
} from 'openland-web/pages/root/AuthSidebarComponent';
import { XViewRouterContext, XView } from 'react-mental';
import { XLoader } from 'openland-x/XLoader';
import { TextStyles } from 'openland-web/utils/TextStyles';
import { useLayout } from 'openland-unicorn/components/utils/LayoutContext';
import { UIconButton } from 'openland-web/components/unicorn/UIconButton';
import BackIcon from 'openland-icons/s/ic-back-24.svg';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';

const rootContainer = css`
    display: flex;
    flex-direction: row;
    flex-grow: 1;
`;

const mainContainer = css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex-grow: 1;
`;

const boxContainer = css`
    display: flex;
    flex-direction: column;
    align-self: stretch;
    flex-grow: 1;
    position: relative;
`;

const AuthDiscoverHeader = React.memo((props: { title: string, showBack?: boolean }) => {
    const { title, showBack } = props;
    const layout = useLayout();
    const router = React.useContext(XViewRouterContext);

    return (
        <XView
            height={56}
            flexDirection="row"
            alignItems="center"
            zIndex={2}
            backgroundColor="var(--backgroundPrimary)"
            paddingHorizontal={!showBack ? 16 : undefined}
        >
            {layout === 'mobile' || showBack ? (
                <XView height={56} width={56} alignItems="center" justifyContent="center">
                    <UIconButton icon={<BackIcon />} onClick={() => router ? router.navigate('/discover') : undefined} size="large" />
                </XView>
            ) : null}
            <XView
                minWidth={0}
                flexBasis={0}
                flexGrow={1}
                fontSize={24}
                flexDirection="row"
                justifyContent="center"
                marginRight={showBack && layout !== 'mobile' ? 56 : undefined}
            >
                <XView
                    height={32}
                    color="var(--foregroundPrimary)"
                    minWidth={0}
                    flexBasis={0}
                    flexGrow={1}
                    maxWidth={showBack ? 600 : 560}
                    flexDirection="row"
                    {...TextStyles.Title1}
                >
                    {title}
                </XView>
            </XView>
        </XView>
    );
});

export const AuthDiscoverContainer = React.memo((props: { title: string, showBack?: boolean, children: any }) => {
    const isMobile = useIsMobile();

    return (
        <div className={rootContainer}>
            {!isMobile && <AuthSidebarComponent />}
            <div className={mainContainer}>
                {isMobile && <AuthMobileHeader />}
                <div className={boxContainer}>
                    <AuthDiscoverHeader title={props.title} showBack={props.showBack} />

                    <React.Suspense fallback={<XLoader loading={true} />}>
                        {props.children}
                    </React.Suspense>
                </div>
            </div>
        </div>
    );
});