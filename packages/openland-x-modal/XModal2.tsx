import * as React from 'react';
import * as ReactModal from 'react-modal';
import Glamorous from 'glamorous';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { XVertical } from 'openland-x-layout/XVertical';
import { XButton } from 'openland-x/XButton';

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
                closeTimeoutMS={300}
                style={{
                    overlay: {
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
                        top: this.props.size !== 'x-large' ? 96 : 64,
                        left: this.props.size !== 'x-large' ? '50%' : 64,
                        right: this.props.size !== 'x-large' ? 'auto' : 64,
                        bottom: this.props.size !== 'x-large' ? 'auto' : 64,
                        transform: this.props.size !== 'x-large' ? 'translate(-50%, 0%)' : undefined,
                    }
                }}
            >
                {this.props.children}
            </ReactModal>
        );
    }
}

let Body = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 24,
    paddingRight: 24,
});

let Header = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    lineHeight: '64px',
    fontSize: '18px',
    fontWeight: 'bold'
});

let Footer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    justifyContent: 'flex-end',
    alignItems: 'center'
});

class ModalContentRender extends React.Component<{
    title?: string;
    heading?: any;
    body?: any;
    footer?: any;
}> {
    render() {
        return (
            <XVertical separator="none">
                <Header>Header</Header>
                <Body>
                    {this.props.children}
                </Body>
                <Footer><XButton text="Close" /></Footer>
            </XVertical>
        );
    }
}

export interface XModalProps {

    // Content
    title?: string;
    heading?: any;
    body?: any;
    footer?: any;

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
                        <ModalContentRender title={this.props.title} heading={this.props.heading} footer={this.props.footer} body={this.props.body}>
                            {this.props.children}
                        </ModalContentRender>
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
                                <ModalContentRender title={this.props.title} heading={this.props.heading} footer={this.props.footer} body={this.props.body}>
                                    {this.props.children}
                                </ModalContentRender>
                            </ModalRender>
                        );
                    }}
                </XRouterContext.Consumer>
            );
        } else if (this.props.isOpen !== undefined) {
            return (
                <ModalRender isOpen={this.props.isOpen} onCloseRequest={this.onModalCloseRequest} size={size}>
                    <ModalContentRender title={this.props.title} heading={this.props.heading} footer={this.props.footer} body={this.props.body}>
                        {this.props.children}
                    </ModalContentRender>
                </ModalRender>
            );
        } else {
            throw Error('You should provide show, targetQuery or target');
        }
    }
}