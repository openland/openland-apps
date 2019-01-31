import * as React from 'react';
import { css } from 'linaria';
import { XButton } from 'openland-x/XButton';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XOverflow } from '../../openland-web/components/XOverflow';
import { XMenuTitle } from 'openland-x/XMenuItem';
import { SharedRoomKind, Room_room_SharedRoom } from 'openland-api/Types';
import { TextProfiles } from 'openland-text/TextProfiles';
import { XAvatar2 } from 'openland-x/XAvatar2';
import { XView } from 'react-mental';

const RoomTitleInner = css`
    height: 22px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const ButtonWrapper = css`
    opacity: 0;
    pointer-events: none;
    @media (max-width: 700px) {
        opacity: 1;
        pointer-events: auto;
    }
`;

const ButtonHoverWrapper = css`
    opacity: 1;
    pointer-events: auto;
`;

interface XRoomCardProps {
    room: Room_room_SharedRoom;
    path?: string;
    customButton?: any;
    customMenu?: any;
    extraMenu?: any;
    isMember?: boolean;
}

export const XRoomCard = React.memo<XRoomCardProps>(
    ({ room, path, customButton, customMenu, extraMenu, isMember }) => {
        let [isHovered, onHover] = React.useState(false);

        let onMouseEnter = React.useMemo(
            () => () => {
                onHover(true);
            },
            [onHover],
        );
        let onMouseLeave = React.useMemo(
            () => () => {
                onHover(false);
            },
            [onHover],
        );

        let title =
            (room.kind !== SharedRoomKind.INTERNAL && room.organization
                ? room.organization.name + ' / '
                : '') + room.title;

        let buttonPath = '/mail/' + room.id;

        if (isMember === false) {
            buttonPath = '/directory/r/' + room.id;
        }

        let button =
            typeof customButton === 'undefined' ? (
                <div className={isHovered ? ButtonHoverWrapper : ButtonWrapper}>
                    {room.membership && (
                        <XButton
                            text={TextProfiles.Room.status[room.membership]}
                            path={buttonPath}
                            style={
                                ['REQUESTED', 'KICKED', 'LEFT'].indexOf(room.membership) > -1
                                    ? 'primary'
                                    : 'ghost'
                            }
                        />
                    )}
                </div>
            ) : (
                customButton
            );

        let menu =
            typeof customMenu === 'undefined' ? (
                <>
                    <XWithRole role={['super-admin', 'editor']}>
                        <XOverflow
                            flat={true}
                            placement="bottom-end"
                            content={
                                <div style={{ width: 160 }} onClick={e => e.stopPropagation()}>
                                    {extraMenu}

                                    <XMenuTitle>Super admin</XMenuTitle>
                                    {/* <RoomSetFeatured conversationId={room.id} val={room.featured} />
                                <RoomSetHidden conversationId={room.id} val={room.hidden} /> */}
                                </div>
                            }
                        />
                    </XWithRole>
                    {extraMenu && (
                        <XWithRole role={['super-admin', 'editor']} negate={true}>
                            <XOverflow
                                flat={true}
                                placement="bottom-end"
                                content={<div>{extraMenu}</div>}
                            />
                        </XWithRole>
                    )}
                </>
            ) : (
                customMenu
            );

        return (
            <XView
                alignItems="center"
                height={64}
                paddingHorizontal={16}
                marginHorizontal={-16}
                cursor="pointer"
                borderRadius={8}
                flexDirection="row"
                hoverBackgroundColor="#F9F9F9"
                path={path || '/mail/' + room.id}
                key={'room_' + room.id}
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                minWidth={0}
                flexShrink={1}
            >
                <XView
                    flexDirection="row"
                    alignItems="center"
                    flexGrow={1}
                    marginRight={10}
                    minWidth={0}
                    flexShrink={1}
                >
                    <XAvatar2
                        src={
                            room.photo || (room.organization ? room.organization.photo : undefined)
                        }
                        title={room.title}
                        id={room.id}
                    />
                    <XView flexGrow={1} marginLeft={16} minWidth={0} flexShrink={1}>
                        <XView
                            fontSize={14}
                            fontWeight="600"
                            lineHeight="22px"
                            color="#000000"
                            marginTop={-2}
                            marginBottom={2}
                            minWidth={0}
                            flexShrink={1}
                        >
                            <div className={RoomTitleInner}>{title}</div>
                        </XView>
                        <XView fontSize={13} lineHeight="18px" color="rgba(0, 0, 0, 0.5)">
                            {TextProfiles.Room.membersLabel(room.membersCount || 0)}
                        </XView>
                    </XView>
                </XView>
                {button}
                <XView marginLeft={10}>{menu}</XView>
            </XView>
        );
    },
);
