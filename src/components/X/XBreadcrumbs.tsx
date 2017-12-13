import * as React from 'react';
import { XLink } from './XLink';
import { XSeparated } from './XSeparated';

function XBreadcrumbSeparator() {
    return <span> / </span>;
}

export class XBreadcrumbs extends React.Component {
    render() {
        return (
            <div>
                <XSeparated separator={XBreadcrumbSeparator}>
                    {this.props.children}
                </XSeparated>
            </div>
        );
    }
}

export function XBreadcrumbItem(props: { path: string, title: string }) {
    return (
        <XLink path={props.path}>
            {props.title}
        </XLink>
    );
}