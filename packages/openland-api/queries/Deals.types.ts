import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Deals from './Deals';

export const AllDealsQuery = typedQuery<Types.AllDealsQuery, {}>(Deals.AllDealsQuery);
export const AllDealsMapQuery = typedQuery<Types.AllDealsMapQuery, {}>(Deals.AllDealsMapQuery);

export const DealQuery = typedQuery<Types.DealQuery, {}>(Deals.DealQuery);
export const AddDealMutation = typedMutation<Types.AddDealMutation, Types.AddDealMutationVariables>(Deals.AddDealMutation);
export const AlterDealMutation = typedMutation<Types.AlterDealMutation, Types.AlterDealMutationVariables>(Deals.AlterDealMutation);
export const RemoveDealMutation = typedMutation<Types.RemoveDealMutation, Types.RemoveDealMutationVariables>(Deals.RemoveDealMutation);