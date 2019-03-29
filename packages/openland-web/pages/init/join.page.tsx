import * as React from 'react';
import { useClient } from 'openland-web/utils/useClient';
import { MessagePage } from '../../components/MessagePage';
import { MessagePageContent } from '../../components/MessagePageContent';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { withRouter } from 'openland-x-routing/withRouter';
import { XButton } from 'openland-x/XButton';
import { switchOrganization } from '../../utils/switchOrganization';
import { InitTexts } from './_text';
import { css } from 'linaria';

const InfoText = css`
    margin-bottom: 15px;
`;

export const JoinComponent = ({ inviteKey }: { inviteKey: string }) => {
    const client = useClient();

    const data = client.useWithoutLoaderAccountInviteInfo({
        inviteKey,
    });

    if (data === null) {
        return null;
    }

    return (
        <>
            <XDocumentHead
                title={InitTexts.join.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <XTrack event="Join" />
            <MessagePage>
                {data.invite && (
                    <MessagePageContent title={InitTexts.join.title}>
                        <div className={InfoText}>{data.invite.title}</div>
                        {data.invite.joined && (
                            <XButton
                                text={InitTexts.join.goButton}
                                onClick={() => switchOrganization(data.invite!!.orgId)}
                                style="primary"
                            />
                        )}
                        {!data.invite.joined && (
                            <XButton
                                text={InitTexts.join.joinButton}
                                action={async () => {
                                    await client.mutateAccountInviteJoin({
                                        inviteKey,
                                    });
                                    switchOrganization(data.invite!!.orgId);
                                }}
                                style="primary"
                            />
                        )}
                        {/* <XButton path="/auth/logout" text={TextGlobal.signOut} style="primary" alignSelf="center" /> */}
                    </MessagePageContent>
                )}
                {!data.invite && (
                    <MessagePageContent title="Join">
                        <div className={InfoText}>{InitTexts.join.unableToFindInvite}</div>
                    </MessagePageContent>
                )}
            </MessagePage>
        </>
    );
};

export default withAppBase(
    'Join',
    withRouter(props => {
        let inviteKey = props.router.routeQuery.inviteKey;

        return <JoinComponent inviteKey={inviteKey} />;
    }),
);
