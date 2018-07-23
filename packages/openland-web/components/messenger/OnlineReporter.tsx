import * as React from 'react';
import { ApolloClient } from 'apollo-client';
import { delay, backoff } from 'openland-y-utils/timer';
import gql from 'graphql-tag';

const OnlineMutation = gql`
    mutation ReportOnline {
        alphaReportOnline(timeout: 5000)
    }
`;

export class OnlineReporter extends React.PureComponent<{ client: ApolloClient<{}> }> {

    private _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
        (async () => {
            while (this._isMounted) {
                await backoff(async () => this.props.client.mutate({ mutation: OnlineMutation }));
                await delay(2000);
            }
        })();
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return null;
    }
}