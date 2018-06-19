import { graphqlCompose4 } from 'openland-x-graphql/graphqlCompose';
import { withOpportunityByIdGet } from './withOpportunityByIdGet';
import { withApproveOpportunity } from './withApproveOpportunity';
import { withRejectOpportunity } from './withRejectOpportunity';
import { withSnoozeOpportunity } from './withSnoozeOpportunity';

export const withOpportunityById = graphqlCompose4(withOpportunityByIdGet, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity);