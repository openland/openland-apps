import * as React from 'react';
import * as classnames from 'classnames';

export function XPageFullScreen (props: { behindHeader?: boolean, children: any }) {
    return (
        <div className={classnames('x-fullscreen', props.behindHeader ? 'behind-header' : '')}>
            {props.children}
        </div>
    )
}