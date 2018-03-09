import * as React from 'react';
import { MutationFunc } from 'react-apollo';
import { XButtonStyleProps, XButton } from './XButton';

export class XButtonMutation extends React.Component<XButtonStyleProps & { mutation: MutationFunc<{}>, variables?: any }, { loading: boolean }> {

    constructor(props: XButtonStyleProps & { mutation: MutationFunc<{}> }) {
        super(props);
        this.state = { loading: false };
    }

    handleClick = async (e: any) => {
        e.preventDefault();
        if (this.state.loading) {
            return;
        }
        this.setState({ loading: true });
        try {
            await this.props.mutation({ variables: this.props.variables });
        } catch (e) {
            // Ignore
        } finally {
            this.setState({ loading: false });
        }
    }

    render() {
        let { mutation, variables, ...other } = this.props;
        return <XButton loading={this.state.loading} {...other} onClick={this.handleClick} />;
    }
}