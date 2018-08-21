
import * as React from 'react';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { withChatSearchChannels } from '../../api/withChatSearchChannels';
import { XText } from 'openland-x/XText';
import { XLoader } from 'openland-x/XLoader';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XAvatar } from 'openland-x/XAvatar';
import { XButton } from 'openland-x/XButton';
import { SortPicker } from '../../pages/main/directory/sortPicker';

const StatusTitleMap = {
    invited: 'Invited',
    member: 'Member',
    none: 'Request invite',
    requested: 'Pending',
};

const Channels = withChatSearchChannels((props) => {
    return (
        props.data && props.data.channels ? props.data.channels.edges.length ? (
            <>
                {props.data.channels.edges.map(c => {
                    let channel = c.node;
                    let title = (!channel.isRoot && channel.organization ? (channel.organization.name + '/') : '') + channel.title;
                    return (
                        <XHorizontal key={c.node.id}>
                            <XAvatar cloudImageUuid={channel.photos[0] || (channel.organization ? channel.organization.photo || undefined : undefined)} />
                            <XVertical>
                                <XText>{title}</XText>
                                <XText>{channel.membersCount}</XText>
                            </XVertical>
                            <XButton text={StatusTitleMap[channel.myStatus]} path={'/mail/' + channel.id} />
                        </XHorizontal>
                    );
                })}
            </>
        )
            : <XText>No results</XText> : <XLoader loading={true} />
    );
});

export class ChannelsExploreComponent extends React.Component<{}, {
    query: string,
    sort: { orderBy: string, featured: boolean };
}> {
    constructor(props: {}) {
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
            <XVertical height="100%">
                <XHorizontal >
                    <XInput value={this.state.query} onChange={this.onQueryChange} flexGrow={1}/>
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
                </XHorizontal>

                <Channels variables={{ query: this.state.query.toLowerCase(), sort: JSON.stringify(sort) }} />
            </XVertical>
        );
    }
}