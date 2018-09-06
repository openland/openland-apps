import { graphqlRouted } from 'openland-x-graphql/graphqlRouted';
import { TopCategoriesQuery } from 'openland-api';
export const withTopCategories = graphqlRouted(TopCategoriesQuery);