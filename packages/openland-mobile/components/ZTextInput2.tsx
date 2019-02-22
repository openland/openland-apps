import * as React from 'react';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { ZTextInputBasicProps, ZTextInputBasic } from './input/ZTextInputBasic';

export interface ZTextInput2Props extends ZTextInputBasicProps {
    field?: string;
    valueStoreKey?: string;
    invalidStoreKey?: string;
    enabledStoreKey?: string;
}

class ZTextInput2Component extends React.PureComponent<ZTextInput2Props & { store?: XStoreState }> {
    onChangeHandler = (value: string) => {
        if (this.props.onChangeText) {
            this.props.onChangeText(value);
        }
        if (this.props.valueStoreKey || this.props.field) {
            this.props.store!!.writeValue(this.props.valueStoreKey || ('fields.' + this.props.field), value);
        }
    }

    render() {
        let { field, valueStoreKey, invalidStoreKey, enabledStoreKey, onChangeText, ...other } = this.props;

        let value = this.props.value;
        if (this.props.field) {
            let existing = this.props.store!!.readValue(valueStoreKey || ('fields.' + field));
            value = '';
            if (typeof existing === 'string') {
                value = existing;
            } else if (existing) {
                value = existing.toString();
            }
        }

        let invalid = this.props.invalid;
        if (invalidStoreKey || field) {
            let invalidVal = this.props.store!!.readValue(invalidStoreKey || ('errors.' + field));
            invalid = invalidVal !== '' && invalidVal !== null && invalidVal !== undefined;
        }

        let enabled = true;
        if (enabledStoreKey) {
            let enabledVal = this.props.store!!.readValue(enabledStoreKey);
            enabled = enabledVal !== false;
        }

        return (
            <ZTextInputBasic
                {...other}
                value={value}
                invalid={invalid}
                enabled={enabled}
                onChangeText={this.onChangeHandler}
            />
        );
    }
}

export class ZTextInput2 extends React.PureComponent<ZTextInput2Props> {
    render() {
        let { field, valueStoreKey, invalidStoreKey, enabledStoreKey, ...other } = this.props;

        if (this.props.field || this.props.invalidStoreKey || this.props.enabledStoreKey) {
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return (
                            <ZTextInput2Component
                                {...other}
                                store={store}
                                field={field}
                                valueStoreKey={valueStoreKey}
                                invalidStoreKey={invalidStoreKey}
                                enabledStoreKey={enabledStoreKey}
                            />);
                    }}
                </XStoreContext.Consumer>
            );
        } else {
            return <ZTextInputBasic {...other} />;
        }
    }
}