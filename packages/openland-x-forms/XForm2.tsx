import * as React from 'react';
import { XStore } from 'openland-x-store/XStore';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { XStoreState } from 'openland-x-store/XStoreState';
import { XVertical } from 'openland-x-layout/XVertical';
import { XLoader } from 'openland-x/XLoader';
import { XServiceMessage } from 'openland-x/XServiceMessage';
import { storeMerge } from 'openland-x-store/utils/storeMerge';

export interface XFormProps {
    defaultData?: any;
    staticData?: any;
    action: (data: any) => any;
}

class XFormController extends React.PureComponent<{ staticData?: any; action: (data: any) => any, store: XStoreState }, { loading: boolean, error?: string }> {

    submit = async () => {
        let data = this.props.store.export();
        if (this.props.staticData) {
            data = storeMerge(data, this.props.staticData);
        }
        this.setState({ loading: true, error: undefined });
        try {
            await this.props.action(data);
            this.setState({ loading: false, error: undefined });
        } catch (e) {
            console.warn(e);
            this.setState({ loading: false, error: e.toString() });
        }
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

export class XForm extends React.PureComponent<XFormProps> {

    constructor(props: XFormProps) {
        super(props);
    }

    render() {
        return (
            <XStore defaultData={this.props.defaultData}>
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