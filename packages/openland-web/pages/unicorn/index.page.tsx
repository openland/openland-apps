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
                paddingLeft={16}
                paddingVertical={12}
                backgroundColor="#fff"
                fontSize={24}
                lineHeight="32px"
                fontWeight="600"
                color={ThemeLightBlue.foregroundPrimary}
            >
                Chats
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

export default () => {
    return (
        <Container>
            <InnerContainer>
                <UnicornLayout
                    root={<Root />}
                    desktopBar={<AppBarDesktop />}
                    mobileBar={<AppBarMobile />}
                />
            </InnerContainer>

        </Container>
    );
};