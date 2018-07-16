import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationAlterPublishedMutation, SuperAccountQuery } from 'openland-api';

export const withOrganizationPublishedAlter = graphqlMutation(OrganizationAlterPublishedMutation, 'alterPublished');
export const withOrganizationPublishedAlterSuper = graphqlMutation(OrganizationAlterPublishedMutation, 'alterPublished', {refetchQueries: [SuperAccountQuery], refetchParams: ['accountId']});