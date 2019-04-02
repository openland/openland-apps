import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';
import { XTag } from '../XTag';
import { XSelectProps } from '../XSelect';
import { Option } from 'react-select';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XPopper } from '../XPopper';
import { UserPicker } from '../XUserPicker';
import { isNumber } from 'util';

const Container = Glamorous(XHorizontal)<XFlexStyles>([
    {
        backgroundColor: '#f2f3f4',
        minHeight: 52,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        cursor: 'text',
        borderRadius: 8,
        paddingTop: 8,
        paddingBottom: 1,
        paddingLeft: 10,
        paddingRight: 10,
        border: 'solid 1px transparent',
        '&:focus-within': {
            borderBottom: '1px solid #1790ff',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            '> .icon': {
                color: '#1790ff',
            },
            '& .popper': {
                color: '#1790ff',
            },
        },
    },
    applyFlex,
]);

const Input = Glamorous.input({
    height: 38,
    flexGrow: 1,
    marginTop: -2,
    marginBottom: -4,
    marginRight: -8,
    marginLeft: -8,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: 14,
    color: '#000',
    outline: 'none',
    '&::placeholder': {
        color: '#696c6e',
    },
});

interface XSelectCustomState {
    lastValue: Option<string>[];
    inputVal: string;
    focus?: boolean;
}

interface XSelectCustomProps extends XSelectProps, XFlexStyles {
    placeholder?: string;
    popper?: boolean;
    helpText?: string;
    inCompose?: boolean;
}

const CustomContentDiv = Glamorous<{ paddingTop?: number; paddingBottom?: number }>(
    XPopper.Content,
)(props => ({
    boxShadow:
        '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: isNumber(props.paddingTop) ? props.paddingTop : 8,
    paddingBottom: isNumber(props.paddingBottom) ? props.paddingBottom : 8,
}));

export class XSelectCustomUsersRender extends React.Component<
    XSelectCustomProps,
    XSelectCustomState
> {
    input?: any;
    constructor(props: XSelectCustomProps) {
        super(props);

        this.state = {
            inputVal: '',
            lastValue: (props.value as Option<string>[]) || [],
        };
    }

    handleRef = (e: any) => {
        if (e === null) {
            return;
        }
        this.input = e;
    };

    componentWillReceiveProps(props: XSelectCustomProps) {
        if (
            ((this.state.lastValue as Option<string>[]) || []).length !==
            ((props.value as Option<string>[]) || []).length
        ) {
            this.setState({
                inputVal: '',
            });
            if (this.props.onInputChange) {
                this.props.onInputChange('');
            }
        }
        this.setState(
            {
                lastValue: (props.value as Option<string>[]) || [],
            },
            () => {
                if (this.input && this.input.inputRef && this.input.inputRef) {
                    this.input.inputRef.inputRef.focus();
                }
            },
        );
    }

    keydownHandler = (e: any) => {
        if (
            this.state.focus &&
            e.code === 'Backspace' &&
            this.state.inputVal === '' &&
            this.state.lastValue.length > 0
        ) {
            e.preventDefault();
            this.onDelete(this.state.lastValue[this.state.lastValue.length - 1].value);
        }
    };

    focusInHandler = (e: any) => {
        this.setState({ focus: true });
    };

    focusOutHandler = () => {
        this.setState({ focus: false });
    };

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    onInputChange = (e: React.FormEvent<HTMLInputElement>) => {
        if (this.props.multi === false && this.state.lastValue[0] !== undefined) {
            return;
        }
        this.setState({
            inputVal: e.currentTarget.value,
        });
        if (this.props.onInputChange) {
            this.props.onInputChange(e.currentTarget.value);
        }
    };

    onDelete = (value?: string) => {
        let res = this.state.lastValue.filter(v => v.value !== value);
        if (this.props.onChange) {
            this.props.onChange(res);
        } else {
            this.setState({ lastValue: res });
        }
    };

    onPick = (option: { type: string | null; label: string; value: string }) => {
        if (this.props.multi === false && this.state.lastValue[0] !== undefined) {
            return;
        }
        let res = this.state.lastValue;
        if (!(res || []).find(i => i.value === option.value)) {
            res.push(option);
        }
        if (this.props.onChange) {
            this.props.onChange(res);
            this.setState({ inputVal: '', focus: false });
        } else {
            this.setState({ lastValue: res, inputVal: '', focus: false });
        }
    };

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
            opacity,
        } = this.props;

        let options = this.props.options as {
            type: string | null;
            label: string;
            value: string;
            photo: string | null;
            org: string | null;
        }[];
        let inputValue = this.state.inputVal;
        if (inputValue === null) {
            inputValue = '';
        }

        const input = (
            <Input
                innerRef={this.handleRef}
                value={inputValue}
                placeholder={
                    (this.state.lastValue || []).length === 0 ? this.props.placeholder : ''
                }
                autoFocus={this.props.autoFocus}
                onChange={this.onInputChange}
                onFocus={this.focusInHandler}
            />
        );

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
                        icon="x-close"
                        text={
                            options.find(o => o.value === v.value)
                                ? options.find(o => o.value === v.value)!!.label
                                : options.length === 0
                                    ? 'Loading...'
                                    : v.label
                        }
                        onClick={() => this.onDelete(v.value)}
                        style="blue"
                    />
                ))}
                {!this.props.popper && input}
                {this.props.popper && (
                    <XPopper
                        placement="bottom-start"
                        arrow={null}
                        zIndex={999}
                        animation={null}
                        show={this.state.inputVal.length > 0 || this.state.focus}
                        onClickOutside={this.focusOutHandler}
                        contentContainer={<CustomContentDiv paddingTop={0} paddingBottom={0} />}
                        content={
                            <UserPicker
                                query={this.state.inputVal}
                                options={[
                                    {
                                        values: options.filter(
                                            o =>
                                                !(this.state.lastValue || []).find(
                                                    l => l.value === o.value,
                                                ),
                                        ),
                                    },
                                ]}
                                onPick={this.onPick}
                                inCompose={this.props.inCompose}
                            />
                        }
                    >
                        {input}
                    </XPopper>
                )}
            </Container>
        );
    }
}
