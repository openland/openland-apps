import * as React from 'react';
import { XView } from 'react-mental';
import { withRoomAddMembers } from 'openland-web/api/withRoomAddMembers';
import { withExplorePeople } from 'openland-web/api/withExplorePeople';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XModal, XModalProps } from 'openland-x-modal/XModal';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XUserCard } from 'openland-x/cards/XUserCard';

interface SearchBoxProps {
    value?: any[];
    onChange: (data: string) => string;
}

const SearchBox = (props: SearchBoxProps) => (
    <XSelect
        multi={true}
        value={props.value}
        render={
            <XSelectCustomUsersRender
                popper={false}
                placeholder="Search"
                rounded={true}
                onInputChange={props.onChange}
            />
        }
    />
);

const ExplorePeople = withExplorePeople(props => {
    if (!props.data.items) {
        return (
            <XView flexGrow={1} flexShrink={0}>
                <XLoader loading={true} />
            </XView>
        );
    }

    console.log(props.data.items.edges);
    return (
        <XView flexGrow={1} flexShrink={0}>
            <XScrollView2 flexGrow={1} flexShrink={0}>
                {props.data.items.edges.map(i => (
                    <XUserCard user={i.node} key={i.node.id} noPath={true} customButton={null} />
                ))}
            </XScrollView2>
        </XView>
    );
}) as React.ComponentType<{
    variables: { query?: string };
}>;

interface InviteModalProps extends XModalProps {
    roomId: string;
}

interface InviteModalState {
    searchQuery: string;
}

export class RoomAddMemberModal extends React.PureComponent<InviteModalProps, InviteModalState> {
    constructor(props: InviteModalProps) {
        super(props);

        this.state = {
            searchQuery: '',
        };
    }

    private onChange = (data: string) => {
        this.setState({
            searchQuery: data,
        });
        return data;
    };

    render() {
        const { props } = this;
        return (
            <XModal
                title="Add members"
                target={props.target}
                width={520}
                useTopCloser={true}
                body={
                    <XView height={400} flexGrow={1}>
                        <SearchBox onChange={this.onChange} />
                        <ExplorePeople variables={{ query: this.state.searchQuery }} />
                    </XView>
                }
            />
        );
    }
}
