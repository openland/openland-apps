import * as React from 'react';
import * as Cookie from 'js-cookie';
import { css, cx } from 'linaria';
import { Page } from 'openland-unicorn/Page';
import { XViewRouterContext } from 'react-mental';
import {
    ResolvedInvite_invite_AppInvite_inviter,
    ResolvedInvite_invite_InviteInfo_organization,
    WalletSubscriptionState,
    ResolvedInvite_invite_RoomInvite_room,
    ResolvedInvite_shortnameItem_SharedRoom,
} from 'openland-api/spacex.types';
import { useClient } from 'openland-api/useClient';
import { useUnicorn } from 'openland-unicorn/useUnicorn';
import { UAvatar } from 'openland-web/components/unicorn/UAvatar';
import { XTrack } from 'openland-x-analytics/XTrack';
import { TextTitle1, TextBody } from 'openland-web/utils/TextStyles';
import { UText } from 'openland-web/components/unicorn/UText';
import { UIcon } from 'openland-web/components/unicorn/UIcon';
import { XDialogProviderComponent } from 'openland-x/XDialogProvider';
import { ShowMoreText } from 'openland-web/fragments/shortname/components/ShowMoreText';
import { isSmallText } from 'openland-y-utils/isSmallText';
import {
    resolveRoomButton,
    resolveOrgButton,
    noLoginMobileButton,
    noLoginDesktopButton,
} from './InviteComponents';
import { detectOS, OS } from 'openland-x-utils/detectOS';
import IcFeatured from 'openland-icons/s/ic-verified-3-16.svg';

type SharedRoomT = ResolvedInvite_shortnameItem_SharedRoom | ResolvedInvite_invite_RoomInvite_room;
type OrgT = ResolvedInvite_invite_InviteInfo_organization;

const container2 = css`
    padding: 16px 0;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
`;

const stickyContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: sticky;
    bottom: 0;
`;

const stickyContent = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 100%;
`;

const avatarsContainer = css`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
`;

const bigAvatarWrapper = css`
    flex-shrink: 0;
    margin: 0 -6px;
    border-radius: 100%;
    border: 2px solid var(--backgroundPrimary);
    z-index: 1;
`;

const smallAvatarWrapper = css`
    margin: 0 -4px;
`;

const titleWrapperStyle = css`
    margin-top: 32px;
    max-width: 480px;
    align-self: center;
    flex-shrink: 0;
    display: flex;
`;

const titleStyle = css`
    text-align: center;
    color: var(--foregroundPrimary);
    white-space: pre-wrap;
    word-wrap: break-word;
`;

const featuredIconWrapperStyle = css`
    margin-left: 4px;
    align-self: center;
    display: inline-flex;
    vertical-align: middle;
`;

const featuredIconStyle = css`
    display: var(--featured-icon-display);
`;

const descriptionStyle = css`
    text-align: center;
    color: var(--foregroundSecondary);
    margin-top: 12px;
    max-width: 480px;
    align-self: center;
    flex-shrink: 0;
`;

const longDescriptionStyle = css`
  text-align: left;
`;

const membersContainer = css`
    display: flex;
    flex-direction: column;
    flex-shrink: 0;
    align-items: center;
    margin-top: 32px;
`;

const membersAvatarsContainer = css`
    display: flex;
    flex-shrink: 0;
    flex-direction: row;
    align-items: center;
`;

const buttonContainer = css`
    margin: auto;
    margin-top: 20px;
    margin-bottom: 20px;
    width: 240px;
    flex-shrink: 0;
    z-index: 2;
    align-self: center;
    box-shadow: 0px 220px 40px 200px var(--backgroundPrimary);
`;

const MAX_DESCRIPTION_CHARACTERS = 280;
const MAX_DESCRIPTION_LINE_BREAKS = 5;

interface InviteLandingComponentLayoutProps {
    whereToInvite: 'channel' | 'group' | 'organization' | 'community' | 'Openland';
    photo: string | null;
    title: string;
    entityTitle: string;
    id: string;
    membersCount?: number | null;
    description?: string | null;
    hideFakeDescription?: boolean;
    button?: JSX.Element;
    noLogin?: boolean;
    room?: SharedRoomT;
    featured: boolean | undefined;
}

export const InviteLandingComponentLayout = React.memo(
    (props: InviteLandingComponentLayoutProps) => {
        const os = detectOS();
        const isMobile = os === 'iOS' || os === 'Android';

        const contentRef = React.useRef<HTMLDivElement>(null);

        const {
            whereToInvite,
            photo,
            title,
            entityTitle,
            id,
            membersCount,
            description,
            hideFakeDescription,
            room,
            featured,
        } = props;

        const avatars = room
            ? room.previewMembers
                  .map((x) => x)
                  .filter((x) => !!x)
                  .slice(0, 5)
            : [];

        let button = props.button;

        const buttonText = 'Join ' + whereToInvite;

        if (props.noLogin) {
            if (isMobile) {
                button = noLoginMobileButton(buttonText, os as OS);
            } else {
                button = noLoginDesktopButton(buttonText, id, room);
            }
        }

        const showMembers = membersCount ? membersCount >= 10 && avatars.length >= 3 : false;
        const isSmallDescription = React.useMemo(() => {
           return description && isSmallText(description, MAX_DESCRIPTION_CHARACTERS, MAX_DESCRIPTION_LINE_BREAKS);
        }, [description]);

        return (
            <Page padded={false} flexGrow={1}>
                <div className={container2} ref={contentRef}>
                    <div className={avatarsContainer}>
                        <UAvatar photo={photo} title={entityTitle} id={id} size="xx-large" />
                    </div>
                    <div className={titleWrapperStyle}>
                        <div className={cx(TextTitle1, titleStyle)}>
                            {title}
                            {featured && (
                                <div className={featuredIconWrapperStyle}>
                                    <UIcon
                                        className={featuredIconStyle}
                                        size={18}
                                        icon={<IcFeatured />}
                                        color="#3DA7F2"
                                    />
                                </div>
                            )}
                        </div>
                    </div>
                    {!!description && isSmallDescription && (
                        <div className={cx(TextBody, descriptionStyle)}>
                            <UText text={description} />
                        </div>
                    )}
                    {!!description && !isSmallDescription && (
                        <div className={cx(TextBody, descriptionStyle, longDescriptionStyle)}>
                            <ShowMoreText
                                text={description}
                                color="var(--foregroundSecondary)"
                                maxCharacters={MAX_DESCRIPTION_CHARACTERS}
                                maxLineBreaks={MAX_DESCRIPTION_LINE_BREAKS}
                            />
                        </div>
                    )}
                    {showMembers && room && (
                        <div className={membersContainer}>
                            <div className={membersAvatarsContainer}>
                                {avatars.map((i) => (
                                    <div
                                        key={i.id}
                                        className={cx(bigAvatarWrapper, smallAvatarWrapper)}
                                    >
                                        <UAvatar
                                            title={i.name}
                                            id={i.id}
                                            photo={i.photo}
                                            size="small"
                                        />
                                    </div>
                                ))}
                            </div>
                            <div className={cx(TextBody, descriptionStyle)}>
                                {membersCount} members
                            </div>
                        </div>
                    )}
                    {!showMembers && !description && !hideFakeDescription && (
                        <div className={cx(TextBody, descriptionStyle)}>New {whereToInvite}</div>
                    )}
                    <div className={stickyContainer}>
                        <div className={stickyContent}>
                            {button && <div className={buttonContainer}>{button}</div>}
                        </div>
                    </div>
                </div>
            </Page>
        );
    },
);

interface SharedRoomPlaceholderProps {
    room: SharedRoomT;
}

export const SharedRoomPlaceholder = React.memo((props: SharedRoomPlaceholderProps) => {
    const { room } = props;
    const premiumSuspended =
        room &&
        room.isPremium &&
        !room.premiumPassIsActive &&
        room.premiumSubscription &&
        room.premiumSubscription.state !== WalletSubscriptionState.EXPIRED;
    return (
        <InviteLandingComponentLayout
            button={resolveRoomButton(room)}
            whereToInvite="group"
            photo={room.photo}
            title={premiumSuspended ? `Your access to “${room.title}” is suspended` : room.title}
            featured={room.featured}
            entityTitle={room.title}
            id={room.id}
            membersCount={room.membersCount}
            description={
                premiumSuspended
                    ? 'To keep your access to the group by subscription you need to complete payment'
                    : room.description
            }
            room={room}
            noLogin={false}
        />
    );
});

interface InviteLandingComponentProps {
    noLogin?: boolean;
}

export const InviteLandingComponent = React.memo((props: InviteLandingComponentProps) => {
    const client = useClient();
    const unicorn = useUnicorn();
    const router = React.useContext(XViewRouterContext)!;

    const path = window.location.pathname.split('/');
    let inviteKey = unicorn ? unicorn.id : path[path.length - 1];

    // Sorry universe. Ugly fix for PLN-546
    if (inviteKey.endsWith('.')) {
        inviteKey = inviteKey.slice(0, inviteKey.length - 1);
    }

    // TODO: Cookie: ('x-openland-invite') || ('x-openland-org-invite') || ('x-openland-app-invite');

    let invite = client.useResolvedInvite({ key: inviteKey });
    let room: SharedRoomT | undefined;
    let organization: OrgT | undefined;
    let app: ResolvedInvite_invite_AppInvite_inviter | undefined;

    if (invite.invite && invite.invite.__typename === 'InviteInfo' && invite.invite.organization) {
        organization = invite.invite.organization;
        if (props.noLogin) {
            Cookie.set('x-openland-org-invite', inviteKey, { path: '/' });
        }
    }

    if (invite.invite && invite.invite.__typename === 'RoomInvite') {
        room = invite.invite.room;
        if (props.noLogin) {
            Cookie.set('x-openland-invite', inviteKey, { path: '/' });
        }
    }

    if (invite.shortnameItem && invite.shortnameItem.__typename === 'SharedRoom') {
        room = invite.shortnameItem;
        if (props.noLogin) {
            Cookie.set('x-openland-shortname', inviteKey, { path: '/' });
        }
    }

    if (invite.invite && invite.invite.__typename === 'AppInvite') {
        app = invite.invite.inviter;
        if (props.noLogin) {
            Cookie.set('x-openland-app-invite', inviteKey, { path: '/' });
        }
    }

    if (app && !props.noLogin) {
        router.navigate('/');
    }

    let button: JSX.Element | undefined;

    const whereToInvite = app
        ? 'Openland'
        : room
        ? room.isChannel
            ? 'channel'
            : 'group'
        : organization && organization.isCommunity
        ? 'community'
        : 'organization';

    if (room) {
        button = resolveRoomButton(room, inviteKey);
    } else if (organization) {
        button = resolveOrgButton(organization, !!props.noLogin, inviteKey);
    }

    const premiumSuspended =
        room &&
        room.isPremium &&
        !room.premiumPassIsActive &&
        room.premiumSubscription &&
        room.premiumSubscription.state !== WalletSubscriptionState.EXPIRED;

    return (
        <>
            <XTrack
                event={!props.noLogin ? 'invite_screen_view' : 'invite_landing_view'}
                params={{
                    invite_type: whereToInvite,
                    entity_id: room?.id || organization?.id,
                }}
            />
            {props.noLogin && <XDialogProviderComponent />}
            {premiumSuspended ? (
                <InviteLandingComponentLayout
                    button={button}
                    whereToInvite={whereToInvite}
                    photo={room ? room.photo : organization!.photo}
                    title={`Your access to “${
                        room ? room.title : organization!.name
                    }” is suspended`}
                    entityTitle={room ? room.title : organization!.name}
                    id={room ? room.id : organization!.id}
                    description={
                        'To keep your access to the group by subscription you need to complete payment'
                    }
                    featured={room ? room.featured : organization?.featured}
                    room={room}
                    noLogin={props.noLogin}
                />
            ) : (
                <InviteLandingComponentLayout
                    button={button}
                    whereToInvite={whereToInvite}
                    photo={room ? room.photo : app ? app.photo : organization!.photo}
                    title={room ? room.title : app ? app.name : organization!.name}
                    entityTitle={room ? room.title : app ? app.name : organization!.name}
                    id={room ? room.id : app ? app.id : organization!.id}
                    membersCount={
                        room ? room.membersCount : app ? undefined : organization!.membersCount
                    }
                    description={
                        room
                            ? room.description
                            : app
                            ? 'Invite you to join Openland'
                            : organization!.about
                    }
                    featured={room ? room.featured : app ? undefined : organization?.featured}
                    room={room}
                    noLogin={props.noLogin}
                />
            )}
        </>
    );
});
