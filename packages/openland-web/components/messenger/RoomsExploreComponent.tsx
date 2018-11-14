import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { withChatSearchChannels } from '../../api/withChatSearchChannels';
import { XLoader } from 'openland-x/XLoader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { SortPicker } from '../../pages/main/directory/sortPicker';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable } from 'openland-x/Navigable';
import { EmptyComponent } from './components/view/content/RoomEmptyComponent';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XOverflow } from '../Incubator/XOverflow';
import { XMenuTitle } from 'openland-x/XMenuItem';
import { RoomSetFeatured, RoomSetHidden } from './MessengerComponent';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { SearchBox } from '../../pages/main/directory/components/SearchBox';

const RoomsListWrapper = Glamorous(XScrollView)({
    flexGrow: 1
});

const Root = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    flexShrink: 0
});

const StatusTitleMap = {
    invited: 'Invited',
    member: 'Member',
    none: 'Request invite',
    requested: 'Pending',
};

const RoomItemWrapper = makeNavigable(Glamorous(XHorizontal)({
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
        '& .none': {
            backgroundColor: '#1790ff',
            color: '#fff',
            '&:hover': {
                backgroundColor: '#45a6ff'
            }
        },
    },
    '& .none': {
        backgroundColor: 'rgba(238, 240, 242, 0.5)',
        color: 'rgba(0, 0, 0, 0.7)',
        border: '1px solid transparent'
    }
}) as any) as any;

const RoomName = Glamorous.div({
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

const MembersText = Glamorous.div({
    fontSize: 13,
    fontWeight: 400,
    lineHeight: '18px',
    letterSpacing: 0,
    color: 'rgba(0, 0, 0, 0.5)'
});

interface WithChatSearchRoomsProps {
    onDirectory?: boolean;
    variables: {
        query: string,
        sort: string
    };
    tagsCount: (n: number) => void;
}

const Rooms = withChatSearchChannels((props) => {
    if (!(props.data && props.data.items)) {
        return <XLoader loading={true} />;
    }

    let noData = props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0;

    (props as any).tagsCount(noData ? 0 : props.data.items.pageInfo.itemsCount);

    return (
        <>
            {!noData && (
                <XContentWrapper withPaddingBottom={true}>
                    {props.data.items.edges.map(c => {
                        let room = c.node;
                        let title = (!room.isRoot && room.organization ? (room.organization.name + ' / ') : '') + room.title;

                        let path = '/mail/' + room.id;

                        if ((props as any).onDirectory && room.myStatus !== 'member') {
                            path = '/directory/r/' + room.id;
                        }

                        return (
                            <RoomItemWrapper
                                path={path}
                                key={c.node.id}
                                alignItems="center"
                            >
                                <XHorizontal separator={8} alignItems="center" flexGrow={1}>
                                    <XAvatar
                                        style="room"
                                        cloudImageUuid={room.photo || room.photos[0] || (room.organization ? room.organization.photo || undefined : undefined)}
                                        objectName={room.title}
                                        objectId={room.id}
                                    />
                                    <XVertical separator={0} flexGrow={1}>
                                        <RoomName>{title}</RoomName>
                                        <MembersText>{room.membersCount} {room.membersCount === 1 ? 'member' : 'members'}</MembersText>
                                    </XVertical>
                                </XHorizontal>
                                <XButton
                                    text={StatusTitleMap[room.myStatus]}
                                    path={path}
                                    style="ghost"
                                    className={room.myStatus}
                                />
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
                            </RoomItemWrapper>
                        );
                    })}
                </XContentWrapper>
            )}
            {noData && (
                <EmptyComponent />
            )}
        </> 
    );
}) as React.ComponentType<WithChatSearchRoomsProps>;

interface RoomExploreComponentState {
    count: number;
    query: string;
    sort: {
        orderBy: string,
        featured: boolean
    };
}

export class RoomsExploreComponent extends React.Component<{ onDirectory?: boolean }, RoomExploreComponentState> {
    constructor(props: { onDirectory?: boolean }) {
        super(props);
        this.state = {
            count: 0,
            query: '',
            sort: {
                orderBy: 'membersCount',
                featured: true
            }
        };
    }

    changeSort = (sort: { orderBy: string, featured: boolean }) => {
        this.setState({
            sort: sort
        });
    }

    onQueryChange = (q: string) => {
        this.setState({
            query: q
        });
    }

    handleCount = (n: number) => {
        if (n !== this.state.count) {
            this.setState({
                count: n
            });
        }
    }

    render() {
        let sort = [{ [this.state.sort.orderBy]: { order: 'desc' } }];
        if (this.state.sort.featured) {
            sort.unshift({ ['featured']: { order: 'desc' } });
        }

        let sortBox = (
            <SortPicker
                sort={this.state.sort}
                onPick={this.changeSort}
                options={{
                    label: 'Sort by', values: [
                        { label: 'Members count', value: 'membersCount' },
                        { label: 'Creation date', value: 'createdAt' }
                    ]
                }}
            />
        );

        return (
            <Root>
                <SearchBox
                    value={this.state.query}
                    onChange={this.onQueryChange}
                    placeholder="Search rooms"
                />
                <RoomsListWrapper>
                    {this.state.query.length <= 0 && (
                        <XSubHeader
                            title="Featured rooms"
                            right={sortBox}
                        />
                    )}
                    {(this.state.query.length > 0 && this.state.count > 0) && (
                        <XSubHeader
                            title="Rooms"
                            counter={this.state.count}
                            right={sortBox}
                        />
                    )}
                    <Rooms
                        variables={{ query: this.state.query.toLowerCase(), sort: JSON.stringify(sort) }}
                        onDirectory={this.props.onDirectory}
                        tagsCount={this.handleCount}
                    />
                </RoomsListWrapper>
            </Root>
        );
    }
}