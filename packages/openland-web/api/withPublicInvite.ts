
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OrganizationPublicInviteQuery, OrganizationCreatePublicInviteMutation, OrganizationDeletePublicInviteMutation } from 'openland-api';

export const withPublicInvite = graphqlCompose3(
    graphqlRouted(OrganizationPublicInviteQuery, { params: ['organizationId'] }),
    graphqlMutation(OrganizationCreatePublicInviteMutation, 'createPublicInvite', { refetchQueries: [OrganizationPublicInviteQuery], params: ['organizationId'] }, ),
    graphqlMutation(OrganizationDeletePublicInviteMutation, 'deletePublicInvite', { refetchQueries: [OrganizationPublicInviteQuery], params: ['organizationId'] }),
);
