import * as React from 'react';
import { XModalContextValue, XModalContext } from 'openland-x-modal/XModalContext';

export interface ActionableChildProps {
    loading?: boolean;
    enabled?: boolean;
    onClick?: React.MouseEventHandler<any>;
}

interface ActionableProps {
    loading?: boolean;
    enabled?: boolean;
    successPath?: string;
    successQuery?: { field: string, value?: string };
    successClose?: boolean;
    action?: (() => any);
    onSuccess?: () => void;
    onFailed?: () => void;
    onClick?: React.MouseEventHandler<any>;
}

export type ActionableParentProps<T> = Pick<T, Exclude<keyof T, keyof ActionableChildProps>> & ActionableProps;

export function makeActionable<T>(Wrapped: React.ComponentType<T & ActionableChildProps>): React.ComponentType<ActionableParentProps<T>> {
    let Actionable = class ActionableComponent extends React.Component<ActionableParentProps<T> & { __modal: XModalContextValue }, { loading: boolean }> {

        private isLoading = false;

        constructor(props: ActionableParentProps<T> & { __modal: XModalContextValue }) {
            super(props);
            this.state = { loading: false };
        }

        onClick: React.MouseEventHandler<any> = async (e) => {

            if (this.isLoading) {
                e.stopPropagation();
                e.preventDefault();
                return;
            }

            // Handling custom onClick
            if (this.props.onClick) {
                this.props.onClick(e);
            }

            // Ignore if not configured
            if (!this.props.action) {
                return;
            }

            // Ignore if disabled
            if (this.props.enabled === false) {
                e.stopPropagation();
                e.preventDefault();
                return;
            }

            e.stopPropagation();
            e.preventDefault();
            this.setState({ loading: true });
            this.isLoading = true;

            try {
                await this.props.action();
                try {
                    if (this.props.onSuccess) {
                        this.props.onSuccess();
                    }
                } catch (e) {
                    // Ignore
                    console.warn(e);
                }
            } catch (e) {
                console.warn(e);
                if (this.props.onFailed) {
                    this.props.onFailed();
                }
            } finally {
                this.isLoading = false;
                this.setState({ loading: false });
            }
        }

        render() {
            let isLoading = this.state.loading || this.props.loading || false;

            // Split 
            let {
                loading, enabled, successPath, successQuery, successClose, action, onSuccess, onFailed, onClick, ...other
            } = this.props as any;

            return (
                <Wrapped
                    loading={isLoading}
                    enabled={this.props.enabled !== false}
                    onClick={action ? this.onClick : this.props.onClick}
                    {...other}
                >
                    {this.props.children}
                </Wrapped>
            );
        }

    };
    class ContextWrapper extends React.Component<ActionableParentProps<T>> {
        render() {
            let { children, ...other } = this.props as any;
            return (
                <XModalContext.Consumer>
                    {(modal) => (
                        <Actionable {...other} __modal={modal!!}>
                            {children}
                        </Actionable>
                    )}
                </XModalContext.Consumer>
            );
        }
    }
    return ContextWrapper;
}