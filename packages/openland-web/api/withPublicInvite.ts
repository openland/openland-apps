
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OrganizationPublicInviteQuery, OrganizationCreatePublicInviteMutation } from 'openland-api';

export const withPublicInvite = graphqlCompose2(
    graphqlRouted(OrganizationPublicInviteQuery, { params: ['organizationId'] }),
    graphqlMutation(OrganizationCreatePublicInviteMutation, 'createPublicInvite', { refetchQueries: [OrganizationPublicInviteQuery], params: ['organizationId'] }, ),
);
