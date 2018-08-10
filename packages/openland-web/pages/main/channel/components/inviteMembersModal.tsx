import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
// import { XStoreState } from 'openland-y-store/XStoreState';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
// import { XVertical } from 'openland-x-layout/XVertical';
import { XInput, XInputGroup } from 'openland-x/XInput';
import { XButton } from 'openland-x/XButton';

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

interface Invite {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: 'OWNER' | 'MEMBER';
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
        <XInputGroup>
            <XInput size="r-default" color="primary-sky-blue" placeholder="Email" required={true} field={'inviteRequests.' + props.index + '.email'} />
            <XInput size="r-default" color="primary-sky-blue" placeholder="First name" field={'inviteRequests.' + props.index + '.firstName'} />
            <XInput size="r-default" color="primary-sky-blue" placeholder="Last name" field={'inviteRequests.' + props.index + '.lastName'} />
        </XInputGroup>
        <DeleteButton hide={props.single} enabled={!props.single} icon="close" style="flat" onClick={() => props.handleRemove(props.index)} />
    </XHorizontal>
);

class InviteMembersModalRaw extends React.Component<XModalFormProps> {
    render() {
        return (
            <XModalForm
                {...this.props}
                defaultAction={this.props.defaultAction}
                title="Invite members to"
                useTopCloser={true}
            >
                <XInputGroup>
                    <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" required={true} />
                    <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" />
                    <XInput size="r-default" color="primary-sky-blue" placeholder="r-default" />
                </XInputGroup>
            </XModalForm>
        );
    }
}

export const InviteMembersModal = (props: XModalFormProps) => (
    <InviteMembersModalRaw {...props} />
);