import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Organization } from 'openland-api';

export const withMyOrganizationProfile = graphqlCompose2(
    graphqlRouted(Organization.MyOrganizationProfileQuery),
    graphqlMutation(Organization.UpdateOrganizationMutation, 'updateOrganizaton')
);