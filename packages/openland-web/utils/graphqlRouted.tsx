import * as React from 'react';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withRouter, XWithRouter } from '../components/withRouter';
import { GraphQLRoutedComponentProps } from './graphql';
import { prepareParams, getComponentDisplayName } from './utils';

export function graphqlRouted<TResult>(document: DocumentNode, params: ({ key: string, default?: string } | string)[] = []) {
  return function (component: React.ComponentType<GraphQLRoutedComponentProps<TResult>>): React.ComponentType<{}> {
    let qlWrapper = graphql<TResult, XWithRouter, GraphQLRoutedComponentProps<TResult>>(document, {
      options: (props: XWithRouter) => {
        return {
          variables: {
            ...prepareParams(params, props.router.routeQuery)
          }
        };
      }
    });

    let res = withRouter(qlWrapper(component));
    res.displayName = `withQuery(${getComponentDisplayName(component)})`;
    return res;
  };
}