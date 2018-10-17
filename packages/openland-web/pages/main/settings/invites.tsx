
import * as React from 'react';
import Glamorous from 'glamorous';
import { withOrganizationInviteMembers } from '../../../api/withOrganizationInviteMember';
import { withOrganizationInviteOrganization } from '../../../api/withOrganizationInviteOrganization';
import { withPublicInviteOrganization } from '../../../api/withPublicInviteOrganization';
import { withPublicInvite } from '../../../api/withPublicInvite';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XModalCloser } from 'openland-x-modal/XModal';
import { XInput, XInputGroup } from 'openland-x/XInput';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormField } from 'openland-x-forms/XFormField';
import { XSelect } from 'openland-x/XSelect';
import { XButton } from 'openland-x/XButton';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XTextArea } from 'openland-x/XTextArea';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XMutation } from 'openland-x/XMutation';
import { withRouter, XWithRouter } from 'openland-x-routing/withRouter';
import { TextInvites } from 'openland-text/TextInvites';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import PlusIcon from './icons/ic-add-small.svg';
import LinkIcon from './icons/ic-link.svg';
import EmailIcon from './icons/ic-email.svg';
import CloseIcon from './icons/ic-close-1.svg';

const AddButtonStyled = Glamorous(XLink)({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.4,
    color: '#5c6a81',
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    '&:hover': {
        color: '#99a2b0'
    },
    '& > svg': {
        marginRight: 10,
        marginLeft: 4
    }
});

interface InviteButtonStylesProps {
    marginRight?: number;
    marginLeft?: number;
    icon?: any;
    title: string;
}

const InviteButtonStyles = Glamorous(XLink)<InviteButtonStylesProps>(props => ({
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.4,
    color: '#99a2b0',
    display: 'flex',
    alignItems: 'center',
    '&:hover': {
        color: '#5c6a81',
    },
    '& > svg': {
        marginRight: props.marginRight,
        marginLeft: props.marginLeft
    }
}));

const AddButton = (props: XLinkProps & { title: string }) => (
    <AddButtonStyled {...props}>
        <PlusIcon />
        <span>{props.title}</span>
    </AddButtonStyled>
);

const InviteButton = (props: XLinkProps & InviteButtonStylesProps) => (
    <InviteButtonStyles {...props}>
        {props.icon}
        <span>{props.title}</span>
    </InviteButtonStyles>
);

export const FooterWrap = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    borderTop: '1px solid rgba(220, 222, 228, 0.6)'
});

const ModalContentWrapper = Glamorous(XVertical)<{ bottomOfset?: boolean }>((props) => ({
    paddingBottom: props.bottomOfset ? 60 : undefined
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

const InviteText = Glamorous.div({
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#99a2b0'
});

const RemoverInputGroup = Glamorous.div({
    width: 40,
    height: 40,
    flexShrink: 0,
    flex: 'initial',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: '1px solid rgba(220, 222, 228, 0.6)',
    borderLeft: 'none',
    borderRadius: '0 20px 20px 0',
    paddingRight: 1,
    background: 'rgba(239, 240, 243, 0.2)',
    cursor: 'pointer',
    zIndex: 1,

    '&:hover': {
        background: '#fdf6f6',

        '& svg *': {
            fill: 'rgba(215, 84, 85, 0.5)'
        }
    }
});

const InviteComponent = (props: InviteComponentProps) => (
    <XHorizontal separator={6} alignItems="center" flexGrow={1}>
        <XInputGroup flexGrow={1}>
            <XInput size="large" autofocus={props.first} required={true} placeholder={TextInvites.emailInputPlaceholder} field={'inviteRequests.' + props.index + '.email'} flexGrow={1} />
            <XInput size="large" placeholder={TextInvites.firstNamePlaceholder} field={'inviteRequests.' + props.index + '.firstName'} flexGrow={1} />
            <XInput size="large" placeholder={TextInvites.lastNamePlaceholder} field={'inviteRequests.' + props.index + '.lastName'} flexGrow={1} />

            {props.useRoles !== false &&
                <XWithRole role="super-admin">
                    <XSelect
                        attach="both"
                        rounded={true}
                        field={'inviteRequests.' + props.index + '.role'}
                        searchable={false}
                        clearable={false}
                        options={[{ label: 'Owner', value: 'OWNER' }, { label: 'Member', value: 'MEMBER' }]}
                    />
                </XWithRole>
            }

            {!props.single && (
                <RemoverInputGroup onClick={() => props.handleRemove(props.index)}>
                    <CloseIcon />
                </RemoverInputGroup>
            )}
        </XInputGroup>
    </XHorizontal>
);

const LinkHolder = Glamorous(XVertical)({
    '& > div:first-child': {
        backgroundColor: '#f5f7f9',
        borderColor: 'transparent',
        color: '#5c6a81'
    }
});

interface OwnerLinkComponentProps {
    invite: {
        id: string,
        key: string,
        ttl: string | null
    } | null;
    createMutation: any;
    deleteMutation: any;
    organization: boolean;
}

class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps & XWithRouter> {
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
            <XVertical width="100%" flexGrow={1} separator={2}>
                {this.props.invite && (
                    <LinkHolder separator={4}>
                        <XInput
                            size="large"
                            flexGrow={1}
                            ref={this.handleRef}
                            value={this.props.router.protocol + '://' + this.props.router.hostName + (this.props.organization ? '/invite/' : '/join/') + this.props.invite.key}
                        />
                        <InviteText>Anyone with the link will be able to join</InviteText>
                    </LinkHolder>
                )}
            </XVertical>
        );
    }
}

const RenewButton = Glamorous(XButton)({
    color: 'rgba(51,69,98, 0.45)'
});

const RenewInviteLinkButton = withPublicInvite((props) => (
    <XMutation mutation={props.createPublicInvite}><RenewButton text="Renew link" style="link" /></XMutation>
));

const RenewGlobalInviteLinkButton = withPublicInviteOrganization((props) => (
    <XMutation mutation={props.createPublicInvite}><RenewButton text="Renew link" style="link" /></XMutation>
));

const OwnerLink = withPublicInvite(withRouter((props) => (
    <OwnerLinkComponent ref={(props as any).innerRef} router={props.router} invite={props.data ? props.data.publicInvite : null} organization={false} createMutation={props.createPublicInvite} deleteMutation={props.deletePublicInvite} />
))) as React.ComponentType<{ onBack: () => void, innerRef: any }>;

const OwnerLinkOrganization = withPublicInviteOrganization(withRouter((props) => (
    <OwnerLinkComponent ref={(props as any).innerRef} router={props.router} invite={props.data ? props.data.publicInvite : null} organization={true} createMutation={props.createPublicInvite} deleteMutation={props.deletePublicInvite} />
))) as React.ComponentType<{ onBack: () => void, innerRef: any }>;

interface InvitesModalRawProps {
    mutation: any;
    useRoles?: boolean;
    organization: boolean;
}

interface InvitesModalRawState {
    customTextAreaOpen?: boolean;
    showLink?: boolean;
}

class InvitesModalRaw extends React.Component<InvitesModalRawProps & Partial<XModalFormProps>, InvitesModalRawState> {
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
            this.linkComponent.copy();
        }
    }

    render() {
        let { mutation, submitProps, ...modalFormProps } = this.props;
        let footer = (
            <FooterWrap>
                <XHorizontal flexGrow={1}>
                    {!this.state.showLink && (
                        <XWithRole role="admin" orgPermission={'primary'}>
                            <InviteButton
                                onClick={() => this.setState({ showLink: true })}
                                icon={<LinkIcon />}
                                title={TextInvites.getLinkButtonLinkExists}
                                marginLeft={4}
                                marginRight={10}
                            />
                        </XWithRole>
                    )}
                    {this.state.showLink && (
                        <InviteButton
                            onClick={() => this.setState({ showLink: false })}
                            icon={<EmailIcon />}
                            marginLeft={4}
                            marginRight={10}
                            title={TextInvites.backToEmailInvites}
                        />
                    )}
                </XHorizontal>
                {this.state.showLink && this.props.organization && (
                    <RenewGlobalInviteLinkButton />
                )}
                {this.state.showLink && !this.props.organization && (
                    <RenewInviteLinkButton />
                )}
                {this.state.showLink && (
                    <XFormSubmit
                        key="link"
                        style="primary"
                        succesText={TextInvites.copied}
                        {...submitProps}
                        text={'Copy'}
                    />
                )}
                {!this.state.showLink && (
                    <XFormSubmit
                        key="invites"
                        succesText="Invitations sent!"
                        style="primary"
                        keyDownSubmit={true}
                        {...submitProps}
                    />
                )}
            </FooterWrap>
        );
        return (
            <XModalForm
                autoClose={1500}
                useTopCloser={true}
                size={this.state.showLink !== true ? 'large' : 'default'}
                defaultAction={async (data) => {
                    if (!this.state.showLink) {
                        let invites = data.inviteRequests.filter((invite: any) => (
                            (invite.email || invite.firstName || invite.lastName))).map((invite: any) => (
                                {
                                    ...invite,
                                    role: this.props.useRoles !== false ? invite.role : undefined,
                                    emailText: this.state.customTextAreaOpen ? data.customText : null
                                }
                            ));
                        await this.props.mutation({
                            variables: {
                                inviteRequests: invites
                            }
                        });
                    } else {
                        this.copyLink();
                    }
                }}
                scrollableContent={true}
                defaultData={{
                    inviteRequests: [{ email: '', role: 'MEMBER' }, { email: '', role: 'MEMBER' }]
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
                                            <XVertical separator={8}>
                                                {invites.map((invite: Invite, i: number) => (
                                                    <InviteComponent
                                                        first={i === 0}
                                                        key={i}
                                                        index={i}
                                                        invite={invite}
                                                        single={invites.length === 1}
                                                        handleRemove={(index) => this.handleRemove(index, store)}
                                                        useRoles={this.props.useRoles}
                                                    />
                                                ))}
                                            </XVertical>
                                            <AddButton
                                                onClick={() => this.handleAdd(store)}
                                                title={TextInvites.addEmail}
                                            />
                                        </XVertical>
                                    );
                                }}
                            </XStoreContext.Consumer>
                            {!this.state.customTextAreaOpen && (
                                <AddButton
                                    onClick={() => this.setState({ customTextAreaOpen: true })}
                                    title={TextInvites.customMessageButton}
                                />
                            )}
                            {this.state.customTextAreaOpen && (
                                <XHorizontal flexGrow={1} width="100%" separator={6}>
                                    <XFormField field="customText" title={TextInvites.customMessageTitle} flexGrow={1}>
                                        <XTextArea flexGrow={1} valueStoreKey="fields.customText" resize={false} />
                                    </XFormField>
                                    <XModalCloser onClick={() => this.setState({ customTextAreaOpen: false })} />
                                </XHorizontal>
                            )}
                        </XVertical>
                    )}
                    {this.state.showLink && !this.props.organization && (
                        <OwnerLink
                            innerRef={this.handleLinkComponentRef}
                            onBack={() => this.setState({ showLink: false })}
                        />
                    )}
                    {this.state.showLink && this.props.organization && (
                        <OwnerLinkOrganization
                            innerRef={this.handleLinkComponentRef}
                            onBack={() => this.setState({ showLink: false })}
                        />
                    )}
                </ModalContentWrapper>
            </XModalForm>
        );
    }
}

export const InvitesToOrganizationModal = withOrganizationInviteMembers((props) => (
    <InvitesModalRaw
        mutation={props.sendInvite}
        targetQuery={(props as any).targetQuery}
        target={(props as any).target}
        title={TextInvites.modalTitle}
        submitProps={{ text: TextInvites.modalAction }}
        organization={false}
    />
)) as React.ComponentType<{ targetQuery?: string, target?: any, refetchVars?: { orgId: string } }>;

export const InvitesGlobalModal = withOrganizationInviteOrganization((props) => (
    <InvitesModalRaw
        mutation={props.sendInvite}
        targetQuery={(props as any).targetQuery}
        target={(props as any).target}
        title={TextInvites.modalGlobalTitle}
        submitProps={{ text: TextInvites.modalGloabalAction }}
        useRoles={false}
        organization={true}

    />
)) as React.ComponentType<{ targetQuery?: string, target?: any, refetchVars?: { orgId: string } }>;