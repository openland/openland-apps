import * as React from 'react';
import { XTextAreaBasicProps, XTextAreaBasic } from './basics/XTextAreaBasic';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';

export interface XTextAreaProps extends XTextAreaBasicProps {
    valueStoreKey?: string;
}

class XTextAreaStored extends React.PureComponent<XTextAreaProps & { store: XStoreState }> {

    onChangeHandler = (value: string) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        if (this.props.valueStoreKey) {
            this.props.store.writeValue(this.props.valueStoreKey, value);
        }
    }

    render() {
        let { valueStoreKey, store, ...other } = this.props;
        let value = this.props.value;
        if (valueStoreKey) {
            let existing = store.readValue(valueStoreKey);
            value = '';
            if (typeof existing === 'string') {
                value = existing;
            } else if (existing) {
                value = existing.toString();
            }
        }
        return (<XTextAreaBasic value={value} onChange={this.onChangeHandler} {...other} />);
    }
}

export class XTextArea extends React.PureComponent<XTextAreaProps> {
    render() {
        let { valueStoreKey, ...other } = this.props;
        if (valueStoreKey) {
            let valueStoreKeyCached = valueStoreKey;
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return (
                            <XTextAreaStored
                                {...other}
                                valueStoreKey={valueStoreKeyCached}
                                store={store}
                            />
                        );
                    }}
                </XStoreContext.Consumer>
            );
        }
        return (<XTextAreaBasic {...other} />);
    }
}