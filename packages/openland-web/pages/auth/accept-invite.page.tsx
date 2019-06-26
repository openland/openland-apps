import * as React from 'react';
import Glamorous from 'glamorous';
import { XLoader } from 'openland-x/XLoader';
import { useClient } from 'openland-web/utils/useClient';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { InitTexts } from 'openland-web/pages/init/_text';
import { XAvatar } from 'openland-x/XAvatar';
import { XText } from 'openland-x/XText';
import { withApp } from 'openland-web/components/withApp';
import {
    SubTitle,
    ButtonsWrapper,
    GoogleButton,
    EmailButton,
    Separator,
} from 'openland-web/pages/init/components/SignComponents';

const SignInInviteTitle = Glamorous.div({
    textAlign: 'center',
    opacity: 0.9,
    fontSize: 32,
    fontWeight: 600,
    lineHeight: '31px',
    letterSpacing: 0.8,
    color: '#121e2b',
    paddingTop: 24,
    paddingBottom: 26,
});

const InviteInfoInner = ({
    inviter,
    signPath,
    loginWithGoogle,
    loginWithEmail,
    signin,
    isInvitePageSignin,
}: {
    loginWithGoogle: Function;
    loginWithEmail: Function;
    signPath: string;
    signin: boolean;
    isInvitePageSignin: boolean;
    inviter: { photo: string | null; name: string; id: string };
}) => {
    const googleButtonText = isInvitePageSignin
        ? InitTexts.auth.signinGoogle
        : InitTexts.auth.signupGoogle;
    const emailText = isInvitePageSignin ? InitTexts.auth.signinEmail : InitTexts.auth.signupEmail;

    return (
        <div>
            <XVertical alignItems="center">
                <XHorizontal alignItems="center">
                    <XAvatar
                        size={'small'}
                        cloudImageUuid={inviter.photo || undefined}
                        objectName={inviter.name}
                        objectId={inviter.id}
                    />
                    <XText fontSize={16} color="#000000">
                        {inviter.name + ' invites you to join'}
                    </XText>
                </XHorizontal>
            </XVertical>
            <SignInInviteTitle>Welcome to Openland</SignInInviteTitle>
            <SubTitle
                style={{
                    maxWidth: 535,
                }}
            >
                <p>
                    Openland is a professional messenger designed <br /> to support all
                    communication needs of a modern business. <br /> Currently it&apos;s in
                    invite-only mode.
                </p>
            </SubTitle>
            <ButtonsWrapper marginTop={37} width={280}>
                <GoogleButton rounded onClick={loginWithGoogle} text={googleButtonText} />
                <Separator />
                <EmailButton rounded onClick={loginWithEmail} text={emailText} />
            </ButtonsWrapper>
        </div>
    );
};

export const AcceptInvitePage = (props: {
    variables: { inviteKey: string };
    signin: boolean;
    loginWithGoogle: Function;
    loginWithEmail: Function;
    isInvitePageSignin: boolean;
}) => {
    const client = useClient();

    const resolvedInvite = client.useWithoutLoaderResolvedInvite({
        key: props.variables.inviteKey,
    });

    if (!resolvedInvite || !resolvedInvite.invite) {
        return <XLoader loading={true} />;
    }

    let inviter;

    if (resolvedInvite && resolvedInvite.invite) {
        if (resolvedInvite.invite.__typename === 'AppInvite') {
            inviter = resolvedInvite.invite.inviter;
        } else if (resolvedInvite.invite.__typename === 'RoomInvite') {
            inviter = resolvedInvite.invite.invitedByUser;
        } else if (resolvedInvite.invite.__typename === 'InviteInfo') {
            inviter = resolvedInvite.invite.creator;
        }
    }

    if (resolvedInvite.invite.__typename === 'RoomInvite') {
        return <XPageRedirect path={`/joinChannel/${props.variables.inviteKey}`} />;
    }

    if (resolvedInvite.invite.__typename === 'InviteInfo') {
        return <XPageRedirect path={`/signin/join/${props.variables.inviteKey}`} />;
    }

    let signPath = '/signup?redirect=' + encodeURIComponent((props as any).redirect);

    if (!inviter) {
        return <XLoader loading={true} />;
    }
    return (
        <InviteInfoInner
            signin={props.signin}
            inviter={inviter}
            signPath={signPath}
            loginWithGoogle={props.loginWithGoogle}
            loginWithEmail={props.loginWithEmail}
            isInvitePageSignin={props.isInvitePageSignin}
        />
    );
};

export default withApp('Home', 'viewer', () => {
    return <div />;
});
