import * as React from 'react';
import { XButton, XButtonStyleProps } from 'openland-x/XButton';
import { XFormContext, XFormContextValue } from './XFormContext';
import { delay } from 'openland-y-utils/timer';
import CheckIcon from './icons/ic-check.svg';

class FormSubmit extends React.PureComponent<XFormSubmitProps & { form: XFormContextValue }, { loading: boolean, success: boolean }> {
    state = {
        loading: false,
        success: false,
    };

    keydownHandler = async (e: any) => {
        if (e.keyCode === 13 && (e.ctrlKey || e.metaKey) && this.props.keyDownSubmit !== false) {
            await this.submit();
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    handleClick = async () => {
        await this.submit();
    }

    submit = async () => {
        this.setState({ loading: true });
        await this.props.form.submit(this.props.action);
        if (this.props.succesText) {
            this.setState({ loading: false, success: !this.props.form.store.readValue('form.error') });
            delay(2000).then(() => this.setState({ success: false }));
        } else {
            this.setState({ loading: false });
        }

    }

    render() {
        let { action, ...other } = this.props;
        let formEnabled = !!this.props.form.store.readValue('form.enabled');
        other.text = this.state.success ? this.props.succesText : other.text;
        return (
            <XButton
                {...other}
                onClick={this.handleClick}
                enabled={this.state.loading || formEnabled}
                loading={this.state.loading}
                style={this.state.success ? 'success' : other.style}
                icon={this.state.success ? <CheckIcon/> : other.icon}
            />
        );
    }
}

export interface XFormSubmitProps extends XButtonStyleProps {
    action?: (data: any) => any;
    keyDownSubmit?: boolean;
    succesText?: string;
}

export function XFormSubmit(props: XFormSubmitProps) {
    return (
        <XFormContext.Consumer>
            {form => {
                if (!form) {
                    throw Error('Unable to find form!');
                }
                return <FormSubmit {...props} form={form} />;
            }}
        </XFormContext.Consumer>
    );
}