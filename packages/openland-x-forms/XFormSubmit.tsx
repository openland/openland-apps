import * as React from 'react';
import { XButton, XButtonStyleProps } from 'openland-x/XButton';
import { XFormContext, XFormContextValue } from './XFormContext';

class FormSubmit extends React.PureComponent<XFormSubmitProps & { form: XFormContextValue }, { loading: boolean }> {
    state = {
        loading: false
    };

    keydownHandler = (e: any) => {
        if (e.keyCode === 13 && (e.ctrlKey || e.metaKey) && this.props.keyDownSubmit !== false) {
            this.setState({ loading: true });
            this.props.form.submit(this.props.action);
            this.setState({ loading: false });
        }
    }

    componentDidMount() {
        document.addEventListener('keydown', this.keydownHandler);
    }

    componentWillUnmount() {
        document.removeEventListener('keydown', this.keydownHandler);
    }

    handleClick = async () => {
        this.setState({ loading: true });
        await this.props.form.submit(this.props.action);
        this.setState({ loading: false });
    }

    render() {
        let { action, ...other } = this.props;
        let formEnabled = !!this.props.form.store.readValue('form.enabled');
        return (
            <XButton
                {...other}
                onClick={this.handleClick}
                enabled={this.state.loading || formEnabled}
                loading={this.state.loading}
            />
        );
    }
}

export interface XFormSubmitProps extends XButtonStyleProps {
    action?: (data: any) => any;
    keyDownSubmit?: boolean;
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