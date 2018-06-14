import { graphqlCompose3 } from 'openland-x-graphql/graphqlCompose';
import { withParcelDirect2 } from './withParcelDirect2';
import { withParcelLikes } from './withParcelLikes';
import { withParcelUnlikes } from './withParcelUnlikes';

export const withParcelDirect = graphqlCompose3(withParcelDirect2, withParcelLikes, withParcelUnlikes);