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
import { EmptyComponent } from './components/view/content/ChannelEmptyComponent';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XOverflow } from '../Incubator/XOverflow';
import { XMenuTitle } from 'openland-x/XMenuItem';
import { ChannelSetFeatured, ChannelSetHidden } from './MessengerComponent';
import { XSubHeader } from 'openland-x/XSubHeader';
import { XContentWrapper } from 'openland-x/XContentWrapper';
import { SearchBox } from '../../pages/main/directory/components/SearchBox';

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

const ChannelItemWrapper = makeNavigable(Glamorous(XHorizontal)({
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

const ChannelName = Glamorous.div({
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

interface WithChatSearchChannelsProps {
    onDirectory?: boolean;
    variables: {
        query: string,
        sort: string
    };
    tagsCount: (n: number) => void;
}

const Channels = withChatSearchChannels((props) => {
    if (props.data && props.data.items) {
        (props as any).tagsCount(props.data.items.edges.length);
    }

    return (
        props.data && props.data.items ? props.data.items.edges.length
            ? (
                <XContentWrapper withPaddingBottom={true}>
                    {props.data.items.edges.map(c => {
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
                                <XHorizontal separator={8} alignItems="center" flexGrow={1}>
                                    <XAvatar
                                        style="channel"
                                        cloudImageUuid={channel.photo || channel.photos[0] || (channel.organization ? channel.organization.photo || undefined : undefined)}
                                        objectName={channel.title}
                                        objectId={channel.id}
                                    />
                                    <XVertical separator={0} flexGrow={1}>
                                        <ChannelName>{title}</ChannelName>
                                        <MembersText>{channel.membersCount} {channel.membersCount === 1 ? 'member' : 'members'}</MembersText>
                                    </XVertical>
                                </XHorizontal>
                                <XButton
                                    text={StatusTitleMap[channel.myStatus]}
                                    path={path}
                                    style="ghost"
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
                </XContentWrapper>
            )
            : <EmptyComponent />
            : <XLoader loading={true} />
    );
}) as React.ComponentType<WithChatSearchChannelsProps>;

interface ChannelsExploreComponentState {
    count: number;
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
                    placeholder="Search channels"
                />
                <ChannelsListWrapper>
                    {this.state.query.length <= 0 && (
                        <XSubHeader
                            title="Featured channels"
                            right={sortBox}
                        />
                    )}
                    {(this.state.query.length > 0 && this.state.count > 0) && (
                        <XSubHeader
                            title={'Channels'}
                            counter={this.state.count}
                            right={sortBox}
                        />
                    )}
                    <Channels
                        variables={{ query: this.state.query.toLowerCase(), sort: JSON.stringify(sort) }}
                        onDirectory={this.props.onDirectory}
                        tagsCount={this.handleCount}
                    />
                </ChannelsListWrapper>
            </Root>
        );
    }
}