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
import { XSelect } from 'openland-x/XSelect';
import { XSelectCustomUsersRender } from 'openland-x/basics/XSelectCustom';
import { XModalProps } from 'openland-x-modal/XModal';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XLoader } from 'openland-x/XLoader';
import { XScrollView2 } from 'openland-x/XScrollView2';
import { XUserCard } from 'openland-x/cards/XUserCard';
import { useClient } from 'openland-web/utils/useClient';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';
import { XMutation } from 'openland-x/XMutation';
import { XPopper } from 'openland-x/XPopper';
import RevokeIcon from 'openland-icons/ic-revoke.svg';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import CheckIcon from 'openland-icons/ic-check.svg';

const RenewInviteLinkButton = (props: {
    variables: { roomId: string };
    refetchVars: { roomId: string };
    onClick: () => void;
}) => {
    const client = useClient();
    const renew = async () => {
        await client.mutateRoomRenewInviteLink(props.variables);
        await client.refetchRoomInviteLink(props.variables);
    };

    return (
        <XMutation mutation={renew} onSuccess={(props as any).onClick}>
            <RevokeIcon />
        </XMutation>
    );
};

class RenewInviteLinkButtonWrapper extends React.PureComponent {
    render() {
        return (
            <XView position="absolute" right={110} top={12} cursor="pointer">
                {this.props.children}
            </XView>
        );
    }
}

const InputClassName = css`
    border-radius: 8px !important;
    background: #f2f3f4 !important;
    border: none !important;
    &:focus-within {
        border: none !important;
        box-shadow: none !important;
    }
`;

interface OwnerLinkComponentProps {
    invite: string;
    isChannel: boolean;
    variables: { roomId: string };
}

class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
    input?: any;

    state = {
        copied: false,
        resetLink: false,
    };

    private handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    };

    private copy = (e: any) => {
        if (this.input && this.input.inputRef) {
            this.input.inputRef.inputRef.select();
        }
        document.execCommand('copy');
        this.setState({
            copied: true,
        });
    };

    private resetLink = () => {
        this.setState({
            copied: false,
            resetLink: true,
        });
    };

    render() {
        const { props } = this;
        const { copied, resetLink } = this.state;
        let invitePath = props.isChannel ? '/joinChannel/' : '/invite/';
        return (
            <XVertical width="100%" flexGrow={1} separator={2}>
                {props.invite && (
                    <XView flexDirection="column">
                        <XView fontSize={16} fontWeight="600" marginBottom={12}>
                            Invitation link
                        </XView>
                        <XView flexDirection="row" alignItems="center">
                            <XInput
                                size="large"
                                flexGrow={1}
                                ref={this.handleRef}
                                value={'https://openland.com' + invitePath + props.invite}
                                className={InputClassName}
                            />
                            <XPopper
                                content="Revoke link"
                                style="dark"
                                showOnHover={true}
                                placement="bottom"
                                zIndex={200}
                            >
                                <RenewInviteLinkButtonWrapper>
                                    <RenewInviteLinkButton
                                        variables={props.variables}
                                        refetchVars={props.variables}
                                        onClick={this.resetLink}
                                    />
                                </RenewInviteLinkButtonWrapper>
                            </XPopper>
                            <XView
                                height={40}
                                borderRadius={8}
                                paddingLeft={7}
                                paddingRight={12}
                                flexDirection="row"
                                alignItems="center"
                                fontSize={14}
                                backgroundColor={copied ? '#69d06d' : '#E8F4FF'}
                                color={copied ? '#ffffff' : '#1790ff'}
                                cursor="pointer"
                                onClick={this.copy}
                                marginLeft={12}
                            >
                                {copied ? <CheckIcon /> : <CopiedIcon />}
                                <XView marginLeft={copied ? 2 : 6}>
                                    {copied ? 'Copied' : 'Copy'}
                                </XView>
                            </XView>
                        </XView>
                        <XView
                            fontSize={12}
                            color={resetLink ? '#20a825' : 'rgba(0, 0, 0, 0.5)'}
                            marginLeft={16}
                            marginTop={6}
                        >
                            {resetLink
                                ? 'The previous link is revoked and a new one has been created'
                                : 'Anyone can use this link to join the group'}
                        </XView>
                    </XView>
                )}
            </XVertical>
        );
    }
}

type OwnerLinkT = { variables: { roomId: string }; isChannel: boolean };

const OwnerLink = (props: OwnerLinkT) => {
    const client = useClient();

    const data = client.useRoomInviteLink(props.variables);

    return (
        <OwnerLinkComponent
            invite={data.link}
            isChannel={props.isChannel}
            variables={props.variables}
        />
    );
};

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
    onPick: (label: string, value: string) => void;
    selectedUsers: Map<string, string> | null;
    roomUsers: RoomMembersShort_members[];
}

const ExplorePeople = (props: ExplorePeopleProps) => {
    const client = useClient();

    const data = client.useExplorePeople(props.variables, {
        fetchPolicy: 'network-only',
    });

    if (!data.items) {
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
                    {data.items.edges.map(i => {
                        if (props.selectedUsers && props.selectedUsers.has(i.node.id)) {
                            return null;
                        }
                        if (
                            props.roomUsers &&
                            props.roomUsers.find(
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
                                onClick={() => props.onPick(i.node.name, i.node.id)}
                            >
                                <XUserCard user={i.node} noPath={true} customButton={null} />
                            </XView>
                        );
                    })}
                </XView>
            </XScrollView2>
        </XView>
    );
};

interface InviteModalProps extends XModalProps {
    roomId: string;
    addMembers: MutationFunc<RoomAddMembers, Partial<RoomAddMembersVariables>>;
    members: RoomMembersShort_members[];
    isMobile: boolean;
    isChannel: boolean;
}

interface InviteModalState {
    searchQuery: string;
    selectedUsers: Map<string, string> | null;
}

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
                defaultAction={async () => {
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
                    height={props.isMobile ? '100%' : '65vh'}
                    flexGrow={1}
                    marginHorizontal={-24}
                    marginTop={props.isMobile ? undefined : -6}
                    marginBottom={props.isMobile ? undefined : -24}
                >
                    <XView paddingHorizontal={24} marginBottom={32}>
                        <OwnerLink
                            variables={{ roomId: this.props.roomId }}
                            isChannel={this.props.isChannel}
                        />
                    </XView>
                    <XView fontSize={16} fontWeight="600" marginBottom={16} marginLeft={24}>
                        Invitation link
                    </XView>
                    <XView paddingHorizontal={24}>
                        <SearchBox
                            onInputChange={this.onInputChange}
                            value={options}
                            onChange={this.onChange}
                        />
                    </XView>
                    <React.Suspense fallback={<XLoader />}>
                        <ExplorePeople
                            variables={{ query: this.state.searchQuery }}
                            onPick={this.selectMembers}
                            selectedUsers={selectedUsers}
                            roomUsers={props.members}
                        />
                    </React.Suspense>
                </XView>
            </XModalForm>
        );
    }
}

type RoomAddMemberModalT = {
    roomId: string;
    refetchVars: { roomId: string };
    isChannel: boolean;
};

export const RoomAddMemberModal = React.memo(
    ({ roomId, isChannel }: RoomAddMemberModalT & XModalProps) => {
        const isMobile = React.useContext(IsMobileContext);
        const client = useClient();

        const addMembers = async ({
            variables,
        }: {
            variables: {
                roomId: string;
                invites: { userId: string; role: RoomMemberRole }[];
            };
        }) => {
            await client.mutateRoomAddMembers({
                roomId: variables.roomId,
                invites: variables.invites,
            });

            await client.refetchRoomMembersShort({ roomId });
        };

        // TODO ask steve to add (opts?: QueryWatchParameters) to propagate fetchPolicy: 'network-only',
        const data = client.useWithoutLoaderRoomMembersShort(
            { roomId },
            //     {
            //  fetchPolicy: 'network-only'
            // }
        );

        if (!data) {
            return null;
        }

        return (
            <React.Suspense fallback={<XLoader />}>
                <RoomAddMemberModalInner
                    addMembers={addMembers}
                    roomId={roomId}
                    members={data.members}
                    isMobile={isMobile}
                    isChannel={isChannel}
                />
            </React.Suspense>
        );
    },
);
