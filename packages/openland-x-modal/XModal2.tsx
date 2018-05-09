import * as React from 'react';
import * as ReactModal from 'react-modal';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';

class ModalRender extends React.PureComponent<{ size: 'x-large' | 'large' | 'default' | 'small', isOpen: boolean, onCloseRequest: () => void; }> {

    render() {

        let width = 560;
        if (this.props.size === 'large') {
            width = 940;
        } else if (this.props.size === 'small') {
            width = 460;
        }

        return (
            <ReactModal
                isOpen={this.props.isOpen === true}
                onRequestClose={this.props.onCloseRequest}
                shouldCloseOnOverlayClick={true}
                shouldCloseOnEsc={true}
                ariaHideApp={false}
                style={{
                    overlay: {
                        // animationName: `${this.state.isHiding ? hideAnimation : showAnimation}`,
                        // animationTimingFunction: `${this.state.isHiding ? 'cubic-bezier(0.25, 0.8, 0.25, 1)' : 'cubic-bezier(0.55, 0, 0.55, 0.2)'}`,
                        // animationDuration: '0.2s',
                        // animationFillMode: 'forwards',
                        zIndex: 100,
                        backgroundColor: (this.props.size !== 'x-large' && this.props.size !== 'large') ? 'rgba(0, 0, 0, 0.4)' : 'rgba(0, 0, 0, 0.3)'
                    },
                    content: {
                        display: 'block',
                        background: '#ffffff',
                        margin: 'auto',
                        padding: 0,

                        // Border/shadow
                        border: 'none',
                        boxShadow: '0px 2px 2px 0px #777',
                        borderRadius: 6,

                        // Sizes
                        width: this.props.size !== 'x-large' ? width : 'calc(100% - 128px)',
                        top: this.props.size !== 'x-large' ? '50%' : 64,
                        left: this.props.size !== 'x-large' ? '50%' : 64,
                        right: this.props.size !== 'x-large' ? 'auto' : 64,
                        bottom: this.props.size !== 'x-large' ? 'auto' : 64,
                        transform: this.props.size !== 'x-large' ? 'translate(-50%, -50%)' : undefined,
                    }
                }}
            >
                {this.props.children}
            </ReactModal>
        );
    }
}

export interface XModalProps {

    // Content
    title?: string;

    // Style
    size?: 'x-large' | 'large' | 'default' | 'small';

    // Controlled/Uncontrolled
    isOpen?: boolean;
    onClosed?: () => void;

    // Target
    target?: React.ReactElement<any>;
    targetQuery?: string;
}

export class XModal extends React.PureComponent<XModalProps, { isOpen: boolean }> {

    // TODO: Better perissting of router
    lastRouter: XRouter | undefined;

    constructor(props: XModalProps) {
        super(props);
        this.state = { isOpen: false };
    }

    onTargetClick = () => {
        this.setState((state) => ({ isOpen: true }));
    }

    onModalCloseRequest = () => {
        if (this.props.onClosed) {
            this.props.onClosed();
        }
        if (this.props.target) {
            this.setState((state) => ({ isOpen: false }));
        } else if (this.props.targetQuery) {
            if (this.lastRouter) {
                this.lastRouter!!.pushQuery(this.props.targetQuery!!);
            }
        }
    }

    render() {
        let size = this.props.size || 'default';
        if (this.props.target) {
            let TargetClone = React.cloneElement(this.props.target, { onClick: this.onTargetClick });
            return (
                <>
                    {TargetClone}
                    <ModalRender isOpen={this.state.isOpen} onCloseRequest={this.onModalCloseRequest} size={size}>
                        {this.props.children}
                    </ModalRender>
                </>
            );
        } else if (this.props.targetQuery) {
            let q = this.props.targetQuery;
            return (
                <XRouterContext.Consumer>
                    {(router) => {
                        this.lastRouter = router;
                        return (
                            <ModalRender isOpen={!!router!!.query[q]} onCloseRequest={this.onModalCloseRequest} size={size}>
                                {this.props.children}
                            </ModalRender>
                        );
                    }}
                </XRouterContext.Consumer>
            );
        } else if (this.props.isOpen !== undefined) {
            return (
                <ModalRender isOpen={this.props.isOpen} onCloseRequest={this.onModalCloseRequest} size={size}>
                    {this.props.children}
                </ModalRender>
            );
        } else {
            throw Error('You should provide show, targetQuery or target');
        }
    }
}