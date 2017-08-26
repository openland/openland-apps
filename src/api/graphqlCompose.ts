import {
    QueryProps, ChildProps, compose
} from 'react-apollo';
import { withRouter, RouteComponentProps } from 'react-router';
export default function <TResult>(...funcs: Function[]) {
    return function (component: React.ComponentType<RouteComponentProps<any> & ChildProps<{}, TResult> & { data: QueryProps & TResult }>) {
        return withRouter(compose(...funcs)(component));
    };
}