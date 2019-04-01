import * as React from 'react';
import { XView } from 'react-mental';
import { MutationFunc } from 'react-apollo';
import {
    RoomMemberRole,
    RoomAddMembers,
    RoomAddMembersVariables,
    RoomMembersShort_members,
} from 'openland-api/Types';
import { withRoomAddMembers } from 'openland-web/api/withRoomAddMembers';
import { withExplorePeople } from 'openland-web/api/withExplorePeople';
import { withRoomMembersId } from 'openland-web/api/withRoomMembers';
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XModalProps } from 'openland-x-modal/XModal';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XUserCard } from 'openland-x/cards/XUserCard';
import LinkIcon from 'openland-icons/ic-link.svg';
import { XCreateCard } from 'openland-x/cards/XCreateCard';

import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';

interface SearchBoxProps {
    value: { label: string; value: string }[] | null;
    onInputChange: (data: string) => string;
    onChange: (data: { label: string; value: string }[] | null) => void;
}

const SearchBox = (props: SearchBoxProps) => (
    <XSelect
        multi={true}
        render={
            <XSelectCustomUsersRender
                popper={false}
                placeholder="Search"
                rounded={true}
                onInputChange={props.onInputChange}
                onChange={data => props.onChange(data as any)}
                options={props.value || []}
                value={props.value || []}
            />
        }
    />
);

interface ExplorePeopleProps {
    variables: { query?: string };
    searchQuery: string;
    roomId: string;
    onPick: (label: string, value: string) => void;
    selectedUsers: Map<string, string> | null;
    roomUsers: RoomMembersShort_members[];
    linkInvitePath?: string;
}

const ExplorePeople = withExplorePeople(props => {
    const typedProps = props as typeof props & ExplorePeopleProps;
    if (!typedProps.data.items) {
        return (
            <XView flexGrow={1} flexShrink={0}>
                <XLoader loading={true} />
            </XView>
        );
    }

    let linkInvitePath = `/mail/${typedProps.roomId}?inviteByLink=true`;

    if (typedProps.linkInvitePath !== undefined) {
        linkInvitePath = typedProps.linkInvitePath;
    }

    return (
        <XView flexGrow={1} flexShrink={0}>
            <XScrollView2 flexGrow={1} flexShrink={0}>
                <XView paddingHorizontal={16} flexDirection="column">
                    {!typedProps.searchQuery &&
                        (!typedProps.selectedUsers || typedProps.selectedUsers.size === 0) && (
                            <XCreateCard
                                text="Invite with a link"
                                path={linkInvitePath}
                                icon={<LinkIcon />}
                            />
                        )}
                    {typedProps.data.items.edges.map(i => {
                        if (typedProps.selectedUsers && typedProps.selectedUsers.has(i.node.id)) {
                            return null;
                        }
                        if (
                            typedProps.roomUsers &&
                            typedProps.roomUsers.find(
                                (j: RoomMembersShort_members) => j.user.id === i.node.id,
                            )
                        ) {
                            return (
                                <XView key={i.node.id}>
                                    <XUserCard
                                        user={i.node}
                                        noPath={true}
                                        customButton={null}
                                        disable={true}
                                    />
                                </XView>
                            );
                        }
                        return (
                            <XView
                                key={i.node.id}
                                onClick={() => typedProps.onPick(i.node.name, i.node.id)}
                            >
                                <XUserCard user={i.node} noPath={true} customButton={null} />
                            </XView>
                        );
                    })}
                </XView>
            </XScrollView2>
        </XView>
    );
}) as React.ComponentType<ExplorePeopleProps>;

interface InviteModalProps extends XModalProps {
    roomId: string;
    addMembers: MutationFunc<RoomAddMembers, Partial<RoomAddMembersVariables>>;
    members: RoomMembersShort_members[];
    linkInvitePath?: string;
}

interface InviteModalState {
    searchQuery: string;
    selectedUsers: Map<string, string> | null;
}

class RoomAddMemberModalInner extends React.Component<
    InviteModalProps & { isMobile: boolean },
    InviteModalState
> {
    constructor(props: InviteModalProps & { isMobile: boolean }) {
        super(props);

        this.state = { searchQuery: '', selectedUsers: null };
    }

    private onInputChange = (data: string) => {
        this.setState({
            searchQuery: data,
        });
        return data;
    };

    private onChange = (data: { label: string; value: string }[]) => {
        let newSelected = new Map();
        data.map(i => {
            newSelected.set(i.value, i.label);
        });

        this.setState({
            selectedUsers: newSelected,
        });
    };

    private selectMembers = (label: string, value: string) => {
        let selected = this.state.selectedUsers || new Map();

        selected.set(value, label);

        this.setState({
            selectedUsers: selected,
        });
    };

    private onClosed = () => {
        this.setState({
            selectedUsers: null,
            searchQuery: '',
        });
    };

    render() {
        const { props } = this;
        const { selectedUsers } = this.state;
        let options: { label: string; value: string }[] = [];
        const invitesUsers: { userId: string; role: RoomMemberRole }[] = [];
        if (selectedUsers) {
            selectedUsers.forEach((l, v) => {
                options.push({
                    label: l,
                    value: v,
                });
            });

            selectedUsers.forEach((l, v) => {
                invitesUsers.push({ userId: v, role: RoomMemberRole.MEMBER });
            });
        }
        return (
            <XModalForm
                autoClose={1500}
                title="Add members"
                target={props.target}
                submitBtnText="Add"
                submitProps={{
                    successText: 'Done!',
                }}
                width={props.isMobile ? undefined : 520}
                flexGrow={props.isMobile ? 1 : undefined}
                useTopCloser={true}
                targetQuery="inviteMembers"
                defaultAction={async data => {
                    await props.addMembers({
                        variables: {
                            roomId: this.props.roomId,
                            invites: invitesUsers,
                        },
                    });

                    this.setState({
                        selectedUsers: null,
                    });
                }}
                onClosed={this.onClosed}
            >
                <XView
                    height={props.isMobile ? '100%' : '60vh'}
                    flexGrow={1}
                    marginHorizontal={-24}
                    marginTop={props.isMobile ? undefined : -6}
                    marginBottom={props.isMobile ? undefined : -24}
                >
                    <XView paddingHorizontal={16}>
                        <SearchBox
                            onInputChange={this.onInputChange}
                            value={options}
                            onChange={this.onChange}
                        />
                    </XView>
                    <ExplorePeople
                        variables={{ query: this.state.searchQuery }}
                        searchQuery={this.state.searchQuery}
                        roomId={props.roomId}
                        onPick={this.selectMembers}
                        selectedUsers={selectedUsers}
                        roomUsers={props.members}
                        linkInvitePath={props.linkInvitePath}
                    />
                </XView>
            </XModalForm>
        );
    }
}

const RoomAddMemberModalRoot = React.memo((props: InviteModalProps) => {
    const isMobile = React.useContext(IsMobileContext);
    return (
        <RoomAddMemberModalInner
            roomId={props.roomId}
            addMembers={props.addMembers}
            members={props.members}
            linkInvitePath={props.linkInvitePath}
            isMobile={isMobile}
        />
    );
});

type RoomAddMemberModalUsersT = {
    variables: { roomId: string };
    roomId: string;
    addMembers: MutationFunc<RoomAddMembers, Partial<RoomAddMembersVariables>>;
    linkInvitePath?: string;
};

const RoomAddMemberModalUsers = React.memo(withRoomMembersId(props => {
    const typedProps = props as typeof props & RoomAddMemberModalUsersT;
    return (
        <RoomAddMemberModalRoot
            addMembers={typedProps.addMembers}
            roomId={typedProps.roomId}
            members={typedProps.data.members}
            linkInvitePath={typedProps.linkInvitePath}
        />
    );
}) as React.ComponentType<RoomAddMemberModalUsersT & XModalProps>);

type RoomAddMemberModalT = {
    roomId: string;
    refetchVars: { roomId: string };
    linkInvitePath?: string;
};

export const RoomAddMemberModal = React.memo(withRoomAddMembers(props => {
    const typedProps = props as typeof props & RoomAddMemberModalT;
    return (
        <RoomAddMemberModalUsers
            roomId={typedProps.roomId}
            addMembers={typedProps.addMembers}
            variables={{ roomId: typedProps.roomId }}
            linkInvitePath={typedProps.linkInvitePath}
        />
    );
}) as React.ComponentType<RoomAddMemberModalT & XModalProps>);
