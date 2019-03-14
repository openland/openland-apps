import * as React from 'react';
import { XView } from 'react-mental';
import { css } from 'linaria';
import {
    MessageFull_alphaAttachments,
    MessageFull_alphaButtons,
    MessageFull_reactions,
    FullMessage_GeneralMessage_reactions,
} from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XButton } from 'openland-x/XButton';
import { XMutation } from 'openland-x/XMutation';
import { MessageTextComponent } from '../../MessageTextComponent';
import { niceBytes } from '../../MessageFileComponent';
import { withRespondPostMessage } from '../../../../../../api/withRespondPostMessage';
import MoreIcon from 'openland-icons/ic-arrow-down-blue.svg';
import { ReactionsRender } from './postReactionsRender';
import { XMemo } from 'openland-y-utils/XMemo';

const PostTitle = css`
    font-size: 18px;
    font-weight: 600;
    color: rgba(0, 0, 0, 0.8);
    display: inline;
    white-space: pre-wrap;
    overflow-wrap: break-word;
`;

const FileItem = css`
    opacity: 0.5;
    font-size: 13px;
    line-height: 1.54;
    font-weight: 500;
    color: #000;
    &:hover {
        text-decoration: none;
        & .icon {
            opacity: 0.5;
        }
        opacity: 1;
        color: #1790ff;
    }
    & span {
        opacity: 0.6;
    }
`;

const FileImage = css`
    width: 11px;
    height: 14px;
    flex-shrink: 0;
    background-image: url(/static/X/file.svg);
    background-repeat: no-repeat;
    background-position: center;
`;

const CoverWrapper = css`
    border-radius: 6px;
    overflow: hidden;
    position: relative;
    flex-shrink: 0
    width: 134px;
    height: 134px;
    & > img {
        display: block;
    }
`;

const RevertIcon = css`
    transform: rotate(180deg);
`;

const RespondPost = withRespondPostMessage(props => (
    <XMutation
        action={async () => {
            await props.respondPostMessage({
                variables: {
                    messageId: (props as any).messageId,
                    buttonId: (props as any).buttonId,
                    reaction: 'respondPost',
                },
            });
        }}
        onSuccess={() => props.router.replace('/mail/' + (props as any).userId)}
    >
        {props.children}
    </XMutation>
)) as React.ComponentType<{
    messageId: string;
    buttonId: string;
    children: any;
    userId: string;
}>;

interface MessagePostComponentProps {
    messageId: string;
    userId: string;
    meId: string;
    senderName: string;
    message: string;
    alphaTitle: string;
    alphaButtons: (MessageFull_alphaButtons[] | null)[];
    alphaAttachments: MessageFull_alphaAttachments[];
    reactions?: FullMessage_GeneralMessage_reactions[];
    edited: boolean;
    privateConversation: boolean;
}

export const MessagePostComponent = XMemo<MessagePostComponentProps>(props => null);
