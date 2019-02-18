import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ResolveInviteQuery } from 'openland-api';

export const withResolveInvite = graphqlMutation(ResolveInviteQuery, 'resolveInvite');
