import {
  graphql, QueryProps, ChildProps
} from 'react-apollo';
import { DocumentNode } from 'graphql';
import { withRouter, RouteComponentProps } from 'react-router';
import * as qs from 'query-string';

export default function <TResult>(document: DocumentNode) {
  return function (component: React.ComponentType<RouteComponentProps<any> &
    ChildProps<{}, TResult> & { data: QueryProps & TResult }>) {
    var res = graphql<TResult,
      { data: QueryProps & TResult },
      ChildProps<{}, TResult> & { data: QueryProps & TResult }>(document, {
        options: (args: any) => {
          let s = qs.parse(location.search);
          return {
            variables: {
              ...args.match.params,
              ...s
            }
          };
        }
      });

    var routed = withRouter(component);

    return res(routed);
  };
}