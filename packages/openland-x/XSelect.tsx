import * as React from 'react';
import { XSelectAsyncBasic, XSelectBasic, XSelectBasicProps, XSelectAsyncBasicProps } from './basics/XSelectBasic';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XStoreContext } from 'openland-x-store/XStoreContext';

//
// Sync
//

class XSelectStored extends React.PureComponent<XSelectProps & { store: XStoreState }> {
    handleChange = (src: any) => {
        let val = src ? src.value as string : 'unknown';
        let cval = null;
        if (Array.isArray(src)) {
            if (src.length > 0) {
                cval = src.map(r => r.value);
            }
        } else if (val !== 'unknown') {
            cval = val;
        }
        this.props.store.writeValue(this.props.valueStoreKey || ('fields.' + this.props.field), cval);
    }

    render() {
        let { valueStoreKey, store, field, ...other } = this.props;
        let value: any = this.props.value;
        if (valueStoreKey || field) {
            value = store.readValue(valueStoreKey || ('fields.' + field));
        }
        console.warn(value);
        return <XSelectBasic {...other} value={(value && this.props.creatable) ? value.map( (v: any) => ({ value: v, label: v })) : value} onChange={this.handleChange} />;
    }
}

export interface XSelectProps extends XSelectBasicProps {
    field?: string;
    valueStoreKey?: string;
}

export class XSelect extends React.PureComponent<XSelectProps> {

    render() {
        if (this.props.field || this.props.valueStoreKey) {
            let { valueStoreKey, field, ref, ...other } = this.props;
            let valueStoreKeyCached = valueStoreKey;
            let fieldCached = field;
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
                                field={fieldCached}
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

export interface XSelectAsyncProps extends XSelectAsyncBasicProps {

}

export function XSelectAsync(props: XSelectAsyncProps) {
    return (
        <XSelectAsyncBasic {...props} />
    );
}