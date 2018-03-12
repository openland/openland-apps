import * as React from 'react';

export interface TargetChildProps {
    ref: React.Ref<any>;
}

export interface TargetProps {
    componentFactory: (props: TargetChildProps) => React.ReactNode;
}

export class Target extends React.Component<TargetProps> {
    static contextTypes = {
        popperManager: () => {
            return null;
        },
    };

    render() {
        const { popperManager } = this.context;
        const targetRef = (node: React.ReactNode) => {
            if (popperManager != null) {
                popperManager.setTargetNode(node);
            }
        };

        const targetProps = { ref: targetRef };
        return this.props.componentFactory(targetProps);
    }
}
