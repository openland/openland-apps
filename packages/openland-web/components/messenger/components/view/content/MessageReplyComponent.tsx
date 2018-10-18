import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XVertical } from 'openland-x-layout/XVertical';
import { makeNavigable, NavigableChildProps } from 'openland-x/Navigable';
import { XDate } from 'openland-x-format/XDate';
import { MessageFull_reply_sender } from 'openland-api/Types';
import { MessageTextComponent } from './MessageTextComponent';

const MessageContainer = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 7,
    paddingBottom: 3,
    width: '100%',
    marginTop: 12,
    borderRadius: 6,
    '& .time': {
        opacity: '1 !important'
    },
    '&::before': {
        display: 'block',
        content: `''`,
        position: 'absolute',
        left: 0,
        top: 0,
        width: 3,
        height: '100%',
        borderRadius: 2,
        backgroundColor: '#1790ff'
    }
});

const MessageWrapper = Glamorous(XVertical)({
    width: 'calc(100% - 60px)'
});

const Name = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    color: '#121e2b'
});

const Organization = makeNavigable(Glamorous.div<NavigableChildProps>(() => ({
    fontSize: 12,
    fontWeight: 500,
    color: '#99A2B0',
    letterSpacing: -0.2,
    alignSelf: 'flex-end',
    marginBottom: -1,
    cursor: 'pointer'
})));

const DateComponent = Glamorous.div({
    flexShrink: 0,
    width: 62,
    marginBottom: -1,
    fontSize: 11,
    paddingTop: 1,
    fontWeight: 600,
    whiteSpace: 'nowrap',
    color: '#99A2B0'
});

interface ReplyMessageProps {
    sender: MessageFull_reply_sender;
    id: string;
    date: any;
    message: string | null;
}

export const MessageReplyComponent = (props: ReplyMessageProps) => {
    let date = <XDate value={props.date} format="time" />;
    return (
        <MessageContainer>
            <XHorizontal alignSelf="stretch">
                <XAvatar
                    style="colorus"
                    objectName={props.sender!!.name}
                    objectId={props.sender!!.id}
                    cloudImageUuid={props.sender ? props.sender.picture!! : undefined}
                    path={'/mail/u/' + props.sender!!.id}
                />
                <MessageWrapper separator={2} flexGrow={1}>
                    <XHorizontal separator={4}>
                        <XHorizontal separator={4} alignItems="center">
                            <Name>{props.sender!!.name}</Name>
                            {props.sender!!.primaryOrganization && <Organization path={'/mail/o/' + props.sender!!.primaryOrganization!!.id}>{props.sender!!.primaryOrganization!!.name}</Organization>}
                        </XHorizontal>
                        <DateComponent className="time">{date}</DateComponent>
                    </XHorizontal>
                    {props.message && <MessageTextComponent message={props.message} key={'reply-text'} isService={false} />}
                </MessageWrapper>
            </XHorizontal>
        </MessageContainer>
    );
};