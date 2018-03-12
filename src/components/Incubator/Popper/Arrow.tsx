import * as React from 'react';

export interface ArrowChildProps {
    ref: React.Ref<any>;
}

export interface ArrowProps {
    componentFactory: (props: ArrowChildProps) => React.ReactNode;
}

export class Arrow extends React.Component<ArrowProps> {
    static contextTypes = {
        popper: () => {
            return null;
        },
    };

    render() {
        const arrowProps = { ref: this.setRef };
        return this.props.componentFactory(arrowProps);
    }

    private setRef = (node: React.ReactNode) => {
        const { popper } = this.context;
        if (popper != null) {
            popper.setArrowNode(node);
        }
    }
}
