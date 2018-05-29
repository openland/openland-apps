import * as React from 'react';
import { XRouter } from 'openland-x-routing/XRouter';
import { XRouterContext } from 'openland-x-routing/XRouterContext';
import { resolveActionPath } from 'openland-x-routing/resolveActionPath';
import { XModalContext, XModalContextValue } from 'openland-x-modal/XModalContext';

export interface NavigableChildProps {
    // Link
    href?: string;
    hrefTarget?: string;

    // State
    active?: boolean;
    enabled?: boolean;

    // Handlers
    onClick?: React.MouseEventHandler<any>;
}

interface NavigableProps {

    // Navigation action
    href?: string;
    path?: string;
    query?: { field: string, value?: string, clear?: boolean };
    autoClose?: boolean;

    // Activation
    activateForSubpaths?: boolean;
    active?: boolean;

    // Enabled
    enabled?: boolean;

    // On Click
    onClick?: React.MouseEventHandler<any>;

    // // Action
    // successPath?: string | null;
    // successQuery?: { field: string, value?: string } | null;
    // successClose?: boolean | null;
    // action?: (() => any) | null;
    // onSuccess?: () => void;
    // onFailed?: () => void;
}

export type NavigableParentProps<T> = Pick<T, Exclude<keyof T, keyof NavigableChildProps>> & NavigableProps;

// Remove tailing slash and cut query string from the path
function normalizePath(src: string): string {
    if (src.indexOf('?') >= 0) {
        src = src.split('?', 2)[0];
    }
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

export function makeNavigable<T>(Wrapped: React.ComponentType<T & NavigableChildProps>): React.ComponentType<NavigableParentProps<T>> {

    // Actionable component
    let Actionable = class ActionableComponent extends React.Component<NavigableParentProps<T> & { __router: XRouter } & { __modal: XModalContextValue }> {
        resolveIsActive() {
            if (this.props.active !== undefined && this.props.active !== null) {
                return this.props.active as boolean; // as boolean for simplifying derived types
            }
            if (this.props.path) {
                let ncurrent = normalizePath(this.props.__router.path);
                let ntarget = normalizePath(this.props.path!!);
                if (ncurrent === ntarget || (ncurrent.startsWith(ntarget + '/') && this.props.activateForSubpaths)) {
                    return true;
                }
            } else if (this.props.query) {
                return this.props.__router.query[this.props.query.field] === this.props.query.value;
            }
            return false;
        }

        onClick: React.MouseEventHandler<any> = (e) => {

            // Ignore if disabled
            if (this.props.enabled === false) {
                e.preventDefault();
                return;
            }

            // Ignore click for new tab / new window behavior
            // if clicked node is anchor element
            if (e.currentTarget.nodeName === 'A' &&
                (e.metaKey || e.ctrlKey || e.shiftKey || (e.nativeEvent && e.nativeEvent.which === 2))) {
                return;
            }

            // Handling custom onClick
            if (this.props.onClick) {
                this.props.onClick(e);
            }

            // What if event was prevented on callback above?
            if (e.defaultPrevented) {
                return;
            }

            // Auto close modal
            if (this.props.autoClose && this.props.__modal.close) {
                this.props.__modal.close();
            }

            // Handling click itself
            if (this.props.path || this.props.query) {

                // First of all preventing default behavior
                e.preventDefault();
                e.stopPropagation();

                // Invoke router
                if (this.props.__router) {
                    if (this.props.path) {
                        this.props.__router.push(this.props.path!!);
                    } else if (this.props.query) {
                        this.props.__router.pushQuery(this.props.query.field, this.props.query.value, this.props.query.clear);
                    }
                }
            } else if (this.props.href) {
                // Do nothing for href-based props - allow default browser action
            } else {
                // If nothing is provided, just prevent default behaviour
                e.preventDefault();
                // e.stopPropagation();
            }
        }

        render() {
            let linkHref = '#';
            let target = undefined;
            let isActive = this.resolveIsActive();

            // Resolving Url
            if (this.props.path) {
                linkHref = this.props.__router.resolveLink(this.props.path!!);
            } else if (this.props.query) {
                let linkPath = resolveActionPath(this.props, this.props.__router);
                linkHref = this.props.__router.resolveLink(linkPath);
            } else if (this.props.href) {
                linkHref = this.props.href!!;
                target = '_blank';
            }

            // Resolving state
            if (this.props.enabled === false) {
                linkHref = '#';
                isActive = false;
            }

            // Split 
            let {
                href, path, query, autoClose, activateForSubpaths, active, enabled, onClick, ...other
            } = this.props as any;

            return (
                <Wrapped
                    href={linkHref}
                    hrefTarget={target}
                    active={isActive}
                    enabled={this.props.enabled !== false}
                    onClick={this.onClick}
                    {...other}
                >
                    {this.props.children}
                </Wrapped>
            );
        }
    };

    // Forwarding contexts
    class ContextWrapper extends React.PureComponent<NavigableParentProps<T>> {
        render() {
            let { children, ...other } = this.props as any;
            return (
                <XModalContext.Consumer>
                    {(modal) => (
                        <XRouterContext.Consumer>
                            {(router) => (
                                <Actionable {...other} __router={router!!} __modal={modal}>
                                    {children}
                                </Actionable>
                            )}
                        </XRouterContext.Consumer>
                    )}
                </XModalContext.Consumer>
            );
        }
    }

    return ContextWrapper;
}