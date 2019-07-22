import * as React from 'react';
import { DataSourceWebMessageItem } from '../data/WebMessageItemDataSource';
import { MessageContent } from './MessageContent';

export const MessageComponent = (props: { message: DataSourceWebMessageItem }) => {
    let { message } = props;
    // palce t oadd hader and all callbacks
    return <MessageContent message={message} />;
};