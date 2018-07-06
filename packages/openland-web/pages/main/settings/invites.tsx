
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
import { withOrganizationInviteMembers } from '../../../api/withOrganizationInviteMember';
import { XWithRole } from 'openland-x-permissions/XWithRole';

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
                    {this.props.index === 0 && (
                        <>
                            <XFormField field={'inviteRequests.' + this.props.index + '.email'} title="Email Adress">
                                <XInput placeholder="Email Adress" field={'inviteRequests.' + this.props.index + '.email'} />
                            </XFormField>
                            <XFormField field={'inviteRequests.' + this.props.index + '.firstName'} title="First Name" optional={true}>
                                <XInput placeholder="First Name" field={'inviteRequests.' + this.props.index + '.firstName'} />
                            </XFormField>
                            <XFormField field={'inviteRequests.' + this.props.index + '.lastName'} title="Last Name" optional={true}>
                                <XInput placeholder="Last Name" field={'inviteRequests.' + this.props.index + '.lastName'} />
                            </XFormField>
                            <XWithRole role="super-admin">
                                <XFormField field={'inviteRequests.' + this.props.index + '.role'} title="Role">
                                    <XSelect field={'inviteRequests.' + this.props.index + '.role'} searchable={false} clearable={false} options={[{ label: 'Owner', value: 'OWNER' }, { label: 'Member', value: 'MEMBER' }]} />
                                </XFormField>
                            </XWithRole>
                            <XFormField field="" title="">
                                <DeleteButton hide={this.props.single} enabled={!this.props.single} icon="close" style="flat" onClick={() => this.props.handleRemove(this.props.index)} />
                            </XFormField>
                        </>
                    )}

                    {this.props.index !== 0 && (
                        <>
                            <XInput placeholder="Email Adress" field={'inviteRequests.' + this.props.index + '.email'} />
                            <XInput placeholder="First Name" field={'inviteRequests.' + this.props.index + '.firstName'} />
                            <XInput placeholder="Last Name" field={'inviteRequests.' + this.props.index + '.lastName'} />
                            <XWithRole role="super-admin">
                                <XSelect field={'inviteRequests.' + this.props.index + '.role'} searchable={false} clearable={false} options={[{ label: 'Owner', value: 'OWNER' }, { label: 'Member', value: 'MEMBER' }]} />
                            </XWithRole>
                            <DeleteButton hide={this.props.single} enabled={!this.props.single} icon="close" style="flat" onClick={() => this.props.handleRemove(this.props.index)} />
                        </>
                    )}

                </XHorizontal>
            </XVertical>

        );
    }
}

class InvitesMoadalRaw extends React.Component<{
    target?: any, mutation: any,
    targetQuery?: string
}, {
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
        let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
        invites.splice(index, 1);
        store.writeValue('fields.inviteRequests', invites);
    }

    handleAdd = (store?: XStoreState) => {
        if (!store) {
            return;
        }
        let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
        invites.push({ role: 'MEMBER' });
        store.writeValue('fields.inviteRequests', invites);
    }

    render() {
        return (
            <XModalForm
                useTopCloser={true}
                size="large"
                title="Invite your colleagues"
                submitProps={{ text: 'Send Invitations' }}
                targetQuery={(this.props as any).targetQuery}
                defaultAction={async (data) => {
                    let invites = data.inviteRequests.filter((invite: any) => invite.email || invite.firstName || invite.lastName).map((invite: any) => ({...invite, emailText: this.state.customTextAreaOpen ? data.customText : null}));
                    await this.props.mutation({
                        variables: {
                            inviteRequests: invites
                            // email: data.inviteRequests[0].email,
                            // firstName: data.inviteRequests[0].firstName,
                            // lastname: data.inviteRequests[0].lastname,
                            // role: data.inviteRequests[0].role,
                            // emailText: this.state.customTextAreaOpen ? data.customText : null
                        }
                    });
                }}
                scrollableContent={true}
                target={this.props.target === undefined ? <XButton text="Invite" /> : this.props.target}
                defaultData={{
                    inviteRequests: [{ email: '', role: 'MEMBER' }, { email: '', role: 'MEMBER' }, { email: '', role: 'MEMBER' }]
                }}
            >
                <XVertical justifyContent="center" alignItems="center">
                    <XVertical >
                        <XStoreContext.Consumer>
                            {(store) => {
                                let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
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
                </XVertical >

            </XModalForm>
        );
    }
}

export const InvitesMoadal = withOrganizationInviteMembers((props) => {
    return (
        <InvitesMoadalRaw mutation={props.sendInvite} targetQuery={(props as any).targetQuery} target={(props as any).target} />
    );
}) as React.ComponentType<{ targetQuery?: string, target?: any, refetchVars?: { orgId: string } }>;