import { graphqlSelect } from 'openland-x-graphql/graphqlSelect';

export const UserSelect = graphqlSelect((query, s) => s.queryUsers({ query }));
