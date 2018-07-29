import * as React from 'react';
import { XStore } from 'openland-y-store/XStore';
import { XStoreContext } from 'openland-y-store/XStoreContext';
import { XStoreState } from 'openland-y-store/XStoreState';
import { storeMerge } from 'openland-y-store/utils/storeMerge';
import { YFormContextValue, YFormContext } from './YFormContext';
import { formatError, exportWrongFields } from './errorHandling';

const LOGGING = false;

export interface YFormProps {
    defaultData?: any;
    staticData?: any;
    defaultAction: (data: any) => any;
    resetAfterSubmit?: boolean;
}

interface YFormControllerProps {
    staticData?: any;
    defaultAction: (data: any) => any;
    store: XStoreState;
    resetAfterSubmit?: boolean;
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
            await act(data);
            // if (this.props.autoClose) {
            //     if (this.props.modal) {
            //         if (typeof this.props.autoClose === 'number') {
            //             delay(this.props.autoClose).then(this.props.modal.close);
            //         } else {
            //             this.props.modal.close();
            //         }
            //     }
            // }
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
                        >
                            {this.props.children}
                        </YFormController>
                    )}
                </XStoreContext.Consumer>
            </XStore>
        );
    }
}