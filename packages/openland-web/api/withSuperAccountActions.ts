import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { SuperAccountQuery } from 'openland-api/SuperAccountQuery';
import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SuperAccountActivateMutation, SuperAccountPendMutation } from 'openland-api';

export const withSuperAccountActions = graphqlCompose3(
    graphqlRouted(SuperAccountQuery),
    graphqlMutation(SuperAccountActivateMutation, 'activate'),
    graphqlMutation(SuperAccountPendMutation, 'pend')
);