import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import { withRouter } from '../../utils/withRouter';
import { resolveActionPath } from '../../utils/routing';

export interface XButtonProps extends ButtonProps {
    path?: string;
    query?: { field: string, value?: string };
}

export const XButton = withRouter<XButtonProps>((props) => {
    let handleClick = (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
        event.preventDefault();
        if (props.onClick) {
            props.onClick(event, data);
        } else {
            let path = resolveActionPath(props);
            props.router.push(path);
        }
    };
    return <Button {...props} onClick={handleClick} />;
});