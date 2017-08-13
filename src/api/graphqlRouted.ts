import {
  graphql, QueryProps, ChildProps
} from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withRouter, RouteComponentProps } from 'react-router';
import { Config } from '../config';
export default function <TResult>(document: DocumentNode) {
  return function (component: React.ComponentType<RouteComponentProps<any> &
    ChildProps<{}, TResult> & { data: QueryProps & TResult }>) {
    var res = graphql<TResult,
      { data: QueryProps & TResult },
      ChildProps<{}, TResult> & { data: QueryProps & TResult }>(document, {
        options: (args: any) => {
          return {
            variables: {
              ...args.match.params,
              domain: Config.domain
            }
          };
        }
      });

    var routed = withRouter(component);

    return res(routed);
  };
}