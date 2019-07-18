import * as React from 'react';
import Glamorous from 'glamorous';
import { css } from 'linaria';
import { useClient } from 'openland-web/utils/useClient';
import { User_user, UserBadge, UserShort } from 'openland-api/Types';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XButton } from 'openland-x/XButton';
import { XLoader } from 'openland-x/XLoader';
import { XModal } from 'openland-x-modal/XModal';
import { XLink } from 'openland-x/XLink';
import { XCloudImage } from 'openland-x/XCloudImage';
import ModalCloseIcon from 'openland-icons/ic-modal-close.svg';
import {
    Section,
    SectionContent,
    HeaderWrapper,
    extractHostname,
} from 'openland-web/fragments/account/components/OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XMenuItem } from 'openland-x/XMenuItem';
import { XOverflow } from 'openland-web/components/XOverflow';
import { XSocialButton } from 'openland-x/XSocialButton';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XDate } from 'openland-x/XDate';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { XView } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { emoji } from 'openland-y-utils/emoji';
import { canUseDOM } from 'openland-y-utils/canUseDOM';
import { XIcon } from 'openland-x/XIcon';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XScrollView3 } from 'openland-x/XScrollView3';
import { XMemo } from 'openland-y-utils/XMemo';
import { XPolitePopper } from 'openland-x/XPolitePopper';
import { XRoomCard } from 'openland-x/cards/XRoomCard';
import { showModalBox } from 'openland-x/showModalBox';

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

interface AvatarModalProps {
    photo?: string;
    title: string;
    id: string;
}

export const showAvatarModal = (photo: string) => {
    showModalBox({ width: 512 }, ctx => (
        <ModalPic srcCloud={photo} resize={'fill'} width={512} height={512} />
    ));
};

export const AvatarModal = (props: AvatarModalProps) => {
    const isMobile = React.useContext(IsMobileContext);
    if (isMobile) {
        return <XAvatar2 src={props.photo} size={58} title={props.title} id={props.id} />;
    }
    return (
        <XView cursor="pointer" onClick={props.photo ? () => showAvatarModal(props.photo!) : undefined}>
            <XAvatar2 src={props.photo} size={58} title={props.title} id={props.id} />
        </XView>
    );
};

const reachContentClassName = css`
    font-size: 14px;
    line-height: 34px;
    text-align: center;
    height: 32px;
    padding: 0 18px;
    font-weight: 600;
    color: #1790ff;
    border-radius: 40px;
    flex-shrink: 0;
    background-color: #e8f4ff;
`;

const textAlignClassName = css`
    text-align: center;
`;

const UserReach = XMemo<{ reach: number }>(props => (
    <XPolitePopper
        style="dark"
        placement="bottom"
        content={
            <span className={textAlignClassName}>
                User's reach is the total number of people in community groups they are in
            </span>
        }
        marginTop={8}
        width={295}
        showOnHoverContent={false}
        showOnHover={true}
    >
        <div className={reachContentClassName}>Reach {props.reach}</div>
    </XPolitePopper>
));

const Header = (props: { user: User_user }) => {
    let { user } = props;
    return (
        <React.Suspense fallback={<div />}>
            <HeaderWrapper>
                <XContentWrapper withFlex={true}>
                    <XView marginRight={18} flexDirection="column" width={58} height={58}>
                        {user.photo && (
                            <AvatarModal photo={user.photo} title={user.name} id={user.id} />
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
                            {user.audienceSize > 0 &&
                                !user.isBot && <UserReach reach={user.audienceSize} />}
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

const FeaturedIn = (props: { user: User_user }) => {
    const { user } = props;

    if (user.chatsWithBadge.length <= 0) {
        return null;
    }

    return (
        <>
            <Section separator={0}>
                <XSubHeader
                    title="Featured in"
                    counter={user.chatsWithBadge.length}
                    paddingBottom={0}
                />
                <SectionContent>
                    {user.chatsWithBadge.map(
                        (item, index) =>
                            item.chat.__typename === 'SharedRoom' ? (
                                <XRoomCard
                                    room={item.chat}
                                    badge={item.badge}
                                    customButton={null}
                                    customMenu={null}
                                />
                            ) : null,
                    )}
                </SectionContent>
            </Section>
        </>
    );
};

const BackWrapper = Glamorous.div({
    background: '#f9f9f9',
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    cursor: 'pointer',
    flexShrink: 0,
});

const BackInner = Glamorous(XContentWrapper)({
    alignItems: 'center',
    paddingTop: 13,
    paddingBottom: 12,
    '& i': {
        fontSize: 20,
        marginRight: 6,
        marginLeft: -7,
        color: 'rgba(0, 0, 0, 0.3)',
    },
    '& span': {
        fontWeight: 600,
        fontSize: 14,
        lineHeight: '20px',
        letterSpacing: 0,
        color: 'rgba(0, 0, 0, 0.8)',
    },
});

export const BackButton = () => (
    <BackWrapper onClick={() => (canUseDOM ? window.history.back() : null)}>
        <BackInner withFlex={true}>
            <XIcon icon="chevron_left" />
            <span>{TextProfiles.backButton}</span>
        </BackInner>
    </BackWrapper>
);

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
            <XView flexGrow={1} flexShrink={1}>
                {!props.hideBack && <BackButton />}
                <Header user={user} />
                <XScrollView3 flexGrow={1} flexShrink={1}>
                    <About user={user} />
                    <FeaturedIn user={user} />
                </XScrollView3>
            </XView>
        </>
    );
};

interface UserProfileProps {
    userId: string;
    onDirectory?: boolean;
    hideBack?: boolean;
}

const UserProvider = (props: UserProfileProps) => {
    const { userId, ...other } = props;
    const client = useClient();
    let router = React.useContext(XRouterContext)!;
    const data = client.useUser({
        userId: userId,
    });

    return <UserProfileInner user={data.user} router={router} {...other} />;
};

export const UserProfile = (props: UserProfileProps) => (
    <React.Suspense fallback={<XLoader loading={true} />}>
        <UserProvider {...props} />
    </React.Suspense>
);
