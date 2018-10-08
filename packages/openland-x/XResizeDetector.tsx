import * as React from 'react';
import ReactResizeDetector from 'react-resize-detector';

export interface XResizeDetectorProps {
    onResize?: (width: number, height: number) => void;
    handleHeight?: boolean;
    handleWidth?: boolean;
    skipOnMount?: boolean;
    resizableElementId?: string;
    refreshMode?: 'throttle' | 'debounce';
    refreshRate?: number;
    render?: (props: any) => React.ReactNode;
}

export class XResizeDetector extends React.Component<XResizeDetectorProps> {
    render() {
        return (
            <ReactResizeDetector {...this.props}>
                {this.props.children}
            </ReactResizeDetector>
        );
    }
}