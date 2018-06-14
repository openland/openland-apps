import { graphqlCompose4 } from 'openland-x-graphql/graphqlCompose';
import { withParcelRaw } from './withParcelRaw';
import { withParcelLikesRouted } from './withParcelLikesRouted';
import { withParcelUnlikesRouted } from './withParcelUnlikesRouted';
import { withParcelNotes } from './withParcelNotes';

export const withParcel = graphqlCompose4(withParcelRaw, withParcelLikesRouted, withParcelUnlikesRouted, withParcelNotes);