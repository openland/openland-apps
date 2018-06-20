import { graphqlCompose5 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationQuery } from 'openland-api/OrganizationQuery';
import { FollowOrganizationMutation } from 'openland-api/FollowOrganizationMutation';
import { CreateListingMutation } from 'openland-api/CreateListingMutation';
import { EditListingMutation } from 'openland-api/EditListingMutation';
import { DeleteListingMutation } from 'openland-api/DeleteListingMutation';

export const withOrganization = graphqlCompose5(
    graphqlRouted(OrganizationQuery, { params: ['organizationId'] }),
    graphqlMutation(FollowOrganizationMutation, 'followOrganization', { params: ['organizationId'] }),
    graphqlMutation(CreateListingMutation, 'createListing', { refetchQueries: [OrganizationQuery], refetchParams: ['organizationId'] }),
    graphqlMutation(EditListingMutation, 'editListing', { refetchQueries: [OrganizationQuery], refetchParams: ['organizationId'] }),
    graphqlMutation(DeleteListingMutation, 'deleteListing', { refetchQueries: [OrganizationQuery], refetchParams: ['organizationId'] })
);