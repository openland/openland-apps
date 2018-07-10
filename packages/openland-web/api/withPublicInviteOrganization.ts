
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { OrganizationPublicInviteOrganizatonsQuery, OrganizationCreatePublicInviteOrganizatonsMutation, OrganizationDeletePublicInviteOrganizatonsMutation } from 'openland-api';

export const withPublicInviteOrganization = graphqlCompose3(
    graphqlRouted(OrganizationPublicInviteOrganizatonsQuery),
    graphqlMutation(OrganizationCreatePublicInviteOrganizatonsMutation, 'createPublicInvite', { refetchQueries: [OrganizationPublicInviteOrganizatonsQuery] }, ),
    graphqlMutation(OrganizationDeletePublicInviteOrganizatonsMutation, 'deletePublicInvite', { refetchQueries: [OrganizationPublicInviteOrganizatonsQuery] }),
);
