import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import { XModal, XModalFooter } from 'openland-x-modal/XModal';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { FullMessage_GeneralMessage } from 'openland-api/Types';
import ExpandIcon from 'openland-icons/ic-expand-pinmessage.svg';
import CloseIcon from 'openland-icons/ic-close.svg';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { convertMessage } from 'openland-engines/utils/convertMessage';
import { convertDsMessage } from 'openland-web/fragments/chat/messenger/data/WebMessageItemDataSource';
import { MessageComponent } from 'openland-web/fragments/chat/messenger/message/MessageComponent';
import { MessengerContext } from 'openland-engines/MessengerEngine';
import { css } from 'linaria';
import { XModalContent } from 'openland-web/components/XModalContent';
import { showModalBox } from 'openland-x/showModalBox';
export interface MessageComponentProps {
    generalMessage: FullMessage_GeneralMessage;
    children?: any;
}

const Close = Glamorous(XLink)({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 32,
    height: 32,
    borderRadius: 50,
    '&:hover': {
        backgroundColor: '#ecedf0',
    },
    '& svg path': {
        fill: '#CCCCCC',
    },
});

const separatorClassName = css`
    height: 1px;
    background-color: rgba(216, 218, 229, 0.45);
    width: 100%;
`;

const Separator = () => {
    return <div className={separatorClassName} />;
};

export const MessageModalBody = (props: MessageComponentProps) => {
    const isMobile = React.useContext(IsMobileContext);
    let messenger = React.useContext(MessengerContext);
    const { generalMessage } = props;

    const dsMessages = convertDsMessage(convertMessage(generalMessage));

    return (
        <>
            <MessageComponent
                conversationId={null}
                noSelector
                message={dsMessages}
                onlyLikes={true}
                isChannel={true}
                isModal={true}
                me={messenger.user}
            />
            <XView
                marginTop={28}
                height={1}
                backgroundColor={'rgba(216, 218, 229, 0.45)'}
                width="100%"
            />
            <Separator />
            <XView
                paddingHorizontal={32}
                paddingTop={isMobile ? 0 : 30}
                paddingBottom={28}
                flexDirection="column"
            >
                {isMobile && (
                    <XView
                        height={52}
                        marginBottom={8}
                        flexDirection="row"
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <XView color="rgba(0, 0, 0, 0.9)" fontSize={20} fontWeight="600">
                            Pinned message
                        </XView>
                        <Close autoClose={true}>
                            <CloseIcon />
                        </Close>
                    </XView>
                )}
                {props.children}
            </XView>
        </>
    );
};

// let target = (
//     <XView cursor="pointer">
//         <ExpandIcon />
//     </XView>
// );

const MessageModal = (props: MessageComponentProps & { hide: () => void }) => {
    return (
        <XView borderRadius={8}>
            <XModalContent>
                <XView height={30} />
                <MessageModalBody {...props} />
            </XModalContent>
            <XModalFooter>
                <XButton text="Cancel" style="primary" size="large" onClick={props.hide} />
                <XView width={12} flexShrink={0} />
                <XButton text="Leave and delete" style="ghost" path="/mail" size="large" />
            </XModalFooter>
        </XView>
    );
};

export const showMessageModal = (props: MessageComponentProps) => {
    showModalBox({}, ctx => <MessageModal {...props} hide={ctx.hide} />);
};
