import * as React from 'react';
import * as ReactModal from 'react-modal';
import { XRouterContext } from 'openland-x-routing/XRouterContext';

class ModalRender extends React.Component<{ isOpen: boolean }> {

    render() {
        return (
            <ReactModal isOpen={this.props.isOpen === true}>
                Hey!
            </ReactModal>
        );
    }
}

export interface XModalProps {

    // Content
    title?: string;

    // Controlled/Uncontrolled
    isOpen?: boolean;
    onClosed?: () => void;

    // Target
    target?: React.ReactElement<any>;
    targetQuery?: string;
}

export class XModal extends React.PureComponent<XModalProps, { isOpen: boolean }> {
    constructor(props: XModalProps) {
        super(props);
        this.state = { isOpen: false };
    }

    onTargetClick = () => {
        this.setState((state) => ({ isOpen: true }));
    }

    render() {
        if (this.props.target) {
            let TargetClone = React.cloneElement(this.props.target, { onClick: this.onTargetClick });
            return (
                <>
                    {TargetClone}
                    <ModalRender isOpen={this.state.isOpen} />
                </>
            );
        } else if (this.props.targetQuery) {
            let q = this.props.targetQuery;
            return (
                <XRouterContext.Consumer>
                    {(router) => <ModalRender isOpen={!!router!!.query[q]} />}
                </XRouterContext.Consumer>
            );
        } else if (this.props.isOpen !== undefined) {
            return (<ModalRender isOpen={this.props.isOpen} />);
        } else {
            throw Error('You should provide show, targetQuery or target');
        }
    }
}