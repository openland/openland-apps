import * as React from 'react';
// import { QueryProps, ChildProps } from 'react-apollo';
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

function graphqlComposeImpl<TResult>(...funcs: Function[]) {
    return function (component: React.ComponentType<{ router: RouterState } & TResult>) {
        return withRouter(compose(funcs.reverse())(component));
    };
}

export function graphqlCompose2<T1, T2>(src1: (src: React.ComponentType<T1>) => React.ComponentType<{}>, src2: (src: React.ComponentType<T2>) => React.ComponentType<{}>) {
    return graphqlComposeImpl<T1 & T2>(src1, src2);
}

export function graphqlCompose3<T1, T2, T3>(src1: (src: React.ComponentType<T1>) => React.ComponentType<{}>,
                                            src2: (src: React.ComponentType<T2>) => React.ComponentType<{}>,
                                            src3: (src: React.ComponentType<T3>) => React.ComponentType<{}>) {
    return graphqlComposeImpl<T1 & T2 & T3>(src1, src2, src3);
}