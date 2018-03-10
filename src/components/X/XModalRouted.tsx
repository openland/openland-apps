import * as React from 'react';
import { withRouter } from '../../utils/withRouter';
import { XModalStyleProps, XModal } from './XModal';

export const XModalRouted = withRouter<{ query: string } & XModalStyleProps>((props) => {
    let closedHandler = () => {
        props.router.pushQuery(props.query);
    };
    return (
        <XModal
            title={props.title}
            isOpen={props.router.query ? !!props.router.query[props.query] : false}
            onClosed={closedHandler}>
            {props.children}
        </XModal>
    );
});