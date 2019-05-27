import * as React from 'react';
import { XView } from 'react-mental';
import CopiedIcon from 'openland-icons/ic-content-copy.svg';
import CheckIcon from 'openland-icons/ic-check.svg';
import { css } from 'linaria';
import { XVertical } from 'openland-x-layout/XVertical';
import { XInput } from 'openland-x/XInput';

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
    onCopied?: () => void;
    footerNote?: string;
}

export class OwnerLinkComponent extends React.Component<OwnerLinkComponentProps> {
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
            if (this.props.onCopied) {
                this.props.onCopied();
            }
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
                        {this.props.footerNote && (
                            <XView
                                fontSize={12}
                                color="rgba(0, 0, 0, 0.5)"
                                marginLeft={16}
                                marginBottom={3}
                                marginTop={5}
                            >
                                {this.props.footerNote}
                            </XView>
                        )}
                    </XView>
                )}
            </XVertical>
        );
    }
}
