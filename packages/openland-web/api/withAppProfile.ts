import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { UpdateAppMutation } from 'openland-api/UpdateAppMutation';
import { RefreshAppTokenMutation } from 'openland-api/RefreshAppTokenMutation';
import { CreateAppMutation } from 'openland-api/CreateAppMutation';

export const withAppProfile = graphqlCompose3(
    graphqlMutation(CreateAppMutation, 'createApp'),
    graphqlMutation(UpdateAppMutation, 'updateApp'),
    graphqlMutation(RefreshAppTokenMutation, 'refreshToken'),
);
