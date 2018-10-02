import * as React from 'react';
import { MutationFunc } from 'react-apollo';

interface XMutationProps {
    mutation?: MutationFunc<{}>;
    active?: boolean;
    variables?: any;
    className?: string;
    onSuccess?: () => void;
    action?: () => void;
}

export class XMutation extends React.Component<XMutationProps, { loading: boolean }> {

    constructor(props: XMutationProps) {
        super(props);
        this.state = { loading: false };
    }

    handleClick = async (e: any) => {
        e.stopPropagation();
        e.preventDefault();
        if (this.state.loading) {
            return;
        }
        this.setState({ loading: true });
        try {
            if (this.props.action) {
                await this.props.action();
            } else if (this.props.mutation) {
                if (this.props.variables) {
                    await this.props.mutation({ variables: this.props.variables });
                } else {
                    await this.props.mutation({});
                }
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
        let childs = [];
        for (let c of React.Children.toArray(this.props.children)) {
            let modification = {};
            if (!(c as any).props._isMutation) {
                modification = {
                    loading: this.state.loading,
                    onClick: this.props.active !== false ? this.handleClick : undefined,
                };
            }
            childs.push(React.cloneElement(c as any, modification));

        }

        return (
            <div className={this.props.className} >
                {childs}
            </div>
        );
    }
}