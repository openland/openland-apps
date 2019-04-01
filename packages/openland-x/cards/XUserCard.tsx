import * as React from 'react';
import { XButton } from 'openland-x/XButton';
import { User_user } from 'openland-api/Types';
import { withOnline } from '../../openland-web/api/withOnline';
import { XPopper } from 'openland-x/XPopper';
import AdminIcon from 'openland-icons/ic-star-admin.svg';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XOverflow } from '../../openland-web/components/XOverflow';
import { XDate } from 'openland-x/XDate';
import { XView } from 'react-mental';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { css } from 'linaria';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { emoji } from 'openland-y-utils/emoji';

const StatusWrapperOffline = css`
    color: rgba(0, 0, 0, 0.5);
    font-size: 13px;
    line-height: 18px;
`;

const StatusWrapperOnline = css`
    color: #1790ff;
    font-size: 13px;
    line-height: 18px;
`;

const UserStatus = withOnline(props => {
    if ((props as any).isBot) {
        return <div className={StatusWrapperOnline}>bot</div>;
    }
    if (!props.data) {
        return null;
    }

    if (
        props.data.user &&
        (props.data.user.lastSeen &&
            props.data.user.lastSeen !== 'online' &&
            !props.data.user.online)
    ) {
        return (
            <div className={StatusWrapperOffline}>
                {TextProfiles.User.status.lastSeen}{' '}
                {props.data.user.lastSeen === 'never_online' ? (
                    TextProfiles.User.status.momentsAgo
                ) : (
                    <XDate value={props.data.user.lastSeen} format="humanize_cute" />
                )}
            </div>
        );
    } else if (props.data.user && props.data.user.online) {
        return <div className={StatusWrapperOnline}>{TextProfiles.User.status.online}</div>;
    } else {
        return null;
    }
}) as React.ComponentType<{ variables: { userId: string }; isBot: boolean }>;

const AdminIconClass = css`
    & * {
        fill: #ffab00;
    }
`;

const Tooltip = ({ isOwner }: { isOwner?: boolean }) => (
    <XPopper
        placement="top"
        showOnHoverContent={false}
        showOnHover={true}
        style="dark"
        content={
            isOwner ? TextProfiles.Organization.roles.OWNER : TextProfiles.Organization.roles.ADMIN
        }
        marginBottom={6}
    >
        <XView marginRight={5} alignItems="center" justifyContent="center">
            <AdminIcon className={AdminIconClass} />
        </XView>
    </XPopper>
);

interface XUserCardProps {
    onClick?: () => void;
    user: Partial<User_user>;
    path?: string;
    noPath?: boolean;
    customButton?: any;
    customMenu?: any;
    extraMenu?: any;
    isAdmin?: boolean;
    isOwner?: boolean;
    hideOrganization?: boolean;
    disable?: boolean;
}

const userNameClassname = css`
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 8px;
`;

export const XUserCard = ({
    user,
    path,
    noPath,
    customButton,
    customMenu,
    extraMenu,
    isAdmin,
    hideOrganization,
    isOwner,
    onClick,
    disable,
}: XUserCardProps) => {
    const [isHovered, setIsHovered] = React.useState(false);
    const isMobile = React.useContext(IsMobileContext);

    let button =
        typeof customButton === 'undefined' ? (
            <>
                {user.isYou && (
                    <XButton style="ghost" text={TextProfiles.User.you} enabled={false} />
                )}
                {!user.isYou && (
                    <XButton
                        style={isHovered ? 'primary' : 'default'}
                        path={'/mail/' + user.id}
                        text={TextProfiles.User.message}
                    />
                )}
            </>
        ) : (
            customButton
        );

    let menu =
        typeof customMenu === 'undefined' ? (
            <>
                {extraMenu && (
                    <XOverflow
                        flat={true}
                        placement="bottom-end"
                        content={<div>{extraMenu}</div>}
                    />
                )}
            </>
        ) : (
            customMenu
        );

    const organizationElem = !hideOrganization &&
        user.primaryOrganization && (
            <XView
                fontSize={12}
                lineHeight="22px"
                fontWeight="600"
                color="rgba(0, 0, 0, 0.4)"
                marginTop={1}
                marginBottom={-1}
            >
                {user.primaryOrganization.name}
            </XView>
        );

    let cardPath: string | undefined = path || '/directory/u/' + user.id;

    if (noPath) {
        cardPath = undefined;
    }

    return (
        <XView
            onClick={onClick}
            cursor={disable ? undefined : 'pointer'}
            backgroundColor="#ffffff"
            paddingVertical={12}
            paddingHorizontal={16}
            marginHorizontal={-16}
            borderRadius={8}
            height={64}
            hoverBackgroundColor="#f9f9f9"
            path={cardPath}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            opacity={disable ? 0.4 : undefined}
        >
            <XView
                flexDirection="row"
                flexGrow={1}
                justifyContent="space-between"
                alignItems="center"
            >
                <XAvatar2 src={user.photo} title={user.name || ''} id={user.id || ''} />
                <XView
                    flexDirection="row"
                    justifyContent="space-between"
                    flexGrow={1}
                    marginLeft={16}
                >
                    <XView
                        flexShrink={1}
                        overflow="hidden"
                        textOverflow="ellipsis"
                        whiteSpace="nowrap"
                        minWidth="0"
                    >
                        <XView
                            flexDirection="row"
                            fontSize={14}
                            lineHeight="22px"
                            fontWeight="600"
                            color="#000000"
                            marginTop={-2}
                            marginBottom={2}
                        >
                            {(isAdmin || isOwner) && <Tooltip isOwner={isOwner} />}
                            <XView minWidth={0} flexShrink={1}>
                                <div className={userNameClassname}>
                                    {emoji({
                                        src: user.name || '',
                                        size: 16,
                                    })}
                                </div>
                            </XView>
                            {!isMobile && organizationElem}
                        </XView>
                        {!isMobile &&
                            user.id && (
                                <UserStatus variables={{ userId: user.id }} isBot={!!user.isBot} />
                            )}
                        {isMobile && organizationElem}
                    </XView>
                    <XView flexShrink={0} flexDirection="row" alignItems="center">
                        {button}
                        {(customMenu || extraMenu) && <XView marginLeft={10}>{menu}</XView>}
                    </XView>
                </XView>
            </XView>
        </XView>
    );
};
