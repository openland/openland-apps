import * as React from 'react';
import { MutationFunc } from 'react-apollo';

export function withLiveMutation<P>(WrappedComponent: React.ComponentType<P & { mutate?: MutationFunc<{}> } & { loading: boolean, error: boolean, action: () => void }>): React.ComponentType<{ mutate?: MutationFunc<{}> } & P> {
    return class LiveMutation extends React.Component<{ mutate?: MutationFunc<{}> } & P, { loading: boolean, error: boolean }> {

        constructor(props: { mutate?: MutationFunc<{}> } & P) {
            super(props);
            this.state = { loading: false, error: false };
        }

        action = async () => {
            if (!this.state.loading) {
                this.setState({ loading: true });
                this.props.mutate!!({}).then((v) => {
                    this.setState({ loading: false, error: false });
                }).catch((v) => {
                    this.setState({ loading: false, error: true });
                });
            }
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    loading={this.state.loading}
                    error={this.state.error}
                    action={this.action}
                />
            );
        }
    };
}