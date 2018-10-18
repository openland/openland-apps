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
    paddingLeft: 15,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    width: '100%',
    marginTop: 12,
    borderRadius: 6,
    '& .time': {
        opacity: '1 !important'
    },
    '&::before': {
        display: 'block',
        content: ' ',
        position: 'absolute',
        left: 0,
        top: 0,
        bottom: 4,
        width: 3,
        borderRadius: 3,
        backgroundColor: '#1790ff'
    }
});

const MessageWrapper = Glamorous(XVertical)({
    width: 'calc(100% - 60px)',
    paddingTop: 1,
});

const Name = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '16px',
    color: 'rgba(0, 0, 0, 0.8)'
});

const Organization = makeNavigable(Glamorous.div<NavigableChildProps>(() => ({
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '14px',
    color: 'rgba(0, 0, 0, 0.4)',
    letterSpacing: 0,
    alignSelf: 'flex-end',
    cursor: 'pointer'
})));

const DateComponent = Glamorous.div({
    width: 62,
    fontSize: 12,
    fontWeight: 600,
    lineHeight: '14px',
    whiteSpace: 'nowrap',
    color: 'rgba(0, 0, 0, 0.4)',
    paddingTop: 1,
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
            <XVertical separator={4}>
                <XHorizontal alignSelf="stretch" separator={6}>
                    <XAvatar
                        size="small"
                        style="colorus"
                        objectName={props.sender!!.name}
                        objectId={props.sender!!.id}
                        cloudImageUuid={props.sender ? props.sender.picture!! : undefined}
                        path={'/mail/u/' + props.sender!!.id}
                    />
                    <MessageWrapper separator={2} flexGrow={1}>
                        <XHorizontal separator={5} alignItems="center">
                            <Name>{props.sender!!.name}</Name>
                            {props.sender!!.primaryOrganization && <Organization path={'/mail/o/' + props.sender!!.primaryOrganization!!.id}>{props.sender!!.primaryOrganization!!.name}</Organization>}
                        </XHorizontal>
                        <DateComponent className="time">{date}</DateComponent>
                    </MessageWrapper>
                </XHorizontal>
                {props.message && <MessageTextComponent message={props.message} key={'reply-text'} isService={false} />}
            </XVertical>
        </MessageContainer>
    );
};