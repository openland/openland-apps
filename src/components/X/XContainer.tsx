import * as React from 'react';

interface ContainerProps {
    children?: any;
    wide?: boolean;
    clearfix?: boolean;
}

export function XContainer(props: ContainerProps) {
    return (
        <div className={'x-container' + ((props.wide === true) ? ' is-wide' : '') + ((props.clearfix === true) ? ' clearfix' : '')}>
            {props.children}
        </div>
    );
}