import * as React from 'react';
import Glamorous from 'glamorous';
import { XView } from 'react-mental';
import { css } from 'linaria';
import { XButton } from 'openland-x/XButton';
import { withQueryLoader } from 'openland-web/components/withQueryLoader';
import { withApp } from 'openland-web/components/withApp';
import { withRouter } from 'openland-x-routing/withRouter';
import { Menu } from 'openland-web/components/MainLayout';
import PlusIcon from 'openland-icons/ic-add-medium-2.svg';
import { tabs } from './mail/tabs';
import { AdaptiveHOC } from 'openland-web/components/Adaptive';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from 'openland-web/components/Scaffold';

const AddButton = Glamorous(XButton)({
    '& svg > g > path': {
        transition: 'all .2s',
    },
    '& svg > g > path:last-child': {
        fill: '#1790ff',
        opacity: 0.5,
    },
});

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

const DesktopDialogContainer = ({ children }: { children: any }) => (
    <div className={containerStyle}>{children}</div>
);

type PageInnerProps = {
    firstFragment: any;
    secondFragment: any;
    tab: string;
    conversationId: string | null | undefined;
    oid: string | null | undefined;
    uid: string | null | undefined;
    cid: string | null | undefined;
};

const MobilePageInner = ({ tab, firstFragment, secondFragment }: PageInnerProps) => {
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
            {tab === tabs.empty ? (
                <XView width="100%">
                    <Menu
                        title={'Messages'}
                        rightContent={
                            <AddButton
                                style="light"
                                path="/mail/new"
                                text="New"
                                icon={<PlusIcon />}
                                size="small"
                            />
                        }
                    />
                    {firstFragment}
                </XView>
            ) : (
                secondFragment
            )}
        </XView>
    );
};

const DesktopPageInner = ({ tab, firstFragment, secondFragment }: PageInnerProps) => {
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
                <Menu
                    title={'Messages'}
                    rightContent={
                        <AddButton
                            style="light"
                            path="/mail/new"
                            text="New"
                            icon={<PlusIcon />}
                            size="small"
                        />
                    }
                />
                {firstFragment}
            </DesktopDialogContainer>
            {secondFragment}
        </XView>
    );
};

const PageInner = AdaptiveHOC({
    DesktopComponent: DesktopPageInner,
    MobileComponent: MobilePageInner,
    fullWidth: true,
});

export default withApp(
    'Mail',
    'viewer',
    withRouter(
        withQueryLoader(() => {
            return (
                <>
                    <XDocumentHead title={'pageTitle'} />
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
                                    tab={tabs.chat}
                                    firstFragment={<XView color="red">firstFragment</XView>}
                                    secondFragment={<XView color="blue">secondFragment</XView>}
                                />
                            </XView>
                        </Scaffold.Content>
                    </Scaffold>
                </>
            );
        }),
    ),
);
