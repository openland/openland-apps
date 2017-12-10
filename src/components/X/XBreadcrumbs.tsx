import * as React from 'react';
import { Link } from '../Link';
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
        <Link path={props.path}>
            {props.title}
        </Link>
    );
}