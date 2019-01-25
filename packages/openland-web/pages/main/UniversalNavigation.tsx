import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { Menu } from 'openland-web/components/MainLayout';
import { tabs } from './mail/tabs';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';
import { XScrollView2 } from 'openland-x/XScrollView2';

type PageInnerProps = {
    swapFragmentsOnMobile?: boolean;
    firstFragmentMenu: any;
    firstFragment: any;
    secondFragment: any;
    secondFragmentHeader: any;
    tab: string;
    conversationId: string | null | undefined;
    oid: string | null | undefined;
    uid: string | null | undefined;
    cid: string | null | undefined;
};

const MobilePageInner = React.memo(
    ({
        tab,
        firstFragmentMenu,
        secondFragmentHeader,
        firstFragment,
        secondFragment,
        swapFragmentsOnMobile,
    }: PageInnerProps) => {
        return (
            <XView
                flexDirection="row"
                flexGrow={1}
                flexShrink={0}
                overflow="hidden"
                alignItems="stretch"
                height="100%"
            >
                {tab === tabs.empty ? (
                    <XView width="100%">
                        {firstFragmentMenu}
                        {swapFragmentsOnMobile ? secondFragment : firstFragment}
                    </XView>
                ) : (
                    <XView flexDirection="column" flexGrow={1}>
                        {secondFragmentHeader}
                        {swapFragmentsOnMobile ? firstFragment : secondFragment}
                    </XView>
                )}
            </XView>
        );
    },
);

const containerStyle = css`
    display: flex;
    flex-direction: column;
    height: 100%;
    width: 344px;
    flex-shrink: 0;
    border-right-width: 1px;
    border-right-style: solid;
    border-right-color: #ececec;
    @media (max-width: 1100px) {
        width: 300px;
    }
    @media (max-width: 950px) {
        width: 230px;
    }
`;

const DesktopDialogContainer = React.memo(({ children }: { children: any }) => (
    <div className={containerStyle}>{children}</div>
));

const DesktopPageInner = React.memo(
    ({
        firstFragmentMenu,
        firstFragment,
        secondFragment,
        secondFragmentHeader,
    }: PageInnerProps) => {
        return (
            <XView
                flexDirection="row"
                flexGrow={1}
                flexShrink={0}
                overflow="hidden"
                alignItems="stretch"
                height="100%"
                width="100%"
            >
                <DesktopDialogContainer>
                    {firstFragmentMenu}
                    {firstFragment}
                </DesktopDialogContainer>
                <XView flexDirection="column" flexGrow={1}>
                    {secondFragmentHeader}
                    <XView flexGrow={1} height="100%" position="relative">
                        <XScrollView2 height="100%"> {secondFragment}</XScrollView2>
                    </XView>
                </XView>
            </XView>
        );
    },
);

const PageInner = AdaptiveHOC({
    DesktopComponent: DesktopPageInner,
    MobileComponent: MobilePageInner,
    fullWidth: true,
});

export const UniversalNavigation = React.memo(
    ({
        tab,
        title,
        menuRightContent,
        menuChildrenContent,
        swapFragmentsOnMobile,
        secondFragmentHeader,
        firstFragment,
        secondFragment,
    }: {
        tab?: any;
        title: string;
        menuRightContent?: any;
        menuChildrenContent?: any;
        swapFragmentsOnMobile?: any;
        secondFragmentHeader?: any;
        firstFragment?: any;
        secondFragment?: any;
    }) => {
        return (
            <>
                <XDocumentHead title={title} />
                <Scaffold>
                    <Scaffold.Content padding={false} bottomOffset={false}>
                        <XView
                            flexDirection="row"
                            flexGrow={1}
                            flexShrink={0}
                            overflow="hidden"
                            alignItems="stretch"
                            height="100%"
                            width="100%"
                        >
                            <PageInner
                                tab={tab}
                                swapFragmentsOnMobile={swapFragmentsOnMobile}
                                firstFragmentMenu={
                                    <Menu title={title} rightContent={menuRightContent}>
                                        {menuChildrenContent}
                                    </Menu>
                                }
                                secondFragmentHeader={secondFragmentHeader}
                                firstFragment={firstFragment}
                                secondFragment={secondFragment}
                            />
                        </XView>
                    </Scaffold.Content>
                </Scaffold>
            </>
        );
    },
);
