import * as React from 'react';
import { css } from 'linaria';
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
import { XModal, XModalProps } from 'openland-x-modal/XModal';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XButton } from 'openland-x/XButton';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { XCreateCard } from '../../../openland-x/cards/XCreateCard';
import { InviteMembersModal } from '../../pages/main/channel/components/inviteMembersModal';

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
}

const ExplorePeople = withExplorePeople(props => {
    if (!props.data.items) {
        return (
            <XView flexGrow={1} flexShrink={0}>
                <XLoader loading={true} />
            </XView>
        );
    }

    return (
        <XView flexGrow={1} flexShrink={0}>
            <XScrollView2 flexGrow={1} flexShrink={0}>
                <XView paddingHorizontal={16} flexDirection="column">
                    {!(props as any).searchQuery && (
                        <InviteMembersModal
                            roomId={(props as any).roomId}
                            target={<XCreateCard text="Invite with a link" />}
                        />
                    )}
                    {props.data.items.edges.map(i => {
                        if (
                            ((props as any).selectedUsers &&
                                (props as any).selectedUsers.has(i.node.id)) ||
                            ((props as any).roomUsers &&
                                (props as any).roomUsers.find(
                                    (j: RoomMembersShort_members) => j.user.id === i.node.id,
                                ))
                        ) {
                            return null;
                        }
                        return (
                            <XView
                                key={i.node.id}
                                onClick={() => (props as any).onPick(i.node.name, i.node.id)}
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
    addMember: MutationFunc<RoomAddMembers, Partial<RoomAddMembersVariables>>;
    members: RoomMembersShort_members[];
}

interface InviteModalState {
    searchQuery: string;
    selectedUsers: Map<string, string> | null;
}

const footerWrapperClassName = css`
    height: 56px;
    background-color: #f9f9f9;
    border-bottom-left-radius: 6px;
    border-bottom-right-radius: 6px;
    padding: 24px 12px;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    z-index: 1;
`;

class RoomAddMemberModalInner extends React.Component<InviteModalProps, InviteModalState> {
    constructor(props: InviteModalProps) {
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

    private addMembers = () => {
        const { selectedUsers } = this.state;
        if (selectedUsers) {
            const invitesUsers: { userId: string; role: RoomMemberRole }[] = [];
            selectedUsers.forEach((l, v) => {
                invitesUsers.push({ userId: v, role: RoomMemberRole.MEMBER });
            });

            this.props.addMember({
                variables: {
                    roomId: this.props.roomId,
                    invites: invitesUsers,
                },
            });

            this.setState({
                searchQuery: '',
                selectedUsers: null,
            });
        }
    };

    private selectMembers = (label: string, value: string) => {
        let selected = this.state.selectedUsers || new Map();

        selected.set(value, label);

        this.setState({
            selectedUsers: selected,
        });
    };

    render() {
        const { props } = this;
        const { selectedUsers } = this.state;
        let options: { label: string; value: string }[] = [];
        if (selectedUsers) {
            selectedUsers.forEach((l, v) => {
                options.push({
                    label: l,
                    value: v,
                });
            });
        }
        return (
            <XModal
                title="Add members"
                target={props.target}
                width={520}
                useTopCloser={true}
                body={
                    <XView height="60vh" flexGrow={1}>
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
                        />
                    </XView>
                }
                footer={
                    <div className={footerWrapperClassName}>
                        <XButton
                            style="primary"
                            text="Add"
                            autoClose={true}
                            onClick={this.addMembers}
                        />
                    </div>
                }
            />
        );
    }
}

const RoomAddMemberModalUsers = withRoomMembersId(props => (
    <RoomAddMemberModalInner
        {...props}
        addMember={(props as any).addMembers}
        roomId={(props as any).roomId}
        members={props.data.members}
    />
)) as React.ComponentType<
    {
        variables: { roomId: string };
        roomId: string;
        addMember: MutationFunc<RoomAddMembers, Partial<RoomAddMembersVariables>>;
    } & XModalProps
>;

export const RoomAddMemberModal = withRoomAddMembers(props => (
    <RoomAddMemberModalUsers
        {...props}
        roomId={(props as any).roomId}
        addMember={props.addMembers}
        variables={{ roomId: (props as any).roomId }}
    />
)) as React.ComponentType<{ roomId: string } & XModalProps>;
