
import '../../init';
import '../../../globals';
import * as React from 'react';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
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
import { withPublicInvite } from '../../../api/withPublicInvite';
import { XMutation } from 'openland-x/XMutation';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { TextInvites } from 'openland-text/TextInvites';
import { withOrganizationInviteOrganization } from '../../../api/withOrganizationInviteOrganization';
import { withPublicInviteOrganization } from '../../../api/withPublicInviteOrganization';
import { withInvitesHistory } from '../../../api/withInvitesHistory';
import { InvitesHistory } from './invitesHistory';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';

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

const LinkButton = glamorous(XButton)({
    marginLeft: -16,
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

export let FooterWrap = glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTop: '1px solid rgba(220, 222, 228, 0.6)'
});

export class InviteComponent extends React.Component<{ invite: Invite, index: number, single: boolean, handleRemove: (index: number) => void, useRoles?: boolean }> {
    render() {
        return (
            <XVertical>
                <XHorizontal>
                    {this.props.index === 0 && (
                        <>
                            <XFormField field={'inviteRequests.' + this.props.index + '.email'} title={TextInvites.emailInputTitle}>
                                <XInput placeholder={TextInvites.emailInputPlaceholder} field={'inviteRequests.' + this.props.index + '.email'} />
                            </XFormField>
                            <XFormField field={'inviteRequests.' + this.props.index + '.firstName'} title={TextInvites.firstNameInputTitle} optional={true}>
                                <XInput placeholder={TextInvites.firstNamePlaceholder} field={'inviteRequests.' + this.props.index + '.firstName'} />
                            </XFormField>
                            <XFormField field={'inviteRequests.' + this.props.index + '.lastName'} title={TextInvites.lastNameInputTitle} optional={true}>
                                <XInput placeholder={TextInvites.lastNamePlaceholder} field={'inviteRequests.' + this.props.index + '.lastName'} />
                            </XFormField>
                            {this.props.useRoles !== false &&
                                <XWithRole role="super-admin">
                                    <XFormField field={'inviteRequests.' + this.props.index + '.role'} title={TextInvites.roleInputTitle}>
                                        <XSelect field={'inviteRequests.' + this.props.index + '.role'} searchable={false} clearable={false} options={[{ label: 'Owner', value: 'OWNER' }, { label: 'Member', value: 'MEMBER' }]} />
                                    </XFormField>
                                </XWithRole>
                            }
                            <XFormField field="" title="">
                                <DeleteButton hide={this.props.single} enabled={!this.props.single} icon="close" style="flat" onClick={() => this.props.handleRemove(this.props.index)} />
                            </XFormField>
                        </>
                    )}

                    {this.props.index !== 0 && (
                        <>
                            <XInput placeholder={TextInvites.emailInputPlaceholder} field={'inviteRequests.' + this.props.index + '.email'} />
                            <XInput placeholder={TextInvites.firstNamePlaceholder} field={'inviteRequests.' + this.props.index + '.firstName'} />
                            <XInput placeholder={TextInvites.lastNamePlaceholder} field={'inviteRequests.' + this.props.index + '.lastName'} />
                            {this.props.useRoles !== false &&
                                <XWithRole role="super-admin">
                                    <XSelect field={'inviteRequests.' + this.props.index + '.role'} searchable={false} clearable={false} options={[{ label: 'Owner', value: 'OWNER' }, { label: 'Member', value: 'MEMBER' }]} />
                                </XWithRole>
                            }
                            <DeleteButton hide={this.props.single} enabled={!this.props.single} icon="close" style="flat" onClick={() => this.props.handleRemove(this.props.index)} />
                        </>
                    )}

                </XHorizontal>
            </XVertical>

        );
    }
}

const LinkContianer = glamorous(XVertical)({
    minHeight: 300,
    padding: 40
});

class OwnerLinkComponent extends React.Component<{ invite: { id: string, key: string, ttl: string | null } | null, createMutation: any, deleteMutation: any } & XWithRouter> {
    input?: any;
    constructor(props: any) {
        super(props);
    }

    handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    }

    copy = (e: any) => {
        if (this.input && this.input.inputRef && this.input.inputRef) {
            this.input.inputRef.inputRef.select();
        }
        document.execCommand('copy');
    }

    render() {
        return (
            <LinkContianer>
                {this.props.invite && (
                    <>
                        <XHorizontal alignItems="center" justifyContent="stretch">
                            <XInput flexGrow={1} autoSelect={true} ref={this.handleRef} value={this.props.router.protocol + '://' + this.props.router.hostName + (this.props.invite ? '/invite/' : '/join/') + this.props.invite.key} />
                        </XHorizontal>
                    </>
                )}
            </LinkContianer>
        );
    }
}

const RenewInviteLinkButton = withPublicInvite((props) => {
    return (
        <XMutation mutation={props.createPublicInvite}><XButton text="Renew link" style="link" /></XMutation>
    );
});

const RenewGlobalInviteLinkButton = withPublicInviteOrganization((props) => {
    return (
        <XMutation mutation={props.createPublicInvite}><XButton text="Renew link" style="link" /></XMutation>
    );
});

const OwnerLink = withPublicInvite(withRouter((props) => {
    return (
        <OwnerLinkComponent ref={(props as any).innerRef} router={props.router} invite={props.data ? props.data.publicInvite : null} createMutation={props.createPublicInvite} deleteMutation={props.deletePublicInvite} />
    );
})) as React.ComponentType<{ onBack: () => void, innerRef: any }>;

const OwnerLinkOrganization = withPublicInviteOrganization(withRouter((props) => {
    return (
        <OwnerLinkComponent ref={(props as any).innerRef} router={props.router} invite={props.data ? props.data.publicInvite : null} createMutation={props.createPublicInvite} deleteMutation={props.deletePublicInvite} />
    );
})) as React.ComponentType<{ onBack: () => void, innerRef: any }>;

const ShowInvitesHistory = withInvitesHistory((props) => {
    console.warn(props);
    return (
        (props.data && props.data.invites || []).length > 0 ? <LinkButton text={TextInvites.showHistory} onClick={(props as any).onClick} /> : null
    );
}) as React.ComponentType<{ onClick?: () => void }>;

const InvitesHistoryGrow = glamorous(InvitesHistory)({
    flexGrow: 1
});
class InvitesMoadalRaw extends React.Component<{
    mutation: any,
    useRoles?: boolean,
    organization: boolean,
} & Partial<XModalFormProps>, {
        customText?: string,
        customTextAreaOpen?: boolean,
        showLink?: boolean,
        showInvitesHistory?: boolean
    }> {
    linkComponent?: any;
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

    handleLinkComponentRef = (ref: any) => {
        this.linkComponent = ref;
    }

    copyLink = () => {
        if (this.linkComponent) {
            console.warn(this.linkComponent);
            this.linkComponent.copy();
        }
    }

    render() {
        let { mutation, submitProps, ...modalFormProps } = this.props;
        let footer = (
            <FooterWrap>
                <XHorizontal flexGrow={1}>
                    {!this.state.showLink && (
                        <XWithRole role="admin" orgPermission={true}>
                            {!this.state.showLink && <LinkButton style="link" text={TextInvites.getLinkButtonLinkExists} onClick={() => this.setState({ showLink: true })} />}
                        </XWithRole>
                    )}
                    {this.state.showLink && (
                        <XButton onClick={() => this.setState({ showLink: false })} text={TextInvites.backToEmailInvites} style="link" />
                    )}
                </XHorizontal>
                {this.state.showLink && this.props.organization && (
                    <RenewGlobalInviteLinkButton />
                )}
                {this.state.showLink && !this.props.organization && (
                    <RenewInviteLinkButton />
                )}
                {this.state.showLink && (
                    <XButton style={'primary'} text={'Copy'} onClick={this.copyLink} autoClose={true}/>
                )}
                {!this.state.showLink && (
                    <XFormSubmit style={'primary'} text={'Save'} keyDownSubmit={true} {...submitProps} />
                )}
            </FooterWrap>
        );
        return (
            <XModalForm
                useTopCloser={true}
                size="large"
                defaultAction={async (data) => {
                    let invites = data.inviteRequests.filter((invite: any) => invite.email || invite.firstName || invite.lastName).map((invite: any) => ({ ...invite, role: this.props.useRoles !== false ? invite.role : undefined, emailText: this.state.customTextAreaOpen ? data.customText : null }));
                    await this.props.mutation({
                        variables: {
                            inviteRequests: invites
                        }
                    });
                }}
                scrollableContent={true}
                defaultData={{
                    inviteRequests: [{ email: '', role: 'MEMBER' }, { email: '', role: 'MEMBER' }, { email: '', role: 'MEMBER' }]
                }}
                submitProps={submitProps}
                customFooter={footer}
                {...modalFormProps}
            >
                {!this.state.showLink && (
                    <XVertical justifyContent="center" alignItems="center">
                        <XVertical >
                            <XStoreContext.Consumer>
                                {(store) => {
                                    let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
                                    return (
                                        <>
                                            {invites.map((invite: Invite, i: number) => <InviteComponent key={i} index={i} invite={invite} single={invites.length === 1} handleRemove={(index) => this.handleRemove(index, store)} useRoles={this.props.useRoles} />)}

                                            < LinkButton text={TextInvites.addEmail} style="link" onClick={() => this.handleAdd(store)} alignSelf="flex-start" />
                                        </>
                                    );
                                }}
                            </XStoreContext.Consumer>

                            {!this.state.customTextAreaOpen && <XText><ComposeButton onClick={() => this.setState({ customTextAreaOpen: true })} >Compose a custom message</ComposeButton> to make your invites more personal</XText>}
                            {this.state.customTextAreaOpen && (
                                <XHorizontal>
                                    <XFormFieldGrow field="customText" title={TextInvites.customMessageTitle}>
                                        <XTextArea valueStoreKey="fields.customText" />
                                    </XFormFieldGrow>
                                    <XFormField field="" title="">
                                        <DeleteButton hide={false} icon="close" style="flat" onClick={() => this.setState({ customTextAreaOpen: false })} />
                                    </XFormField>
                                </XHorizontal>
                            )}

                            {!this.state.showInvitesHistory && <ShowInvitesHistory onClick={() => this.setState({ showInvitesHistory: true })} />}

                        </XVertical >
                    </XVertical >
                )}

                {this.state.showLink && !this.props.organization && <OwnerLink innerRef={this.handleLinkComponentRef} onBack={() => this.setState({ showLink: false })} />}
                {this.state.showLink && this.props.organization && <OwnerLinkOrganization innerRef={this.handleLinkComponentRef} onBack={() => this.setState({ showLink: false })} />}

                {this.state.showInvitesHistory && !this.state.showLink && (
                    <XHorizontal>
                        <InvitesHistoryGrow />
                        <DeleteButton hide={false} icon="close" style="flat" onClick={() => this.setState({ showInvitesHistory: false })} />
                    </XHorizontal>
                )}

            </XModalForm>
        );
    }
}

export const InvitesToOrganizationMoadal = withOrganizationInviteMembers((props) => {
    return (
        <InvitesMoadalRaw
            mutation={props.sendInvite}
            targetQuery={(props as any).targetQuery}
            target={(props as any).target}
            title={TextInvites.modalTitle}
            submitProps={{ text: TextInvites.modalAction }}
            organization={false}
        />
    );
}) as React.ComponentType<{ targetQuery?: string, target?: any, refetchVars?: { orgId: string } }>;

export const InvitesGlobalMoadal = withOrganizationInviteOrganization((props) => {
    return (
        <InvitesMoadalRaw
            mutation={props.sendInvite}
            targetQuery={(props as any).targetQuery}
            target={(props as any).target}
            title={TextInvites.modalGlobalTitle}
            submitProps={{ text: TextInvites.modalGloabalAction }}
            useRoles={false}
            organization={true}

        />
    );
}) as React.ComponentType<{ targetQuery?: string, target?: any, refetchVars?: { orgId: string } }>;