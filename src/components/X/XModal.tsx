import * as React from 'react';
import Glamorous from 'glamorous';
import * as ReactModal from 'react-modal';
import { XDialog } from './XDialog';
import { XCard } from './XCard';
import { XButton } from './XButton';

export class XModalTarget extends React.Component<{ handler?: (target: any) => void }> {
    static defaultProps = {
        _isModalTarget: true
    }
    handler = (e: React.SyntheticEvent<any>) => {
        this.props.handler!!(e.target);
    }
    render() {
        let child = React.Children.only(this.props.children);
        let cloned = React.cloneElement(child, { onClick: this.handler });
        return cloned;
    }
}

export class XModalContent extends React.Component<{ title: string }> {
    static defaultProps = {
        _isModalContent: true
    }
    render() {
        return (
            <XDialog>
                <XCard.Header text={this.props.title}>
                    <XButton onClick={(this.props as any).handler}>Close</XButton>
                </XCard.Header>
                {this.props.children}
            </XDialog>
        )
    }
}

const XModalContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'auto'
})

export class XModal extends React.Component<{ closeOnClick?: boolean }, { isOpen: boolean }> {
    static Target = XModalTarget;
    static Content = XModalContent;

    constructor(props: {}) {
        super(props);
        this.state = { isOpen: false };
    }

    handler = (target: any) => {
        this.setState({ isOpen: true })
    }

    handleClose = (target: any) => {
        this.setState({ isOpen: false });
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
                            zIndex: 10,
                            backgroundColor: 'rgba(0,0,0,0.75)'
                        },
                        content: {
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'none',
                            border: 'none',
                            top: 64,
                            left: 64,
                            right: 64,
                            bottom: 64,
                            pointerEvents: 'none'
                        }
                    }}
                >
                    <XModalContainer>
                        {contentClone}
                    </XModalContainer>
                </ReactModal>
            </>
        )
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