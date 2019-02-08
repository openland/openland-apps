import { canUseDOM } from 'openland-y-utils/canUseDOM';

export const renderDevPortal = (element: any) => {
    if (canUseDOM) {
        const ReactDOM = require('react-dom');
        ReactDOM.render(
            ReactDOM.createPortal(element, document.body),
            document.getElementById('dev_portal'),
        );
    }
};
