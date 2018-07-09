import '../init';
import '../../globals';
import * as React from 'react';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { withInviteActivation } from '../../api/withInviteActivation';

class ActivateInvite extends React.Component<{ mutation: any }, { complete: boolean }> {
    constructor(props: any) {
        super(props);
        this.state = { complete: false };
        this.doJoin(props.mutation);
    }

    doJoin = async (mutation: any) => {
        await mutation({});
        this.setState({ complete: true });
    }

    render() {
        return (
            this.state.complete ? < XPageRedirect path="/" /> : null
        );
    }
}

export default withAppBase('Invite', withInviteActivation((props) => {
    return (
        <AuthRouter>
            <XDocumentHead title={InitTexts.join.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Invite">
                <ActivateInvite mutation={props.activate} />
            </XTrack>
        </AuthRouter>
    );
}));