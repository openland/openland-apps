import * as React from 'react';
import Glamorous from 'glamorous';
import { XTag } from '../XTag';
import { XSelectProps, XSelectAsyncProps } from '../XSelect';
import { Option } from '../../../node_modules/@types/react-select';
import { XInput } from '../XInput';

const Container = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
});

export class XSelectCustom extends React.Component<XSelectProps, {
    lastValue: Option<string>[],
    inputVal: string
}> {
    input?: any;
    constructor(props: XSelectProps) {
        super(props);
        this.state = { inputVal: '', lastValue: (props.value as Option<string>[]) };
    }

    handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    }

    componentWillReceiveProps(props: XSelectAsyncProps) {
        if ((this.state.lastValue as any || []).length !== (props.value as any || []).length) {
            this.setState({
                inputVal: ''
            });
            if (this.props.onInputChange) {
                this.props.onInputChange('');
            }
        }
        this.setState(
            {
                lastValue: (props.value as Option<string>[]),
            },
            () => {
                if (this.input && this.input.inputRef && this.input.inputRef) {
                    this.input.inputRef.inputRef.focus();
                }
            });

    }

    keydownHandler = (e: any) => {
        if (e.code === 'Backspace' && this.state.inputVal === '' && this.state.lastValue.length > 0) {
            e.preventDefault();
            this.onDelete(this.state.lastValue[this.state.lastValue.length - 1].value);
        }

        // if (e.code === 'Enter' && this.props.creatable && this.props.onChange && this.state.inputVal.length > 0) {
        //     e.preventDefault();
        //     // prevent duplicates
        //     if ((this.state.lastValue || []).map(v => v.value).filter(v => v === this.state.inputVal).length === 0) {
        //         this.props.onChange([...(this.state.lastValue || []), { label: this.state.inputVal, value: this.state.inputVal }]);
        //     } else {
        //         this.setState({ inputVal: '' });
        //     }
        // }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    onInputChange = (v: string) => {
        this.setState({
            inputVal: v
        });
        if (this.props.onInputChange) {
            this.props.onInputChange(v);
        }
    }

    onDelete = (value?: string) => {
        let res = this.state.lastValue.filter(v => v.value !== value);
        if (this.props.onChange) {
            this.props.onChange(res);
        }
    }

    render() {
        return (
            <Container>
                {((this.state.lastValue as Option<string>[]) || []).map(v => <XTag key={v.value} icon="close" text={v.label} onClick={() => this.onDelete(v.value)} />)}
                <XInput ref={this.handleRef} autofocus={true} value={this.state.inputVal} onChange={this.onInputChange} />
            </Container>
        );
    }
}