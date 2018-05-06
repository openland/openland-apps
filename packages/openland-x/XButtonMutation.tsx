import * as React from 'react';
import { MutationFunc } from 'react-apollo';
import { XButtonStyleProps, XButton } from './XButton';

interface XButtonMutationProps extends XButtonStyleProps {
    mutation: MutationFunc<{}>;
    variables?: any;
    onSuccess?: () => void;
}

export class XButtonMutation extends React.Component<XButtonMutationProps, { loading: boolean }> {

    constructor(props: XButtonMutationProps) {
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
            if (this.props.variables) {
                await this.props.mutation({ variables: this.props.variables });
            } else {
                await this.props.mutation({});
            }
        } catch (e) {
            console.warn(e);
        } finally {
            if (this.props.onSuccess) {
                this.props.onSuccess();
            }
            this.setState({ loading: false });
        }
    }

    render() {
        let { mutation, variables, ...other } = this.props;
        return <XButton loading={this.state.loading} {...other} onClick={this.handleClick} />;
    }
}