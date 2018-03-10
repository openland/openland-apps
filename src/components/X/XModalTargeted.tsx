import * as React from 'react';
import { XModal } from './XModal';

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

export class XModalTargeted extends React.Component<{ title: string, fullScreen?: boolean, closeOnClick?: boolean, width?: number }, { isOpen: boolean }> {
    static Target = XModalTarget;
    static Content = XModalContent;

    constructor(props: { title: string }) {
        super(props);
        this.state = {
            isOpen: false
        };
    }

    handler = (src?: any) => {
        this.setState({ isOpen: true });
    }

    handleClose = (src?: any) => {
        if (src && src.preventDefault) {
            src.preventDefault();
        }
        this.setState({ isOpen: false });
    }

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
                <XModal title={this.props.title} isOpen={this.state.isOpen} onClosed={this.handleClose} style={this.props.fullScreen ? 'full-screen' : 'normal'}>
                    {contentClone}
                </XModal>
            </>
        );
    }
}