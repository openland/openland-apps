import * as React from 'react';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { withChatSearchChannels } from '../../api/withChatSearchChannels';
import { XLoader } from 'openland-x/XLoader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { SortPicker } from '../../pages/main/directory/sortPicker';
import { XScrollView } from 'openland-x/XScrollView';
import { makeNavigable } from 'openland-x/Navigable';
import { EmptyComponent } from './components/view/content/ChannelEmptyComponent';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XOverflow } from '../Incubator/XOverflow';
import { XMenuTitle } from 'openland-x/XMenuItem';
import { ChannelSetFeatured, ChannelSetHidden } from './MessengerComponent';
import SearchIcon from '../icons/ic-search-small.svg';

const ChannelsListWrapper = Glamorous(XScrollView)({
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

const Avatar = Glamorous(XAvatar)({
    width: 38,
    height: 38,
    '& img': {
        width: '38px !important',
        height: '38px !important'
    }
});

const ChannelItemWrapper = makeNavigable(Glamorous(XHorizontal)({
    height: 70,
    paddingLeft: 20,
    paddingRight: 24,
    flexShrink: 0,
    cursor: 'pointer',
    borderBottom: '1px solid rgba(220, 222, 228, 0.3)',
    '&:hover': {
        backgroundColor: '#f9fafb',
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
        color: '#979EAA',
        border: '1px solid transparent'
    }
}) as any) as any;

const ChannelName = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.43,
    letterSpacing: -0.4,
    color: '#1790ff'
});

const MembersText = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.29,
    letterSpacing: -0.4,
    color: '#99a2b0'
});

interface WithChatSearchChannelsProps {
    onDirectory?: boolean;
    variables: {
        query: string,
        sort: string
    };
}

const Channels = withChatSearchChannels((props) => {
    return (
        props.data && props.data.channels ? props.data.channels.edges.length
            ? (
                <>
                    {props.data.channels.edges.map(c => {
                        let channel = c.node;
                        let title = (!channel.isRoot && channel.organization ? (channel.organization.name + ' / ') : '') + channel.title;

                        let path = '/mail/' + channel.id;

                        if ((props as any).onDirectory && channel.myStatus !== 'member') {
                            path = '/directory/ch/' + channel.id;
                        }

                        return (
                            <ChannelItemWrapper
                                path={path}
                                key={c.node.id}
                                alignItems="center"
                            >
                                <XHorizontal separator={6} alignItems="center" flexGrow={1}>
                                    <Avatar
                                        style="channel"
                                        cloudImageUuid={channel.photo || channel.photos[0] || (channel.organization ? channel.organization.photo || undefined : undefined)}
                                    />
                                    <XVertical separator={1}>
                                        <ChannelName>{title}</ChannelName>
                                        <MembersText>{channel.membersCount} {channel.membersCount === 1 ? 'member' : 'members'}</MembersText>
                                    </XVertical>
                                </XHorizontal>
                                <XButton
                                    text={StatusTitleMap[channel.myStatus]}
                                    path={path}
                                    style="ghost"
                                    size="r-default"
                                    className={channel.myStatus}
                                />
                                <XWithRole role={['super-admin', 'editor']}>
                                    <XOverflow
                                        flat={true}
                                        placement="bottom-end"
                                        content={(
                                            <div style={{ width: 160 }} onClick={(e) => e.stopPropagation()}>
                                                <XMenuTitle>Super admin</XMenuTitle>
                                                <ChannelSetFeatured conversationId={channel.id} val={channel.featured} />
                                                <ChannelSetHidden conversationId={channel.id} val={channel.hidden} />
                                            </div>
                                        )}
                                    />
                                </XWithRole>
                            </ChannelItemWrapper>
                        );
                    })}
                </>
            )
            : <EmptyComponent />
            : <XLoader loading={true} />
    );
}) as React.ComponentType<WithChatSearchChannelsProps>;

const SearchWrapper = Glamorous(XHorizontal)({
    height: 61,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    paddingRight: 24,
    paddingLeft: 20,
    '& > div > div': {
        height: 59,
        border: 'none',
        fontSize: 16,
        fontWeight: 500,
        '&:focus-within': {
            boxShadow: 'none',
            border: 'none'
        }
    },
    '& > div:focus-within': {
        '& svg > g > path:last-child': {
            fill: 'rgba(23, 144, 255, 0.5)'
        }
    }
});

const FilterWrapper = Glamorous(XHorizontal)({
    height: 56,
    backgroundColor: '#f9fafb',
    paddingLeft: 24,
    paddingRight: 24,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const CounterText = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.14,
    letterSpacing: -0.2,
    color: '#5c6a81'
});

interface ChannelsExploreComponentState {
    query: string;
    sort: {
        orderBy: string,
        featured: boolean
    };
}

export class ChannelsExploreComponent extends React.Component<{ onDirectory?: boolean }, ChannelsExploreComponentState> {
    constructor(props: { onDirectory?: boolean }) {
        super(props);
        this.state = {
            query: '', sort: { orderBy: 'membersCount', featured: true }
        };
    }

    changeSort = (sort: { orderBy: string, featured: boolean }) => {
        this.setState({ sort: sort });
    }

    onQueryChange = (q: string) => {
        this.setState({
            query: q
        });
    }

    render() {
        let sort = [{ [this.state.sort.orderBy]: { order: 'desc' } }];
        if (this.state.sort.featured) {
            sort.unshift({ ['featured']: { order: 'desc' } });
        }
        return (
            <Root>
                <XVertical separator={0} flexShrink={0}>
                    <SearchWrapper justifyContent="space-between" alignItems="center" flexShrink={0}>
                        <XHorizontal separator={0} alignItems="center" flexGrow={1}>
                            <SearchIcon />
                            <XInput
                                value={this.state.query}
                                onChange={this.onQueryChange}
                                flexGrow={1}
                                placeholder="Search channels"
                                color="primary-sky-blue"
                            />
                        </XHorizontal>
                        <XButton
                            text="Search"
                            style="primary-sky-blue"
                            size="r-default"
                        />
                    </SearchWrapper>
                    <FilterWrapper justifyContent="space-between" alignItems="center" flexShrink={0}>
                        <CounterText>Featured channels</CounterText>
                        <SortPicker
                            sort={this.state.sort}
                            onPick={this.changeSort}
                            options={
                                {
                                    label: 'Sort by', values: [
                                        { label: 'Members count', value: 'membersCount' },
                                        { label: 'Last updated', value: 'updatedAt' },
                                        { label: 'Create date', value: 'createdAt' }
                                    ]
                                }
                            }
                        />
                    </FilterWrapper>
                </XVertical>
                <ChannelsListWrapper>
                    <XVertical separator={0} flexGrow={1} flexShrink={0}>
                        <Channels
                            variables={{ query: this.state.query.toLowerCase(), sort: JSON.stringify(sort) }}
                            onDirectory={this.props.onDirectory}
                        />
                    </XVertical>
                </ChannelsListWrapper>
            </Root>
        );
    }
}