import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { CreateOrganizationMutation } from 'openland-api';

export const withCreateOrganization = graphqlMutation(
    CreateOrganizationMutation,
    'createOrganization',
);
