import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { MyOrganizationProfileQuery } from 'openland-api/MyOrganizationProfileQuery';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';
import { UpdateOrganizationMutation } from 'openland-api/UpdateOrganizationMutation';

export const withMyOrganizationProfile = graphqlCompose2(
    graphqlRouted(MyOrganizationProfileQuery),
    graphqlMutation(UpdateOrganizationMutation, 'updateOrganizaton', {refetchQueries: [OrganizationQuery], refetchParams: ['organizationId']})
);