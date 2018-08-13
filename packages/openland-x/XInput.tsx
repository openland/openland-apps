import * as React from 'react';
import Glamorous from 'glamorous';
import { XInputBasicProps, XInputBasic } from './basics/XInputBasic';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XFlexStyles, applyFlex } from './basics/Flex';

export interface XInputProps extends XInputBasicProps {
    field?: string;
    valueStoreKey?: string;
    invalidStoreKey?: string;
    enabledStoreKey?: string;
}

class XInputStored extends React.PureComponent<XInputProps & { store: XStoreState }> {

    inputRef: any = null;

    handlerRef = (src: any) => {
        if (src) {
            this.inputRef = src;
        }
    }

    focus = () => {
        this.inputRef.focus();
    }

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
        return (<XInputBasic value={value} onChange={this.onChangeHandler} invalid={invalid || !enabled} {...other} ref={this.handlerRef} />);
    }
}

export class XInput extends React.PureComponent<XInputProps> {
    inputRef: any = null;

    handler = (src: any) => {
        if (src) {
            this.inputRef = src;
        }
    }

    focus() {
        this.inputRef.focus();
    }

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
                                ref={this.handler}
                            />
                        );
                    }}
                </XStoreContext.Consumer>
            );
        }
        return (<XInputBasic {...other} ref={this.handler} />);
    }
}

export const XInputGroup = Glamorous.div<XFlexStyles>([
    ({
        display: 'flex',

        '& > *': {
            flex: 1,
            zIndex: 1,
            marginRight: -1,

            '&:first-child': {
                borderTopRightRadius: 0,
                borderBottomRightRadius: 0,
            },

            '&:not(:first-child):not(:last-child)': {
                borderRadius: 0
            },

            '&:last-child': {
                borderTopLeftRadius: 0,
                borderBottomLeftRadius: 0,
            },

            '&:focus-within': {
                zIndex: 2
            }
        }
    }),
    (props) => applyFlex(props),
]);