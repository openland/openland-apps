import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { CreateUserProfileAndOrganizationMutation } from 'openland-api';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { ProfilePrefillQuery } from 'openland-api';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountQuery } from 'openland-api';

export const withCreateUserProfileAndOrganization = graphqlCompose2(
    graphqlMutation(CreateUserProfileAndOrganizationMutation, 'create', {
        refetchQueries: [AccountQuery],
    }),
    graphqlRouted(ProfilePrefillQuery),
);
