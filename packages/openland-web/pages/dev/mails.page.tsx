import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XHeader } from 'openland-x/XHeader';
import { XVertical } from 'openland-x-layout/XVertical';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { withDebugMails } from '../../api/withDebugMails';
import { DebugEmailType } from 'openland-api/Types';
import { XButton } from 'openland-x/XButton';

export default withApp(
    'Super Debug',
    ['super-admin', 'software-developer'],
    withDebugMails(props => {
        return (
            <DevToolsScaffold title="Mails">
                <XHeader text="Mails" />
                <XVertical>
                    <XButton
                        text="WELCOME"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.WELCOME
                                }
                            })
                        }}
                    />
                    <XButton
                        text="ACCOUNT_ACTIVATED"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.ACCOUNT_ACTIVATED
                                }
                            })
                        }}
                    />
                    <XButton
                        text="ACCOUNT_DEACTIVATED"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.ACCOUNT_DEACTIVATED
                                }
                            })
                        }}
                    />
                    <XButton
                        text="MEMBER_REMOVED"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.MEMBER_REMOVED
                                }
                            })
                        }}
                    />
                    <XButton
                        text="MEMBERSHIP_LEVEL_CHANGED"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.MEMBERSHIP_LEVEL_CHANGED
                                }
                            })
                        }}
                    />
                    <XButton
                        text="INVITE"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.INVITE
                                }
                            })
                        }}
                    />
                    <XButton
                        text="MEMBER_JOINED"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.MEMBER_JOINED
                                }
                            })
                        }}
                    />
                    <XButton
                        text="SIGNUP_CODE"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.SIGNUP_CODE
                                }
                            })
                        }}
                    />
                    <XButton
                        text="SIGIN_CODE"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.SIGIN_CODE
                                }
                            })
                        }}
                    />
                    <XButton
                        text="UNREAD_MESSAGE"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.UNREAD_MESSAGE
                                }
                            })
                        }}
                    />
                    <XButton
                        text="UNREAD_MESSAGES"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.UNREAD_MESSAGES
                                }
                            })
                        }}
                    />
                    <XButton
                        text="PUBLIC_ROOM_INVITE"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.PUBLIC_ROOM_INVITE
                                }
                            })
                        }}
                    />
                    <XButton
                        text="PRIVATE_ROOM_INVITE"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.PRIVATE_ROOM_INVITE
                                }
                            })
                        }}
                    />
                    <XButton
                        text="ROOM_INVITE_ACCEPTED"
                        alignSelf="flex-start"
                        style="primary"
                        onClick={async () => {
                            await props.sendMail({
                                variables: {
                                    type: DebugEmailType.ROOM_INVITE_ACCEPTED
                                }
                            })
                        }}
                    />
                </XVertical>
            </DevToolsScaffold>
        );
    }),
);