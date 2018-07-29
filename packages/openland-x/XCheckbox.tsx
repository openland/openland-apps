import * as React from 'react';
import XStyles from './XStyles';
import Glamorous from 'glamorous';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XStoreContext } from 'openland-y-store/XStoreContext';

const CheckboxInputDiv = Glamorous.div<{ active: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    '> input': {
        display: 'none'
    },
    '> label': {
        ...XStyles.text.h400,
        display: 'flex',
        flexDirection: 'column',
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
    }
}));

const CheckIcon = Glamorous.div<{ active?: boolean }>((props) => ({
    width: 18,
    height: 18,
    borderRadius: 3.5,
    color: '#fff',
    backgroundColor: props.active ? '#4428e0' : '#fff',
    backgroundImage: props.active ? 'url(\'/static/img/icons/check-form.svg\')' : 'none',
    backgroundSize: 12,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid rgba(97, 126, 156, 0.2)',
    marginRight: 10,
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

interface XCheckboxBasicProps { label: string; trueValue?: string; falseValue?: string; value?: string; onChange?: (checked: { label: string, checked: boolean }) => void; checked?: boolean; hint?: string; }

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
        if (this.props.onChange) {
            this.props.onChange({ label: this.props.value !== undefined ? this.props.value : this.props.label, checked: !this.state.isChecked });
        }
        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;
        console.warn(this.state.isChecked);
        return (
            <CheckboxInputDiv active={this.state.isChecked} >
                <input onChange={this.handleChange} id={id} type="checkbox" checked={this.state.isChecked} />
                <label htmlFor={id}>
                    <div className="top-content">
                        <CheckIcon active={this.state.isChecked} />
                        <span>{this.props.label}</span>
                    </div>
                    {this.props.hint && <div className="bottom-content">{this.props.hint}</div>}
                </label>
            </CheckboxInputDiv>
        );
    }
}

interface XCheckboxGroupProps { elements: string[] | { value: string, label: string, hint?: string }[]; selected?: string[]; onChange?: (value: string[]) => void; divided?: boolean; }
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

export interface XCheckboxProps extends XCheckboxBasicProps {
    field?: string;
    valueStoreKey?: string;
}

export class XCheckbox extends React.PureComponent<XCheckboxProps> {

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
