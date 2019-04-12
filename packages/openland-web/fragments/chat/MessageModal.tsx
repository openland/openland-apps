import * as React from 'react';
import { XView } from 'react-mental';
import Glamorous from 'glamorous';
import { XModal } from 'openland-x-modal/XModal';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import {
    FullMessage_GeneralMessage,
    FullMessage_GeneralMessage_attachments_MessageAttachmentFile,
} from 'openland-api/Types';
import ExpandIcon from 'openland-icons/ic-expand-pinmessage.svg';
import CloseIcon from 'openland-icons/ic-close.svg';
import { XLink } from 'openland-x/XLink';
import { XModalFooter } from 'openland-x-modal/XModal';
import { XButton } from 'openland-x/XButton';
import { convertMessage } from 'openland-web/components/messenger/message/content/CommentsModal';
import { convertDsMessage } from 'openland-web/components/messenger/data/WebMessageItemDataSource';
import { MessageComponent } from 'openland-web/components/messenger/message/MessageComponent';

export interface MessageComponentProps {
    footer?: any;
    afterDateElems?: any;
    nearCrossButtons?: any;
    generalMessage: FullMessage_GeneralMessage;
    target?: any;
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

type attachmentType = FullMessage_GeneralMessage_attachments_MessageAttachmentFile;

export const MessageModalBody = (props: MessageComponentProps) => {
    const isMobile = React.useContext(IsMobileContext);
    const { generalMessage, nearCrossButtons, afterDateElems } = props;

    const dsMessages = convertDsMessage(convertMessage(generalMessage));

    return (
        <>
            <MessageComponent message={dsMessages} isChannel={true} me={null} />
            <XView
                paddingHorizontal={32}
                paddingTop={isMobile ? 0 : 30}
                paddingBottom={30}
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

export const MessageModal = React.memo((props: MessageComponentProps) => {
    let target = (
        <XView cursor="pointer">
            <ExpandIcon />
        </XView>
    );

    if (props.target) {
        target = props.target;
    }

    return (
        <XModal
            useTopCloser
            body={<MessageModalBody {...props} />}
            target={target}
            footer={
                props ? (
                    props.footer
                ) : (
                    <XModalFooter>
                        <XButton text="Cancel" style="primary" autoClose={true} />
                        <XView width={12} flexShrink={0} />
                        <XButton text="Leave and delete" style="ghost" path="/mail" />
                    </XModalFooter>
                )
            }
        />
    );
});
