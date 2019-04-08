import * as React from 'react';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { User_user } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XModal } from 'openland-x-modal/XModal';
import { XLink } from 'openland-x/XLink';
import { XCloudImage } from 'openland-x/XCloudImage';
import ModalCloseIcon from 'openland-icons/ic-modal-close.svg';
import {
    BackButton,
    Section,
    SectionContent,
    HeaderWrapper,
    extractHostname,
} from './OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XOverflow } from '../../../../components/XOverflow';
import { XSocialButton } from 'openland-x/XSocialButton';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XDate } from 'openland-x/XDate';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { emoji } from 'openland-y-utils/emoji';

const ModalCloser = Glamorous(XLink)({
    position: 'fixed',
    right: 20,
    top: 20,
    width: 36,
    height: 36,
    borderRadius: 5,
    backgroundColor: 'transparent',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
});

const ModalBody = Glamorous.div({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
    marginBottom: 40,
    '&:hover > .download-button': {
        opacity: 1,
    },
});

const ModalPic = Glamorous(XCloudImage)({
    borderRadius: 8,
    objectFit: 'contain',
    maxHeight: '90vh',
});

const StatusWrapperOffline = css`
    color: rgba(0, 0, 0, 0.5);
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    margin-top: 7px;
`;

const StatusWrapperOnline = css`
    color: #1790ff;
    font-size: 13px;
    line-height: 18px;
    font-weight: 400;
    margin-top: 7px;
`;

const UserStatus = (props: { variables: { userId: string }; isBot: boolean }) => {
    const client = useClient();

    const data = client.useOnline(props.variables, {
        fetchPolicy: 'network-only',
    });

    const { user } = data;

    if (props.isBot) {
        return <div className={StatusWrapperOnline}>bot</div>;
    }
    if (user && (user.lastSeen && user.lastSeen !== 'online' && !user.online)) {
        return (
            <div className={StatusWrapperOffline}>
                {TextProfiles.User.status.lastSeen}{' '}
                {user.lastSeen === 'never_online' ? (
                    TextProfiles.User.status.momentsAgo
                ) : (
                    <XDate value={user.lastSeen} format="humanize_cute" />
                )}
            </div>
        );
    } else if (user && user.online) {
        return <div className={StatusWrapperOnline}>{TextProfiles.User.status.online}</div>;
    } else {
        return null;
    }
};

const AvatarModal = (props: { photo?: string; userName: string; userId: string }) => {
    return (
        <XModal
            useTopCloser={true}
            width={512}
            heading={null}
            transparent={true}
            body={
                <ModalBody>
                    <ModalCloser autoClose={true} className="closer">
                        <ModalCloseIcon />
                    </ModalCloser>
                    <ModalPic srcCloud={props.photo} resize={'fill'} width={512} height={512} />
                </ModalBody>
            }
            target={
                <XAvatar2 src={props.photo} size={58} title={props.userName} id={props.userId} />
            }
        />
    );
};

const Header = (props: { user: User_user }) => {
    let { user } = props;

    return (
        <React.Suspense fallback={<div />}>
            <HeaderWrapper>
                <XContentWrapper withFlex={true}>
                    <XView paddingRight={18}>
                        {user.photo && (
                            <AvatarModal photo={user.photo} userName={user.name} userId={user.id} />
                        )}
                        {!user.photo && (
                            <XAvatar2 src={undefined} size={58} title={user.name} id={user.id} />
                        )}
                    </XView>
                    <XView paddingTop={1} justifyContent="center" flexGrow={1}>
                        <XHorizontal separator={4}>
                            <XView fontSize={18} fontWeight="600" lineHeight="20px" color="#000000">
                                {emoji({ src: user.name, size: 20 })}
                            </XView>
                            {user.primaryOrganization && (
                                <XView
                                    as="a"
                                    marginTop={1}
                                    marginBottom={-1}
                                    fontSize={13}
                                    fontWeight="600"
                                    lineHeight="20px"
                                    color="rgba(0, 0, 0, 0.4)"
                                    path={'/directory/o/' + user.primaryOrganization.id}
                                    hoverTextDecoration="none"
                                >
                                    {user.primaryOrganization.name}
                                </XView>
                            )}
                        </XHorizontal>
                        <React.Suspense fallback={<div />}>
                            <UserStatus variables={{ userId: user.id }} isBot={user.isBot} />
                        </React.Suspense>
                    </XView>
                    <XView paddingTop={13}>
                        <XHorizontal separator={8} alignItems="center">
                            {user.website && (
                                <XSocialButton
                                    value={user.website}
                                    style="website"
                                    placeholder={extractHostname(user.website)}
                                />
                            )}
                            {user.linkedin && (
                                <XSocialButton value={user.linkedin} style="linkedin" />
                            )}
                            {user.phone && <XSocialButton value={user.phone} style="phone" />}
                            {user.isYou && (
                                <XOverflow
                                    placement="bottom-end"
                                    flat={true}
                                    content={
                                        <>
                                            <XMenuItem path="/settings/profile/">
                                                {TextProfiles.User.edit}
                                            </XMenuItem>
                                        </>
                                    }
                                />
                            )}
                            {!user.isYou && (
                                <XButton
                                    text={TextProfiles.User.message}
                                    style="primary"
                                    path={'/mail/' + user.id}
                                />
                            )}
                        </XHorizontal>
                    </XView>
                </XContentWrapper>
            </HeaderWrapper>
        </React.Suspense>
    );
};

const About = (props: { user: User_user }) => {
    let { user } = props;

    return (
        <>
            {user.shortname && (
                <Section separator={0}>
                    <XSubHeader title={TextProfiles.User.usernameTitle} paddingBottom={0} />
                    <SectionContent>@{user.shortname}</SectionContent>
                </Section>
            )}
            {user.email && (
                <Section separator={0}>
                    <XSubHeader title={TextProfiles.User.emailTitle} paddingBottom={0} />
                    <SectionContent>{user.email}</SectionContent>
                </Section>
            )}
            {user.location && (
                <Section separator={0}>
                    <XSubHeader title={TextProfiles.User.locationTitle} paddingBottom={0} />
                    <SectionContent>{user.location}</SectionContent>
                </Section>
            )}
            {user.about && (
                <Section separator={0}>
                    <XSubHeader title={TextProfiles.User.aboutTitle} paddingBottom={0} />
                    <SectionContent>{user.about}</SectionContent>
                </Section>
            )}
        </>
    );
};

interface UserProfileInnerProps extends XWithRouter {
    user: User_user;
    onDirectory?: boolean;
    hideBack?: boolean;
}

export const UserProfileInner = (props: UserProfileInnerProps) => {
    let { user } = props;

    return (
        <>
            <XDocumentHead title={user.name} />
            <XView flexGrow={1}>
                {!props.hideBack && <BackButton />}
                <Header user={user} />
                <XScrollView2 flexGrow={1} height="100%">
                    <About user={user} />
                </XScrollView2>
            </XView>
        </>
    );
};

const UserProvider = (props: { variables: { userId: string }; onDirectory?: boolean }) => {
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const data = client.useUser({
        userId: props.variables.userId,
    });

    return (
        <UserProfileInner
            user={data.user}
            router={router}
            onDirectory={(props as any).onDirectory}
        />
    );
};

export const UserProfile = (props: { userId: string; onDirectory?: boolean }) => (
    <React.Suspense fallback={<XLoader loading={true} />}>
        <UserProvider variables={{ userId: props.userId }} onDirectory={props.onDirectory} />
    </React.Suspense>
);
