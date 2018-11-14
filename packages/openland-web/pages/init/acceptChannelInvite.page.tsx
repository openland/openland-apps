import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { XLoader } from 'openland-x/XLoader';
import { withChanneJoinlnviteSIgnin } from '../../api/withChanneJoinlnviteSIgnin';

class AcceptInviteComponent extends React.Component<{ mutation: any }> {

    componentDidMount() {
        this.accept();
    }

    accept = async () => {
        await this.props.mutation({});
        window.location.href = '/';
    }
    render() {
        return (<XLoader loading={true} />);
    }
}

export default withAppBase('Room Invite', withChanneJoinlnviteSIgnin((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.invite.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Invite">
                <MessagePage>
                    <AcceptInviteComponent mutation={props.join} />

                </MessagePage>
            </XTrack>
        </AuthRouter>
    );
}));