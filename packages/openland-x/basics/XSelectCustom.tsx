import * as React from 'react';
import Glamorous from 'glamorous';
import { XFlexStyles, applyFlex } from 'openland-x/basics/Flex';
import { XTag } from '../XTag';
import { XSelectProps, XSelect } from '../XSelect';
import { Option } from 'react-select';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XPopper } from '../XPopper';
import { MultiplePicker } from '../XMultiplePicker';
import { UserPicker } from '../XUserPicker';
import { delay } from 'openland-y-utils/timer';
import { isNumber } from 'util';

const Container = Glamorous(XHorizontal)<{ rounded?: boolean } & XFlexStyles>([
    (props) => ({
        minHeight: props.rounded ? 40 : 48,
        display: 'flex',
        flexDirection: 'row',
        flexWrap: 'wrap',
        cursor: 'text',
        borderRadius: props.rounded ? 10 : 5,
        paddingTop: 2,
        paddingBottom: 1,
        paddingLeft: 8,
        paddingRight: 8,
        border: 'solid 1px rgba(220, 222, 228, 0.45)',
        '&:focus-within': {
            boxShadow: `0 0 0 2px rgba${props.rounded ? '(23, 144, 255, 0.2)' : '(143, 124, 246, 0.2)'}`,
            border: `1px solid ${props.rounded ? '#74bcff' : '#986AFE'}`,
            '> .icon': {
                color: '#986AFE'
            },
            '& .popper': {
                color: '#8A80E7'
            }
        },
    }),
    applyFlex]
);

const Input = Glamorous.input<{ rounded?: boolean }>((props) => ({
    height: props.rounded ? 38 : 46,
    flexGrow: 1,
    marginTop: -2,
    marginBottom: -4,
    marginRight: -8,
    marginLeft: -8,
    paddingLeft: 8,
    paddingRight: 8,
    fontSize: props.rounded ? 14 : 16,
    letterSpacing: -0.2,
    color: '#334562',
    outline: 'none',
    '&::placeholder': {
        color: '#9d9d9d'
    }
}));

interface XSelectCustomState {
    lastValue: Option<string>[];
    inputVal: string;
    focus?: boolean;
}

interface XSelectCustomProps extends XSelectProps, XFlexStyles {
    placeholder?: string;
    popper?: boolean;
    rounded?: boolean;
    helpText?: string;
}

const CustomContentDiv = Glamorous<{ paddingTop?: number; paddingBottom?: number }>(XPopper.Content)((props) => ({
    boxShadow: '0 0 0 1px rgba(136, 152, 170, .1), 0 15px 35px 0 rgba(49, 49, 93, .1), 0 5px 15px 0 rgba(0, 0, 0, .08)',
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: isNumber(props.paddingTop) ? props.paddingTop : 8,
    paddingBottom: isNumber(props.paddingBottom) ? props.paddingBottom : 8
}));

export class XSelectCustomInputRender extends React.Component<XSelectCustomProps, XSelectCustomState> {
    input?: any;
    constructor(props: XSelectCustomProps) {
        super(props);

        this.state = {
            inputVal: '',
            lastValue: (props.value as Option<string>[] || [])
        };
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
                lastValue: (props.value as Option<string>[]) || [],
            },
            () => {
                if (this.input && this.input.inputRef && this.input.inputRef) {
                    this.input.inputRef.inputRef.focus();
                }
            });

    }

    keydownHandler = (e: any) => {
        if (this.state.focus && e.code === 'Backspace' && this.state.inputVal === '' && this.state.lastValue.length > 0) {
            e.preventDefault();
            this.onDelete(this.state.lastValue[this.state.lastValue.length - 1].value);
        }
    }

    focusInHandler = (e: any) => {
        this.setState({ focus: true });
    }

    focusOutHandler = () => {
        this.setState({ focus: false });
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
        } else {
            this.setState({ lastValue: res });
        }
    }

    onPick = (option: { type: string | null, label: string, value: string }) => {
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
            opacity,
            rounded
        } = this.props;

        let options = this.props.options as { type: string | null, label: string, value: string }[];
        let inputValue = this.state.inputVal;
        if (inputValue === null) {
            inputValue = '';
        }

        let input = (
            <Input
                innerRef={this.handleRef}
                value={inputValue}
                placeholder={(this.state.lastValue || []).length === 0 ? this.props.placeholder : ''}
                autoFocus={this.props.autoFocus}
                onChange={this.onInputChange}
                onFocus={this.focusInHandler}
                rounded={rounded}
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
                rounded={rounded}
            >
                {((this.state.lastValue as Option<string>[]) || []).map(v => (
                    <XTag
                        key={v.value}
                        icon="x-close"
                        size={rounded ? 'default' : 'large'}
                        text={options.find(o => o.value === v.value) ? options.find(o => o.value === v.value)!!.label : v.label}
                        onClick={() => this.onDelete(v.value)}
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
                        contentContainer={(
                            <CustomContentDiv />
                        )}
                        content={
                            <MultiplePicker
                                query={this.state.inputVal}
                                options={[{ values: options.filter(o => !(this.state.lastValue || []).find(l => l.value === o.value)) }]}
                                onPick={this.onPick}
                                helpText={this.props.helpText}
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

export class XSelectCustomUsersRender extends React.Component<XSelectCustomProps & { inCompose?: boolean }, XSelectCustomState> {
    input?: any;
    constructor(props: XSelectCustomProps) {
        super(props);

        this.state = {
            inputVal: '',
            lastValue: (props.value as Option<string>[] || [])
        };
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
                lastValue: (props.value as Option<string>[]) || [],
            },
            () => {
                if (this.input && this.input.inputRef && this.input.inputRef) {
                    this.input.inputRef.inputRef.focus();
                }
            });
    }

    keydownHandler = (e: any) => {
        if (this.state.focus && e.code === 'Backspace' && this.state.inputVal === '' && this.state.lastValue.length > 0) {
            e.preventDefault();
            this.onDelete(this.state.lastValue[this.state.lastValue.length - 1].value);
        }
    }

    focusInHandler = (e: any) => {
        this.setState({ focus: true });
    }

    focusOutHandler = () => {
        this.setState({ focus: false });
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
        } else {
            this.setState({ lastValue: res });
        }
    }

    onPick = (option: { type: string | null, label: string, value: string }) => {
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
            opacity,
            rounded
        } = this.props;

        let options = this.props.options as { type: string | null, label: string, value: string, photo: string | null, org: string | null }[];
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
                rounded={rounded}
            >
                {((this.state.lastValue as Option<string>[]) || []).map(v => (
                    <XTag
                        key={v.value}
                        icon="x-close"
                        size={rounded ? 'default' : 'large'}
                        text={options.find(o => o.value === v.value) ? options.find(o => o.value === v.value)!!.label : 'Loading...'}
                        onClick={() => this.onDelete(v.value)}
                    />
                ))}
                <XPopper
                    placement="bottom-start"
                    arrow={null}
                    zIndex={999}
                    animation={null}
                    show={this.state.inputVal.length > 0 || this.state.focus}
                    onClickOutside={this.focusOutHandler}
                    contentContainer={(
                        <CustomContentDiv paddingTop={0} paddingBottom={0} />
                    )}
                    content={
                        <UserPicker
                            query={this.state.inputVal}
                            options={[{ values: options.filter(o => !(this.state.lastValue || []).find(l => l.value === o.value)) }]}
                            onPick={this.onPick}
                            inCompose={this.props.inCompose}
                        />
                    }
                >
                    <Input
                        innerRef={this.handleRef}
                        value={inputValue}
                        placeholder={(this.state.lastValue || []).length === 0 ? this.props.placeholder : ''}
                        autoFocus={this.props.autoFocus}
                        onChange={this.onInputChange}
                        onFocus={this.focusInHandler}
                        rounded={rounded}
                    />
                </XPopper>
            </Container>
        );
    }
}