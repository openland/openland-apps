import * as React from 'react';
import * as ReactModal from 'react-modal';
import Glamorous from 'glamorous';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { XButton } from 'openland-x/XButton';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XModalContext } from './XModalContext';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import CloseIcon from './ic-close.svg';

interface ModalRenderProps {
    size: 'x-large' | 's-large' | 'large' | 'default' | 'small';
    sWidth?: number;
    scrollableContent?: boolean;
    isOpen: boolean;
    closeOnClick?: boolean;
    onCloseRequest: () => void;
    transparent?: boolean;
}

class ModalRender extends React.PureComponent<ModalRenderProps> {
    render() {
        let width = 570;
        if (this.props.sWidth !== undefined) {
            width = this.props.sWidth;
        } else if (this.props.size === 'large') {
            width = 870;
        } else if (this.props.size === 's-large') {
            width = 1200;
        } else if (this.props.size === 'small') {
            width = 460;
        }

        return (
            <ReactModal
                isOpen={this.props.isOpen === true}
                onRequestClose={this.props.onCloseRequest}
                shouldCloseOnOverlayClick={this.props.closeOnClick !== undefined ? this.props.closeOnClick : true}
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
                        background: this.props.transparent ? 'transparent' : '#ffffff',
                        margin: 'auto',
                        padding: 0,
                        overflow: 'visible',

                        // Border/shadow
                        border: 'none',
                        boxShadow: this.props.transparent ? 'none' : '0px 2px 2px 0px #777',
                        borderRadius: 6,

                        // Sizes
                        width: this.props.size !== 'x-large' ? width : 'calc(100% - 128px)',
                        top: (this.props.size !== 'x-large' && !this.props.scrollableContent) ? 96 : 64,
                        left: this.props.size !== 'x-large'
                            ? `calc(50% - ${width / 2}px)`
                            : 64,
                        right: this.props.size !== 'x-large' ? 'auto' : 64,
                        bottom: this.props.size !== 'x-large' ? 'auto' : 64
                    }
                }}
            >
                <XModalContext.Provider value={{ close: this.props.onCloseRequest }}>
                    {this.props.children}
                </XModalContext.Provider>
            </ReactModal>
        );
    }
}

let Root = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100%'
});

export const XModalBody = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 24,
    paddingRight: 24,
    flexGrow: 1,
    position: 'relative'
});

export const XModalTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 500,
    letterSpacing: -0.4,
    color: '#1f3449'
});

export const XModalHeader = Glamorous(XHorizontal)({
    paddingLeft: 24,
    paddingRight: 24,
    height: 64
});

export const XModalFooter = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: '#fafbfc',
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTop: '1px solid rgba(220, 222, 228, 0.45)'
});

const XModalCloserStyles = Glamorous(XLink)({
    width: 28,
    height: 28,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all .15s ease',
    borderRadius: 50,
    border: '1px solid transparent',
    marginLeft: 'auto',
    marginTop: -2,
    '&:hover': {
        // border: 'solid 1px #dcdee4'
        '& > svg > g > path:last-child': {
            fill: '#969ba2'
        }
    }
});

export const XModalCloser = (props: XLinkProps) => (
    <XModalCloserStyles {...props}>
        <CloseIcon />
    </XModalCloserStyles>
);

export const XModalBodyScrollableContent = Glamorous.div({
    maxHeight: '70vh',
    overflowY: 'scroll'
});

interface ModalContentRenderProps {
    title?: string;
    titleChildren?: any;
    heading?: any;
    useTopCloser?: boolean;
    body?: any;
    footer?: any;
    customContent?: boolean;
    scrollableContent?: boolean;
}

class ModalContentRender extends React.Component<ModalContentRenderProps> {
    render() {
        if (this.props.customContent) {
            return (
                <Root>
                    {this.props.children}
                </Root>
            );
        }
        let body = (
            <>
                {this.props.body === undefined && <XModalBody>{this.props.children}</XModalBody>}
                {this.props.body !== undefined && this.props.body}
            </>
        );
        if (this.props.scrollableContent) {
            body = (
                <XModalBodyScrollableContent>
                    {body}
                </XModalBodyScrollableContent>
            );
        }
        return (
            <Root>
                {(this.props.heading === undefined && (this.props.title || this.props.useTopCloser)) && (
                    <XModalHeader
                        alignItems="center"
                        justifyContent="space-between"
                    >
                        <XHorizontal alignItems="center" separator={4}>
                            <XModalTitle>{this.props.title}</XModalTitle>
                            {this.props.titleChildren !== undefined && this.props.titleChildren}
                        </XHorizontal>
                        {this.props.useTopCloser && <XModalCloser autoClose={true} />}
                    </XModalHeader>
                )}
                {this.props.heading !== undefined && this.props.heading}
                {body}
                {this.props.footer === undefined && !this.props.useTopCloser && <XModalFooter><XButton text="Close" autoClose={true} /></XModalFooter>}
                {this.props.footer !== undefined && this.props.footer}
            </Root>
        );
    }
}

export interface XModalProps extends ModalContentRenderProps {

    // Style
    size?: 'x-large' | 's-large' | 'large' | 'default' | 'small';
    transparent?: boolean;
    width?: number;

    // Controlled/Uncontrolled
    isOpen?: boolean;
    onClosed?: () => void;
    closeOnClick?: boolean;

    // Target
    target?: React.ReactElement<any>;
    targetQuery?: string;
}

export class XModal extends React.PureComponent<XModalProps, { isOpen: boolean }> {

    static Footer = XModalFooter;

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
                    <ModalRender
                        scrollableContent={this.props.scrollableContent}
                        isOpen={this.state.isOpen}
                        onCloseRequest={this.onModalCloseRequest}
                        size={size}
                        sWidth={this.props.width}
                        closeOnClick={this.props.closeOnClick}
                        transparent={this.props.transparent}
                    >
                        <ModalContentRender
                            scrollableContent={this.props.scrollableContent}
                            title={this.props.title}
                            titleChildren={this.props.titleChildren}
                            useTopCloser={this.props.useTopCloser}
                            heading={this.props.heading}
                            footer={this.props.footer}
                            body={this.props.body}
                            customContent={this.props.customContent}
                        >
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
                            <ModalRender
                                scrollableContent={this.props.scrollableContent}
                                isOpen={!!router!!.query[q]}
                                onCloseRequest={this.onModalCloseRequest}
                                size={size}
                                sWidth={this.props.width}
                                closeOnClick={this.props.closeOnClick}
                                transparent={this.props.transparent}
                            >
                                <ModalContentRender
                                    scrollableContent={this.props.scrollableContent}
                                    title={this.props.title}
                                    titleChildren={this.props.titleChildren}
                                    useTopCloser={this.props.useTopCloser}
                                    heading={this.props.heading}
                                    footer={this.props.footer}
                                    body={this.props.body}
                                    customContent={this.props.customContent}
                                >
                                    {this.props.children}
                                </ModalContentRender>
                            </ModalRender>
                        );
                    }}
                </XRouterContext.Consumer>
            );
        } else if (this.props.isOpen !== undefined) {
            return (
                <ModalRender
                    scrollableContent={this.props.scrollableContent}
                    isOpen={this.props.isOpen}
                    onCloseRequest={this.onModalCloseRequest}
                    size={size}
                    sWidth={this.props.width}
                    closeOnClick={this.props.closeOnClick}
                    transparent={this.props.transparent}
                >
                    <ModalContentRender
                        scrollableContent={this.props.scrollableContent}
                        title={this.props.title}
                        titleChildren={this.props.titleChildren}
                        useTopCloser={this.props.useTopCloser}
                        heading={this.props.heading}
                        footer={this.props.footer}
                        body={this.props.body}
                        customContent={this.props.customContent}
                    >
                        {this.props.children}
                    </ModalContentRender>
                </ModalRender>
            );
        } else {
            throw Error('You should provide show, targetQuery or target');
        }
    }
}