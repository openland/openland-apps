import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';
import { XTag } from '../XTag';
// import { XSelectProps, XSelectAsyncProps } from '../XSelect';
import { XSelectProps } from '../XSelect';
import { Option } from 'react-select';
import { XHorizontal } from 'openland-x-layout/XHorizontal';

const Container = Glamorous(XHorizontal)<XFlexStyles>([{
    minHeight: 48,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    cursor: 'text',
    borderRadius: 5,
    paddingTop: 3,
    paddingBottom: 3,
    paddingLeft: 8,
    paddingRight: 8,
    border: 'solid 1px rgba(220, 222, 228, 0.45)',
    '&:focus-within': {
        boxShadow: '0 0 0 2px rgba(143, 124, 246, 0.2)',
        border: '1px solid #986AFE',
        '> .icon': {
            color: '#986AFE'
        },
        '& .popper': {
            color: '#8A80E7'
        }
    },
}, applyFlex]);

const Input = Glamorous.input({
    height: 46,
    flexGrow: 1,
    marginTop: -4,
    marginBottom: -4,
    marginRight: -8,
    marginLeft: -8,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 16,
    letterSpacing: -0.2,
    color: '#334562',
    outline: 'none',
    '&::placeholder': {
        color: '#9d9d9d'
    }
});

interface XSelectCustomState {
    lastValue: Option<string>[];
    inputVal: string;
}

interface XSelectCustomProps extends XSelectProps, XFlexStyles {
    placeholder?: string;
}

export class XSelectCustom extends React.Component<XSelectCustomProps, XSelectCustomState> {
    input?: any;
    constructor(props: XSelectCustomProps) {
        super(props);
        this.state = { inputVal: '', lastValue: (props.value as Option<string>[]) };
    }

    handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    }

    // componentWillReceiveProps(props: XSelectAsyncProps) { ///----- neeed fix

    componentWillReceiveProps(props: any) {
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

    onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        this.setState({
            inputVal: e.currentTarget.value
        });
        if (this.props.onInputChange) {
            this.props.onInputChange(e.currentTarget.value);
        }
    }

    onDelete = (value?: string) => {
        let res = this.state.lastValue.filter(v => v.value !== value);
        if (this.props.onChange) {
            this.props.onChange(res);
        }
    }

    render() {
        const {
            alignSelf,
            justifyContent,
            flexGrow,
            flexShrink,
            flexBasis,
            width,
            height,
            minHeight,
            minWidth,
            maxHeight,
            maxWidth,
            zIndex,
            opacity
        } = this.props;

        let inputValue = this.state.inputVal;
        if (inputValue === null) {
            inputValue = '';
        }

        return (
            <Container
                separator={4}
                alignSelf={alignSelf}
                justifyContent={justifyContent}
                flexGrow={flexGrow}
                flexShrink={flexShrink}
                flexBasis={flexBasis}
                width={width}
                height={height}
                minHeight={minHeight}
                minWidth={minWidth}
                maxHeight={maxHeight}
                maxWidth={maxWidth}
                zIndex={zIndex}
                opacity={opacity}
            >
                {((this.state.lastValue as Option<string>[]) || []).map(v => (
                    <XTag
                        key={v.value}
                        icon="close"
                        size="large"
                        text={v.label}
                        onClick={() => this.onDelete(v.value)}
                    />
                ))}
                <Input
                    innerRef={this.handleRef}
                    value={inputValue}
                    placeholder={this.props.placeholder}
                    autoFocus={true}
                    onChange={this.onInputChange}
                />
            </Container>
        );
    }
}