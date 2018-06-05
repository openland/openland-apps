import * as React from 'react';
import * as PropTypes from 'prop-types';
import Glamorous from 'glamorous';
import { XVertical } from 'openland-x-layout/XVertical';
import { MutationFunc } from 'react-apollo';
// import { XDateSinglePicker, XDateRangePicker } from '../Incubator/XDate';
import { XButton, XButtonProps } from 'openland-x/XButton';
import { XInput, XInputProps } from 'openland-x/XInput';
import { XFooter } from 'openland-x/XFooter';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { XLoader } from 'openland-x/XLoader';
import { XRouter } from 'openland-x-routing/XRouter';
import { XModalContextValue, XModalContext } from 'openland-x-modal/XModalContext';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XAvatarUpload, XAvatarUploadProps } from 'openland-x/files/XAvatarUpload';
import { XImageCrop } from 'openland-x/files/XFileUpload';

let InputsStyle = {
    borderRadius: 4,
    boxShadow: '0 0 0 1px rgba(50, 50, 93, .16), 0 0 0 1px rgba(50, 151, 211, 0), 0 0 0 2px rgba(50, 151, 211, 0), 0 1px 1px rgba(0, 0, 0, .08)',
    boxShadowOnFocus: '0 0 0 1px rgba(50, 50, 93, 0), 0 0 0 1px rgba(50, 151, 211, .2), 0 0 0 2px rgba(50, 151, 211, .25), 0 1px 1px rgba(0, 0, 0, .08)',
    boxShadovNovalid: '0 0 0 1px rgba(226, 89, 80, .16), 0 0 0 1px rgba(50, 151, 211, 0), 0 0 0 2px rgba(50, 151, 211, 0), 0 1px 1px rgba(0, 0, 0, .08)',
    color: '#525f7f',
    backgroundColor: '#fff',
    placeholderColor: '#8898aa',
    fontSize: '14px',
    lineHeight: 1.6,
    paddingTop: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
};

export const XFormDiv = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    marginBottom: 2,
    '&:last-child': {
        marginBottom: 0
    }
});

export const XFormTitle = Glamorous.div({
    fontSize: '16px',
    lineHeight: '24px',
    fontWeight: 500,
    color: '#32325d'
});

export const XFormDescription = Glamorous.div({
    fontSize: '14px',
    lineHeight: '20px',
    fontWeight: 400,
    color: '#525f7f'
});

export const XFormHeaderDiv = Glamorous.div({
    position: 'relative',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 20,
    paddingBottom: 20,
    backgroundColor: '#f6f9fc',
    '&::after': {
        content: `''`,
        bottom: -1,
        left: 16,
        position: 'absolute',
        right: 16,
        display: 'block',
        height: 1,
        backgroundColor: '#e6ebf1'
    }
});

export const XFormFieldDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    // backgroundColor: '#f6f9fc',
    paddingTop: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 20
});

export const XFormFieldTitle = Glamorous.div<{ novalid?: boolean }>((props) => ({
    textAlign: 'right',
    flex: '30% 0 0',
    color: props.novalid ? '#e25950' : '#32325d',
    lineHeight: 1.6,
    paddingRight: 10,
    paddingTop: 3
}));

export const XFormFieldChildren = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    flex: '0 0 55%',
    maxWidth: 340
});

export const XFormFieldDescription = Glamorous.div<{ novalid?: boolean }>((props) => ({
    marginTop: 5,
    color: props.novalid ? '#e25950' : '#6b7c93',
    fontWeight: 400,
    fontSize: '13px',
    lineHeight: 1.6
}));

export const XFormTextAreaStyle = Glamorous.textarea({
    width: '100%',
    minHeight: '100px',
    border: '1px solid #d4dae7',
    borderRadius: 4,
    color: '#334562',
    backgroundColor: '#fff',
    fontSize: 16,
    letterSpacing: 0.5,
    paddingTop: 4,
    paddingLeft: 7,
    paddingRight: 7,
    paddingBottom: 2,
    outline: 'none',
    '&:focus': {
        boxShadow: '0 0 0 2px rgba(143, 124, 246, 0.2)',
        border: '1px solid #986AFE',
    },
    '&::placeholder': {
        color: '#9d9d9d'
    }
});

export const XFormSelectStyle = Glamorous.select({
    height: 28,
    boxSizing: 'border-box',
    border: 'none',
    borderRadius: 4,
    boxShadow: InputsStyle.boxShadow,
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
        boxShadow: InputsStyle.boxShadowOnFocus
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

export function XFormHeader(props: { title?: string, description?: string }) {
    return (
        <XFormHeaderDiv>
            <XFormTitle>{props.title}</XFormTitle>
            {props.description && <XFormDescription>{props.description}</XFormDescription>}
        </XFormHeaderDiv>
    );
}

export function XFormField(props: { title: string, children: any, description?: string, novalid?: boolean }) {
    return (
        <XFormFieldDiv>
            <XFormFieldTitle novalid={props.novalid}>{props.title}</XFormFieldTitle>
            <XFormFieldChildren>
                <XVertical>
                    {props.children}
                </XVertical>
                {props.description && <XFormFieldDescription novalid={props.novalid}>{props.description}</XFormFieldDescription>}
            </XFormFieldChildren>
        </XFormFieldDiv>
    );
}

export interface XFormProps {

    //
    // Submit Handling
    //

    submitMutation?: MutationFunc<{}>;
    mutationDirect?: boolean;
    onSubmit?: (values: any) => void;

    //
    // Complete Callbacks
    //

    completePath?: string;
    onCompleted?: (values: any) => void;
    autoClose?: boolean;

    //
    // Configuration
    //

    defaultValues?: { [key: string]: any; };
}

interface XFormController {
    readValue(name: string): any;
    writeValue(name: string, value: any): void;
    submitForm(): void;
}

interface XFormTextFieldProps extends XInputProps {
    field: string;
}

export class XFormTextField extends React.Component<XFormTextFieldProps, { value: string }> {
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
    }

    handleChange = (val: string) => {
        let xForm = this.context.xForm as XFormController;
        // let val = src.target.value as string;
        this.setState({ value: val });
        xForm.writeValue(this.props.field, val);
    }
    render() {
        return (
            <XInput {...this.props} onChange={this.handleChange} value={this.state.value} />
        );
    }
}

interface XFormAvatarFieldProps extends XAvatarUploadProps {
    field: string;
}
export class XFormAvatarField extends React.Component<XFormAvatarFieldProps, { uuid: string | null, crop?: XImageCrop | null; }> {
    static contextTypes = {
        xForm: PropTypes.object.isRequired
    };

    constructor(props: XFormAvatarFieldProps, context: any) {
        super(props, context);
        let xForm = this.context.xForm as XFormController;
        let existing = xForm.readValue(this.props.field);
        if (this.props.uuid !== undefined) {
            this.state = { uuid: this.props.uuid };
        } else {
            this.state = { uuid: existing ? existing.uploadId : null };
        }
    }

    handleChange = (uuid: string | null, crop: XImageCrop | null) => {
        let xForm = this.context.xForm as XFormController;
        this.setState({ uuid: uuid });
        xForm.writeValue(this.props.field, uuid && crop ? { uuid: uuid, crop: { x: crop.left, y: crop.top, w: crop.width, h: crop.height } } : undefined);
    }
    render() {
        return (
            <XAvatarUpload {...this.props} onChanged={this.handleChange} uuid={this.state.uuid} />
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
            <XFormTextAreaStyle placeholder={this.props.placeholder} onChange={this.handleChange} value={this.state.value} />
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

interface XFormSelectFieldProps {
    field: string;
    options?: { value: string, title: string }[];
    component?: any;
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
        } else {
            this.state = { value: null };
        }
    }

    handleChange = (src: any) => {
        let xForm = this.context.xForm as XFormController;
        if (this.props.component) {
            let val = src ? src.value as string : 'unknown';
            let cval = null;
            if (val !== 'unknown') {
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
            options = [{ title: 'Unknown', value: 'unknown' }, ...this.props.options];
        }
        let Component = this.props.component ? this.props.component : XFormSelect;
        return (
            <Component
                options={options}
                value={this.state.value || 'unknown'}
                onChange={this.handleChange}
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
    actionName?: string;
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

    //
    // Callbacks
    //

    readValue = (name: string) => {
        return this.values[name];
    }
    writeValue = (name: string, value: any) => {
        this.values[name] = value;
    }

    submitFormMainAction = async () => {
        this.submitForm(this.props);
    }

    submitForm = async (action: XFormActionProps) => {
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
                await action.submitMutation({ variables: destVars });
                if (this.props.autoClose) {
                    if (this.props.modal) {
                        this.props.modal.close();
                    }
                }
                if (this.props.completePath) {
                    if (this.props.router) {
                        this.props.router.push(this.props.completePath);
                    } else {
                        this.setState({ loading: false });
                    }
                } else {
                    this.setState({ loading: false });
                }
                this.setState({ loading: false });

                if (this.props.onCompleted) {
                    this.props.onCompleted(vals);
                }
            } catch (v) {
                this.setState({ loading: false, error: v.toString() });
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

    static Header = XFormHeader;
    static Footer = XFooter;

    static Field = XFormField;
    static Boolean = XFormBooleanField;
    static Select = XFormSelectField;
    static Text = XFormTextField;
    static Avatar = XFormAvatarField;
    static TextArea = XFormTextArea;
    static Submit = XFormSubmit;

    static RawInput = XInput;
    static RawTextarea = XFormTextAreaStyle;
    static RawSelect = XFormSelect;

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