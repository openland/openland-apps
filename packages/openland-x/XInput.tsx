import * as React from 'react';
import { XInputBasicProps, XInputBasic } from './basics/XInputBasic';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';

export interface XInputProps extends XInputBasicProps {
    valueStoreKey?: string;
    invalidStoreKey?: string;
}

class XInputStored extends React.PureComponent<XInputProps & { store: XStoreState }> {

    onChangeHandler = (value: string) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        if (this.props.valueStoreKey) {
            this.props.store.writeValue(this.props.valueStoreKey, value);
        }
    }

    render() {
        let { valueStoreKey, invalidStoreKey, store, ...other } = this.props;
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
        let invalid = this.props.invalid;
        if (invalidStoreKey) {
            let invalidVal = store.readValue(invalidStoreKey);
            invalid = invalidVal !== '' && invalidVal !== null && invalidVal !== undefined;
        }
        return (<XInputBasic value={value} onChange={this.onChangeHandler} invalid={invalid} {...other} />);
    }
}

export class XInput extends React.PureComponent<XInputProps> {
    render() {
        let { valueStoreKey, invalidStoreKey, ...other } = this.props;
        if (valueStoreKey || invalidStoreKey) {
            let valueStoreKeyCached = valueStoreKey;
            let invalidStoreKeyCached = invalidStoreKey;
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return (
                            <XInputStored
                                {...other}
                                valueStoreKey={valueStoreKeyCached}
                                invalidStoreKey={invalidStoreKeyCached}
                                store={store}
                            />
                        );
                    }}
                </XStoreContext.Consumer>
            );
        }
        return (<XInputBasic {...other} />);
    }
}