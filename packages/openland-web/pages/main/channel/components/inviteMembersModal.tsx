import * as React from 'react';
import Glamorous from 'glamorous';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XModalCloser } from 'openland-x-modal/XModal';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormField, XFormFieldTitle } from 'openland-x-forms/XFormField';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput, XInputGroup } from 'openland-x/XInput';
import { XTextArea } from 'openland-x/XTextArea';
import { XButton } from 'openland-x/XButton';
import { XLink, XLinkProps } from 'openland-x/XLink';
import PlusIcon from './icons/ic-add-small.svg';
import LinkIcon from './icons/ic-link.svg';
import EmailIcon from './icons/ic-email.svg';

const ModalContentWrapper = Glamorous(XVertical)<{ bottomOfset?: boolean }>((props) => ({
    paddingBottom: props.bottomOfset ? 60 : undefined
}));

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
    <XHorizontal separator={2} alignItems="center" flexGrow={1} justifyContent="space-between">
        <XInputGroup flexGrow={1}>
            <XInput size="r-default" color="primary-sky-blue" placeholder="Email" required={true} field={'inviteRequests.' + props.index + '.email'} />
            <XInput size="r-default" color="primary-sky-blue" placeholder="First name" field={'inviteRequests.' + props.index + '.firstName'} />
            <XInput size="r-default" color="primary-sky-blue" placeholder="Last name" field={'inviteRequests.' + props.index + '.lastName'} />
        </XInputGroup>
        {!props.single && (
            <XModalCloser onClick={() => props.handleRemove(props.index)} />
        )}
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
    alignSelf: 'flex-start',
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

class InviteMembersModalRaw extends React.Component<XModalFormProps, InvitesMoadalRawState> {
    constructor(props: any) {
        super(props);

        this.state = {
            customTextAreaOpen: undefined,
            showLink: undefined
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
        let footer = (
            <FooterWrap>
                <XHorizontal flexGrow={1}>
                    {!this.state.showLink && (
                        <XWithRole role="admin" orgPermission={true}>
                            {!this.state.showLink && (
                                <InviteButton
                                    onClick={() => this.setState({ showLink: true })}
                                    title="Invite with a link"
                                    icon={<LinkIcon />}
                                    marginLeft={4}
                                    marginRight={10}
                                />
                            )}
                        </XWithRole>
                    )}
                    {this.state.showLink && (
                        <InviteButton
                            onClick={() => this.setState({ showLink: false })}
                            title="Invite by email"
                            icon={<EmailIcon />}
                        />
                    )}
                </XHorizontal>
                {/* {this.state.showLink && this.props.organization && (
                    <RenewGlobalInviteLinkButton />
                )}
                {this.state.showLink && !this.props.organization && (
                    <RenewInviteLinkButton />
                )}
                {this.state.showLink && (
                    <XFormSubmit key="link" style="primary" succesText={TextInvites.copied} {...submitProps} text={'Copy'} />
                )} */}
                {!this.state.showLink && (
                    <XFormSubmit
                        key="invites"
                        succesText="Invitations sent!"
                        style="primary-sky-blue"
                        size="r-default"
                        text="Send invitations"
                        keyDownSubmit={true}
                        // {...submitProps}
                    />
                )}
            </FooterWrap>
        );
        return (
            <XModalForm
                {...this.props}
                defaultAction={this.props.defaultAction}
                title="Invite members to"
                titleChildren={<ChannelName>Government incentives</ChannelName>}
                useTopCloser={true}
                scrollableContent={true}
                size="large"
                customFooter={footer}
                defaultData={{
                    inviteRequests: [{ email: '' }, { email: '' }]
                }}
            >
                <ModalContentWrapper bottomOfset={this.state.showLink !== true}>
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
                            <XFormField field="customText" title="Custom Message" flexGrow={1}>
                                <XTextArea flexGrow={1} valueStoreKey="fields.customText" resize={false} />
                            </XFormField>
                            <XModalCloser onClick={() => this.setState({ customTextAreaOpen: false })} />
                        </XHorizontal>
                    )}
                </ModalContentWrapper>
            </XModalForm>
        );
    }
}

export const InviteMembersModal = (props: XModalFormProps) => (
    <InviteMembersModalRaw {...props} />
);