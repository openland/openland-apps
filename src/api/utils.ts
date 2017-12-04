import { ChildProps, QueryProps } from 'react-apollo';
import { RouteQueryStringProps } from './withRouterQueryString';

export type NotNullableChildProps<TResult> = ChildProps<{}, TResult> & { data: QueryProps & TResult };
export type GraphQLRoutedComponentProps<TResult> = RouteQueryStringProps & NotNullableChildProps<TResult>;