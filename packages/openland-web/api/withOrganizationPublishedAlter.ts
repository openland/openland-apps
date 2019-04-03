import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationAlterPublishedMutation } from 'openland-api';

export const withOrganizationPublishedAlter = graphqlMutation(
    OrganizationAlterPublishedMutation,
    'alterPublished',
);
