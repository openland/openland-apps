import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { AuthRouter } from '../root/AuthRouter';
import { InitTexts } from './_text';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
class AcceptInviteComponent extends React.Component<{ mutation: any }> {
    componentDidMount() {
        this.accept();
    }

    accept = async () => {
        await this.props.mutation({});
        window.location.href = '/';
    };
    render() {
        return <XLoader loading={true} />;
    }
}

export default withAppBase('Room Invite', () => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;

    const join = async () => {
        await client.mutateRoomJoinInviteLink({
            invite: router.routeQuery.invite,
        });
    };
    return (
        <AuthRouter>
            <XDocumentHead
                title={InitTexts.invite.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <MessagePage>
                <AcceptInviteComponent mutation={join} />
            </MessagePage>
        </AuthRouter>
    );
});
