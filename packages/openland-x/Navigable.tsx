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
    anchor?: string;
    query?: { field: string; value?: string; clear?: boolean; replace?: boolean };
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

export type NavigableParentProps<T> = Pick<T, Exclude<keyof T, keyof NavigableChildProps>> &
    NavigableProps;

// Remove tailing slash and cut query string from the path
function normalizePath(src: string): string {
    if (src.indexOf('?') >= 0) {
        src = src.split('?', 2)[0];
    }
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

export function makeNavigable<T>(
    Wrapped: React.ComponentType<T & NavigableChildProps>,
): React.ComponentType<NavigableParentProps<T>> {
    // Actionable component
    let Actionable = class ActionableComponent extends React.PureComponent<
        NavigableParentProps<T> & { __router: XRouter } & { __modal: XModalContextValue },
        { active: boolean }
    > {
        constructor(
            props: NavigableParentProps<T> & { __router: XRouter } & {
                __modal: XModalContextValue;
            },
        ) {
            super(props);
            this.state = { active: this.resolveIsActive(props) };
        }

        componentWillReceiveProps(
            nextProps: NavigableParentProps<T> & { __router: XRouter } & {
                __modal: XModalContextValue;
            },
        ) {
            if (this.props !== nextProps) {
                this.setState({ active: this.resolveIsActive(nextProps) });
            }
        }

        resolveIsActive(
            props: NavigableParentProps<T> & { __router: XRouter } & {
                __modal: XModalContextValue;
            },
        ) {
            if (props.enabled === false) {
                return false;
            }
            if (props.active !== undefined && props.active !== null) {
                return props.active as boolean; // as boolean for simplifying derived types
            }
            if (props.path && props.__router) {
                let ncurrent = normalizePath(props.__router.path);
                let ntarget = undefined;
                if (typeof props.path === 'string') {
                    ntarget = normalizePath(props.path);
                }

                if (
                    ncurrent === ntarget ||
                    (ncurrent.startsWith(ntarget + '/') && props.activateForSubpaths)
                ) {
                    return true;
                }
            } else if (props.query && props.__router) {
                return props.__router.query[props.query.field] === props.query.value;
            }
            return false;
        }

        onClick: React.MouseEventHandler<any> = e => {
            const {
                __router,
                __modal,
                path,
                query,
                anchor,
                enabled,
                onClick,
                autoClose,
                href,
            } = this.props;

            // Anchors are handled by default - no need to preventDefault
            if (anchor) {
                return;
            }

            // Ignore if disabled
            if (enabled === false) {
                e.preventDefault();
                return;
            }

            // Ignore click for new tab / new window behavior
            // if clicked node is anchor element
            if (
                e.currentTarget.nodeName === 'A' &&
                (e.metaKey ||
                    e.ctrlKey ||
                    e.shiftKey ||
                    (e.nativeEvent && e.nativeEvent.which === 2))
            ) {
                return;
            }

            if (onClick) {
                onClick(e);
            }

            // What if event was prevented on callback above?
            if (e.defaultPrevented) {
                return;
            }

            if (autoClose && __modal.close) {
                __modal.close();
            }

            // Handling click itself
            if (path || query) {
                // First of all preventing default behavior
                e.preventDefault();
                // e.stopPropagation();
                // Invoke router
                if (__router) {
                    if (path) {
                        console.warn(path);
                        if (typeof path === 'string') {
                            __router.push(path);
                        }
                    } else if (query) {
                        if (query.replace) {
                            __router.replaceQuery(query.field, query.value);
                        } else {
                            __router.pushQuery(query.field, query.value, query.clear);
                        }
                    }
                }
            } else if (href) {
                // Do nothing for href-based props - allow default browser action
            } else {
                // If nothing is provided, just prevent default behaviour
                e.preventDefault();
                // e.stopPropagation();
            }
        };

        render() {
            let linkHref = '#';
            let target = undefined;
            let isActive = this.state.active;

            // Resolving Url
            if (typeof this.props.anchor === 'string') {
                linkHref = this.props.anchor!;
            } else if (this.props.__router && typeof this.props.path === 'string') {
                linkHref = this.props.__router.resolveLink(this.props.path);
            } else if (this.props.__router && this.props.query) {
                let linkPath = resolveActionPath(this.props, this.props.__router);
                linkHref = this.props.__router.resolveLink(linkPath);
            } else if (typeof this.props.href === 'string') {
                linkHref = this.props.href!!;
                target = '_blank';
            }

            // Resolving state
            if (this.props.enabled === false) {
                linkHref = '#';
            }

            // Split
            let {
                href,
                path,
                query,
                autoClose,
                activateForSubpaths,
                active,
                enabled,
                onClick,
                ...other
            } = this.props as any;
            return (
                <Wrapped
                    href={linkHref === '#' ? undefined : linkHref}
                    hrefTarget={target}
                    active={isActive}
                    enabled={this.props.enabled !== false}
                    onClick={
                        this.props.href ||
                        this.props.path ||
                        this.props.query ||
                        this.props.autoClose ||
                        this.props.anchor
                            ? this.onClick
                            : onClick
                    }
                    {...other}
                >
                    {this.props.children}
                </Wrapped>
            );
        }
    };

    const ContextWrapper = (props: NavigableParentProps<T>) => {
        const { children, ...other } = props as any;
        const modal = React.useContext(XModalContext);
        const router = React.useContext(XRouterContext);

        return (
            <Actionable {...other} __router={router!!} __modal={modal}>
                {children}
            </Actionable>
        );
    };

    return ContextWrapper;
}
