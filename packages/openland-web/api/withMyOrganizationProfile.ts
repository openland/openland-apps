import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { Queries } from 'openland-api';

export const withMyOrganizationProfile = graphqlCompose2(
    graphqlRouted(Queries.Organization.MyOrganizationProfileQuery),
    graphqlMutation(Queries.Organization.UpdateOrganizationMutation, 'updateOrganizaton')
);