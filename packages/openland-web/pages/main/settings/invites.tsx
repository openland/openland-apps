
import '../../init';
import '../../../globals';
import * as React from 'react';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormField } from 'openland-x-forms/XFormField';
import { XSelect } from 'openland-x/XSelect';
import { XButton } from 'openland-x/XButton';
import glamorous from 'glamorous';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XText } from 'openland-x/XText';
import { XLink } from 'openland-x/XLink';
import { XTextArea } from 'openland-x/XTextArea';
import { withOrganizationInviteMember } from '../../../api/withOrganizationInviteMember';

interface Invite {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: 'OWNER' | 'MEMBER';
}

const DeleteButton = glamorous(XButton)<{ hide?: boolean }>((props) => ({
    width: 28,
    height: 28,
    borderRadius: 50,
    color: '#334562',
    opacity: props.hide ? 0 : 0.2,
    '& i': {
        marginLeft: -2
    },
    marginTop: '5px !important'
}));

const AddButton = glamorous(XButton)({
    marginLeft: -16
});

const XFormFieldGrow = glamorous(XFormField)({
    flexGrow: 1
});

const ComposeButton = glamorous(XLink)({
    color: '#765efd',
    '&:hover': {
        textDecoration: 'underline'
    },
});

export class InviteComponent extends React.Component<{ invite: Invite, index: number, single: boolean, handleRemove: (index: number) => void }> {
    render() {
        return (
            <XVertical>
                <XHorizontal>
                    <XFormField field={'invites.' + this.props.index + '.email'} title="Email Adress">
                        <XInput field={'invites.' + this.props.index + '.email'} />
                    </XFormField>
                    <XFormField field={'invites.' + this.props.index + '.firstName'} title="First Name" optional={true}>
                        <XInput field={'invites.' + this.props.index + '.firstName'} />
                    </XFormField>
                    <XFormField field={'invites.' + this.props.index + '.lastName'} title="Last Name" optional={true}>
                        <XInput field={'invites.' + this.props.index + '.lastName'} />
                    </XFormField>
                    <XFormField field={'invites.' + this.props.index + '.role'} title="Role">
                        <XSelect field={'invites.' + this.props.index + '.role'} searchable={false} clearable={false} options={[{ label: 'Owner', value: 'OWNER' }, { label: 'Member', value: 'MEMBER' }]} />
                    </XFormField>
                    <XFormField field="" title="">
                        <DeleteButton hide={this.props.single} enabled={!this.props.single} icon="close" style="flat" onClick={() => this.props.handleRemove(this.props.index)} />
                    </XFormField>

                </XHorizontal>
            </XVertical>

        );
    }
}

class InvitesMoadalRaw extends React.Component<{ target?: any, mutation: any }, {
    customText?: string,
    customTextAreaOpen?: boolean,
}> {

    constructor(props: any) {
        super(props);
        this.state = {};
    }

    handleRemove = (index: number, store?: XStoreState) => {
        if (!store) {
            return;
        }
        let invites = store ? store.readValue('fields.invites') || [] : [];
        invites.splice(index, 1);
        store.writeValue('fields.invites', invites);
    }

    handleAdd = (store?: XStoreState) => {
        if (!store) {
            return;
        }
        let invites = store ? store.readValue('fields.invites') || [] : [];
        invites.push({ role: 'MEMBER' });
        store.writeValue('fields.invites', invites);
    }

    render() {
        return (
            <XModalForm
                useTopCloser={true}
                size="default"
                title="Invite your colleagues"
                submitProps={{ text: 'Send Invitations' }}
                defaultAction={async (data) => {
                    await this.props.mutation({
                        variables: {
                            email: data.invites[0].email,
                            firstName: data.invites[0].firstName,
                            lastname: data.invites[0].lastname,
                            role: data.invites[0].role,
                            emailText: this.state.customTextAreaOpen ? data.customText : null
                        }
                    });
                }}
                scrollableContent={true}
                target={this.props.target || <XButton text="Invite" />}
                defaultData={{
                    invites: [{ role: 'MEMBER' }, { role: 'MEMBER' }, { role: 'MEMBER' }]
                }}
            >
                <XVertical>
                    <XStoreContext.Consumer>
                        {(store) => {
                            let invites = store ? store.readValue('fields.invites') || [] : [];
                            return (
                                <>
                                    {invites.map((invite: Invite, i: number) => <InviteComponent key={i} index={i} invite={invite} single={invites.length === 1} handleRemove={(index) => this.handleRemove(i, store)} />)}

                                    < AddButton text=" + Add another" style="link" onClick={() => this.handleAdd(store)} alignSelf="flex-start" />
                                </>
                            );
                        }}
                    </XStoreContext.Consumer>

                    {!this.state.customTextAreaOpen && <XText><ComposeButton onClick={() => this.setState({ customTextAreaOpen: true })} >Compose a custom message</ComposeButton> to make your invites more personal</XText>}
                    {this.state.customTextAreaOpen && (
                        <XHorizontal>
                            <XFormFieldGrow field="customText" title="Custom Message">
                                <XTextArea valueStoreKey="fields.customText" />
                            </XFormFieldGrow>
                            <XFormField field="" title="">
                                <DeleteButton hide={false} icon="close" style="flat" onClick={() => this.setState({ customTextAreaOpen: false })} />
                            </XFormField>
                        </XHorizontal>
                    )}

                </XVertical >

            </XModalForm>
        );
    }
}

export const InvitesMoadal = withOrganizationInviteMember((props) => {
    return (
        <InvitesMoadalRaw mutation={props.sendInvite} target={(props as any).target} />
    );
}) as React.ComponentType<{ target?: any, refetchVars: { orgId: string } }>;