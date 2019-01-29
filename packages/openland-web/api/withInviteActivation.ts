import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { OrganizationActivateByInviteMutation } from 'openland-api';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountAppInviteInfoQuery } from 'openland-api';

export const withInviteActivation = graphqlCompose2(
    graphqlRouted(AccountAppInviteInfoQuery, { params: ['inviteKey'] }),
    graphqlMutation(OrganizationActivateByInviteMutation, 'activate', {
        params: ['inviteKey'],
    }),
);
