import * as React from 'react';
import Glamorous from 'glamorous';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';
import { XVertical } from 'openland-x-layout/XVertical';
import { TextInvites } from 'openland-text/TextInvites';
import { XFormSubmit } from 'openland-x-forms/XFormSubmit';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { useClient } from 'openland-web/utils/useClient';

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
    borderTop: '1px solid rgba(220, 222, 228, 0.6)',
});

const ModalContentWrapper = Glamorous(XVertical)<{ bottomOfset?: boolean }>(props => ({
    paddingBottom: props.bottomOfset ? 60 : undefined,
}));

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

interface OwnerLinkComponentProps {
    invite?: {
        id: string;
        key: string;
        ttl: string | null;
    } | null;
    appInvite?: string | null;
    organization: boolean;
    isCommunity: boolean;
}

class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
    input?: any;
    constructor(props: any) {
        super(props);
    }

    handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    };

    copy = (e: any) => {
        if (this.input && this.input.inputRef && this.input.inputRef) {
            this.input.inputRef.inputRef.select();
        }
        document.execCommand('copy');
    };

    render() {
        return (
            <XVertical width="100%" flexGrow={1} separator={2}>
                {!!(this.props.invite || this.props.appInvite) && (
                    <LinkHolder separator={4}>
                        <XInput
                            size="large"
                            flexGrow={1}
                            ref={this.handleRef}
                            value={
                                'https://openland.com' +
                                (this.props.organization ? '/invite/' : '/join/') +
                                (this.props.appInvite || this.props.invite!.key)
                            }
                        />
                        <InviteText>
                            {!this.props.organization
                                ? this.props.isCommunity
                                    ? 'Anyone with link can join as community member'
                                    : 'Anyone with link can join as organization member'
                                : 'Anyone with link can join Openland'}
                        </InviteText>
                    </LinkHolder>
                )}
            </XVertical>
        );
    }
}

const OwnerLinkOrganization = (props => {
    const client = useClient();
    const data = client.useWithoutLoaderAccountAppInvite();

    if (!data) {
        return null;
    }

    return (
        <OwnerLinkComponent
            ref={(props as any).innerRef}
            appInvite={data ? data.invite : null}
            organization={true}
            isCommunity={false}
        />
    );
}) as React.ComponentType<{ onBack: () => void; innerRef: any }>;

interface InvitesModalRawProps {
    organizationId: string;
    isMobile: boolean;
}

interface InvitesModalRawState {
    customTextAreaOpen?: boolean;
    showLink?: boolean;
}

class InvitesModalRaw extends React.Component<
    InvitesModalRawProps & Partial<XModalFormProps>,
    InvitesModalRawState
> {
    linkComponent?: any;
    constructor(props: any) {
        super(props);
        this.state = { showLink: true };
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
        let { submitProps, isMobile, ...modalFormProps } = this.props;

        let footer = (
            <FooterWrap>
                <XFormSubmit
                    key="link"
                    style="primary"
                    successText={TextInvites.copied}
                    {...submitProps}
                    text={'Copy'}
                />
            </FooterWrap>
        );
        return (
            <XModalForm
                autoClose={1500}
                useTopCloser={true}
                flexGrow={isMobile ? 1 : undefined}
                maxHeight={isMobile ? '100%' : undefined}
                defaultAction={async () => {
                    this.copyLink();
                }}
                scrollableContent={true}
                submitProps={submitProps}
                customFooter={footer}
                {...modalFormProps}
            >
                <ModalContentWrapper alignItems="center">
                    <OwnerLinkOrganization
                        innerRef={this.handleLinkComponentRef}
                        onBack={() => this.setState({ showLink: false })}
                    />
                </ModalContentWrapper>
            </XModalForm>
        );
    }
}

type InvitesGlobalModalProps = {
    targetQuery?: string;
    target?: any;
};

export const InvitesGlobalModal = (props: InvitesGlobalModalProps) => {
    const { targetQuery, target } = props as typeof props & InvitesGlobalModalProps;
    const isMobile = React.useContext(IsMobileContext);

    return (
        <InvitesModalRaw
            organizationId={'primary'}
            targetQuery={targetQuery}
            target={target}
            isMobile={isMobile}
            title={TextInvites.modalGlobalTitle}
            submitProps={{ text: TextInvites.modalGloabalAction }}
        />
    );
};
