import * as React from 'react';
import Glamorous from 'glamorous';
import { XStore } from 'openland-y-store/XStore';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { XVertical } from 'openland-x-layout/XVertical';
import { storeMerge } from 'openland-y-store/utils/storeMerge';
import { XFormContextValue, XFormContext } from './XFormContext';
import { XFormError } from './XFormError';
import { XFormLoadingContent } from './XFormLoadingContent';
import { XModalContext, XModalContextValue } from 'openland-x-modal/XModalContext';
import { formatError, exportWrongFields } from './errorHandling';
import { delay } from 'openland-y-utils/timer';
import { applyFlex, extractFlexProps, XFlexStyles } from 'openland-x/basics/Flex';

const LOGGING = false;

export interface XFormProps {
    defaultData?: any;
    validate?: any;
    staticData?: any;
    defaultAction: (data: any) => any;
    resetAfterSubmit?: boolean;
    className?: string;
    defaultLayout?: boolean;
    autoClose?: boolean | number;
    isMobile?: boolean | null;
}

interface XFormControllerProps {
    validate?: any;
    staticData?: any;
    defaultAction: (data: any) => any;
    store: XStoreState;
    className?: string;
    defaultLayout?: boolean;
    resetAfterSubmit?: boolean;
    isMobile?: boolean | null;
}

const FormContainer = Glamorous.form<XFlexStyles>([
    props => applyFlex(props),
    {
        display: 'flex',
        flexDirection: 'column',
    },
]);

type XFormControllerState = {
    loading: boolean;
    submited: boolean;
    error?: string;
};

class XFormController extends React.PureComponent<
    XFormControllerProps &
        XFlexStyles & {
            modal?: XModalContextValue;
            autoClose?: boolean | number;
        },
    XFormControllerState
> {
    // Keep local copy since setState is async
    private _isLoading = false;
    private contextValue: XFormContextValue;

    constructor(props: XFormControllerProps) {
        super(props);
        this.state = { loading: false, submited: false };
        this.contextValue = {
            store: this.props.store,
            submit: (action?: (data: any) => any) => {
                return this.submit(action);
            },
            validated: this.clientValidation(this.props),
            touched: [],
        };
    }

    clientValidation = (props: any) => {
        if (!(this.props.store.export().fields && this.props.store.export().fields.input)) {
            return [];
        }

        const inputData = props.store.data.fields.input;
        if (!props.validate || !props.validate.input) {
            return [];
        }

        const inputValidate = props.validate.input;

        const collectedErrors = Object.keys(inputData).map(fieldName => {
            const prefix = 'input.';
            const field = inputData[fieldName];
            const validateRules = inputValidate[fieldName] || [];
            const errors: string[] = [];

            validateRules.forEach(
                ({ rule, errorMessage }: { rule: Function; errorMessage: string }) => {
                    if (!rule(field)) {
                        errors.push(errorMessage);
                    }
                },
            );

            return [`${prefix}${fieldName}`, errors];
        });

        return collectedErrors;
    };

    componentWillReceiveProps(nextProps: XFormControllerProps, nextState: XFormControllerState) {
        let nextTouched: any[] = [];
        if (this.props.store.export().fields && this.props.store.export().fields.input) {
            const previousTouched = this.contextValue.touched;
            const prevFields = this.props.store.export().fields;
            const nextFields = nextProps.store.export().fields;
            const prevInputFields = prevFields.input;
            const nextInputFields = nextFields.input;

            nextTouched = [
                ...previousTouched,
                ...Object.keys(nextInputFields)
                    .filter(fieldName => {
                        return (
                            previousTouched.indexOf(`input.${fieldName}`) === -1 &&
                            nextInputFields[fieldName] !== prevInputFields[fieldName]
                        );
                    })
                    .map(fieldName => `input.${fieldName}`),
            ];
        }

        if (this.props.store !== nextProps.store) {
            this.contextValue = {
                store: nextProps.store,
                submit: (action?: (data: any) => any) => {
                    return this.submit(action);
                },
                validated: this.clientValidation(nextProps),
                touched: nextTouched,
            };
        }
    }

    private submit = async (action?: (data: any) => any) => {
        this.setState({ submited: true });
        let clientValidationFailed = false;
        if (this.props.store.export().fields && this.props.store.export().fields.input) {
            this.contextValue.touched = Object.keys(this.props.store.export().fields.input).map(
                (fieldName: string) => `input.${fieldName}`,
            );

            clientValidationFailed =
                this.contextValue.validated.filter(([first, second]: any) => second.length)
                    .length !== 0;
        }
        if (this._isLoading) {
            return;
        }
        let data = this.props.store.export().fields;
        if (this.props.staticData) {
            data = storeMerge(data, this.props.staticData);
        }
        this._isLoading = true;
        this.props.store.writeValue('form.loading', true);
        this.props.store.writeValue('form.enabled', false);
        this.setState({ loading: true, error: undefined });
        let act = action || this.props.defaultAction;
        try {
            if (!clientValidationFailed) {
                await act(data);
                if (this.props.autoClose) {
                    if (this.props.modal) {
                        if (typeof this.props.autoClose === 'number') {
                            delay(this.props.autoClose).then(this.props.modal.close);
                        } else {
                            this.props.modal.close();
                        }
                    }
                }
            }

            this.setState({ loading: false, error: undefined });
            if (this.props.resetAfterSubmit) {
                this.props.store.reset();
            } else {
                this.props.store.writeValue('form.error', null);
                this.props.store.writeValue('errors', null);
            }
        } catch (e) {
            console.warn(e);
            if (LOGGING) {
                console.warn(e);
            }
            this.props.store.writeValue('errors', null);
            let message = formatError(e);
            let fields = exportWrongFields(e);
            this.setState({ loading: false, error: message });
            // writeValue can throw exception for wrong field name
            try {
                this.props.store.writeValue('form.error', message);
                this.props.store.writeValue('form.error_fields', fields.length !== 0);
                for (let f of fields) {
                    this.props.store.writeValue('errors.' + f.key, f.messages);
                }
            } catch (e) {
                console.warn(e);
            }
        } finally {
            this._isLoading = false;
            this.props.store.writeValue('form.loading', false);
            this.props.store.writeValue('form.enabled', true);
        }
    };

    onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        this.submit();
    };

    render() {
        if (LOGGING) {
            console.warn(this.state);
        }
        const { isMobile } = this.props;
        const flexProps = {
            flexGrow: isMobile ? 1 : undefined,
            ...this.props,
        };
        return (
            <XFormContext.Provider value={{ ...this.contextValue, submited: this.state.submited }}>
                {this.props.defaultLayout !== false && (
                    <FormContainer
                        className={this.props.className}
                        flexGrow={isMobile ? 1 : undefined}
                        {...extractFlexProps(flexProps)}
                    >
                        <XFormLoadingContent {...this.props} flexGrow={isMobile ? 1 : undefined}>
                            <XVertical
                                separator="none"
                                {...this.props}
                                flexGrow={isMobile ? 1 : undefined}
                            >
                                <XFormError />
                                {this.props.children}
                            </XVertical>
                        </XFormLoadingContent>
                    </FormContainer>
                )}
                {this.props.defaultLayout === false && (
                    <FormContainer
                        className={this.props.className}
                        onSubmit={this.onSubmit}
                        flexGrow={isMobile ? 1 : undefined}
                        {...extractFlexProps(flexProps)}
                    >
                        {this.props.children}
                    </FormContainer>
                )}
            </XFormContext.Provider>
        );
    }
}

export class XForm extends React.PureComponent<XFormProps & XFlexStyles> {
    private defaultData: any;

    constructor(props: XFormProps & XFlexStyles) {
        super(props);
        this.defaultData = {
            fields: this.props.defaultData || {},
            form: {
                enabled: true,
                loading: false,
            },
        };
    }

    render() {
        return (
            <XStore defaultData={this.defaultData}>
                <XStoreContext.Consumer>
                    {store => (
                        <XModalContext.Consumer>
                            {modal => (
                                <XFormController store={store!!} modal={modal} {...this.props}>
                                    {this.props.children}
                                </XFormController>
                            )}
                        </XModalContext.Consumer>
                    )}
                </XStoreContext.Consumer>
            </XStore>
        );
    }
}
