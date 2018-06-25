import * as React from 'react';
import Glamorous from 'glamorous';
import { XStore } from 'openland-x-store/XStore';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XVertical } from 'openland-x-layout/XVertical';
import { storeMerge } from 'openland-x-store/utils/storeMerge';
import { XFormContextValue, XFormContext } from './XFormContext';
import { XFormError } from './XFormError';
import { XFormLoadingContent } from './XFormLoadingContent';
import { XModalContext, XModalContextValue } from 'openland-x-modal/XModalContext';
import { formatError, exportWrongFields } from './errorHandling';

export interface XFormProps {
    defaultData?: any;
    staticData?: any;
    defaultAction: (data: any) => any;
    className?: string;
    defaultLayout?: boolean;
    autoClose?: boolean;
}

interface XFormControllerProps {
    staticData?: any;
    defaultAction: (data: any) => any;
    store: XStoreState;
    className?: string;
    defaultLayout?: boolean;
}

const FormContainer = Glamorous.form({
    display: 'flex',
    flexDirection: 'column'
});

class XFormController extends React.PureComponent<XFormControllerProps & { modal?: XModalContextValue, autoClose?: boolean }, { loading: boolean, error?: string }> {

    // Keep local copy since setState is async
    private _isLoading = false;
    private contextValue: XFormContextValue;

    constructor(props: XFormControllerProps) {
        super(props);
        this.state = { loading: false };
        this.contextValue = {
            store: this.props.store,
            submit: (action?: (data: any) => any) => {
                return this.submit(action);
            }
        };
    }

    componentWillReceiveProps(nextProps: XFormControllerProps) {
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
            if (this.props.autoClose) {
                if (this.props.modal) {
                    this.props.modal.close();
                }
            }
            this.setState({ loading: false, error: undefined });
            this.props.store.writeValue('form.error', null);
            this.props.store.writeValue('errors', null);
        } catch (e) {
            console.warn(e);
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
        console.warn(this.state);
        return (
            <XFormContext.Provider value={this.contextValue}>
                {this.props.defaultLayout !== false && (
                    <FormContainer className={this.props.className}>
                        <XFormLoadingContent>
                            <XVertical>
                                <XFormError />
                                {this.props.children}
                            </XVertical>
                        </XFormLoadingContent>
                    </FormContainer>
                )}
                {this.props.defaultLayout === false && (
                    <FormContainer className={this.props.className}>
                        {this.props.children}
                    </FormContainer>
                )}
            </XFormContext.Provider>
        );
    }
}

export class XForm extends React.PureComponent<XFormProps> {

    private defaultData: any;

    constructor(props: XFormProps) {
        super(props);
        this.defaultData = {
            fields: (this.props.defaultData || {}),
            form: {
                enabled: true,
                loading: false
            }
        };
    }

    render() {
        return (
            <XStore defaultData={this.defaultData}>
                <XStoreContext.Consumer>
                    {store => (
                        <XModalContext.Consumer>
                            {(modal) => (
                                <XFormController
                                    staticData={this.props.staticData}
                                    defaultAction={this.props.defaultAction}
                                    store={store!!}
                                    modal={modal}
                                    autoClose={this.props.autoClose}
                                    className={this.props.className}
                                    defaultLayout={this.props.defaultLayout}
                                >
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