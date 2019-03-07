import * as React from 'react';
import { GraphqlTypedQuery } from './typed';
import { Query, QueryResult } from 'react-apollo';
import { IsActiveContext } from '../openland-web/pages/main/mail/components/Components';

export interface YQueryProps<QUERY, VARIABLES> {
    retry?: boolean;
    query: GraphqlTypedQuery<QUERY, VARIABLES>;
    variables?: VARIABLES;
    children: (result: QueryResult<QUERY, VARIABLES>) => React.ReactNode;
}

class QueryComponentWrapper extends React.Component<any> {
    shouldComponentUpdate(props: any) {
        return props.isActive !== false;
    }

    render() {
        return (
            <this.props.Component {...this.props.componentProps} isActive={this.props.isActive} />
        );
    }
}

const WrapRoutedGraphql = (props: any) => {
    const isActive = React.useContext(IsActiveContext);
    const { children, ...rest } = props;

    return (
        <Query {...rest}>
            {result => {
                return (
                    <QueryComponentWrapper
                        isActive={isActive}
                        componentProps={{ ...result, children }}
                    />
                );
            }}
        </Query>
    );
};

export class YQuery<QUERY, VARIABLES> extends React.PureComponent<YQueryProps<QUERY, VARIABLES>> {
    render() {
        return null;
        return (
            <WrapRoutedGraphql
                query={this.props.query.document}
                variables={this.props.variables}
                children={this.props.children}
            />
        );
    }
}
