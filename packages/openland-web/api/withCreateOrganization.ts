import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { CreateOrganizationMutation } from 'openland-api/CreateOrganizationMutation';

export const withCreateOrganization = graphqlMutation(CreateOrganizationMutation, 'createOrganization');