import { typedQuery, typedMutation } from 'openland-x-graphql/typed';
import * as Types from '../Types';
import * as Sourcing from './Sourcing';

export const SourcingQuery = typedQuery<Types.SourcingQuery, Types.SourcingQueryVariables>(Sourcing.SourcingQuery);
export const SourcingFirstQuery = typedQuery<Types.SourcingFirstQuery, Types.SourcingFirstQueryVariables>(Sourcing.SourcingFirstQuery);
export const SourcingAllQuery = typedQuery<Types.SourcingAllQuery, Types.SourcingAllQueryVariables>(Sourcing.SourcingAllQuery);
export const ProspectingCapacityQuery = typedQuery<Types.ProspectingCapacityQuery, Types.ProspectingCapacityQueryVariables>(Sourcing.ProspectingCapacityQuery);
export const OpportunityQuery = typedQuery<Types.OpportunityQuery, Types.OpportunityQueryVariables>(Sourcing.OpportunityQuery);
export const OpportunityTileOverlayQuery = typedQuery<Types.OpportunityTileOverlayQuery, Types.OpportunityTileOverlayQueryVariables>(Sourcing.OpportunityTileOverlayQuery);

export const NextOpportunityQuery = typedQuery<Types.NextOpportunityQuery, Types.NextOpportunityQueryVariables>(Sourcing.NextOpportunityQuery);
export const OpportunityStatsQuery = typedQuery<Types.OpportunityStatsQuery, Types.OpportunityStatsQueryVariables>(Sourcing.OpportunityStatsQuery);
export const OwnersQuery = typedQuery<Types.OwnersQuery, Types.OwnersQueryVariables>(Sourcing.OwnersQuery);

export const AddOpportunityMutation = typedMutation<Types.ApproveOpportunityMutation, Types.AddOpportunityMutationVariables>(Sourcing.AddOpportunityMutation);
export const RejectOpportunityMutation = typedMutation<Types.RejectOpportunityMutation, Types.RejectOpportunityMutationVariables>(Sourcing.RejectOpportunityMutation);
export const SnoozeOpportunityMutation = typedMutation<Types.SnoozeOpportunityMutation, Types.SnoozeOpportunityMutationVariables>(Sourcing.SnoozeOpportunityMutation);
export const ResetOpportunityMutation = typedMutation<Types.ResetOpportunityMutation, Types.ResetOpportunityMutationVariables>(Sourcing.ResetOpportunityMutation);
export const AddOpportunityFromSearchMutation = typedMutation<Types.AddOpportunityFromSearchMutation, Types.AddOpportunityFromSearchMutationVariables>(Sourcing.AddOpportunityFromSearchMutation);