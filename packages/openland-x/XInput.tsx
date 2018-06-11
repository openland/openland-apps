import * as React from 'react';
import { XInputBasicProps, XInputBasic } from './basics/XInputBasic';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';

export interface XInputProps extends XInputBasicProps {
    field?: string;
    valueStoreKey?: string;
    invalidStoreKey?: string;
    enabledStoreKey?: string;
}

class XInputStored extends React.PureComponent<XInputProps & { store: XStoreState }> {

    onChangeHandler = (value: string) => {
        if (this.props.onChange) {
            this.props.onChange(value);
        }
        if (this.props.valueStoreKey || this.props.field) {
            this.props.store.writeValue(this.props.valueStoreKey || ('fields.' + this.props.field), value);
        }
    }

    render() {
        let { valueStoreKey, invalidStoreKey, enabledStoreKey, store, field, ...other } = this.props;
        let value = this.props.value;
        if (valueStoreKey || field) {
            let existing = store.readValue(valueStoreKey || ('fields.' + field));
            value = '';
            if (typeof existing === 'string') {
                value = existing;
            } else if (existing) {
                value = existing.toString();
            }
        }
        let invalid = this.props.invalid;
        if (invalidStoreKey || field) {
            let invalidVal = store.readValue(invalidStoreKey || ('errors.' + field));
            invalid = invalidVal !== '' && invalidVal !== null && invalidVal !== undefined;
        }
        let enabled = true;
        if (enabledStoreKey) {
            let enabledVal = store.readValue(enabledStoreKey);
            enabled = enabledVal !== false;
        }
        return (<XInputBasic value={value} onChange={this.onChangeHandler} invalid={invalid || !enabled} {...other} />);
    }
}

export class XInput extends React.PureComponent<XInputProps> {
    render() {
        let { valueStoreKey, invalidStoreKey, enabledStoreKey, field, ...other } = this.props;
        if (valueStoreKey || invalidStoreKey || enabledStoreKey || field) {
            let valueStoreKeyCached = valueStoreKey;
            let invalidStoreKeyCached = invalidStoreKey;
            let enabledStoreKeyCached = enabledStoreKey;
            let fieldCached = field;
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
                                enabledStoreKey={enabledStoreKeyCached}
                                field={fieldCached}
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