import * as React from 'react';
import { resolveActionPath } from 'openland-x-routing/resolveActionPath';
import { XRouter } from 'openland-x-routing/XRouter';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { XModalContext } from 'openland-x-modal/XModalContext';

export interface XLinkProps {
    path?: string | null;
    href?: string | null;
    query?: { field: string, value?: string } | null;
    className?: string;
    activateForSubpaths?: boolean | null;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    autoClose?: boolean;
    active?: boolean;
    as?: React.ComponentType<XLinkRender>;
    disabled?: boolean;
}

function normalizePath(src: string): string {
    if (src.indexOf('?') >= 0) {
        src = src.split('?', 2)[0];
    }
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

export interface XLinkRender {

    // Style settings
    className?: string;
    active: boolean;

    // Link settings
    newTab: boolean;
    href?: string;

    // Handlers
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
}

class XLinkAnchorRender extends React.Component<XLinkRender> {
    render() {
        let className = this.props.className ? this.props.className : undefined;
        if (this.props.active) {
            if (className) {
                className += ' is-active';
            } else {
                className = 'is-active';
            }
        }
        let target: string | undefined = undefined;
        if (this.props.newTab) {
            target = '_blank';
        }
        return (<a className={className} onClick={this.props.onClick} href={this.props.href} target={target}>{this.props.children}</a>);
    }
}

class XLinkMainRender extends React.Component<XLinkProps & { autoCloseContext?: { close: () => void }, router?: XRouter }> {

    constructor(props: XLinkProps) {
        super(props);
    }

    resolveIsActive(router: XRouter) {
        if (this.props.active !== undefined) {
            return this.props.active;
        }
        if (this.props.path) {
            let ncurrent = normalizePath(router.path);
            let ntarget = normalizePath(this.props.path);
            if (ncurrent === ntarget || (ncurrent.startsWith(ntarget + '/') && this.props.activateForSubpaths)) {
                return true;
            }
        } else if (this.props.query) {
            return router.query[this.props.query.field] === this.props.query.value;
        }
        return false;
    }

    onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {

        // Ignore if disabled
        if (this.props.disabled) {
            return;
        }

        // Ignore click for new tab / new window behavior
        // if clicked node is anchor element
        if (e.currentTarget.nodeName === 'A' &&
            (e.metaKey || e.ctrlKey || e.shiftKey || (e.nativeEvent && e.nativeEvent.which === 2))) {
            return;
        }

        if (this.props.onClick) {
            this.props.onClick(e);
        }

        // What if event was prevented on callback above?
        if (e.defaultPrevented) {
            return;
        }

        // Auto close on click
        if (this.props.autoClose === true && this.props.autoCloseContext) {
            this.props.autoCloseContext.close();
        }

        // Handling click itself
        if (this.props.path || this.props.query) {

            // First of all preventing default behavior
            e.preventDefault();

            // Invoke router
            if (this.props.router) {
                if (this.props.path) {
                    this.props.router.push(this.props.path);
                } else if (this.props.query) {
                    this.props.router.pushQuery(this.props.query.field, this.props.query.value);
                }
            }
        } else if (this.props.href) {
            // Do nothing for href-based props - allow default browser action
        } else {
            // If nothing is provided, just prevent default behaviour
            e.preventDefault();
        }
    }

    render() {
        return (
            <XRouterContext.Consumer>
                {router => {
                    if (!router) {
                        throw Error('Router not configured!');
                    }
                    let href = '#';
                    let newTab = false;
                    let isActive = this.resolveIsActive(router);

                    // Resolving Url
                    if (this.props.path) {
                        href = router.resolveLink(this.props.path);
                    } else if (this.props.query) {
                        let path = resolveActionPath(this.props, router);
                        href = router.resolveLink(path);
                    } else if (this.props.href) {
                        href = this.props.href;
                        newTab = true;
                    }

                    if (this.props.disabled) {
                        href = '#';
                        isActive = false;
                    }

                    let Render: React.ComponentType<XLinkRender> = XLinkAnchorRender;

                    return (
                        <Render
                            active={isActive}
                            className={this.props.className}
                            newTab={newTab}
                            href={href}
                            onClick={this.onClick}
                        >
                            {this.props.children}
                        </Render>
                    );
                }}
            </XRouterContext.Consumer>
        );

    }
}

export class XLink extends React.PureComponent<XLinkProps> {
    render() {
        return (
            <XModalContext.Consumer>
                {(modal) => (
                    <XRouterContext.Consumer>
                        {(router) => (<XLinkMainRender {...this.props} autoCloseContext={modal} router={router} />)}
                    </XRouterContext.Consumer>
                )}
            </XModalContext.Consumer>
        );
    }
}