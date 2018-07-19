import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { CreateUserProfileAndOrganizationMutation } from 'openland-api/CreateUserProfileAndOrganizationMutation';
import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { ProfilePrefillQuery } from 'openland-api/ProfilePrefillQuery';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { AccountQuery } from 'openland-api/AccountQuery';

export const withCreateUserProfileAndOrganization = graphqlCompose2(
    graphqlMutation(CreateUserProfileAndOrganizationMutation, 'create', { refetchQueries: [AccountQuery] }),
    graphqlRouted(ProfilePrefillQuery)
);