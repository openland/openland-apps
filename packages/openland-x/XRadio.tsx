import Glamorous from 'glamorous';
import XStyles from './XStyles';
import * as React from 'react';

const CheckboxInputDiv = Glamorous.div<{ active: boolean }>(props => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 14,
    '> input': {
        display: 'none',
    },
    '> label': {
        ...XStyles.text.h400,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: props.active ? '#000000' : '#525f7f',
        cursor: 'pointer',
        width: '100%',
        '> span': {
            color: '#1f3449',
        },
    },
}));

const CheckIcon = Glamorous.div<{ active?: boolean }>(props => ({
    flexShrink: 0,
    width: 16,
    height: 16,
    borderRadius: 50,
    color: '#fff',
    backgroundSize: 12,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    border: '1px solid',
    borderColor: props.active ? '#1790ff' : 'rgba(0, 0, 0, 0.15)',
    marginRight: 12,
    position: 'relative',
    '&::after': {
        backgroundColor: '#1790ff',
        borderRadius: 50,
        position: 'absolute',
        top: 3,
        left: 3,
        width: 8,
        height: 8,
        content: props.active ? `''` : undefined,
    },
}));

export class XRadioItem extends React.Component<{
    label: string;
    value?: string;
    checked?: boolean;
    onChange?: (checked?: string) => void;
    useAnyOption?: boolean;
}> {
    static defaultProps = {
        _isRadioItem: true,
    };

    constructor(props: {
        label: string;
        value?: string;
        checked?: boolean;
        onChange?: (checked?: string) => void;
    }) {
        super(props);

        this.state = {
            isChecked: this.props.checked,
        };
    }

    handleChange = () => {
        if (this.props.onChange) {
            this.props.onChange(
                this.props.checked
                    ? undefined
                    : this.props.value !== undefined
                        ? this.props.value
                        : this.props.label,
            );
        }
    };

    render() {
        const id = `toggle_${Math.random()
            .toString()
            .replace(/0\./, '')}`;

        return (
            <CheckboxInputDiv
                active={this.props.checked !== undefined ? this.props.checked : false}
            >
                <input
                    onClick={this.props.useAnyOption === false ? this.handleChange : undefined}
                    onChange={this.props.useAnyOption === false ? undefined : this.handleChange}
                    id={id}
                    type="radio"
                    checked={this.props.checked}
                />
                <label htmlFor={id}>
                    <CheckIcon active={this.props.checked} />
                    <span>{this.props.label}</span>
                </label>
            </CheckboxInputDiv>
        );
    }
}

class XRadioProps {
    elements?: string[] | { value: string; label: string }[];
    selected?: string;
    onChange?: (value?: string) => void;
    useAnyOption?: boolean;
    anyOptionOrder?: 'before' | 'after';
    anyOptionName?: string;
}

export class XRadioGroup extends React.Component<XRadioProps, { selected?: string }> {
    static defaultProps = {
        _isRadioGroup: true,
    };
    constructor(props: XRadioProps) {
        super(props);
        this.state = {
            selected: props.selected,
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
    };

    modifyProps = (component: any): any => {
        let res: any = {};
        if (component.props && component.props._isRadioItem) {
            res.checked =
                (component.props.value !== undefined
                    ? component.props.value
                    : component.props.label) === this.state.selected;
            res.onChange = this.handleChange;
            res.useAnyOption = this.props.useAnyOption;
        }

        return res;
    };

    render() {
        let children: any[] = [];

        for (let c of React.Children.toArray(this.props.children)) {
            children.push(React.cloneElement(c as any, this.modifyProps(c)));
        }

        if (this.props.useAnyOption !== false && this.props.anyOptionOrder === 'before') {
            children.push(
                <XRadioItem
                    key={'any_option'}
                    label={this.props.anyOptionName || 'Any'}
                    value={'any_option_value_stub'}
                    checked={this.state.selected === undefined}
                    onChange={this.handleChange}
                />,
            );
        }

        if (this.props.elements) {
            for (let element of this.props.elements) {
                let label = (element as any).label !== undefined ? (element as any).label : element;
                let value = (element as any).value !== undefined ? (element as any).value : element;
                children.push(
                    <XRadioItem
                        key={label + '_' + value}
                        label={label}
                        value={value}
                        checked={value === this.state.selected}
                        onChange={this.handleChange}
                        useAnyOption={this.props.useAnyOption}
                    />,
                );
            }
        }
        if (this.props.useAnyOption !== false && this.props.anyOptionOrder !== 'before') {
            children.push(
                <XRadioItem
                    key={'any_option'}
                    label={this.props.anyOptionName || 'Any'}
                    value={'any_option_value_stub'}
                    checked={this.state.selected === undefined}
                    onChange={this.handleChange}
                />,
            );
        }

        return children;
    }
}
