import { graphql } from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withRouter, RouterState } from './withRouter';
import { GraphQLRoutedComponentProps } from './graphql';
import { prepareParams } from './utils';

export function graphqlRouted<TResult>(document: DocumentNode, params: string[]) {
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

    return withRouter(qlWrapper(component));
  };
}