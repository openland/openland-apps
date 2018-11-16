import * as React from 'react';
import Glamorous from 'glamorous';
import { withChatSearchChannels } from '../../api/withChatSearchChannels';
import { XLoader } from 'openland-x/XLoader';
import { SortPicker } from '../../pages/main/directory/sortPicker';
import { XScrollView } from 'openland-x/XScrollView';
import { EmptyComponent } from './components/view/content/RoomEmptyComponent';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { SearchBox } from '../../pages/main/directory/components/SearchBox';
import { XRoomCard } from 'openland-x/cards/XRoomCard';

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

interface WithChatSearchRoomsProps {
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

    if (!(props.error || props.data === undefined || props.data.items === undefined || props.data.items === null || props.data.items.edges.length === 0)) {
        (props as any).tagsCount(props.data.items.pageInfo.itemsCount);

        return (
            <XContentWrapper withPaddingBottom={true}>
                {props.data.items.edges.map(c => {
                    let room = c.node;

                    return (
                        <XRoomCard
                            key={c.node.id}
                            room={room}
                            path={'/directory/p/' + room.id}
                            iMember={room.myStatus === 'member'}
                        />
                    );
                })}
            </XContentWrapper>
        );
    } else {
        (props as any).tagsCount(0);

        return <EmptyComponent />;
    }
}) as React.ComponentType<WithChatSearchRoomsProps>;

interface RoomExploreComponentProps {
    
}

interface RoomExploreComponentState {
    count: number;
    query: string;
    sort: {
        orderBy: string,
        featured: boolean
    };
}

export class RoomsExploreComponent extends React.Component<RoomExploreComponentProps, RoomExploreComponentState> {
    constructor(props: RoomExploreComponentProps) {
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
                        tagsCount={this.handleCount}
                    />
                </RoomsListWrapper>
            </Root>
        );
    }
}