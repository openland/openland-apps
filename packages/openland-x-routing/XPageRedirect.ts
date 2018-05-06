import { withRouter } from './withRouter';
import { canUseDOM } from 'openland-x-utils/canUseDOM';

export const XPageRedirect = withRouter<{ path: string }>(props => {
    if (canUseDOM) {
        props.router.push(props.path);
    }
    return null;
});