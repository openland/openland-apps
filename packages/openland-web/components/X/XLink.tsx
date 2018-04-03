import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Routes } from '../../routes';
import { resolveActionPath } from '../../utils/routing';
import { XRouterReceiver } from '../routing/XRouter';

export interface XLinkProps {
    path?: string | null;
    href?: string | null;
    query?: { field: string, value?: string } | null;
    className?: string;
    activateForSubpaths?: boolean | null;
    onClick?: React.MouseEventHandler<HTMLAnchorElement>;
    clickOnDown?: boolean;
    autoClose?: boolean;
}

function normalizePath(src: string): string {
    if (src.indexOf('?') >= 0) {
        src = src.split('?', 2)[0];
    }
    return src.endsWith('/') ? src.substring(0, src.length - 1) : src;
}

export class XLink extends XRouterReceiver<XLinkProps> {

    static contextTypes = {
        xcloser: PropTypes.func,
        xrouter: PropTypes.object.isRequired
    };

    constructor(props: XLinkProps, context: any) {
        super(props, context);
    }

    resolveIsActive() {
        if (this.props.path) {
            let ncurrent = normalizePath(this.router.path);
            let ntarget = normalizePath(this.props.path);
            if (ncurrent === ntarget || (ncurrent.startsWith(ntarget + '/') && this.props.activateForSubpaths)) {
                return true;
            }
        } else if (this.props.query) {
            return this.router.query[this.props.query.field] === this.props.query.value;
        }
        return false;
    }

    onClick: React.MouseEventHandler<HTMLAnchorElement> = (e) => {

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
        if (this.props.autoClose === true && this.context.xcloser) {
            console.warn('Auto closing');
            (this.context.xcloser as () => void)();
        }

        // Handling click itself
        if (this.props.path || this.props.query) {

            // First of all preventing default behavior
            e.preventDefault();

            // Invoke router
            if (this.props.path) {
                this.router.push(this.props.path);
            } else if (this.props.query) {
                this.router.pushQuery(this.props.query.field, this.props.query.value);
            }

        } else if (this.props.href) {
            // Do nothing for href-based props - allow default browser action
        } else {
            // If nothing is provided, just prevent default behaviour
            e.preventDefault();
        }
    }

    render() {
        var className = this.props.className ? this.props.className : undefined;
        let href = '#';
        let target: string | undefined = undefined;
        let isActive = this.resolveIsActive();

        // Resolving Url
        if (this.props.path) {
            href = Routes.findAndGetUrls(this.props.path).urls.as;
        } else if (this.props.query) {
            let path = resolveActionPath(this.props, this.router);
            href = Routes.findAndGetUrls(path).urls.as;
        } else if (this.props.href) {
            href = this.props.href;
            target = '_blank';
        }

        // Resolving class
        if (isActive) {
            if (className) {
                className += ' is-active';
            } else {
                className = 'is-active';
            }
        }

        return (
            <a className={className} onClick={this.onClick} href={href} target={target}>{this.props.children}</a>
        );
    }
}