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

const contentAnimation = glamor.keyframes({
    '0%': {
        opacity: 0,
        transform: 'translateY(100%)',
        transformOrigin: '50% 100%'
    },
    '100%': {
        opacity: 1,
        transform: 'translateY(0)',
        transformOrigin: '50% 100%'
    }
});

const XModalContainer = Glamorous.div({
    display: 'flex',
    // flexDirection: 'column',
    // alignItems: 'center',
    justifyContent: 'center',
    pointerEvents: 'none',
    alignSelf: 'stretch'
});

export interface XModalStyleProps {
    title: string;
    style?: 'full-screen' | 'normal';
    width?: number; // DEPRECATED!
}

export interface XModalProps extends XModalStyleProps {
    isOpen: boolean;
    closeOnClick?: boolean;
    onClosed: () => void;
}

export class XModal extends React.Component<XModalProps, { isHiding: boolean }> {

    constructor(props: XModalProps) {
        super(props);
        this.state = { isHiding: false };
    }

    handleClose = (src?: any) => {
        if (src && src.preventDefault) {
            src.preventDefault();
        }
        this.props.onClosed();
        this.setState({ isHiding: true });
        setTimeout(() => { this.setState({ isHiding: false }); }, 250);
    }

    render() {

        //
        // Portal's reference callback is expected to be called BEFORE adding to DOM tree and it seems to be true
        // for React.
        //

        return (
            <ReactModal
                isOpen={this.props.isOpen || this.state.isHiding}
                onRequestClose={this.handleClose}
                ariaHideApp={false}
                shouldCloseOnOverlayClick={this.props.closeOnClick !== undefined ? this.props.closeOnClick : true}
                style={{
                    overlay: {
                        animationName: `${this.state.isHiding ? hideAnimation : showAnimation}`,
                        animationTimingFunction: `${this.state.isHiding ? 'cubic-bezier(0.25, 0.8, 0.25, 1)' : 'cubic-bezier(0.55, 0, 0.55, 0.2)'}`,
                        animationDuration: '0.2s',
                        animationFillMode: 'forwards',
                        zIndex: 10,
                        backgroundColor: 'rgba(0,0,0,0.75)'
                    },
                    content: {
                        position: 'absolute',
                        display: 'block',
                        // flexDirection: 'column',
                        // alignItems: 'center',
                        // justifyContent: 'center',
                        background: 'none',
                        border: 'none',
                        pointerEvents: 'none',
                        left: 0,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        padding: 0,
                        borderRadius: 0,
                        animationDuration: '0.2s',
                        animationFillMode: 'forwards',
                        animationName: `${contentAnimation}`,
                        animationTimingFunction: 'cubic-bezier(0.4, 0.0, 0.2, 1)'
                    }
                }}
            >
                <XModalContainer>
                    <XDialog
                        style={this.props.style}
                        title={this.props.title}
                        onClose={this.handleClose}
                        width={this.props.width}
                    >
                        {this.props.children}
                    </XDialog>
                </XModalContainer>
            </ReactModal>
        );
    }
}