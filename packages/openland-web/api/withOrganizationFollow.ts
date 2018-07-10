import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { FollowOrganizationMutation } from 'openland-api/FollowOrganizationMutation';

export const withOrganizationFollow = graphqlMutation(FollowOrganizationMutation, 'followOrganization');