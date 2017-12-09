import { ChildProps, QueryProps } from 'react-apollo';
import { RouterState } from './withRouter';

export type NotNullableChildProps<TResult> = ChildProps<{}, TResult> & NotNullableDataProps<TResult>;
export type NotNullableDataProps<TResult> = { data: QueryProps & TResult };
export type GraphQLRoutedComponentProps<TResult> = { router: RouterState } & NotNullableChildProps<TResult>;