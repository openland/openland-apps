import * as React from 'react';
import { XButton, XButtonStyleProps } from 'openland-x/XButton';
import { XFormContext, XFormContextValue } from './XFormContext';

class FormSubmit extends React.PureComponent<XFormSubmitProps & { form: XFormContextValue }> {
    handleClick = () => {
        this.props.form.submit(this.props.action);
    }
    render() {
        let { action, ...other } = this.props;
        return (
            <XButton
                {...other}
                onClick={this.handleClick}
                enabled={!!this.props.form.store.readValue('form.enabled')}
            />
        );
    }
}

export interface XFormSubmitProps extends XButtonStyleProps {
    action?: (data: any) => any;
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