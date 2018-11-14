import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { makeNavigable } from 'openland-x/Navigable';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XOverflow } from '../../openland-web/components/Incubator/XOverflow';
import { XMenuTitle } from 'openland-x/XMenuItem';
import { RoomSetFeatured, RoomSetHidden } from '../../openland-web/components/messenger/MessengerComponent';
import { ChatSearchChannel_items_edges_node } from 'openland-api/Types';

const RoomWrapper = makeNavigable(Glamorous(XHorizontal)({
    height: 64,
    paddingLeft: 16,
    paddingRight: 16,
    flexShrink: 0,
    cursor: 'pointer',
    marginLeft: -16,
    marginRight: -16,
    borderRadius: 8,
    '&:hover': {
        backgroundColor: '#F9F9F9',
    }
}) as any) as any;

const RoomTitle = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: '22px',
    letterSpacing: 0,
    color: '#000000',
    marginTop: '-2px!important',
    marginBottom: 2,

    '&': {
        height: 22,
        overflow: 'hidden',
        display: '-webkit-box',
        WebkitLineClamp: 1,
        WebkitBoxOrient: 'vertical'
    }
});

const RoomMembers = Glamorous.div({
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.5)'
});

const StatusTitleMap = {
    invited: 'Invited',
    member: 'Member',
    none: 'Request invite',
    requested: 'Pending',
};

interface XRoomCardProps {
    room: ChatSearchChannel_items_edges_node;
    path?: string;
    customButton?: any;
    customMenu?: any;
}

interface XRoomCardState {
    isHovered: boolean;
}

export class XRoomCard extends React.Component<XRoomCardProps, XRoomCardState> {
    state = {
        isHovered: false
    };

    render () {
        let { room, path, customButton, customMenu } = this.props;
        let title = (!room.isRoot && room.organization ? (room.organization.name + ' / ') : '') + room.title;

        let button = (typeof customButton === 'undefined') ? (
            <>
                {room.myStatus && (
                    <XButton
                        text={StatusTitleMap[room.myStatus]}
                        path={path}
                        style={room.myStatus === 'none' ? 'primary' : 'ghost'}
                    />
                )}
            </>
        ) : customButton;

        let menu = (typeof customMenu === 'undefined') ? (
            <XWithRole role={['super-admin', 'editor']}>
                <XOverflow
                    flat={true}
                    placement="bottom-end"
                    content={(
                        <div style={{ width: 160 }} onClick={(e) => e.stopPropagation()}>
                            <XMenuTitle>Super admin</XMenuTitle>
                            <RoomSetFeatured conversationId={room.id} val={room.featured} />
                            <RoomSetHidden conversationId={room.id} val={room.hidden} />
                        </div>
                    )}
                />
            </XWithRole>
        ) : customMenu;

        return (
            <RoomWrapper
                path={path || '/mail/' + room.id}
                key={'room_' + room.id}
                alignItems="center"
                onMouseEnter={() => this.setState({ isHovered: true })}
                onMouseLeave={() => this.setState({ isHovered: false })}
            >
                <XHorizontal separator={8} alignItems="center" flexGrow={1}>
                    <XAvatar
                        style="room"
                        cloudImageUuid={room.photo || room.photos[0] || (room.organization ? room.organization.photo || undefined : undefined)}
                        objectName={room.title}
                        objectId={room.id}
                    />
                    <XVertical separator={0} flexGrow={1}>
                        <RoomTitle>{title}</RoomTitle>
                        <RoomMembers>{room.membersCount} {room.membersCount === 1 ? 'member' : 'members'}</RoomMembers>
                    </XVertical>
                </XHorizontal>
                {this.state.isHovered && button}
                {menu}
            </RoomWrapper>
        );
    }
}