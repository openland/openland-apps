import * as React from 'react';
import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withRouter, RouterState } from '../components/withRouter';
import { GraphQLRoutedComponentProps } from './graphql';
import { prepareParams, getComponentDisplayName } from './utils';

export function graphqlRouted<TResult>(document: DocumentNode, params: ({ key: string, default?: string } | string)[] = []) {
  return function (component: React.ComponentType<GraphQLRoutedComponentProps<TResult>>): React.ComponentType<{}> {
    let qlWrapper = graphql<TResult, { router: RouterState }, GraphQLRoutedComponentProps<TResult>>(document, {
      options: (props: { router: RouterState }) => {
        return {
          variables: {
            ...prepareParams(params, props.router.query)
          }
        };
      }
    });

    let res = withRouter(qlWrapper(component));
    res.displayName = `withQuery(${getComponentDisplayName(component)})`;
    return res;
  };
}