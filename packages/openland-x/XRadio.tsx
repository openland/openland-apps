import Glamorous from 'glamorous';
import XStyles from '../openland-web/components/X/XStyles';
import * as React from 'react';

const CheckboxInputDiv = Glamorous.div<{ active: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    '> input': {
        display: 'none'
    },
    '> label': {
        ...XStyles.text.h400,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: props.active ? '#4428e0' : '#525f7f',
        cursor: 'pointer',
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
        }
    }
}));

export class XRadioItem extends React.Component<{ label: string, value?: string, checked?: boolean, onChange?: (checked?: string) => void, useAnyOption?: boolean }> {
    static defaultProps = {
        _isRadioItem: true
    };

    constructor(props: { label: string, value?: string, checked?: boolean, onChange?: (checked?: string) => void }) {
        super(props);

        this.state = {
            isChecked: this.props.checked
        };

    }

    handleChange = () => {
        if (this.props.onChange) {
            this.props.onChange(this.props.checked ? undefined : this.props.value !== undefined ? this.props.value : this.props.label);
        }
    }

    render() {
        const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;

        return (
            <CheckboxInputDiv active={this.props.checked !== undefined ? this.props.checked : false}>
                <input onClick={this.props.useAnyOption === false ? this.handleChange : undefined} onChange={this.props.useAnyOption === false ? undefined : this.handleChange} id={id} type="radio" checked={this.props.checked} />
                <label htmlFor={id}>
                    <div />
                    <span>{this.props.label}</span>
                </label>
            </CheckboxInputDiv>
        );
    }
}

class XRadioProps { elements?: string[] | { value: string, label: string }[]; selected?: string; onChange?: (value?: string) => void; useAnyOption?: boolean; }
export class XRadioGroup extends React.Component<XRadioProps, { selected?: string }> {
    static defaultProps = {
        _isRadioGroup: true
    };
    constructor(props: XRadioProps) {
        super(props);
        this.state = {
            selected: props.selected
        };
    }
    handleChange = (checked?: string) => {
        if (checked === 'any_option_value_stub') {
            checked = undefined;
        }
        if (this.props.onChange) {
            this.props.onChange(checked);
        }
        this.setState({ selected: checked });
    }

    modifyProps = (component: any): any => {
        let res: any = {};
        if (component.props && component.props._isRadioItem) {
            res.checked = (component.props.value !== undefined ? component.props.value : component.props.label) === this.state.selected;
            res.onChange = this.handleChange;
            res.useAnyOption = this.props.useAnyOption;
        }

        return res;
    }

    render() {

        let children: any[] = [];

        for (let c of React.Children.toArray(this.props.children)) {
            children.push(React.cloneElement(c as any, this.modifyProps(c)));
        }

        if (this.props.elements) {
            for (let element of this.props.elements) {
                let label = (element as any).label !== undefined ? (element as any).label : element;
                let value = (element as any).value !== undefined ? (element as any).value : element;
                children.push(
                    <XRadioItem key={label + '_' + value} label={label} value={value} checked={value === this.state.selected} onChange={this.handleChange} useAnyOption={this.props.useAnyOption}/>
                );
            }

        }
        if (this.props.useAnyOption !== false) {
            children.push(
                <XRadioItem key={'any_option'} label={'Any'} value={'any_option_value_stub'} checked={this.state.selected === undefined} onChange={this.handleChange} />
            );
        }

        return (
            children
        );
    }
}