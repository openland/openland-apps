import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { UpdateAppMutation } from 'openland-api';
import { RefreshAppTokenMutation } from 'openland-api';
import { CreateAppMutation } from 'openland-api';
import { MyAppsQuery } from 'openland-api';

export const withAppProfile = graphqlCompose3(
    graphqlMutation(CreateAppMutation, 'createApp', { refetchQueries: [MyAppsQuery] }),
    graphqlMutation(UpdateAppMutation, 'updateApp'),
    graphqlMutation(RefreshAppTokenMutation, 'refreshToken'),
);
