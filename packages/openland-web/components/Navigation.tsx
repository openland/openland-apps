import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { Menu } from 'openland-web/components/MainLayout';
import { tabs } from '../pages/main/mail/tabs';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';

type PageInnerProps = {
    swapFragmentsOnMobile?: boolean;
    firstFragmentMenu: React.ReactElement<any>;
    firstFragment: React.ReactElement<any>;
    secondFragment: React.ReactElement<any>;
    secondFragmentHeader: React.ReactElement<any>;
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
                    <XView position="relative" width="100%">
                        {firstFragmentMenu}
                        {swapFragmentsOnMobile ? secondFragment : firstFragment}
                    </XView>
                ) : (
                    <XView position="relative" flexDirection="column" flexGrow={1} width="100%">
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
    position: relative;
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

const contentStyle = css`
    display: flex;
    position: relative;
    flex-direction: column;
    height: 100%;
    flex-grow: 1;
    width: calc(100% - 344px);
    flex-shrink: 0;
    @media (max-width: 1100px) {
        width: calc(100% - 300px);
    }
    @media (max-width: 950px) {
        width: calc(100% - 230px);
    }
`;

const DesktopDialogContainer = React.memo(({ children }: { children: any }) => (
    <div className={containerStyle}>{children}</div>
));

const DesktopContentContainer = React.memo(({ children }: { children: any }) => (
    <div className={contentStyle}>{children}</div>
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
                <DesktopContentContainer>
                    {secondFragmentHeader}
                    {secondFragment}
                </DesktopContentContainer>
            </XView>
        );
    },
);

const PageInner = AdaptiveHOC({
    DesktopComponent: DesktopPageInner,
    MobileComponent: MobilePageInner,
    fullWidth: true,
});

export const Navigation = React.memo(
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
        menuRightContent?: React.ReactElement<any> | null | boolean;
        menuChildrenContent?: React.ReactElement<any> | null | boolean;
        swapFragmentsOnMobile?: boolean;
        secondFragmentHeader?: React.ReactElement<any> | null | boolean;
        firstFragment?: React.ReactElement<any> | null | boolean;
        secondFragment?: React.ReactElement<any> | null | boolean;
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
