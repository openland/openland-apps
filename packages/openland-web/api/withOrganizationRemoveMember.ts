import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import {
    OrganizationRemoveMemberMutation,
    OrganizationQuery,
} from 'openland-api';

export const withOrganizationRemoveMember = graphqlMutation(
    OrganizationRemoveMemberMutation,
    'remove',
    { refetchQueries: [OrganizationQuery] },
);
