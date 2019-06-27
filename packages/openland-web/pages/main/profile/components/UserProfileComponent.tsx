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
} from 'openland-web/pages/main/profile/components/OrganizationProfileComponent';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { XMenuItem, XMenuVertical, XMenuTitle } from 'openland-x/XMenuItem';
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
import { XBadge, XBadgeAdd } from 'openland-x/XBadge';
import { XMemo } from 'openland-y-utils/XMemo';
import { useHasRole, XWithRole } from 'openland-x-permissions/XWithRole';
import { showModalBox } from 'openland-x/showModalBox';
import { CreateBadgeModal, DeleteBadgeModal } from './modals';
import { XPopper } from 'openland-x/XPopper';

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

export const AvatarModal = (props: { photo?: string; title: string; id: string }) => {
    const isMobile = React.useContext(IsMobileContext);
    if (isMobile) {
        return <XAvatar2 src={props.photo} size={58} title={props.title} id={props.id} />;
    }
    return (
        <XModal
            useTopCloser={false}
            width={512}
            heading={null}
            transparent={true}
            footer={null}
            body={
                <ModalBody>
                    <ModalCloser autoClose={true} className="closer">
                        <ModalCloseIcon />
                    </ModalCloser>
                    <ModalPic srcCloud={props.photo} resize={'fill'} width={512} height={512} />
                </ModalBody>
            }
            target={
                <XView cursor="pointer">
                    <XAvatar2 src={props.photo} size={58} title={props.title} id={props.id} />
                </XView>
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

interface UserBadgeWrapperProps {
    badge: UserBadge;
    primary: boolean;
    isSuper: boolean;
    user: UserShort;
}

const UserBadgeWrapper = XMemo<UserBadgeWrapperProps>((props) => {
    const client = useClient();
    const { badge, primary, isSuper, user } = props;
    const [ show, setShow ] = React.useState(false);

    const handleSetPrimary = React.useCallback(async () => {
        await client.mutateBadgeSetPrimary({ badgeId: badge.id });
        setShow(false);
    }, [badge]);

    const handleUnsetPrimary = React.useCallback(async () => {
        await client.mutateBadgeUnsetPrimary();
        setShow(false);
    }, [badge]);

    const handleVerify = React.useCallback(async () => {
        await client.mutateSuperBadgeVerify({ badgeId: badge.id, userId: user.id });
        setShow(false);
    }, [badge, user]);

    const handleUnverify = React.useCallback(async () => {
        await client.mutateSuperBadgeUnverify({ badgeId: badge.id, userId: user.id });
        setShow(false);
    }, [badge, user]);

    const handleDelete = React.useCallback(async () => {
        showModalBox({ title: 'Delete badge' }, ctx => <DeleteBadgeModal ctx={ctx} isSuper={isSuper} userId={user.id} badgeId={badge.id} />)
        setShow(false);
    }, [badge, user, isSuper]);

    if (!user.isYou && !isSuper) {
        if (!badge.verified) {
            return (
                <XView marginRight={12} marginBottom={12}>
                    <XBadge {...badge} primary={primary} size="big" />
                </XView>
            );
        } else {
            return (
                <XPopper
                    style="dark"
                    placement="bottom"
                    marginTop={-3}
                    content={(
                        <span>
                            Verified
                        </span>
                    )}
                    showOnHoverContent={false}
                    showOnHover={true}
                >
                    <div>
                        <XView marginRight={12} marginBottom={12}>
                            <XBadge {...badge} primary={primary} size="big" />
                        </XView>
                    </div>
                </XPopper>
            );
        }
    }

    return (
        <XPopper
            contentContainer={<XMenuVertical />}
            arrow={null}
            placement="bottom-start"
            marginTop={-3}
            content={(
                <div style={{ minWidth: 140 }}>
                    {user.isYou && (
                        <>
                            {!isSuper && badge.verified && <XMenuTitle>Verified</XMenuTitle>}
                            {!primary && <XMenuItem onClick={handleSetPrimary}>Make primary</XMenuItem>}
                            {primary && <XMenuItem onClick={handleUnsetPrimary}>Revoke primary</XMenuItem>}
                        </>
                    )}
                    {isSuper && (
                        <>
                            {!badge.verified && <XMenuItem onClick={handleVerify}>Verify</XMenuItem>}
                            {badge.verified && <XMenuItem onClick={handleUnverify}>Revoke verified</XMenuItem>}
                        </>
                    )}
                    <XMenuItem style="danger" onClick={handleDelete}>Delete</XMenuItem>
                </div>
            )}
            onClickOutside={() => setShow(false)}
            show={show}
        >
            <div onClick={() => setShow(true)}>
                <XView marginRight={12} marginBottom={12} cursor="pointer">
                    <XBadge {...badge} primary={primary} size="big" />
                </XView>
            </div>
        </XPopper>
    );
});

const Badges = XMemo<{ user: User_user }>((props) => {
    const isSuper = useHasRole('super-admin');
    const { user } = props;
    const isPrimary = (badge: UserBadge) => {
        return (user.primaryBadge && user.primaryBadge.id === badge.id) ? true : false;
    }

    const badges = user.badges.sort((a, b) => isPrimary(a) ? -2 : (a.verified && !b.verified ? -1 : 1));

    return (
        <>
            {(user.isYou || badges.length > 0 || isSuper) && (
                <Section separator={0}>
                    <XSubHeader title="Badges" counter={user.badges.length} paddingBottom={0} />
                    <SectionContent>
                        <XView alignItems="flex-start" flexDirection="row" flexWrap="wrap">
                            {badges.map(badge => (
                                <UserBadgeWrapper key={'badge-' + badge.id} user={user} badge={badge} primary={isPrimary(badge)} isSuper={isSuper} />
                            ))}
                            {(user.isYou || isSuper) && (
                                <XView marginRight={12} marginBottom={12}>
                                    <XBadgeAdd
                                        caption="Add badge"
                                        onClick={() => showModalBox({ title: 'Add badge' }, ctx => <CreateBadgeModal ctx={ctx} isSuper={isSuper} userId={user.id} />)}
                                    />
                                </XView>
                            )}
                        </XView>
                    </SectionContent>
                </Section>
            )}
        </>
    );
});

interface UserProfileInnerProps extends XWithRouter {
    user: User_user;
    onDirectory?: boolean;
    hideBack?: boolean;
}

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
                    <XWithRole role="feature-non-production">
                        <Badges user={user} />
                    </XWithRole>
                </XScrollView3>
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
