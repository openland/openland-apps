import * as React from 'react';
import { css } from 'linaria';
import { MessageContent } from '../MessageContent';
import { DataSourceWebMessageItem } from '../../data/WebMessageItemDataSource';

let replyMeesageGroupClass = css`
    display: flex;
    flex-direction: column;
    border-left: 2px solid #C4C7CC;
    padding-left: 14px;
`;

export const ReplyMessagesGroup = (props: { quotedMessages: DataSourceWebMessageItem[], onUserPress: (id: string) => void, onGroupPress: (id: string) => void }) => {
    let firstMessage = props.quotedMessages[0];
    let org = firstMessage.sender.primaryOrganization;
    return (
        <div className={replyMeesageGroupClass}>
            <span>{firstMessage.sender.name} <span>{org && org.name}</span> <span>{firstMessage.date}</span></span>
            {props.quotedMessages.map(q => <MessageContent key={q.id} message={q} />)}
        </div>
    );
};

export const ReplyContent = (props: { quotedMessages: DataSourceWebMessageItem[], onUserPress: (id: string) => void, onGroupPress: (id: string) => void }) => {
    let content = props.quotedMessages.reduce((res, message, i, source) => {
        // group messages by sender
        let prev = source[i - 1];
        let group: DataSourceWebMessageItem[];
        if (message.sender.id === (prev && prev.sender.id)) {
            group = res[res.length - 1];
        } else {
            group = [];
            res.push(group);
        }
        group.push(message);
        return res;
    }, ([] as DataSourceWebMessageItem[][]))
        .map((group, i) => {
            return <ReplyMessagesGroup key={i} {...props} quotedMessages={group} />;
        });
    return (
        <>{content}</>
    );
};
