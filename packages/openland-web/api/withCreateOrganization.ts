import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withCreateOrganization = graphqlMutation(Queries.Account.CreateOrganizationMutation, 'createOrganization');