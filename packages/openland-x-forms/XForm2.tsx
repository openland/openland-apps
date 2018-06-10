import * as React from 'react';
import { XStore } from 'openland-x-store/XStore';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XVertical } from 'openland-x-layout/XVertical';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { storeMerge } from 'openland-x-store/utils/storeMerge';
import { XLoadingBar } from 'openland-x/XLoadingBar';
import { XFormContextValue, XFormContext } from './XFormContext';

export interface XFormProps {
    defaultData?: any;
    staticData?: any;
    defaultAction: (data: any) => any;
}

interface XFormControllerProps {
    staticData?: any;
    defaultAction: (data: any) => any;
    store: XStoreState;
}

class XFormController extends React.PureComponent<XFormControllerProps, { loading: boolean, error?: string }> {

    // Keep local copy since setState is async
    private _isLoading = false;
    private contextValue: XFormContextValue;

    constructor(props: XFormControllerProps) {
        super(props);
        this.state = { loading: false };
        this.contextValue = {
            store: this.props.store,
            submit: (action?: (data: any) => any) => {
                this.submit(action);
            }
        };
    }

    componentWillReceiveProps(nextProps: XFormControllerProps) {
        if (this.props.store !== nextProps.store) {
            this.contextValue = {
                store: nextProps.store,
                submit: (action?: (data: any) => any) => {
                    this.submit(action);
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
            this.setState({ loading: false, error: undefined });
        } catch (e) {
            console.warn(e);
            this.setState({ loading: false, error: e.toString() });
        } finally {
            this._isLoading = false;
            this.props.store.writeValue('form.loading', false);
            this.props.store.writeValue('form.enabled', true);
        }
    }

    render() {
        return (
            <XFormContext.Provider value={this.contextValue}>
                <XVertical>
                    <XLoadingBar visible={this.state.loading} />
                    {this.state.error && <XServiceMessage title={this.state.error} />}
                    {this.props.children}
                </XVertical>
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
            <XStore defaultData={this.defaultData} onChanged={(data) => console.warn(JSON.stringify(data))}>
                <XStoreContext.Consumer>
                    {store => (
                        <XFormController staticData={this.props.staticData} defaultAction={this.props.defaultAction} store={store!!}>
                            {this.props.children}
                        </XFormController>
                    )}
                </XStoreContext.Consumer>
            </XStore>
        );
    }
}