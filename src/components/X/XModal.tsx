import * as React from 'react';
import { Modal } from 'semantic-ui-react';
import { withRouter } from '../../utils/withRouter';

export const XModal = withRouter<{ field: string, children: any }>((props) => {
    if (props.router.query!![props.field] !== undefined) {
        return (
            <Modal open={true}>
                {props.children}
            </Modal>
        );
    }
    return null;
});