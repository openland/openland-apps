import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { AuthRouter } from '../../components/AuthRouter';
import { InitTexts } from './_text';
import { withInviteActivation } from '../../api/withInviteActivation';
import { XLoader } from 'openland-x/XLoader';

const InfoText = Glamorous.div({
    marginBottom: 15,
});

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

export default withAppBase(
    'Invite',
    withInviteActivation(props => {
        return (
            <AuthRouter>
                <XDocumentHead
                    title={InitTexts.invite.pageTitle}
                    titleSocial={InitTexts.socialPageTitle}
                />
                <XTrack event="Invite">
                    <MessagePage>
                        {props.data.invite ||
                            (props.data.appInvite && (
                                <AcceptInviteComponent
                                    mutation={props.activate}
                                />
                            ))}
                        {!(props.data.invite || props.data.appInvite) && (
                            <MessagePageContent title="Invite">
                                <InfoText>
                                    {InitTexts.invite.unableToFindInvite}
                                </InfoText>
                            </MessagePageContent>
                        )}
                    </MessagePage>
                </XTrack>
            </AuthRouter>
        );
    }),
);
