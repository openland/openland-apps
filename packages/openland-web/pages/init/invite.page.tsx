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
import { XLoader } from 'openland-x/XLoader';
import { ErrorPage } from '../../components/ErrorPage';
import { formatError } from 'openland-x-forms/errorHandling';

class ActivateInvite extends React.Component<{ mutation: any }, { complete: boolean, error?: string }> {
    constructor(props: any) {
        super(props);
        this.state = { complete: false };
        this.doJoin(props.mutation);
    }

    doJoin = async (mutation: any) => {
        try {
            await mutation({});
            this.setState({ complete: true });
        } catch (e) {
            this.setState({ complete: true, error: formatError(e) });
        }
    }

    render() {
        console.warn(this.state);
        return (
            <>
                <XLoader loading={!this.state.complete} />
                {this.state.complete && !this.state.error && < XPageRedirect path="/" />}
                {this.state.complete && <ErrorPage statusCode={400} message={this.state.error} />}
            </>
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