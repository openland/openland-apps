import * as React from 'react';
import {
    XSelectAsyncBasic,
    XSelectBasic,
    XSelectBasicProps,
    XSelectAsyncBasicProps,
} from './basics/XSelectBasic';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XStoreContext } from 'openland-y-store/XStoreContext';

//
// Sync
//

export interface XSelectProps extends XSelectBasicProps {
    field?: string;
    valueStoreKey?: string;
}

class XSelectStored extends React.PureComponent<XSelectProps & { store: XStoreState }> {
    handleChange = (src: any) => {
        let val = src ? (src.value as string) : 'unknown';
        let cval = null;
        if (Array.isArray(src)) {
            if (src.length > 0) {
                cval = src.map(r => ({ value: r.value, label: r.label }));
            }
        } else if (val !== 'unknown') {
            cval = val;
        }

        this.props.store.writeValue(this.props.valueStoreKey || 'fields.' + this.props.field, cval);

        if (this.props.onChange) {
            this.props.onChange(src);
        }
    }

    render() {
        let { valueStoreKey, store, field, onChange, ...other } = this.props;
        let value: any = this.props.value;
        if (valueStoreKey || field) {
            value = store.readValue(valueStoreKey || 'fields.' + field);
        }
        let cval: any;
        if (Array.isArray(value)) {
            cval = value.map((v: any) => ({ value: v.value, label: v.label }));
        } else {
            cval = value;
        }

        return <XSelectBasic onChange={this.handleChange} {...other} value={cval} />;
    }
}

export class XSelect extends React.PureComponent<XSelectProps> {
    render() {
        if (this.props.field || this.props.valueStoreKey) {
            let { valueStoreKey, field, ref, ...other } = this.props;
            let valueStoreKeyCached = valueStoreKey;
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return (
                            <XSelectStored
                                {...other}
                                valueStoreKey={valueStoreKeyCached}
                                field={field}
                                store={store}
                            />
                        );
                    }}
                </XStoreContext.Consumer>
            );
        }
        return <XSelectBasic {...this.props} />;
    }
}

//
// Async
//

export interface XSelectAsyncProps extends XSelectAsyncBasicProps {}

export function XSelectAsync(props: XSelectAsyncProps) {
    return <XSelectAsyncBasic {...props} />;
}
