import { graphqlCompose6 } from 'openland-x-graphql/graphqlCompose';
import { withNextOpportunity } from './withNextOpportunity';
import { withApproveOpportunity } from './withApproveOpportunity';
import { withRejectOpportunity } from './withRejectOpportunity';
import { withParcelNotes } from './withParcelNotes';
import { withSnoozeOpportunity } from './withSnoozeOpportunity';
import { withResetOpportunity } from './withResetOpportunity';

export const withOpportunity = graphqlCompose6(withNextOpportunity, withApproveOpportunity, withRejectOpportunity, withSnoozeOpportunity, withParcelNotes, withResetOpportunity);