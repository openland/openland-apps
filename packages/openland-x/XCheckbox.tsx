import * as React from 'react';
import XStyles from './XStyles';
import Glamorous from 'glamorous';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { makeActionable, ActionableParentProps } from './Actionable';
import { XLoadingCircular } from './XLoadingCircular';

const CheckboxInputDiv = Glamorous.div<{ active: boolean, disabled?: boolean, marginBottom?: number }>([
    (props) => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        userSelect: 'none',
        position: 'relative',
        marginBottom: props.marginBottom !== undefined ? props.marginBottom : 14,
        '> input': {
            display: 'none'
        },
        '> label': {
            ...XStyles.text.h400,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            color: props.active ? '#4428e0' : '#525f7f',
            cursor: 'pointer',
            width: '100%',
            '& .top-content': {
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                '> span': {
                    color: '#1f3449'
                },
            },
            '& .bottom-content': {
                paddingLeft: 28,
                width: 245,
                opacity: 0.4,
                fontSize: 13,
                lineHeight: 1.23,
                letterSpacing: - 0.1,
                color: '#1f3449'
            }
        },
        '& .loading-icon': {
            width: 32,
            height: 32,
            position: 'absolute',
            top: '50%',
            left: '30px',
            transform: 'translate(0, -50%)'
        }
    }),
    (props) => (props.disabled && {
        opacity: 0.6,
        cursor: 'default',

        '& *': {
            cursor: 'default'
        }
    } || {}),
]);

const CheckIcon = Glamorous.div<{ active?: boolean; rounded?: boolean }>((props) => ({
    width: 18,
    height: 18,
    borderRadius: props.rounded ? 18 : 4,
    color: '#ffffff',
    backgroundColor: props.active ? '#1790ff' : '#ffffff',
    backgroundImage: props.active ? 'url(\'/static/img/icons/check-form.svg\')' : 'none',
    backgroundSize: '10px 8px',
    backgroundPosition: 'center 4px',
    backgroundRepeat: 'no-repeat',
    border: '1px solid',
    borderColor: props.active ? 'transparent' : 'rgba(97, 126, 156, 0.2)',
    marginRight: 12,
}));

const CheckSwitcher = Glamorous.div<{ active?: boolean }>((props) => ({
    width: 28,
    height: 14,
    borderRadius: 14,
    background: 'rgba(193, 199, 207, 0.32)',
    marginRight: 14,
    transition: '.15s all ease',
    position: 'relative',

    '& div': {
        width: 18,
        height: 18,
        borderRadius: 18,
        background: props.active ? '#1790ff' : '#c1c7cf',
        transition: '300ms all ease',
        position: 'absolute',
        top: -2,
        left: props.active ? 'calc(100% - 18px)' : 0,
    }
}));

const Divided = Glamorous.div({
    borderBottom: '1px solid #d8d8d8',
    marginBottom: 16,

    '&:last-child': {
        borderBottom: 'none',
        marginBottom: 0,
        '& > div': {
            marginBottom: 0
        }
    }
});

interface XCheckboxBasicProps { 
    label: string; 
    trueValue?: string; 
    marginBottom?: number; 
    falseValue?: string; 
    value?: string;
    switcher?: boolean;
    onChange?: (checked: { 
        label: string, checked: boolean 
    }) => void; 
    checked?: boolean;
    disabled?: boolean;
    hint?: string;
    rounded?: boolean;
    loading?: boolean;
    onClick?: React.MouseEventHandler<any>;
}

export class XCheckboxBasic extends React.Component<XCheckboxBasicProps, { isChecked: boolean }> {
    static defaultProps = {
        _isCheckBox: true
    };
    constructor(props: XCheckboxBasicProps) {
        super(props);

        this.state = {
            isChecked: this.props.checked !== undefined ? this.props.checked : this.props.value !== undefined && this.props.value === this.props.trueValue
        };

    }

    componentWillReceiveProps(props: any) {
        this.setState({
            isChecked: props.checked !== undefined ? props.checked : props.value !== undefined && props.value === props.trueValue
        });
    }

    handleChange = () => {
        if (!this.props.disabled) {
            if (this.props.onChange) {
                this.props.onChange({ label: this.props.value !== undefined ? this.props.value : this.props.label, checked: !this.state.isChecked });
            }
            this.setState({
                isChecked: !this.state.isChecked
            });
        }
    }

    render() {
        const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;
        return (
            <CheckboxInputDiv disabled={this.props.disabled} active={this.state.isChecked} marginBottom={this.props.marginBottom} onClick={this.props.onClick}>
                <input onChange={this.handleChange} id={id} type="checkbox" checked={this.state.isChecked} />
                <label htmlFor={id}>
                    <div className="top-content">
                        {this.props.switcher && (
                            <CheckSwitcher active={this.state.isChecked}>
                                <div />
                            </CheckSwitcher>
                        )}
                        {!this.props.switcher && (<CheckIcon active={this.state.isChecked} rounded={this.props.rounded} />)}
                        <span style={{ opacity: this.props.loading ? 0 : 1 }}>{this.props.label}</span>
                        {this.props.loading && <XLoadingCircular className="loading-icon" color="#1790ff" />}
                    </div>
                    {this.props.hint && <div className="bottom-content">{this.props.hint}</div>}
                </label>
            </CheckboxInputDiv>
        );
    }
}

interface XCheckboxGroupProps {
    elements: string[] | {
        value: string,
        label: string,
        hint?: string
    }[];
    selected?: string[];
    onChange?: (value: string[]) => void;
    divided?: boolean;
}

export class XCheckboxGroup extends React.Component<XCheckboxGroupProps, { selected?: string[] }> {

    static defaultProps = {
        _isCheckboxGroup: true
    };

    selected = new Set<string>();

    constructor(props: XCheckboxGroupProps) {
        super(props);
        this.state = {
            selected: props.selected
        };
        if (props.selected) {
            for (let s of props.selected) {
                this.selected.add(s);
            }
        }
    }
    handleChange = (checked: { label: string, checked: boolean }) => {
        if (checked.checked) {
            this.selected.add(checked.label);
        } else {
            this.selected.delete(checked.label);

        }
        if (this.props.onChange) {
            this.props.onChange([...this.selected]);
        }
        this.setState({ selected: [...this.selected] });
    }

    render() {
        let res = [];
        for (let element of this.props.elements) {
            let label = (element as any).label !== undefined ? (element as any).label : element;
            let value = (element as any).value !== undefined ? (element as any).value : element;
            let hint = (element as any).hint !== undefined ? (element as any).hint : undefined;

            let checkboxProps = { key: label + '_' + value, label: label, value: value, checked: this.state.selected && this.selected.has(value), onChange: this.handleChange, hint: hint };

            res.push(
                this.props.divided ? (
                    <Divided key={label + '_' + value} >
                        <XCheckboxBasic {...checkboxProps} />
                    </Divided>
                ) : (
                        <XCheckboxBasic {...checkboxProps} />
                    ));
        }
        return (
            res
        );
    }
}

class XCheckboxStored extends React.PureComponent<XCheckboxProps & { store: XStoreState }> {
    handleChange = (src: { label: string, checked: boolean }) => {
        let val = src.checked ? (this.props.trueValue !== undefined ? this.props.trueValue : 'true') : (this.props.falseValue !== undefined ? this.props.falseValue : 'false');
        this.props.store.writeValue(this.props.valueStoreKey || ('fields.' + this.props.field), val);
    }

    render() {
        let { valueStoreKey, store, field, ...other } = this.props;
        let value: any = this.props.value;
        if (valueStoreKey || field) {
            value = store.readValue(valueStoreKey || ('fields.' + field));
        }
        console.warn(this.props.trueValue !== undefined ? this.props.trueValue === value : value === 'true');
        return <XCheckboxBasic {...other} checked={this.props.trueValue !== undefined ? this.props.trueValue === value : value === 'true'} onChange={this.handleChange} />;
    }
}

export type XCheckboxProps = ActionableParentProps<XCheckboxBasicProps & {
    field?: string;
    valueStoreKey?: string;
}>;

class XCheckboxRaw extends React.PureComponent<XCheckboxProps> {
    render() {
        if (this.props.field || this.props.valueStoreKey) {
            let { valueStoreKey, field, ...other } = this.props;
            let valueStoreKeyCached = valueStoreKey;
            let fieldCached = field;
            return (
                <XStoreContext.Consumer>
                    {store => {
                        if (!store) {
                            throw Error('No store!');
                        }
                        return (
                            <XCheckboxStored
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
        return <XCheckboxBasic {...this.props} />;
    }
}

export const XCheckbox = makeActionable<XCheckboxProps>((props) => {
    return (
        <XCheckboxRaw {...props} />
    );
});