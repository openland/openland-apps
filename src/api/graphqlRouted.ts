import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { RouteQueryStringProps, withRouterQueryString } from './withRouterQueryString';
import { GraphQLRoutedComponentProps } from './utils';

export default function <TResult>(document: DocumentNode) {
  return function (component: React.ComponentType<GraphQLRoutedComponentProps<TResult>>): React.ComponentType<{}> {
    let qlWrapper = graphql<TResult, RouteQueryStringProps, GraphQLRoutedComponentProps<TResult>>(document, {
      options: (props: RouteQueryStringProps) => {
        return {
          variables: {
            ...props.match.params,
            ...props.queryString
          }
        };
      }
    });

    return withRouterQueryString(qlWrapper(component));
  };
}