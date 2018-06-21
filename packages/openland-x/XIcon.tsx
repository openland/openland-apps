import * as React from 'react';
import * as classnames from 'classnames';

export function XIcon(props: { className?: string, icon: string, onClick?: () => void }) {
    return (
        <i className={classnames('material-icons', props.className)} onClick={props.onClick}>
            {props.icon}
        </i>
    );
}