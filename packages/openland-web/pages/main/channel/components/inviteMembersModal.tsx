import * as React from 'react';
import Glamorous from 'glamorous';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XModalCloser } from 'openland-x-modal/XModal';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput, XInputGroup } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { XLink, XLinkProps } from 'openland-x/XLink';
import PlusIcon from './icons/ic-add-small.svg';
import LinkIcon from './icons/ic-link.svg';
import EmailIcon from './icons/ic-email.svg';
import { withChanneSendlnviteLink } from '../../../../api/withChanneSendlnviteLink';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { withChannelnviteLink } from '../../../../api/withChannelnviteLink';
import { XMutation } from 'openland-x/XMutation';
import { XButton } from 'openland-x/XButton';
import CloseIcon from './icons/ic-close-1.svg';

const ChannelName = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 9,
    paddingRight: 9,
    height: 26,
    borderRadius: 16,
    backgroundColor: 'rgba(23, 144, 255, 0.08)',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.3,
    color: '#1790ff'
});

const InviteLinkField = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingLeft: 20,
    paddingRight: 20,
    height: 40,
    borderRadius: 24,
    backgroundColor: '#f5f7f9',
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#5c6a81'
});

const InviteText = Glamorous.div({
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#99a2b0'
});

const LinkHolder = Glamorous(XVertical)({
    '& > div:first-child': {
        backgroundColor: '#f5f7f9',
        borderColor: 'transparent',
        color: '#5c6a81'
    }
});

class OwnerLinkComponent extends React.Component<{ invite: string } & XWithRouter> {
    input?: any;

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
                            value={this.props.router.protocol + '://' + this.props.router.hostName + '/joinChannel/' + this.props.invite}
                        />
                        <InviteText>Anyone with the link will be able to join</InviteText>
                    </LinkHolder>
                )}
            </XVertical>
        );
    }
}

const OwnerLink = withChannelnviteLink((props) => {
    console.warn(props);
    return (
        <OwnerLinkComponent
            ref={(props as any).innerRef}
            invite={props.data.link}
            router={props.router}
        />
    );
}) as React.ComponentType<{ innerRef: any, variables: { channelId: string } }>;

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
    borderRadius: '0 10px 10px 0',
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
    <XHorizontal separator={2} alignItems="center" flexGrow={1} justifyContent="space-between">
        <XInputGroup flexGrow={1}>
            <XInput size="large" placeholder="Email" required={true} field={'inviteRequests.' + props.index + '.email'} />
            <XInput size="large" placeholder="First name" field={'inviteRequests.' + props.index + '.firstName'} />
            <XInput size="large" placeholder="Last name" field={'inviteRequests.' + props.index + '.lastName'} />
            {!props.single && (
                <RemoverInputGroup onClick={() => props.handleRemove(props.index)}>
                    <CloseIcon />
                </RemoverInputGroup>
            )}
        </XInputGroup>
    </XHorizontal>
);

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

const RenewButton = Glamorous(XButton)({
    color: 'rgba(51,69,98, 0.45)',
    '&:hover': {
        color: '#1790ff'
    }
});

const FooterWrap = Glamorous.div({
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

interface InvitesMoadalRawState {
    customTextAreaOpen?: boolean;
    showLink?: boolean;
}

const InviteButton = (props: XLinkProps & InviteButtonStylesProps) => (
    <InviteButtonStyles {...props}>
        {props.icon}
        <span>{props.title}</span>
    </InviteButtonStyles>
);

const RenewInviteLinkButton = withChannelnviteLink((props) => (
    <XMutation mutation={props.renew}><RenewButton text="Renew link" style="link" /></XMutation>
)) as React.ComponentType<{ variables: { channelId: string }, refetchVars: { channelId: string } }>;

class InviteMembersModalRaw extends React.Component<{ channelTitle: string, channelId: string, sendInviteMutation: any, target: any, orgId: string }, InvitesMoadalRawState> {
    linkComponent?: any;

    constructor(props: any) {
        super(props);

        this.state = {
            customTextAreaOpen: undefined,
            showLink: undefined
        };
    }

    handleLinkComponentRef = (ref: any) => {
        this.linkComponent = ref;
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

    copyLink = () => {
        if (this.linkComponent) {
            this.linkComponent.copy();
        }
    }

    render() {
        let footer = (
            <FooterWrap>
                <XHorizontal flexGrow={1}>
                    {!this.state.showLink && (
                        <InviteButton
                            onClick={() => this.setState({ showLink: true })}
                            title="Invite with a link"
                            icon={<LinkIcon />}
                            marginLeft={4}
                            marginRight={10}
                        />
                    )}
                    {this.state.showLink && (
                        <InviteButton
                            onClick={() => this.setState({ showLink: false })}
                            title="Invite by email"
                            icon={<EmailIcon />}
                            marginLeft={4}
                            marginRight={10}
                        />
                    )}
                </XHorizontal>
                {this.state.showLink && (
                    <XHorizontal alignItems="center">
                        <RenewInviteLinkButton variables={{ channelId: this.props.channelId }} refetchVars={{ channelId: this.props.channelId }} />
                        <XFormSubmit
                            succesText="Copied!"
                            key="link"
                            style="primary"
                            text="Copy"
                        />
                    </XHorizontal>
                )}
                {!this.state.showLink && (
                    <XFormSubmit
                        key="invites"
                        succesText="Invitations sent!"
                        style="primary"
                        text="Send invitations"
                        keyDownSubmit={true}
                    />
                )}
            </FooterWrap>
        );
        return (
            <XModalForm
                autoClose={1500}
                target={this.props.target}
                defaultAction={async (data) => {
                    if (!this.state.showLink) {
                        let invites = data.inviteRequests.filter((invite: any) => (
                            (invite.email || invite.firstName || invite.lastName))).map((invite: any) => (
                                {
                                    ...invite,
                                    emailText: this.state.customTextAreaOpen ? data.customText : null
                                }
                            ));
                        await this.props.sendInviteMutation({
                            variables: {
                                inviteRequests: invites,
                                channelId: this.props.channelId,
                            }
                        });
                    } else {
                        this.copyLink();
                    }
                }}
                title="Invite people to"
                titleChildren={<ChannelName>{this.props.channelTitle}</ChannelName>}
                useTopCloser={true}
                scrollableContent={true}
                size={this.state.showLink !== true ? 'large' : 'default'}
                customFooter={footer}
                defaultData={{
                    inviteRequests: [{ email: '' }, { email: '' }]
                }}
            >
                <XVertical>
                    {!this.state.showLink && (
                        <>
                            <XStoreContext.Consumer>
                                {(store) => {
                                    let invites = store ? store.readValue('fields.inviteRequests') || [] : [];
                                    return (
                                        <XVertical flexGrow={1} separator={11}>
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
                                            </XVertical>
                                            <AddButton
                                                onClick={() => this.handleAdd(store)}
                                                title="Add another"
                                            />
                                        </XVertical>
                                    );
                                }}
                            </XStoreContext.Consumer>
                            {!this.state.customTextAreaOpen && (
                                <AddButton
                                    onClick={() => this.setState({ customTextAreaOpen: true })}
                                    title="Add a custom message to make your invitations more personal"
                                />
                            )}
                            {this.state.customTextAreaOpen && (
                                <XHorizontal flexGrow={1} width="100%" separator={6}>
                                    <XTextArea
                                        flexGrow={1}
                                        valueStoreKey="fields.customText"
                                        resize={false}
                                        placeholder="Custom Message"
                                    />
                                    <XModalCloser onClick={() => this.setState({ customTextAreaOpen: false })} />
                                </XHorizontal>
                            )}
                        </>
                    )}
                    {this.state.showLink && (
                        <OwnerLink
                            innerRef={this.handleLinkComponentRef}
                            variables={{ channelId: this.props.channelId }}
                        />
                    )}
                </XVertical>
            </XModalForm>
        );
    }
}

export const InviteMembersModal = withChanneSendlnviteLink((props) => (
    <InviteMembersModalRaw channelTitle={(props as any).channelTitle} channelId={(props as any).channelId} sendInviteMutation={props.send} target={(props as any).target} orgId={(props as any).orgId}/>
)) as React.ComponentType<{ channelTitle: string, channelId: string, target: any, orgId: string }>;