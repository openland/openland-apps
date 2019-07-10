import * as React from 'react';
import { XButton, XButtonStyleProps } from 'openland-x/XButton';
import { XFormContext, XFormContextValue } from './XFormContext';
import { delay } from 'openland-y-utils/timer';
import CheckIcon from 'openland-icons/ic-check.svg';

export interface XFormSubmitProps extends XButtonStyleProps {
    action?: (data: any) => any;
    keyDownSubmit?: boolean;
    successText?: string;
    dataTestId?: string;
    onSuccessAnimationEnd?: () => any;
    useOnlyEnterKey?: boolean;
    disableEnterKey?: boolean;
}

export class FormSubmit extends React.PureComponent<
    XFormSubmitProps & { form: XFormContextValue },
    { loading: boolean; success: boolean }
> {
    state = {
        loading: false,
        success: false,
    };

    keydownHandler = async (e: any) => {
        const { props } = this;
        if (
            e.keyCode === 13 &&
            props.useOnlyEnterKey &&
            props.keyDownSubmit !== false &&
            !e.shiftKey
        ) {
            await this.submit();
        }
        if (e.keyCode === 13 && (e.ctrlKey || e.metaKey) && props.keyDownSubmit !== false) {
            await this.submit();
        }
    }

    componentDidMount() {
        if (this.props.disableEnterKey) {
            return;
        }
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        if (this.props.disableEnterKey) {
            return;
        }
        document.removeEventListener('keydown', this.keydownHandler);
    }

    handleClick = async () => {
        await this.submit();
    }

    submit = async () => {
        this.setState({ loading: true });
        await this.props.form.submit(this.props.action);
        if (this.props.successText) {
            this.setState({
                loading: false,
                success: !this.props.form.store.readValue('form.error'),
            });

            delay(2000).then(() => {
                this.setState({ success: false });

                if (this.props.onSuccessAnimationEnd) {
                    this.props.onSuccessAnimationEnd();
                }
            });
        } else {
            this.setState({ loading: false });
        }
    }

    render() {
        let { action, ...other } = this.props;
        let formEnabled = !!this.props.form.store.readValue('form.enabled');
        other.text = this.state.success ? this.props.successText : other.text;
        return (
            <XButton
                {...other}
                onClick={this.handleClick}
                enabled={this.state.loading || formEnabled}
                loading={this.state.loading || other.loading}
                style={this.state.success ? 'success' : other.style}
                icon={this.state.success ? <CheckIcon /> : other.icon}
            />
        );
    }
}

export const XFormSubmit = React.forwardRef<FormSubmit, XFormSubmitProps>(
    (props: XFormSubmitProps, ref) => {
        return (
            <XFormContext.Consumer>
                {form => {
                    if (!form) {
                        throw Error('Unable to find form!');
                    }
                    return <FormSubmit {...props} form={form} ref={ref} />;
                }}
            </XFormContext.Consumer>
        );
    },
);
