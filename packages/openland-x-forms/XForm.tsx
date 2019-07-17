import * as React from 'react';
import * as PropTypes from 'prop-types';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { MutationFunc } from 'react-apollo';
import { XButton, XButtonProps } from 'openland-x/XButton';
import { XInput, XInputProps } from 'openland-x/XInput';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { XLoader } from 'openland-x/XLoader';
import { XRouter } from 'openland-x-routing/XRouter';
import { XModalContextValue, XModalContext } from 'openland-x-modal/XModalContext';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XTextArea } from 'openland-x/XTextArea';

export const XFormSelectStyle = Glamorous.select({
    height: 28,
    boxSizing: 'border-box',
    border: 'none',
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(50, 50, 93, .16), 0 0 0 1px rgba(50, 151, 211, 0), 0 0 0 2px rgba(50, 151, 211, 0), 0 1px 1px rgba(0, 0, 0, .08)',
    color: '#525f7f',
    backgroundColor: '#fff',
    fontSize: '14px',
    fontWeight: 400,
    lineHeight: 1.6,
    paddingTop: 2,
    paddingLeft: 5,
    paddingRight: 23,
    paddingBottom: 2,
    outline: 'none',
    appearance: 'none',
    backgroundImage: 'url(/static/X/arrow_down.svg)',
    backgroundSize: '24px',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'right',
    '&:focus': {
        boxShadow: '0 0 0 1px rgba(50, 50, 93, 0), 0 0 0 1px rgba(50, 151, 211, .2), 0 0 0 2px rgba(50, 151, 211, .25), 0 1px 1px rgba(0, 0, 0, .08)'
    }
});

export function XFormSelect(props: { options?: any[], value?: string | string[] | number, onChange?: (value: any) => void }) {
    return (
        <XFormSelectStyle value={props.value} onChange={props.onChange}>
            {props.options && props.options.map((item) => (
                <option value={item.value}>{item.title}</option>
            ))}
        </XFormSelectStyle>
    );
}

export interface XFormProps {

    //
    // Submit Handling
    //

    submitMutation?: MutationFunc<{}>;
    mutationDirect?: boolean;
    onSubmit?: (values: any) => void;
    prepare?: (values: any, prepareValues: any) => any;
    fillValues?: { [key: string]: any; };

    //
    // Complete Callbacks
    //

    completePath?: string;
    onCompleted?: (values: any) => void;
    autoClose?: boolean;
    keepLoading?: boolean;

    //
    // Configuration
    //

    defaultValues?: { [key: string]: any; };
}

interface XFormController {
    readValue(name: string): any;
    writeValue(name: string, value: any): void;
    submitForm(): void;
    addSubmitLock(lock: any): void;
    removeSubmitLock(lock: any): void;
}

interface XFormTextFieldProps extends XInputProps {
    field: string;
}

export class XFormTextField extends React.Component<XFormTextFieldProps, { value: string, locking?: boolean, invalid?: boolean }> {
    static contextTypes = {
        xForm: PropTypes.object.isRequired
    };

    constructor(props: XFormTextFieldProps, context: any) {
        super(props, context);
        let xForm = this.context.xForm as XFormController;
        let existing = xForm.readValue(this.props.field);
        if (this.props.value !== undefined) {
            this.state = { value: this.props.value };
        } else if (typeof existing === 'string') {
            this.state = { value: existing };
        } else if (existing) {
            this.state = { value: existing.toString() };
        } else {
            this.state = { value: '' };
        }
        const invalid = this.state.value.length === 0;
        if (invalid && this.props.required) {
            xForm.addSubmitLock(this);
        }
        this.state = { value: this.state.value, invalid: invalid };
    }

    handleChange = (val: string) => {
        let xForm = this.context.xForm as XFormController;
        // let val = src.target.value as string;
        const invalid = val.length === 0;
        this.setState({ value: val, invalid: invalid });
        xForm.writeValue(this.props.field, val);
        if (invalid && this.props.required) {
            xForm.addSubmitLock(this);
        } else {
            xForm.removeSubmitLock(this);
        }
    }

    render() {
        let { valueStoreKey, invalidStoreKey, enabledStoreKey, field, ...other } = this.props;
        return (
            <XInput {...other} onChange={this.handleChange} value={this.state.value} required={this.state.locking} invalid={this.state.locking && this.state.invalid} />
        );
    }
}

interface XFormBooleanFieldProps {
    field: string;
}

export class XFormBooleanField extends React.Component<XFormBooleanFieldProps, { value: boolean | null }> {
    static contextTypes = {
        xForm: PropTypes.object.isRequired
    };

    constructor(props: XFormBooleanFieldProps, context: any) {
        super(props, context);
        let xForm = this.context.xForm as XFormController;
        let existing = xForm.readValue(this.props.field);
        if (typeof existing === 'string') {
            if (existing === 'true') {
                this.state = { value: true };
            } else if (existing === 'false') {
                this.state = { value: false };
            } else {
                this.state = { value: null };
            }
        } else if (typeof existing === 'boolean') {
            this.state = { value: existing };
        } else {
            this.state = { value: null };
        }
    }

    handleChange = (src: any) => {
        let xForm = this.context.xForm as XFormController;
        let val = src.target.value as string;
        let cval = null;
        if (val === 'true') {
            cval = true;
        } else if (val === 'false') {
            cval = false;
        }
        this.setState({ value: cval });
        xForm.writeValue(this.props.field, cval);
    }
    render() {
        let value = 'null';
        if (this.state.value === true) {
            value = 'true';
        } else if (this.state.value === false) {
            value = 'false';
        }
        return (
            <XFormSelect
                options={[{ title: 'Unknown', value: 'null' }, { title: 'Yes', value: 'true' }, { title: 'No', value: 'false' }]}
                value={value}
                onChange={this.handleChange}
            />
        );
    }
}

export class XFormTextArea extends React.Component<XFormTextFieldProps, { value: string }> {
    static contextTypes = {
        xForm: PropTypes.object.isRequired
    };

    constructor(props: XFormTextFieldProps, context: any) {
        super(props, context);
        let xForm = this.context.xForm as XFormController;
        let existing = xForm.readValue(this.props.field);
        if (typeof existing === 'string') {
            this.state = { value: existing };
        } else if (existing) {
            this.state = { value: existing.toString() };
        } else {
            this.state = { value: '' };
        }
    }

    handleChange = (src: any) => {
        let xForm = this.context.xForm as XFormController;
        let val = src.target.value as string;
        this.setState({ value: val });
        xForm.writeValue(this.props.field, val);
    }
    render() {
        return (
            <XTextArea placeholder={this.props.placeholder} onChange={this.handleChange} value={this.state.value} />
        );
    }
}

interface XFormSelectFieldProps {
    field: string;
    options?: { value: string, title: string }[];
    component?: any;
    multi?: boolean;
}

export class XFormSelectField extends React.Component<XFormSelectFieldProps, { value: string | null }> {
    static contextTypes = {
        xForm: PropTypes.object.isRequired
    };

    constructor(props: XFormSelectFieldProps, context: any) {
        super(props, context);
        let xForm = this.context.xForm as XFormController;
        let existing = xForm.readValue(this.props.field);
        if (typeof existing === 'string') {
            this.state = { value: null };
            if (this.props.options) {
                for (let opt of this.props.options) {
                    if (opt.value === existing) {
                        this.state = { value: opt.value };
                        break;
                    }
                }
            }
        } else if (this.props.component) {
            this.state = { value: existing };
        } else {
            this.state = { value: null };
        }
    }

    handleChange = (src: any) => {
        let xForm = this.context.xForm as XFormController;
        if (this.props.component) {
            let val = src ? src.value as string : 'unknown';
            let cval = null;

            if (Array.isArray(src)) {
                if (src.length > 0) {
                    cval = src.map(r => r.value);
                }
            } else if (val !== 'unknown') {
                cval = val;
            }

            this.setState({ value: src });
            xForm.writeValue(this.props.field, cval);
        } else {
            let val = src ? (src.target ? (src.target.value as string) : src.value as string) : 'unknown';
            let cval = null;
            if (val !== 'unknown') {
                cval = val;
            }
            this.setState({ value: cval });
            xForm.writeValue(this.props.field, cval);
        }
    }
    render() {
        let options = undefined;
        if (this.props.options) {
            if (!this.props.multi) {
                options = [{ title: 'Unknown', value: 'unknown' }, ...this.props.options];
            } else {
                options = [...this.props.options];

            }
        }
        let Component = this.props.component ? this.props.component : XFormSelect;
        return (
            <Component
                options={options}
                value={this.state.value || 'unknown'}
                onChange={this.handleChange}
                multi={this.props.multi}
            />
        );
    }
}

interface XFormSubmitProps extends XButtonProps {
    // alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center';
    // style?: 'normal' | 'dark' | 'important';
    // size?: 'large' | 'normal';
    // bounce?: boolean;
    // loading?: boolean;
    // disabled?: boolean;
    // icon?: string;
}

export class XFormSubmit extends React.Component<XFormSubmitProps> {
    static contextTypes = {
        xForm: PropTypes.object.isRequired
    };

    render() {
        return <XButton {...this.props} onClick={this.context.xForm.submitFormMainAction} />;
    }
}

export class XFormAction extends React.Component<XButtonProps & XFormActionProps> {
    static contextTypes = {
        xForm: PropTypes.object.isRequired
    };

    submit = () => {
        this.context.xForm.submitForm(this.props);
    }

    render() {
        return <XButton text={this.props.actionName} style={this.props.actionStyle} {...this.props} onClick={this.submit} />;
    }
}

export interface XFormActionProps {
    submitMutation?: MutationFunc<{}>;
    mutationDirect?: boolean;
    onSubmit?: (values: any) => void;
    defaultValues?: { [key: string]: any; };
    fillValues?: { [key: string]: any; };
    prepare?: (values: any, prepareValues: any) => any; actionName?: string;
    actionStyle?: 'primary' | 'default' | 'danger';
}

class XFormRender extends React.Component<XFormProps & { router?: XRouter, modal?: XModalContextValue }, { loading: boolean, error?: string }> {
    // static DateSingle = XDateSinglePicker;
    // static DateRange = XDateRangePicker;

    static childContextTypes = {
        xForm: PropTypes.object.isRequired
    };

    //
    // Internal State
    //

    error?: string;
    defaultValues: { [key: string]: any; };
    values: { [key: string]: any; };
    fillValues?: { [key: string]: any; };
    prepareValues: { [key: string]: any; };
    submitLocks = new Set<any>();
    submitLocksActive = new Set<any>();
    //
    // Callbacks
    //

    addSubmitLock = (lock: any) => {
        this.submitLocks.add(lock);
        this.submitLocksActive.add(lock);
    }

    removeSubmitLock = (lock: any) => {
        this.submitLocksActive.delete(lock);
    }

    readValue = (name: string) => {
        if (this.fillValues) {
            return this.fillValues[name];
        } else {
            return this.values[name];

        }
    }
    writeValue = (name: string, value: any) => {
        if (this.props.prepare) {
            this.prepareValues[name] = value;
        } else {
            this.values[name] = value;
        }
    }

    submitFormMainAction = async () => {
        this.submitForm(this.props);
    }

    submitForm = async (action: XFormActionProps) => {
        if (this.submitLocksActive.size === 0) {
            if (this.props.prepare) {
                this.values = this.props.prepare(this.values, this.prepareValues);
            }
            let vals = Object.assign({}, this.values);
            if (action.onSubmit) {
                action.onSubmit(vals);
            }
            if (action.submitMutation) {
                this.setState({ loading: true, error: undefined });
                let destVars: any = { data: vals };
                if (action.mutationDirect === true) {
                    destVars = vals;
                }
                try {
                    let res = await action.submitMutation({ variables: destVars });
                    if (this.props.autoClose) {
                        if (this.props.modal) {
                            this.props.modal.close();
                        }
                    }
                    if (this.props.completePath) {
                        if (this.props.router) {
                            this.props.router.push(this.props.completePath);
                        } else {
                            this.setState({ loading: this.props.keepLoading !== false });
                        }
                    } else {
                        this.setState({ loading: this.props.keepLoading !== false });
                    }
                    this.setState({ loading: this.props.keepLoading !== false });

                    if (this.props.onCompleted) {
                        this.props.onCompleted(res);
                    }
                } catch (v) {
                    this.setState({ loading: false, error: v.toString() });
                }
            }
        } else {
            for (let lock of this.submitLocks) {
                lock.setState({ locking: this.submitLocksActive.has(lock) });
            }
        }
    }

    constructor(props: XFormProps) {
        super(props);
        this.defaultValues = Object.assign({}, props.defaultValues);
        if (this.defaultValues.__typename) {
            delete this.defaultValues.__typename;
        }
        this.values = Object.assign({}, this.defaultValues);
        this.fillValues = props.fillValues ? Object.assign({}, props.fillValues) : undefined;
        this.prepareValues = Object.assign({}, this.fillValues);
        this.state = { loading: false };
    }

    getChildContext() {
        return {
            xForm: this
        };
    }

    render() {
        return (
            <XVertical>
                <XLoader loading={this.state.loading} />
                {this.state.error && <XServiceMessage title={this.state.error} />}
                {this.props.children}
            </XVertical>
        );
    }
}

export class XForm extends React.Component<XFormProps, { loading: boolean, error?: string }> {

    static Boolean = XFormBooleanField;
    static Select = XFormSelectField;
    static Text = XFormTextField;
    static TextArea = XFormTextArea;
    static Submit = XFormSubmit;

    constructor(props: XFormProps) {
        super(props);
    }

    render() {
        return (
            <XRouterContext.Consumer>
                {(router) => (
                    <XModalContext.Consumer>
                        {(modal) => (
                            <XFormRender {...this.props} modal={modal} router={router}>
                                {this.props.children}
                            </XFormRender>
                        )}
                    </XModalContext.Consumer>
                )}
            </XRouterContext.Consumer>
        );
    }
}