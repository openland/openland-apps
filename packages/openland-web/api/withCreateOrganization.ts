import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Account } from 'openland-api';

export const withCreateOrganization = graphqlMutation(Account.CreateOrganizationMutation, 'createOrganization');