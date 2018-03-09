import * as React from 'react';
import Glamorous from 'glamorous';
import * as glamor from 'glamor';
import * as ReactModal from 'react-modal';
import { XDialog } from './XDialog';

const showAnimation = glamor.keyframes({
    '0%': { backgroundColor: 'transparent', opacity: 0 },
    '100%': { backgroundColor: 'rgba(0,0,0,0.75)', opacity: 1 }
});

const hideAnimation = glamor.keyframes({
    '0%': { backgroundColor: 'rgba(0,0,0,0.75)', opacity: 1 },
    '100%': { backgroundColor: 'transparent', opacity: 0 }
});

export class XModalTarget extends React.Component<{ handler?: (target: any) => void }> {
    static defaultProps = {
        _isModalTarget: true
    };
    handler = (e: React.SyntheticEvent<any>) => {
        if (e.preventDefault) {
            e.preventDefault();
        }
        this.props.handler!!(e.target);
    }
    render() {
        let child = React.Children.only(this.props.children);
        let cloned = React.cloneElement(child, { onClick: this.handler });
        return cloned;
    }
}

export class XModalContent extends React.Component {
    static defaultProps = {
        _isModalContent: true
    };
    render() {
        return (
            <>
                {this.props.children}
            </>
        );
    }
}

const XModalContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto',
    alignSelf: 'stretch'
});

export class XModal extends React.Component<{ title: string, fullScreen?: boolean, closeOnClick?: boolean, width?: number }, { isOpen: boolean, hide: boolean }> {
    static Target = XModalTarget;
    static Content = XModalContent;

    constructor(props: { title: string }) {
        super(props);
        this.state = {
            isOpen: false,
            hide: false
        };
    }

    handler = (src?: any) => {
        this.setState({ isOpen: true, hide: false });
    }

    handleClose = (src?: any) => {
        if (src && src.preventDefault) {
            src.preventDefault();
        }
        this.setState({ hide: true });
        setTimeout(() => { this.setState({ isOpen: false }); }, 300);
    }

    // handleClick = (e: MouseEvent) => {
    //     let isInTarget = this.state.target && (this.state.target as Node).contains(e.target as Node);
    //     let isInPortal = this.state.portal && (this.state.portal as Node).contains(e.target as Node);
    //     if (!isInTarget && !isInPortal && this.state.popper) {
    //         this.setState((src) => {
    //             if (src.popper) {
    //                 src.popper.destroy();
    //             }
    //             return {
    //                 popper: null,
    //                 target: null
    //             }
    //         })
    //     }
    // }

    render() {
        let target = React.Children.toArray(this.props.children)
            .find((v) => React.isValidElement(v) && (v.props as any)._isModalTarget === true) as React.ReactElement<{ handler?: (target: any) => void }>;
        let content = React.Children.toArray(this.props.children)
            .find((v) => React.isValidElement(v) && (v.props as any)._isModalContent === true) as React.ReactElement<{}>;

        if (!target) {
            throw Error('Target must be set!');
        }
        if (!content) {
            throw Error('Content must be set!');
        }

        //
        // Portal's reference callback is expected to be called BEFORE adding to DOM tree and it seems to be true
        // for React.
        //

        let targetClone = React.cloneElement(target as any, { handler: this.handler as any });
        let contentClone = React.cloneElement(content as any, { handler: this.handleClose as any });

        return (
            <>
                {targetClone}
                <ReactModal
                    isOpen={this.state.isOpen}
                    onRequestClose={this.handleClose}
                    ariaHideApp={false}
                    shouldCloseOnOverlayClick={this.props.closeOnClick !== undefined ? this.props.closeOnClick : true}
                    style={{
                        overlay: {
                            animationName: `${this.state.hide ? hideAnimation : showAnimation}`,
                            animationTimingFunction: `${this.state.hide ? 'cubic-bezier(0.25, 0.8, 0.25, 1)' : 'cubic-bezier(0.55, 0, 0.55, 0.2)'}`,
                            animationDuration: '0.3s',
                            zIndex: 10,
                            backgroundColor: 'rgba(0,0,0,0.75)'
                        },
                        content: {
                            position: 'absolute',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'none',
                            border: 'none',
                            pointerEvents: 'none',
                            left: 0,
                            right: 0,
                            top: 0,
                            bottom: 0,
                            padding: 0,
                            borderRadius: 0
                        }
                    }}
                >
                    <XModalContainer>
                        <XDialog
                            style={this.props.fullScreen ? 'full-screen' : 'normal'}
                            title={this.props.title}
                            onClose={this.handleClose}
                            width={this.props.width}
                        >
                            {contentClone}
                        </XDialog>
                    </XModalContainer>
                </ReactModal>
            </>
        );
        // let children = (
        //     <>
        //         {content}
        //     </>
        // );

        // return (
        //     <>
        //         {targetClone}
        //         {canUseDOM && this.state.target && ReactDOM.createPortal(children, document.body)}
        //     </>
        // );
    }

    // componentDidMount() {
    //     document.addEventListener('mousedown', this.handleClick);
    // }

    // componentWillUnmount() {
    //     document.removeEventListener('mousedown', this.handleClick);
    //     if (this.state.popper) {
    //         this.state.popper.destroy();
    //     }
    // }
}