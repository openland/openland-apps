
import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormField, XFormFieldTitle } from 'openland-x-forms/XFormField';
import { XSelect } from 'openland-x/XSelect';
import { XButton } from 'openland-x/XButton';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';
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

const ModalContentWrapper = Glamorous(XVertical)({
    paddingBottom: 60
});

interface Invite {
    email?: string;
    firstName?: string;
    lastName?: string;
    role?: 'OWNER' | 'MEMBER';
}

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

const LinkButton = Glamorous(XLink)<{ primary?: boolean }>((props) => ({
    fontSize: 15,
    letterSpacing: -0.2,
    color: props.primary ? '#654bfa' : 'rgba(51, 69, 98, 0.4)',
    '&:hover': {
        textDecoration: props.primary ? 'underline' : undefined
    }
}));

const FlexStart = Glamorous.div({
    alignSelf: 'flex-start'
});

export const FooterWrap = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 54,
    justifyContent: 'flex-start',
    alignItems: 'center',
    borderTop: '1px solid rgba(220, 222, 228, 0.6)'
});

const Separator = Glamorous.div({
    height: 1,
    width: '100%',
    backgroundColor: 'rgba(220, 222, 228, 0.45)',
    marginTop: '60px !important',
    marginBottom: '18px !important'
});

interface InviteComponentProps {
    index: number;
    invite: Invite;
    single: boolean;
    handleRemove: (index: number) => void;
    useRoles?: boolean;
}

const RoleSelectWrapper = Glamorous(XHorizontal)({
    '& > div': {
        width: '100%'
    }
});

const InviteComponent = (props: InviteComponentProps) => (
    <XHorizontal separator={6} alignItems="center" flexGrow={1}>
        <XInput placeholder={TextInvites.firstNamePlaceholder} field={'inviteRequests.' + props.index + '.firstName'} flexGrow={1} />
        <XInput placeholder={TextInvites.lastNamePlaceholder} field={'inviteRequests.' + props.index + '.lastName'} flexGrow={1} />
        <XInput placeholder={TextInvites.emailInputPlaceholder} field={'inviteRequests.' + props.index + '.email'} flexGrow={1} />
        {props.useRoles !== false &&
            <RoleSelectWrapper width={126}>
                <XWithRole role="super-admin">
                    <XSelect field={'inviteRequests.' + props.index + '.role'} searchable={false} clearable={false} options={[{ label: 'Owner', value: 'OWNER' }, { label: 'Member', value: 'MEMBER' }]} />
                </XWithRole>
            </RoleSelectWrapper>
        }
        <DeleteButton hide={props.single} enabled={!props.single} icon="close" style="flat" onClick={() => props.handleRemove(props.index)} />
    </XHorizontal>
);

const LinkContianer = Glamorous(XVertical)({
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

const RenewInviteLinkButton = withPublicInvite((props) => (
    <XMutation mutation={props.createPublicInvite}><XButton text="Renew link" style="link" /></XMutation>
));

const RenewGlobalInviteLinkButton = withPublicInviteOrganization((props) => (
    <XMutation mutation={props.createPublicInvite}><XButton text="Renew link" style="link" /></XMutation>
));

const OwnerLink = withPublicInvite(withRouter((props) => (
    <OwnerLinkComponent ref={(props as any).innerRef} router={props.router} invite={props.data ? props.data.publicInvite : null} createMutation={props.createPublicInvite} deleteMutation={props.deletePublicInvite} />
))) as React.ComponentType<{ onBack: () => void, innerRef: any }>;

const OwnerLinkOrganization = withPublicInviteOrganization(withRouter((props) => (
    <OwnerLinkComponent ref={(props as any).innerRef} router={props.router} invite={props.data ? props.data.publicInvite : null} createMutation={props.createPublicInvite} deleteMutation={props.deletePublicInvite} />
))) as React.ComponentType<{ onBack: () => void, innerRef: any }>;

const ShowInvitesHistory = withInvitesHistory((props) => (
        (props.data && props.data.invites || []).length > 0 ? (
            <FlexStart>
                <LinkButton onClick={(props as any).onClick}>{TextInvites.showHistory}</LinkButton>
            </FlexStart>
        ) : null
)) as React.ComponentType<{ onClick?: () => void }>;

interface InvitesMoadalRawProps {
    mutation: any;
    useRoles?: boolean;
    organization: boolean;
}

interface InvitesMoadalRawState {
    customText?: string;
    customTextAreaOpen?: boolean;
    showLink?: boolean;
    showInvitesHistory?: boolean;
}

class InvitesMoadalRaw extends React.Component<InvitesMoadalRawProps & Partial<XModalFormProps>, InvitesMoadalRawState> {
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
                            {!this.state.showLink && <LinkButton primary={true} onClick={() => this.setState({ showLink: true })}>{TextInvites.getLinkButtonLinkExists}</LinkButton>}
                        </XWithRole>
                    )}
                    {this.state.showLink && (
                        <LinkButton primary={true} onClick={() => this.setState({ showLink: false })}>{TextInvites.backToEmailInvites}</LinkButton>
                    )}
                </XHorizontal>
                {this.state.showLink && this.props.organization && (
                    <RenewGlobalInviteLinkButton />
                )}
                {this.state.showLink && !this.props.organization && (
                    <RenewInviteLinkButton />
                )}
                {this.state.showLink && (
                    <XButton style={'primary'} text={'Copy'} onClick={this.copyLink} autoClose={true} />
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
                <ModalContentWrapper alignItems="center">
                    {!this.state.showLink && (
                        <XVertical flexGrow={1} width={'100%'}>
                            <XStoreContext.Consumer>
                                {(store) => {
                                    let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
                                    return (
                                        <XVertical separator={8}>
                                            <XVertical separator={6}>
                                                {invites.map((invite: Invite, i: number) => (
                                                    <InviteComponent key={i} index={i} invite={invite} single={invites.length === 1} handleRemove={(index) => this.handleRemove(index, store)} useRoles={this.props.useRoles} />
                                                ))}
                                            </XVertical>
                                            <FlexStart>
                                                <LinkButton onClick={() => this.handleAdd(store)}>{TextInvites.addEmail}</LinkButton>
                                            </FlexStart>
                                        </XVertical>
                                    );
                                }}
                            </XStoreContext.Consumer>
                            <Separator />
                            {!this.state.customTextAreaOpen && (
                                <FlexStart>
                                    <LinkButton onClick={() => this.setState({ customTextAreaOpen: true })}>
                                        Compose a custom message to make your invites more personal
                                    </LinkButton>
                                </FlexStart>
                            )}
                            {this.state.customTextAreaOpen && (
                                <XHorizontal flexGrow={1} width="100%" separator={6}>
                                    <XFormField field="customText" title={TextInvites.customMessageTitle} flexGrow={1}>
                                        <XTextArea flexGrow={1} valueStoreKey="fields.customText" resize={false} />
                                    </XFormField>
                                    <XFormField field="" title="">
                                        <DeleteButton hide={false} icon="close" style="flat" onClick={() => this.setState({ customTextAreaOpen: false })} />
                                    </XFormField>
                                </XHorizontal>
                            )}

                            {!this.state.showInvitesHistory && <ShowInvitesHistory onClick={() => this.setState({ showInvitesHistory: true })} />}
                        </XVertical>
                    )}

                    {this.state.showLink && !this.props.organization && <OwnerLink innerRef={this.handleLinkComponentRef} onBack={() => this.setState({ showLink: false })} />}
                    {this.state.showLink && this.props.organization && <OwnerLinkOrganization innerRef={this.handleLinkComponentRef} onBack={() => this.setState({ showLink: false })} />}

                    {this.state.showInvitesHistory && !this.state.showLink && (
                        <XVertical flexGrow={1} width="100%" separator={2}>
                            <XHorizontal justifyContent="space-between" alignItems="center">
                                <XFormFieldTitle>Invitations history</XFormFieldTitle>
                                <DeleteButton hide={false} icon="close" style="flat" onClick={() => this.setState({ showInvitesHistory: false })} />
                            </XHorizontal>
                            <InvitesHistory />
                        </XVertical>
                    )}
                </ModalContentWrapper>
            </XModalForm>
        );
    }
}

export const InvitesToOrganizationMoadal = withOrganizationInviteMembers((props) => (
    <InvitesMoadalRaw
        mutation={props.sendInvite}
        targetQuery={(props as any).targetQuery}
        target={(props as any).target}
        title={TextInvites.modalTitle}
        submitProps={{ text: TextInvites.modalAction }}
        organization={false}
    />
)) as React.ComponentType<{ targetQuery?: string, target?: any, refetchVars?: { orgId: string } }>;

export const InvitesGlobalMoadal = withOrganizationInviteOrganization((props) => (
    <InvitesMoadalRaw
        mutation={props.sendInvite}
        targetQuery={(props as any).targetQuery}
        target={(props as any).target}
        title={TextInvites.modalGlobalTitle}
        submitProps={{ text: TextInvites.modalGloabalAction }}
        useRoles={false}
        organization={true}

    />
)) as React.ComponentType<{ targetQuery?: string, target?: any, refetchVars?: { orgId: string } }>;