import { canUseDOM } from '../../utils/environment';
import { withRouter } from '../withRouter';

export const RedirectComponent = withRouter<{ path: string }>(props => {
    if (canUseDOM) {
        props.router.push(props.path);
    }
    return null;
});