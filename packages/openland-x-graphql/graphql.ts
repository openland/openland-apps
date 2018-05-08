import { ChildProps, QueryProps } from 'react-apollo';
import { XWithRouter } from 'openland-x-routing/withRouter';

export type NotNullableChildProps<TResult> = ChildProps<{}, TResult> & NotNullableDataProps<TResult>;
export type NotNullableDataProps<TResult> = { data: QueryProps & TResult };
export type GraphQLRoutedComponentProps<TResult> = XWithRouter & NotNullableChildProps<TResult>;