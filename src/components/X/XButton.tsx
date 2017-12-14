import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import { withRouter } from '../../utils/withRouter';
import { resolveActionPath } from '../../utils/routing';

export interface XButtonProps extends ButtonProps {
    path?: string; 
    query?: { field: string, value?: string };
}

export const XButton = withRouter<XButtonProps>((props) => {
    let path = resolveActionPath(props);
    console.warn(path);
    let handleClick = () => {
        props.router.push(path);
    };
    return <Button {...props} onClick={handleClick} />;
});