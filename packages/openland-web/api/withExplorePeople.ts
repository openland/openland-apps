import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { ExplorePeopleQuery } from 'openland-api';

export const withExplorePeople = graphqlRouted(ExplorePeopleQuery, { params: ['page', 'query'], fetchPolicy: 'network-only' });