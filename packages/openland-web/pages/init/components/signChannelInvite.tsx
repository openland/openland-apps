import * as React from 'react';
import { XView } from 'react-mental';
import * as Cookie from 'js-cookie';
import { XLoader } from 'openland-x/XLoader';
import { MessagePageContent } from 'openland-web/components/MessagePageContent';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { InitTexts } from '../_text';
import { useClient } from 'openland-web/utils/useClient';
import { InviteLandingComponent } from 'openland-web/fragments/invite/InviteLandingComponent';
import { Footer } from 'openland-web/fragments/invite/Footer';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { UserInfoContext } from 'openland-web/components/UserInfo';
import { useIsMobile } from 'openland-web/hooks/useIsMobile';
import { XDialogProviderComponent } from 'openland-x/XDialogProvider';
import { LayoutProvider } from 'openland-unicorn/components/utils/LayoutContext';

type InviteInfoInnerT = {
    variables: { invite: string };
    redirect: string;
    instantRedirect?: string;
};

const InviteInfoInner = (props: any) => {
    const {
        instantRedirect,
        redirect,
        loading,
    }: InviteInfoInnerT & { data: any; loading: any } = props;
    const client = useClient();
    const isMobile = useIsMobile();
    const data = client.useWithoutLoaderRoomInviteInfo({
        invite: props.variables.invite,
    });

    if (data === null) {
        return null;
    }

    return (
        <>
            <XDocumentHead
                title={InitTexts.join.pageTitle}
                description={data.invite && data.invite.room ? data.invite.room.description : ''}
                titleSocial={
                    (data.invite && data.invite.room && data.invite.room.title) ||
                    InitTexts.socialPageTitle
                }
                imgUrl={
                    data.invite && data.invite.room
                        ? data.invite.room.socialImage || data.invite.room.photo
                        : undefined
                }
            />
            {instantRedirect && <XPageRedirect path={instantRedirect} />}
            {!instantRedirect && (
                <XView flexDirection="column" minHeight="100vh" width="100%" backgroundColor="#fff">
                    <XView flexGrow={1}>
                        {data.invite && (
                            <>
                                <InviteLandingComponent
                                    signupRedirect={
                                        '/signin?redirect=' + encodeURIComponent(redirect)
                                    }
                                />
                                {!isMobile && <Footer />}
                            </>
                        )}
                        {!data.invite &&
                            !loading && (
                                <MessagePageContent title="Join">
                                    <XView marginBottom={15}>
                                        {InitTexts.join.unableToFindInvite}
                                    </XView>
                                </MessagePageContent>
                            )}
                        {!data.invite && loading && <XLoader loading={true} />}
                    </XView>
                </XView>
            )}
        </>
    );
};

export const SignInInvite = ({ invite }: { invite: string }) => {
    Cookie.set('x-openland-invite', invite, { path: '/' });

    let userCtx = React.useContext(UserInfoContext)!!;

    const instantRedirect = userCtx.isLoggedIn
        ? (userCtx.isCompleted ? '/mail/invite/' : '/acceptChannelInvite/') + invite
        : undefined;

    return (
        <>
            <XDocumentHead
                title={InitTexts.invite.pageTitle}
                titleSocial={InitTexts.socialPageTitle}
            />
            <LayoutProvider>
                <XDialogProviderComponent />
                <InviteInfoInner
                    variables={{ invite }}
                    redirect={`/acceptChannelInvite/${invite}`}
                    instantRedirect={instantRedirect}
                />
            </LayoutProvider>

        </>
    );
};
