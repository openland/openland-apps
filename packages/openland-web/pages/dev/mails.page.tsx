import * as React from 'react';
import { withApp } from '../../components/withApp';
import { XHeader } from 'openland-x/XHeader';
import { XVertical } from 'openland-x-layout/XVertical';
import { DevToolsScaffold } from './components/DevToolsScaffold';
import { withDebugMails } from '../../api/withDebugMails';
import { DebugEmailType } from 'openland-api/Types';
import { XButton } from 'openland-x/XButton';
import { XContent } from 'openland-x-layout/XContent';

interface DebugMailButtonProps {
    sendMail?: any;
    emailType: DebugEmailType;
}

class DebugMailButtonInner extends React.Component<DebugMailButtonProps, { isSended: boolean; }> {
    state = {
        isSended: false
    }

    handleSended = () => {
        this.setState({
            isSended: true
        })

        setTimeout(() => {
            this.setState({
                isSended: false
            })
        }, 3000);
    }

    render () {
        return (
            <XButton
                alignSelf="flex-start"
                icon={this.state.isSended ? 'check' : undefined}
                text={this.state.isSended ? 'Sent!' : this.props.emailType.toString()}
                style={this.state.isSended ? 'success' : 'primary'}
                action={async () => {
                    await this.props.sendMail({
                        variables: {
                            type: this.props.emailType
                        }
                    })
                }}
                onSuccess={this.handleSended}
            />
        );
    }
}

const DebugMailButton = withDebugMails(props => (
    <DebugMailButtonInner {...props as any} />
)) as React.ComponentType<DebugMailButtonProps>;

export default withApp(
    'Super Debug',
    ['super-admin', 'software-developer'],
    props => (
        <DevToolsScaffold title="Mails">
            <XHeader text="Mails" />
            <XContent>
                <XVertical>
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
                </XVertical>
            </XContent>
        </DevToolsScaffold>
    ),
);