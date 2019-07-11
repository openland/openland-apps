import * as React from 'react';
import { Container, InnerContainer } from './components/Container';
import { XView } from 'react-mental';
import { useController } from './components/UnicornController';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { UnicornLayout } from './components/UnicornLayout';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { AppBarDesktop } from './navigation/AppBarDesktop';
import { AppBarMobile } from './navigation/AppBarMobile';
import { ThemeLightBlue } from 'openland-y-utils/themes';
import { NotificationsButton, NewOptionsButton } from 'openland-web/components/NewOptionsButton';
import { useLayout } from './components/LayoutContext';
import { css } from 'linaria';
import { AccountFragment } from 'openland-web/fragments/account/AccountFragment';
import { DiscoverFragment } from 'openland-web/fragments/discover/DiscoverFragment';

const visibleContainer = css`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    display: flex;
    opacity: 1;
    will-change: opacity;
    pointer-events: auto;
`;

const invisibleContainer = css`
    position: absolute;
    top: 0px;
    left: 0px;
    right: 0px;
    bottom: 0px;
    opacity: 0;
    will-change: opacity;
    pointer-events: none;
`;

const Chat = (props: { id: string }) => {
    return (
        <XView width="100%" height="100%">
            <MessengerFragment id={props.id} />
        </XView>
    );
};

const Root = () => {
    let controller = useController();
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
                flexDirection="row"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0}>
                    Chats
                </XView>
                <XView flexDirection="row" alignItems="center" paddingLeft={12}>
                    <XView marginRight={7} justifyContent="center" alignItems="center">
                        <NotificationsButton />
                    </XView>
                    <NewOptionsButton />
                </XView>
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <DialogListFragment
                    onSearchItemSelected={() => {/*  */ }}
                    onDialogPress={(id) => {
                        controller.push(<Chat id={id} />);
                    }}
                />
            </XView>
        </XView>
    );
};

const RootAccount = () => {
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
                flexDirection="row"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0}>
                    Account
                </XView>
                {/* <XView flexDirection="row" alignItems="center" paddingLeft={12}>
                    <XView marginRight={7} justifyContent="center" alignItems="center">
                        <NotificationsButton />
                    </XView>
                    <NewOptionsButton />
                </XView> */}
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <AccountFragment />
            </XView>
        </XView>
    );
};

const RootDiscover = () => {
    return (
        <XView width="100%" height="100%" flexDirection="column" alignItems="stretch">
            <XView
                height={56}
                paddingHorizontal={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
                flexDirection="row"
            >
                <XView flexGrow={1} minWidth={0} flexBasis={0}>
                    Discover
                </XView>
                {/* <XView flexDirection="row" alignItems="center" paddingLeft={12}>
                    <XView marginRight={7} justifyContent="center" alignItems="center">
                        <NotificationsButton />
                    </XView>
                    <NewOptionsButton />
                </XView> */}
            </XView>
            <XView width="100%" minHeight={0} flexGrow={1} flexBasis={0}>
                <DiscoverFragment />
                {/* <AccountFragment /> */}
            </XView>
        </XView>
    );
};

const Inner = () => {
    let layout = useLayout();
    let d = localStorage.getItem('unicorn-tab');
    let def = 1;
    if (d) {
        try {
            let i = parseInt(d, 10);
            if (i >= 0 && i <= 2) {
                def = i;
            }
        } catch (e) {
            console.warn(e);
        }
    }
    let [selected, setSelected] = React.useState(def);
    let root0 = React.useMemo(() => <RootDiscover />, []);
    let root1 = React.useMemo(() => <Root />, []);
    let root2 = React.useMemo(() => <RootAccount />, []);
    const setSelectedClb = (id: number) => {
        setSelected(id);
        localStorage.setItem('unicorn-tab', id + '');
    };
    return (
        <>
            <InnerContainer>
                <div className={selected === 0 ? visibleContainer : invisibleContainer}>
                    <UnicornLayout root={root0} />
                </div>
                <div className={selected === 1 ? visibleContainer : invisibleContainer}>
                    <UnicornLayout root={root1} />
                </div>
                <div className={selected === 2 ? visibleContainer : invisibleContainer}>
                    <UnicornLayout root={root2} />
                </div>

                {layout === 'desktop' && (
                    <XView position="absolute" top={0} left={0} bottom={0} width={64}>
                        <AppBarDesktop selected={selected} setSelected={setSelectedClb} />
                    </XView>
                )}
            </InnerContainer>
            {layout === 'mobile' && (
                <XView position="absolute" bottom={0} left={0} right={0} height={56} zIndex={1}>
                    <AppBarMobile selected={selected} setSelected={setSelectedClb} />
                </XView>
            )}
        </>
    );
};

export default React.memo(() => {
    return (
        <Container>
            <Inner />
        </Container>
    );
});