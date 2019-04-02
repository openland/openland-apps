import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { XInput } from 'openland-x/XInput';
import { XWithRouter } from 'openland-x-routing/withRouter';
import { withChannelnviteLink } from 'openland-web/api/withChannelnviteLink';
import { XMutation } from 'openland-x/XMutation';
import { XButton } from 'openland-x/XButton';

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
    color: '#1790ff',
});

const InviteText = Glamorous.div({
    fontSize: 12,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#99a2b0',
});

const LinkHolder = Glamorous(XVertical)({
    '& > div:first-child': {
        backgroundColor: '#f5f7f9',
        borderColor: 'transparent',
        color: '#5c6a81',
    },
});

class OwnerLinkComponent extends React.Component<
    { invite: string; isChannel: boolean } & XWithRouter
> {
    input?: any;

    handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    };

    copy = (e: any) => {
        if (this.input && this.input.inputRef) {
            this.input.inputRef.inputRef.select();
        }
        document.execCommand('copy');
    };

    render() {
        let invitePath = this.props.isChannel ? '/joinChannel/' : '/invite/';
        return (
            <XVertical width="100%" flexGrow={1} separator={2}>
                {this.props.invite && (
                    <LinkHolder separator={4}>
                        <XInput
                            size="large"
                            flexGrow={1}
                            ref={this.handleRef}
                            value={'https://openland.com' + invitePath + this.props.invite}
                        />
                        <InviteText>Anyone with link can join as group member</InviteText>
                    </LinkHolder>
                )}
            </XVertical>
        );
    }
}

type OwnerLinkT = { innerRef: any; variables: { roomId: string }; isChannel: boolean };

const OwnerLink = withChannelnviteLink(props => {
    const typedProps = props as typeof props & OwnerLinkT;
    return (
        <OwnerLinkComponent
            ref={typedProps.innerRef}
            invite={props.data.link}
            router={props.router}
            isChannel={typedProps.isChannel}
        />
    );
}) as React.ComponentType<OwnerLinkT>;

const RenewButton = Glamorous(XButton)({
    color: 'rgba(51,69,98, 0.45)',
    '&:hover': {
        color: '#1790ff',
    },
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
    borderTop: '1px solid rgba(220, 222, 228, 0.6)',
});

const RenewInviteLinkButton = withChannelnviteLink(props => (
    <XMutation mutation={props.renew}>
        <RenewButton text="Revoke link" style="link" />
    </XMutation>
)) as React.ComponentType<{
    variables: { roomId: string };
    refetchVars: { roomId: string };
}>;

interface InviteMembersModalRawProps {
    channelTitle?: string;
    roomId: string;
    isChannel: boolean;
}

export class InviteMembersModal extends React.Component<InviteMembersModalRawProps> {
    linkComponent?: any;

    constructor(props: any) {
        super(props);
    }

    handleLinkComponentRef = (ref: any) => {
        this.linkComponent = ref;
    };

    copyLink = () => {
        if (this.linkComponent) {
            this.linkComponent.copy();
        }
    };

    render() {
        let footer = (
            <FooterWrap>
                <XHorizontal alignItems="center">
                    <RenewInviteLinkButton
                        variables={{ roomId: this.props.roomId }}
                        refetchVars={{ roomId: this.props.roomId }}
                    />
                    <XFormSubmit successText="Copied!" key="link" style="primary" text="Copy" />
                </XHorizontal>
            </FooterWrap>
        );
        return (
            <XModalForm
                autoClose={1500}
                targetQuery="inviteByLink"
                defaultAction={async () => {
                    this.copyLink();
                }}
                title={
                    this.props.channelTitle === undefined
                        ? 'Invitation link'
                        : `Invite people to ${this.props.channelTitle}`
                }
                titleChildren={
                    this.props.channelTitle && <ChannelName>{this.props.channelTitle}</ChannelName>
                }
                useTopCloser={true}
                customFooter={footer}
            >
                <OwnerLink
                    innerRef={this.handleLinkComponentRef}
                    variables={{ roomId: this.props.roomId }}
                    isChannel={this.props.isChannel}
                />
            </XModalForm>
        );
    }
}
