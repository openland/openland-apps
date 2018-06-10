import * as React from 'react';
import { XFlexStyles } from 'openland-x/basics/Flex';
import { XFormContext } from './XFormContext';
import { startProgress, stopProgress } from 'openland-x-routing/NextRouting';

class FormLoadingGlobal extends React.PureComponent<{ loading: boolean }> {
    private loadingId?: number;

    constructor(props: { loading: boolean }) {
        super(props);
        if (props.loading) {
            this.loadingId = startProgress();
        }
    }

    componentWillReceiveProps(nextProps: { loading: boolean }) {
        if (nextProps.loading && !this.loadingId) {
            this.loadingId = startProgress();
        }
        if (!nextProps.loading && this.loadingId) {
            stopProgress(this.loadingId);
            this.loadingId = undefined;
        }
    }

    render() {
        return null;
    }

    componentWillUnmount() {
        if (this.loadingId) {
            stopProgress(this.loadingId);
            this.loadingId = undefined;
        }
    }
}

export function XFormLoadingGlobal(props: XFlexStyles) {
    return (
        <XFormContext.Consumer>
            {form => {
                if (!form) {
                    throw Error('Unable to find form!');
                }
                let loading = form.store.readValue('form.loading');
                return <FormLoadingGlobal loading={!!loading} />;
            }}
        </XFormContext.Consumer>
    );
}