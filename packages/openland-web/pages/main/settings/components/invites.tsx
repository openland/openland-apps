import * as React from 'react';
import { css } from 'linaria';
import { XView } from 'react-mental';
import { XModalForm, XModalFormProps } from 'openland-x-modal/XModalForm2';
import { XInput } from 'openland-x/XInput';
import { XVertical } from 'openland-x-layout/XVertical';
import { TextInvites } from 'openland-text/TextInvites';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { useClient } from 'openland-web/utils/useClient';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import CheckIcon from 'openland-icons/ic-check.svg';

const InputClassName = css`
    border-radius: 8px !important;
    background: #f2f3f4 !important;
    border: none !important;
    &:focus-within {
        border: none !important;
        box-shadow: none !important;
    }
`;

const CopyIconClassName = css`
    & path:last-child {
        fill: #a2d2ff !important;
    }
`;

interface OwnerLinkComponentProps {
    appInvite: string | null;
}

class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
    input?: any;
    timer: any;

    state = {
        copied: false,
    };

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    private handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    };

    private copy = (e: any) => {
        if (this.input && this.input.inputRef) {
            this.input.inputRef.inputRef.select();
        }
        document.execCommand('copy');
        this.setState({
            copied: true,
        });

        this.timer = setTimeout(() => {
            this.setState({
                copied: false,
            });
        }, 1500);
    };

    render() {
        const { copied } = this.state;
        return (
            <XVertical width="100%" flexGrow={1} separator={2}>
                {this.props.appInvite && (
                    <XView flexDirection="column">
                        <XView flexDirection="row" alignItems="center">
                            <XView flexDirection="row" alignItems="center" flexGrow={1}>
                                <XInput
                                    size="large"
                                    flexGrow={1}
                                    ref={this.handleRef}
                                    className={InputClassName}
                                    value={'https://openland.com/invite/' + this.props.appInvite}
                                />
                            </XView>
                            <XView
                                height={40}
                                borderRadius={8}
                                paddingLeft={14}
                                paddingRight={14}
                                flexDirection="row"
                                alignItems="center"
                                fontSize={14}
                                fontWeight="600"
                                backgroundColor={copied ? '#69d06d' : '#1790ff'}
                                color="#ffffff"
                                cursor="pointer"
                                onClick={this.copy}
                                marginLeft={12}
                            >
                                {copied ? (
                                    <CheckIcon />
                                ) : (
                                    <CopiedIcon className={CopyIconClassName} />
                                )}
                                <XView marginLeft={10}>{copied ? 'Copied' : 'Copy'}</XView>
                            </XView>
                        </XView>
                        <XView
                            fontSize={12}
                            color="rgba(0, 0, 0, 0.5)"
                            marginLeft={16}
                            marginBottom={8}
                        >
                            Anyone can use this link to join Openland
                        </XView>
                    </XView>
                )}
            </XVertical>
        );
    }
}

const OwnerLinkOrganization = () => {
    const client = useClient();
    const data = client.useWithoutLoaderAccountAppInvite();

    if (!data) {
        return null;
    }

    return <OwnerLinkComponent appInvite={data ? data.invite : null} />;
};

interface InvitesModalRawProps {
    organizationId: string;
    isMobile: boolean;
}

class InvitesModalRaw extends React.Component<InvitesModalRawProps & Partial<XModalFormProps>> {
    render() {
        let { submitProps, isMobile, ...modalFormProps } = this.props;
        return (
            <XModalForm
                autoClose={1500}
                useTopCloser={true}
                flexGrow={isMobile ? 1 : undefined}
                maxHeight={isMobile ? '100%' : undefined}
                defaultAction={async () => null}
                scrollableContent={true}
                submitProps={submitProps}
                customFooter={null}
                {...modalFormProps}
            >
                <XVertical alignItems="center">
                    <OwnerLinkOrganization />
                </XVertical>
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
