import * as React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import * as qs from 'query-string';
import { withRouter } from 'react-router';

export interface RouteQueryStringProps extends RouteComponentProps<any> {
    queryString: { [key: string]: string | null };
}

export function withRouterQueryString<P = {}>(Component: React.ComponentType<RouteQueryStringProps & P>): React.ComponentType<P> {
    class QueryStringClass extends React.Component<RouteComponentProps<any> & P> {

        matched: string = location.search;
        parsedKeys: { [queryString: string]: string | null } = {};

        constructor(props: RouteComponentProps<any> & P) {
            super(props);

            let qsparsed = qs.parse(location.search);
            for (let k of Object.getOwnPropertyNames(qsparsed)) {
                this.parsedKeys[k] = qsparsed[k];
            }
        }

        componentWillReceiveProps() {
            if (this.matched !== location.search) {
                this.matched = location.search;
                let qsparsed = qs.parse(location.search);
                for (let k of Object.getOwnPropertyNames(qsparsed)) {
                    this.parsedKeys[k] = qsparsed[k];
                }
                for (let k of Object.getOwnPropertyNames(this.parsedKeys)) {
                    this.parsedKeys[k] = qsparsed[k] || null;
                }
            }
        }

        render() {
            return <Component queryString={this.parsedKeys} {...this.props} />;
        }
    }

    return withRouter<P>(QueryStringClass);
}