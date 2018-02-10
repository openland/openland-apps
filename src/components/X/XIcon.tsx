import * as React from 'react';
import * as classnames from 'classnames';

export function XIcon(props: { className?: string, icon: string }) {
    return (
        <i className={classnames('material-icons', props.className)}>
            {props.icon}
        </i>
    )
}