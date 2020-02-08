import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XHeader } from 'openland-x/XHeader';
import { DevToolsScaffold } from './components/DevToolsScaffold';

import { DebugEmailType } from 'openland-api/spacex.types';
import { UButton } from 'openland-web/components/unicorn/UButton';
import { XContent } from 'openland-x-layout/XContent';
import { useClient } from 'openland-api/useClient';
import { XVertical2 } from 'openland-x/XVertical2';

interface DebugMailButtonProps {
    sendMail?: any;
    emailType: DebugEmailType;
}

class DebugMailButtonInner extends React.Component<DebugMailButtonProps, { isSended: boolean }> {
    render() {
        return (
            <UButton
                alignSelf="flex-start"
                text={this.props.emailType.toString()}
                style="primary"
                action={async () => {
                    await this.props.sendMail({
                        variables: {
                            type: this.props.emailType,
                        },
                    });
                }}
            />
        );
    }
}

const DebugMailButton = (props: DebugMailButtonProps) => {
    const client = useClient();
    const sendMail = async ({ variables }: { variables: any }) => {
        await client.mutateDebugMails(variables);
    };
    return <DebugMailButtonInner {...props as any} sendMail={sendMail} />;
};

export default withApp('Super Debug', ['super-admin', 'software-developer'], props => (
    <DevToolsScaffold title="Mails">
        <XHeader text="Mails" />
        <XContent>
            <XVertical2>
                <DebugMailButton emailType={DebugEmailType.WELCOME} />
                <DebugMailButton emailType={DebugEmailType.ACCOUNT_ACTIVATED} />
                <DebugMailButton emailType={DebugEmailType.ACCOUNT_DEACTIVATED} />
                <DebugMailButton emailType={DebugEmailType.MEMBER_REMOVED} />
                <DebugMailButton emailType={DebugEmailType.MEMBERSHIP_LEVEL_CHANGED} />
                <DebugMailButton emailType={DebugEmailType.INVITE} />
                <DebugMailButton emailType={DebugEmailType.MEMBER_JOINED} />
                <DebugMailButton emailType={DebugEmailType.SIGNUP_CODE} />
                <DebugMailButton emailType={DebugEmailType.SIGIN_CODE} />
                <DebugMailButton emailType={DebugEmailType.UNREAD_MESSAGE} />
                <DebugMailButton emailType={DebugEmailType.UNREAD_MESSAGES} />
                <DebugMailButton emailType={DebugEmailType.PUBLIC_ROOM_INVITE} />
                <DebugMailButton emailType={DebugEmailType.PRIVATE_ROOM_INVITE} />
                <DebugMailButton emailType={DebugEmailType.ROOM_INVITE_ACCEPTED} />
            </XVertical2>
        </XContent>
    </DevToolsScaffold>
));
