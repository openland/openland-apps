import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationAddMemberMutation, OrganizationQuery } from 'openland-api';

export const withOrganizationAddMembers = graphqlMutation(
    OrganizationAddMemberMutation,
    'addMembers',
    { params: ['organizationId', 'userIds'], refetchQueries: [OrganizationQuery] },
);
