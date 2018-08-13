import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput, XInputGroup } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';
import { XLink } from 'openland-x/XLink';

const DeleteButton = Glamorous(XButton)<{ hide?: boolean }>((props) => ({
    width: 28,
    height: 28,
    borderRadius: 50,
    color: '#334562',
    opacity: props.hide ? 0 : 0.2,
    '& i': {
        marginLeft: -2
    }
}));

const ChannelName = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 5,
    paddingRight: 5,
    height: 26,
    borderRadius: 16,
    backgroundColor: 'rgba(23, 144, 255, 0.08)',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#1790ff'
});

interface Invite {
    email?: string;
    firstName?: string;
    lastName?: string;
}

interface InviteComponentProps {
    index: number;
    invite: Invite;
    single: boolean;
    handleRemove: (index: number) => void;
    useRoles?: boolean;
    first: boolean;
}

const InviteComponent = (props: InviteComponentProps) => (
    <XHorizontal separator={6} alignItems="center" flexGrow={1} justifyContent="space-between">
        <XInputGroup flexGrow={1}>
            <XInput size="r-default" color="primary-sky-blue" placeholder="Email" required={true} field={'inviteRequests.' + props.index + '.email'} />
            <XInput size="r-default" color="primary-sky-blue" placeholder="First name" field={'inviteRequests.' + props.index + '.firstName'} />
            <XInput size="r-default" color="primary-sky-blue" placeholder="Last name" field={'inviteRequests.' + props.index + '.lastName'} />
        </XInputGroup>
        <DeleteButton hide={props.single} enabled={!props.single} icon="close" style="flat" onClick={() => props.handleRemove(props.index)} />
    </XHorizontal>
);

const LinkButton = Glamorous(XLink)<{ primary?: boolean }>((props) => ({
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: props.primary ? '#654bfa' : 'rgba(51, 69, 98, 0.4)',
    '&:hover': {
        textDecoration: props.primary ? 'underline' : undefined
    }
}));

class InviteMembersModalRaw extends React.Component<XModalFormProps> {
    constructor(props: any) {
        super(props);

        this.state = {

        };
    }

    handleAdd = (store?: XStoreState) => {
        if (!store) {
            return;
        }
        let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
        invites.push({ role: 'MEMBER' });
        store.writeValue('fields.inviteRequests', invites);
    }

    handleRemove = (index: number, store?: XStoreState) => {
        if (!store) {
            return;
        }
        let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
        invites.splice(index, 1);
        store.writeValue('fields.inviteRequests', invites);
    }

    render() {
        return (
            <XModalForm
                {...this.props}
                defaultAction={this.props.defaultAction}
                title="Invite members to"
                titleChildren={<ChannelName>qweqweqw</ChannelName>}
                useTopCloser={true}
                size="large"
                defaultData={{
                    inviteRequests: [{ email: '' }, { email: '' }]
                }}
            >
                <XStoreContext.Consumer>
                    {(store) => {
                        let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
                        return (
                            <XVertical>
                                {invites.map((invite: Invite, i: number) => (
                                    <InviteComponent
                                        first={i === 0}
                                        key={i}
                                        index={i}
                                        invite={invite}
                                        single={invites.length === 1}
                                        handleRemove={(index) => this.handleRemove(index, store)}
                                    />
                                ))}
                                <LinkButton onClick={() => this.handleAdd(store)}>Add another</LinkButton>
                            </XVertical>
                        );
                    }}
                </XStoreContext.Consumer>
            </XModalForm>
        );
    }
}

export const InviteMembersModal = (props: XModalFormProps) => (
    <InviteMembersModalRaw {...props} />
);