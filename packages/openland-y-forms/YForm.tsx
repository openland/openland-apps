import * as React from 'react';
import { XStore } from 'openland-y-store/XStore';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { storeMerge } from 'openland-y-store/utils/storeMerge';
import { YFormContextValue, YFormContext } from './YFormContext';
import { formatError, exportWrongFields } from './errorHandling';
import { startLoader, stopLoader } from 'openland-mobile/components/ZGlobalLoader';
import { Alert } from 'openland-mobile/components/AlertBlanket';

const LOGGING = false;

export interface YFormProps {
    defaultData?: any;
    staticData?: any;
    defaultAction: (data: any) => any;
    resetAfterSubmit?: boolean;

    onSuccess?: () => void;
    onError?: (e: Error) => void;
}

interface YFormControllerProps {
    staticData?: any;
    defaultAction: (data: any) => any;
    store: XStoreState;
    resetAfterSubmit?: boolean;

    onSuccess?: () => void;
    onError?: (e: Error) => void;
}

class YFormController extends React.PureComponent<YFormControllerProps, { loading: boolean, error?: string }> {

    // Keep local copy since setState is async
    private _isLoading = false;
    private contextValue: YFormContextValue;

    constructor(props: YFormControllerProps) {
        super(props);
        this.state = { loading: false };
        this.contextValue = {
            store: this.props.store,
            submit: (action?: (data: any) => any) => {
                return this.submit(action);
            }
        };
    }

    submitForm = () => {
        this.submit();
    }

    setField = (field: string, value?: string) => {
        this.contextValue.store.writeValue(field, value);
    }

    componentWillReceiveProps(nextProps: YFormControllerProps) {
        if (this.props.store !== nextProps.store) {
            this.contextValue = {
                store: nextProps.store,
                submit: (action?: (data: any) => any) => {
                    return this.submit(action);
                }
            };
        }
    }

    private submit = async (action?: (data: any) => any) => {
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
            startLoader();

            await act(data);

            this.setState({ loading: false, error: undefined });
            if (this.props.resetAfterSubmit) {
                this.props.store.reset();
            } else {
                this.props.store.writeValue('form.error', null);
                this.props.store.writeValue('errors', null);
            }

            // moved from ZForm
            if (this.props.onSuccess) {
                try {
                    this.props.onSuccess();
                } catch (e) {
                    console.warn(e);
                }
            }
        } catch (e) {
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

            // moved from ZForm
            if (this.props.onError) {
                this.props.onError(e);
            } else {
                let error = formatError(e);
                if (error) {
                    Alert.alert(error);
                }
            }
        } finally {
            stopLoader();

            this._isLoading = false;
            this.props.store.writeValue('form.loading', false);
            this.props.store.writeValue('form.enabled', true);
        }
    }

    render() {
        if (LOGGING) {
            console.warn(this.state);
        }
        return (
            <YFormContext.Provider value={this.contextValue}>
                {this.props.children}
            </YFormContext.Provider>
        );
    }
}

export class YForm extends React.PureComponent<YFormProps> {

    private defaultData: any;

    private ref = React.createRef<YFormController>();

    constructor(props: YFormProps) {
        super(props);
        this.defaultData = {
            fields: (this.props.defaultData || {}),
            form: {
                enabled: true,
                loading: false
            }
        };
    }

    submit = () => {
        if (this.ref.current) {
            this.ref.current!!.submitForm();
        }
    }

    setField = (field: string, value?: string) => {
        if (this.ref.current) {
            this.ref.current!!.setField(field, value);
        }
    }

    render() {
        return (
            <XStore defaultData={this.defaultData}>
                <XStoreContext.Consumer>
                    {store => (
                        <YFormController
                            staticData={this.props.staticData}
                            defaultAction={this.props.defaultAction}
                            store={store!!}
                            resetAfterSubmit={this.props.resetAfterSubmit}
                            ref={this.ref}
                            onSuccess={this.props.onSuccess}
                            onError={this.props.onError}
                        >
                            {this.props.children}
                        </YFormController>
                    )}
                </XStoreContext.Consumer>
            </XStore>
        );
    }
}