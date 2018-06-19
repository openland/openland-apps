import { graphqlCompose2 } from 'openland-x-graphql/graphqlCompose';
import { withDealAlter } from './withDealAlter';
import { withDeal } from './withDeal';

export const withDealAlterCombined = graphqlCompose2(withDealAlter, withDeal);