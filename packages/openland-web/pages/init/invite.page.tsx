import * as React from 'react';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { AuthRouter } from '../root/AuthRouter';
import { InitTexts } from './_text';
import { withInviteActivation } from '../../api/withInviteActivation';
import { XLoader } from 'openland-x/XLoader';
import { css } from 'linaria';

const InfoText = css`
    margin-bottom: 15px;
`;

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
                <MessagePage>
                    {props.data.invite ||
                        (props.data.appInvite && (
                            <AcceptInviteComponent mutation={props.activate} />
                        ))}
                    {!(props.data.invite || props.data.appInvite) && (
                        <MessagePageContent title="Invite">
                            <div className={InfoText}>{InitTexts.invite.unableToFindInvite}</div>
                        </MessagePageContent>
                    )}
                </MessagePage>
            </AuthRouter>
        );
    }),
);
