
import * as React from 'react';
import Glamorous from 'glamorous';
import { MessagePage } from '../../components/MessagePage';
import { withAppBase } from '../../components/withAppBase';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XTrack } from 'openland-x-analytics/XTrack';
import { InitTexts } from './_text';
import { withInviteActivation } from '../../api/withInviteActivation';
import { withInviteInfo } from '../../api/withInviteInfo';
import { XPageRedirect } from 'openland-x-routing/XPageRedirect';
import { XVertical } from 'openland-x-layout/XVertical';
import { XAvatar } from 'openland-x/XAvatar';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XText } from 'openland-x/XText';
import { XLinkProps, XLink } from 'openland-x/XLink';
import { withRouter } from 'openland-x-routing/withRouter';

const BubbleMsg = Glamorous(XVertical)({
    borderRadius: 18,
    backgroundColor: '#F4F5F7',
    paddingTop: 18,
    paddingBottom: 18,
    paddingLeft: 22,
    paddingRight: 22
});

const LogoAvatar = Glamorous(XAvatar)({
    padding: 8
});

const ButtonsContainer = Glamorous(XHorizontal)({
    paddingLeft: 58
});

const StyledButton = Glamorous(XLink)<{ primary?: boolean }>((props) => ({
    display: 'block',
    paddingLeft: 20,
    paddingRight: 22,
    height: 40,
    transition: 'all .15s ease',
    backgroundColor: props.primary ? '#654bfa' : '#ffffff',
    color: props.primary ? '#fff' : '#334562',
    borderRadius: 8,
    border: props.primary ? 'solid 1px transparent' : 'solid 1px #dcdee4',
    '&:hover': {
        color: props.primary ? '#fff' : '#334562',
        backgroundColor: props.primary ? '#7159f9' : '#f3f3f5'
    },
    '&:focus': {
        boxShadow: '0 0 0 1px rgba(50,151,211,.2), 0 0 0 2px rgba(50,151,211,.25), 0 2px 5px 0 rgba(0,0,0,.1), 0 0 0 0 transparent, 0 0 0 0 transparent',
    },
    '&:active': {
        color: props.primary ? '#fff' : '#5640d6',
        backgroundColor: props.primary ? '#5640d6' : '#eeecfa'
    },
    '& span': {
        fontSize: 15,
        fontWeight: 500,
        letterSpacing: -0.3,
        lineHeight: 1.11
    },
    '& svg': {
        width: 19,
        height: 19,
        marginRight: 15
    },
    '&.email': {
        paddingLeft: 19,
        '& svg': {
            width: 21,
            height: 21,
            marginRight: 9
        },
        '& svg path': {
            transition: 'all .15s'
        },
        '&:active': {
            '& svg path:first-child': {
                fill: '#5640d6'
            }
        }
    }
}));

const ButtonChildren = Glamorous.div({
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
});

interface ButtonProps extends XLinkProps {
    primary?: boolean;
    children: any;
}

export const ImgButton = (props: ButtonProps) => {
    const { children, ...other } = props;
    return (
        <StyledButton {...other}>
            <ButtonChildren tabIndex={-1}>
                {props.children}
            </ButtonChildren>
        </StyledButton>
    );
};

const XTextMargin = Glamorous(XText)({
    marginBottom: 46,
    fontSize: 24,
    color: '#1f3449',
    textAlign: 'center'
});

const InviteInfo = withInviteInfo((props) => {
    let signPath = '/signin?redirect=' + encodeURIComponent((props as any).redirect);
    return props.data.invite && props.data.invite.forEmail && props.data.invite.creator ?
        (
            <XVertical separator={36}>
                {props.data.invite.forName && <XTextMargin>{'Wellcome, ' + props.data.invite.forName + '!'}</XTextMargin>}

                <XVertical separator={12}>
                    <XHorizontal separator={5}>
                        <XAvatar size="medium" cloudImageUuid={props.data.invite.creator.picture || undefined} style={'colorus'} objectName={props.data.invite.creator.name} objectId={props.data.invite.creator.id} />
                        <BubbleMsg separator={3}>
                            <XText letterSpacing={-0.2} fontWeight={500} fontSize={16} color="#334562">{props.data.invite.creator.name}</XText>
                            <XText letterSpacing={-0.2} fontSize={16} color="#61707e">{props.data.invite.creator.name + ' has invited you to join Openland'}</XText>
                        </BubbleMsg>
                    </XHorizontal>

                    <XHorizontal separator={5}>
                        <LogoAvatar size="medium" src="/static/logo-purple.svg" />
                        <BubbleMsg separator={3}>
                            <XText letterSpacing={-0.2} fontWeight={500} fontSize={16} color="#334562">Openland</XText>
                            <XText letterSpacing={-0.2} lineHeight={1.5} fontSize={16} color="#61707e"><p>Openland is a free messenger for real estate professionals.</p>
                                <p>It’s a great way to discover and discuss new opportunities,</p>
                                <p>and share information about the market.</p></XText>
                        </BubbleMsg>
                    </XHorizontal>

                    <ButtonsContainer justifyContent="stretch">
                        <ImgButton path={signPath + '&email=' + encodeURIComponent(props.data.invite.forEmail || ' ')} className="email">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                <g fill="none" fillRule="evenodd">
                                    <path fill="#ADB5C0" d="M11.409 9.23c-1.038 0-1.665.89-1.665 2.373 0 1.482.616 2.372 1.665 2.372s1.676-.901 1.676-2.372c0-1.472-.638-2.373-1.676-2.373zM11.762 2C17.225 2 21 5.41 21 10.508c0 3.57-1.745 5.816-4.585 5.816-1.47 0-2.531-.627-2.84-1.722h-.193c-.468 1.14-1.369 1.734-2.68 1.734-2.372 0-3.946-1.916-3.946-4.813 0-2.771 1.517-4.642 3.763-4.642 1.243 0 2.236.605 2.692 1.62h.194V7.155h2.611v5.793c0 .799.354 1.29.992 1.29.993 0 1.643-1.301 1.643-3.456 0-4.14-2.726-6.775-6.923-6.775-4.368 0-7.379 3.068-7.379 7.561 0 4.608 3.091 7.38 7.847 7.38 1.06 0 2.144-.138 2.737-.32v2.03c-.821.217-1.882.342-2.977.342C6.06 21 2 17.282 2 11.511 2 5.878 6.003 2 11.762 2z" />
                                    <path d="M0 0h24v24H0z" />
                                </g>
                            </svg>

                            <span>Join with Email</span>
                        </ImgButton>
                        <ImgButton path={signPath + '&google=true'} primary={true}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" version="1.1" width="50px" height="50px">
                                <g id="surface1">
                                    <path fill="#fff" d="M 12.546875 10.238281 L 12.546875 14.058594 L 17.988281 14.058594 C 17.277344 16.375 15.34375 18.03125 12.546875 18.03125 C 9.214844 18.03125 6.511719 15.332031 6.511719 12 C 6.511719 8.667969 9.214844 5.96875 12.546875 5.96875 C 14.042969 5.96875 15.410156 6.515625 16.464844 7.421875 L 19.28125 4.605469 C 17.503906 2.988281 15.140625 2 12.546875 2 C 7.019531 2 2.542969 6.476563 2.542969 12 C 2.542969 17.523438 7.019531 22 12.546875 22 C 20.941406 22 22.792969 14.148438 21.972656 10.253906 Z " />
                                </g>
                            </svg>
                            <span>Join with Google</span>
                        </ImgButton>
                    </ButtonsContainer>
                </XVertical>
            </XVertical>
        ) :
        (<XPageRedirect path={signPath} />);
}) as React.ComponentType<{ variables: { inviteKey: string }, redirect: string }>;

export default withAppBase('Invite', withRouter((props) => {
    console.warn(String(props.router.query.redirect).split('/')[2]);

    return (
        <>
            <XDocumentHead title={InitTexts.invite.pageTitle} titleSocial={InitTexts.socialPageTitle} />
            <XTrack event="Invite">
                <MessagePage>
                    <InviteInfo variables={{ inviteKey: props.router.query.redirect.split('/')[2] }} redirect={props.router.query.redirect} />
                </MessagePage>
            </XTrack>
        </>
    );
}));