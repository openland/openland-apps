import { graphqlMutation } from 'openland-x-graphql/graphqlMutation';
import { SnoozeOpportunityMutation } from 'openland-api/SnoozeOpportunityMutation';
import {  OpportunityStatsQuery } from 'openland-api/OpportunityStatsQuery';

export const withSnoozeOpportunity = graphqlMutation(SnoozeOpportunityMutation, 'snooze', { refetchQueries: [OpportunityStatsQuery] });