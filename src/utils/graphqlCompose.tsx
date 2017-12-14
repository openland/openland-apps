import { QueryProps, ChildProps } from 'react-apollo';
import { withRouter, RouterState } from './withRouter';

function compose(funcs: Function[]) {
    const length = funcs ? funcs.length : 0;
    let index = length;
    while (index--) {
        if (typeof funcs[index] !== 'function') {
            throw new TypeError('Expected a function');
        }
    }
    return function (this: any, ...args: any[]) {
        let index2 = 0;
        let result = length ? funcs[index2].apply(this, args) : args[0];
        while (++index2 < length) {
            result = funcs[index2].call(this, result);
        }
        return result;
    };
}

export function graphqlCompose<TResult>(...funcs: Function[]) {
    return function (component: React.ComponentType<{ router: RouterState } & ChildProps<{}, TResult> & { data: QueryProps & TResult }>) {
        return withRouter(compose(funcs.reverse())(component));
    };
}