import * as React from 'react';
import * as ReactModal from 'react-modal';
import Glamorous from 'glamorous';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { IsMobileContext } from 'openland-web/components/Scaffold/IsMobileContext';
import { XRouter } from 'openland-x-routing/XRouter';
import { XButton } from 'openland-x/XButton';
import { XLink, XLinkProps } from 'openland-x/XLink';
import { XModalContext } from './XModalContext';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import CloseIcon from './ic-close.svg';
import { XThemeDefault } from 'openland-x/XTheme';
import { XMemo } from 'openland-y-utils/XMemo';
import { XView } from 'react-mental';

interface ModalRenderProps {
    size: 'x-large' | 's-large' | 'large' | 'default' | 'small';
    sWidth?: number;
    scrollableContent?: boolean;
    isOpen: boolean;
    closeOnClick?: boolean;
    onCloseRequest: () => void;
    transparent?: boolean;

    children?: any;
}

const ModalRender = XMemo<ModalRenderProps>(props => {
    const isMobile = React.useContext(IsMobileContext);
    let width = 575;
    if (props.sWidth !== undefined) {
        width = props.sWidth;
    } else if (props.size === 'large') {
        width = 870;
    } else if (props.size === 's-large') {
        width = 1200;
    } else if (props.size === 'small') {
        width = 460;
    }

    if (!props.isOpen) {
        return null;
    }

    return (
        <ReactModal
            isOpen={props.isOpen}
            onRequestClose={props.onCloseRequest}
            shouldCloseOnOverlayClick={props.closeOnClick !== undefined ? props.closeOnClick : true}
            shouldCloseOnEsc={true}
            ariaHideApp={false}
            closeTimeoutMS={300}
            style={{
                overlay: {
                    zIndex: 100,
                    backgroundColor:
                        props.size !== 'x-large' && props.size !== 'large'
                            ? 'rgba(0, 0, 0, 0.4)'
                            : 'rgba(0, 0, 0, 0.3)',
                },
                content: {
                    display: 'block',
                    background: props.transparent ? 'transparent' : '#ffffff',
                    margin: 'auto',
                    padding: 0,
                    overflow: 'hidden',

                    // Border/shadow
                    border: 'none',
                    boxShadow: props.transparent ? 'none' : '0px 2px 2px 0px #777',
                    borderRadius: isMobile ? 0 : 6,

                    // Sizes
                    width: isMobile
                        ? '100%'
                        : props.size !== 'x-large'
                        ? width
                        : 'calc(100% - 128px)',
                    top: isMobile
                        ? 0
                        : props.size !== 'x-large' && !props.scrollableContent
                        ? 96
                        : 64,
                    left: isMobile
                        ? 0
                        : props.size !== 'x-large'
                        ? `calc(50% - ${width / 2}px)`
                        : 64,
                    right: isMobile ? 0 : props.size !== 'x-large' ? 'auto' : 64,
                    bottom: isMobile ? 0 : props.size !== 'x-large' ? 'auto' : 64,
                },
            }}
        >
            <XModalContext.Provider value={{ close: props.onCloseRequest }}>
                {props.children}
            </XModalContext.Provider>
        </ReactModal>
    );
});

let Root = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    height: '100%',
});

export const XModalBody = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 24,
    paddingRight: 24,
    flexGrow: 1,
    position: 'relative',
});

export const XModalTitle = Glamorous.div({
    fontSize: 18,
    fontWeight: 600,
    letterSpacing: 0,
    lineHeight: '20px',
    color: 'rgba(0, 0, 0, 0.9)',
});

export const XModalHeader = Glamorous(XHorizontal)({
    paddingLeft: 24,
    paddingRight: 14,
    height: 64,
});

export const XModalFooter = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    paddingLeft: 24,
    paddingRight: 24,
    height: 64,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: XThemeDefault.backyardColor,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
    borderTop: '1px solid',
    borderTopColor: XThemeDefault.separatorColor,
    flexShrink: 0,
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
    '& > svg > g > path:last-child': {
        fill: 'rgba(0, 0, 0, 0.3)',
    },
    '&:hover': {
        // border: 'solid 1px #dcdee4'
        '& > svg > g > path:last-child': {
            fill: 'rgba(0, 0, 0, 0.4)',
        },
    },
});

export const XModalCloser = (props: XLinkProps) => (
    <XModalCloserStyles {...props}>
        <CloseIcon />
    </XModalCloserStyles>
);

export const XModalBodyScrollableContent = Glamorous.div({
    maxHeight: '70vh',
    overflowY: 'scroll',
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
            return <Root>{this.props.children}</Root>;
        }
        let body = (
            <>
                {this.props.body === undefined && <XModalBody>{this.props.children}</XModalBody>}
                {this.props.body !== undefined && this.props.body}
            </>
        );
        if (this.props.scrollableContent) {
            body = <XModalBodyScrollableContent>{body}</XModalBodyScrollableContent>;
        }

        return (
            <Root>
                {this.props.heading === undefined && this.props.title && (
                    <XModalHeader alignItems="center" justifyContent="space-between">
                        <XHorizontal alignItems="center" separator={4}>
                            <XModalTitle>{this.props.title}</XModalTitle>
                            {this.props.titleChildren !== undefined && this.props.titleChildren}
                        </XHorizontal>
                        {this.props.useTopCloser && <XModalCloser autoClose={true} />}
                    </XModalHeader>
                )}
                {this.props.useTopCloser && !this.props.title && (
                    <XView position="absolute" zIndex={100} right={32} top={28}>
                        <XModalCloser autoClose={true} />
                    </XView>
                )}
                {this.props.heading !== undefined && this.props.heading}
                {body}
                {this.props.footer === undefined && !this.props.useTopCloser && (
                    <XModalFooter>
                        <XButton text="Close" autoClose={true} />
                    </XModalFooter>
                )}
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
        this.setState({
            isOpen: true,
        });
    };

    onModalCloseRequest = () => {
        if (this.props.onClosed) {
            this.props.onClosed();
        }
        if (this.props.target) {
            this.setState(state => ({ isOpen: false }));
        } else if (this.props.targetQuery) {
            if (this.lastRouter) {
                this.lastRouter!!.replaceQuery(this.props.targetQuery!!, undefined); // this will delete targetQuery
            }
        }
    };

    render() {
        let size = this.props.size || 'default';
        if (this.props.target) {
            let TargetClone = React.cloneElement(this.props.target, {
                onClick: this.onTargetClick,
            });
            return (
                <React.Suspense fallback={<div />}>
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
                </React.Suspense>
            );
        } else if (this.props.targetQuery) {
            let q = this.props.targetQuery;
            return (
                <React.Suspense fallback={<div />}>
                    <XRouterContext.Consumer>
                        {router => {
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
                </React.Suspense>
            );
        } else if (this.props.isOpen !== undefined) {
            return (
                <React.Suspense fallback={<div />}>
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
                </React.Suspense>
            );
        } else {
            throw Error('You should provide show, targetQuery or target');
        }
    }
}
