import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { ProfileQuery } from 'openland-api';
import { MyOrganizationsQuery } from 'openland-api';
import { ProfileUpdateMutation } from 'openland-api';
import { AccountQuery } from 'openland-api';
import { SetUserShortnameMutation } from 'openland-api';

export const withProfile = graphqlCompose3(
    graphqlRouted(ProfileQuery),
    graphqlMutation(ProfileUpdateMutation, 'updateProfile', {
        refetchQueries: [AccountQuery, MyOrganizationsQuery],
    }),
    graphqlMutation(SetUserShortnameMutation, 'setShortname', {
        refetchQueries: [AccountQuery],
    }),
);
