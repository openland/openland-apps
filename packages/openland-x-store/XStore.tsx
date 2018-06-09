import * as React from 'react';
import { XStoreState } from './XStoreState';
import { XStoreContext } from './XStoreContext';
import { writeValue } from './utils/writeValue';

function clone(src: any) {
    return JSON.parse(JSON.stringify(src));
}

interface XStoreProps {
    onChanged?: (data: any) => void;
}

export class XStore extends React.Component<XStoreProps, { state: XStoreState }> {
    private data: any = {};
    constructor(props: XStoreProps) {
        super(props);
        this.state = { state: new XStoreState(this, clone(this.data)) };
    }

    writeValue = (name: string, value: any) => {
        writeValue(this.data, name, value);
        if (this.props.onChanged) {
            this.props.onChanged(this.data);
        }
        this.setState({ state: new XStoreState(this, clone(this.data)) });
    }

    render() {
        return (
            <XStoreContext.Provider value={this.state.state}>
                {this.props.children}
            </XStoreContext.Provider>
        );
    }
}