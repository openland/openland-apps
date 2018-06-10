import * as React from 'react';
import { XStore } from 'openland-x-store/XStore';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XVertical } from 'openland-x-layout/XVertical';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { storeMerge } from 'openland-x-store/utils/storeMerge';
import { XButton } from 'openland-x/XButton';
import { XLoadingBar } from 'openland-x/XLoadingBar';

export interface XFormProps {
    defaultData?: any;
    staticData?: any;
    action: (data: any) => any;
}

interface XFormControllerProps {
    staticData?: any;
    action: (data: any) => any;
    store: XStoreState;
}

class XFormController extends React.PureComponent<XFormControllerProps, { loading: boolean, error?: string }> {

    constructor(props: XFormControllerProps) {
        super(props);
        this.state = { loading: false };
    }

    submit = async () => {
        let data = this.props.store.export();
        if (this.props.staticData) {
            data = storeMerge(data, this.props.staticData);
        }
        this.props.store.writeValue('__form_loading', true);
        this.props.store.writeValue('__form_enabled', false);
        this.setState({ loading: true, error: undefined });
        try {
            await this.props.action(data);
            this.setState({ loading: false, error: undefined });
        } catch (e) {
            console.warn(e);
            this.setState({ loading: false, error: e.toString() });
        } finally {
            this.props.store.writeValue('__form_loading', false);
            this.props.store.writeValue('__form_enabled', true);
        }
    }

    render() {
        return (
            <XVertical>
                <XLoadingBar visible={this.state.loading} />
                {this.state.error && <XServiceMessage title={this.state.error} />}
                {this.props.children}
                <XButton text="Submit" alignSelf="flex-start" onClick={this.submit} />
            </XVertical>
        );
    }
}

export class XForm extends React.PureComponent<XFormProps> {

    constructor(props: XFormProps) {
        super(props);
    }

    render() {
        return (
            <XStore defaultData={this.props.defaultData} onChanged={(data) => console.warn(data)}>
                <XStoreContext.Consumer>
                    {store => (
                        <XFormController staticData={this.props.staticData} action={this.props.action} store={store!!}>
                            {this.props.children}
                        </XFormController>
                    )}
                </XStoreContext.Consumer>
            </XStore>
        );
    }
}