import * as React from 'react';

interface ZErrorBoundaryProps {
    fallback: any;
    onError?: (error: Error) => void;
    children?: any;
};

interface ZErrorBoundaryState {
    hasError: boolean;
    error: Error | undefined,
};

export class ZErrorBoundary extends React.Component<ZErrorBoundaryProps, ZErrorBoundaryState> {
    static getDerivedStateFromError(error: Error) {
        return { hasError: true };
    }

    constructor(props: ZErrorBoundaryProps) {
        super(props);

        this.state = {
            hasError: false,
            error: undefined
        }
    }
  
    componentDidCatch(error: Error): void {
        this.setState({ error });

        if (this.props.onError) {
            this.props.onError(error);
        }
    }
  
    render() {
        if (this.state.hasError) {
            return <this.props.fallback error={this.state.error} />;
        }

        return this.props.children;
    }
}