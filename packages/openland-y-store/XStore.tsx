import * as React from 'react';
import { XStoreState } from './XStoreState';
import { XStoreContext } from './XStoreContext';
import { writeValue } from './utils/writeValue';
import { storeClone } from './utils/storeClone';
import { storeMerge } from './utils/storeMerge';

interface XStoreProps {
    defaultData?: any;
    onChanged?: (data: any) => void;
}

function mergeNewProps(data: any, defaultData?: any) {
    if (defaultData) {
        return storeMerge(defaultData, data);
    } else {
        return storeClone(data);
    }
}

export class XStore extends React.PureComponent<XStoreProps, { state: XStoreState }> {
    private data: any = {};

    constructor(props: XStoreProps) {
        super(props);
        if (this.props.defaultData) {
            this.data = storeClone(this.props.defaultData);
        }
        this.state = { state: new XStoreState(this, storeClone(this.data)) };
    }

    writeValue = (name: string, value: any) => {
        writeValue(this.data, name, value);
        if (this.props.onChanged) {
            this.props.onChanged(this.data);
        }
        this.setState({ state: new XStoreState(this, storeClone(this.data)) });
    }

    reset = () => {
        if (this.props.defaultData) {
            this.data = storeClone(this.props.defaultData);
        } else {
            this.data = {};
        }
        if (this.props.onChanged) {
            this.props.onChanged(this.data);
        }
        this.setState({ state: new XStoreState(this, storeClone(this.data)) });
    }

    componentWillReceiveProps(nextProps: XStoreProps) {
        if (nextProps.defaultData !== this.props.defaultData) {
            this.setState({ state: new XStoreState(this, mergeNewProps(this.data, this.props.defaultData)) });
        }
    }

    render() {
        return (
            <XStoreContext.Provider value={this.state.state}>
                {this.props.children}
            </XStoreContext.Provider>
        );
    }
}