import Glamorous from 'glamorous';
import XStyles from './XStyles';
import { XIcon } from './XIcon';
import * as React from 'react';

const CheckboxInputDiv = Glamorous.div<{ active: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    // '&:last-child': {
    //     marginBottom: 22,
    // },
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
            // marginBottom: 3,
            '> i': {
                width: 16,
                height: 16,
                borderRadius: 3.5,
                color: '#fff',
                backgroundColor: props.active ? '#4428e0' : '#fff',
                border: '1px solid rgba(97, 126, 156, 0.2)',
                fontSize: 13,
                lineHeight: '14px',
                marginRight: 10,
                paddingLeft: 1
            },
            '> div': {
                width: 16,
                height: 16,
                borderRadius: 50,
                backgroundColor: props.active ? '#4428e0' : '#fff',
                border: '1px solid rgba(97, 126, 156, 0.2)',
                marginRight: 10,
                position: 'relative',
                '&::after': {
                    content: props.active ? `''` : undefined,
                    width: 8,
                    height: 8,
                    borderRadius: 50,
                    backgroundColor: '#ffffff',
                    position: 'absolute',
                    top: 3,
                    left: 3
                }
            },
            '> span': {
                color: '#1f3449'
            },
        },
        '& .bottom-content': {
            paddingLeft: 27,
            width: 245,
            opacity: 0.4,
            fontSize: 13,
            lineHeight: 1.23,
            letterSpacing: - 0.1,
            color: '#1f3449'
        }
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

class XCheckboxProps { label: string; value?: string; onChange?: (checked: { label: string, checked: boolean }) => void; checked?: boolean; hint?: string; }

export class XCheckbox extends React.Component<XCheckboxProps, { isChecked: boolean }> {
    static defaultProps = {
        _isCheckBox: true
    };
    constructor(props: XCheckboxProps) {
        super(props);

        this.state = {
            isChecked: this.props.checked !== undefined ? this.props.checked : false
        };

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

        return (
            <CheckboxInputDiv active={this.state.isChecked} >
                <input onChange={this.handleChange} id={id} type="checkbox" checked={this.state.isChecked} />
                <label htmlFor={id}>
                    <div className="top-content">
                        <XIcon icon={this.state.isChecked ? 'done' : ''} />
                        <span>{this.props.label}</span>
                    </div>
                    {this.props.hint && <div className="bottom-content">{this.props.hint}</div>}
                </label>
            </CheckboxInputDiv>
        );
    }
}

class XCheckboxGroupProps { elements: string[] | { value: string, label: string, hint?: string}[]; selected?: string[]; onChange?: (value: string[]) => void; divided?: boolean; }
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
            
            res.push(
                this.props.divided ? (
                    <Divided key={label + '_' + value} >
                        <XCheckbox key={label + '_' + value} label={label} value={value} checked={this.state.selected && this.selected.has(value)} onChange={this.handleChange} hint={hint}/>
                    </Divided>
                ) : (
                        <XCheckbox key={label + '_' + value} label={label} value={value} checked={this.state.selected && this.selected.has(value)} onChange={this.handleChange} />
                    ));
        }
        return (
            res
        );
    }
}