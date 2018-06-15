// WARNING! THIS IS AUTOGENERATED FILE. DO NOT EDIT!

import { typedMutation } from 'openland-x-graphql/typed';
import { typedQuery } from 'openland-x-graphql/typed';
import * as Raw from './Deals';
import * as Types from '../Types';

export const AllDealsQuery = typedQuery<Types.AllDealsQuery, {}>(Raw.AllDealsQuery);
export const AllDealsMapQuery = typedQuery<Types.AllDealsMapQuery, {}>(Raw.AllDealsMapQuery);
export const DealQuery = typedQuery<Types.DealQuery, Types.DealQueryVariables>(Raw.DealQuery);
export const AddDealMutation = typedMutation<Types.AddDealMutation, Types.AddDealMutationVariables>(Raw.AddDealMutation);
export const AlterDealMutation = typedMutation<Types.AlterDealMutation, Types.AlterDealMutationVariables>(Raw.AlterDealMutation);
export const RemoveDealMutation = typedMutation<Types.RemoveDealMutation, Types.RemoveDealMutationVariables>(Raw.RemoveDealMutation);