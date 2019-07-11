import * as React from 'react';
import { Container, InnerContainer } from './components/Container';
import { XView } from 'react-mental';
import { useController } from './components/UnicornController';
import { DialogListFragment } from 'openland-web/fragments/dialogs/DialogListFragment';
import { UnicornLayout } from './components/UnicornLayout';
import { MessengerFragment } from 'openland-web/fragments/MessengerFragment';
import { AppBarDesktop } from './navigation/AppBarDesktop';
import { AppBarMobile } from './navigation/AppBarMobile';

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
        <XView width="100%" height="100%">
            <DialogListFragment
                onSearchItemSelected={() => {/*  */ }}
                onDialogPress={(id) => {
                    controller.push(<Chat id={id} />);
                }}
            />
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