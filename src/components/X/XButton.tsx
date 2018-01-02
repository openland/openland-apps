import * as React from 'react';
import { Button, ButtonProps } from 'semantic-ui-react';
import { RouterState, withRouter } from '../../utils/withRouter';
import { resolveActionPath } from '../../utils/routing';
import { MutationFunc } from 'react-apollo';

export interface XButtonProps extends ButtonProps {
    path?: string;
    query?: { field: string, value?: string };
    mutation?: MutationFunc<{}>;
    afterPath?: string;
}

class XButtonComponent extends React.Component<{ router: RouterState } & XButtonProps, { isLoading: boolean }> {

    constructor(props: { router: RouterState } & XButtonProps) {
        super(props);
        this.state = {isLoading: false};
    }

    handleClick = (event: React.MouseEvent<HTMLButtonElement>, data: ButtonProps) => {
        event.preventDefault();
        if (this.props.onClick) {
            this.props.onClick(event, data);
        } else if (this.props.mutation !== undefined) {
            if (!this.state.isLoading) {
                this.setState({isLoading: true});
                this.props.mutation({}).then((v) => {
                    this.setState({isLoading: false});
                    if (this.props.afterPath) {
                        this.props.router.push(this.props.afterPath);
                    }
                }).catch((e: any) => {
                    this.setState({isLoading: false});
                });
            }
        } else {
            let path = resolveActionPath(this.props);
            this.props.router.push(path);
        }
    };

    render() {
        let {onClick, afterPath, ...other} = this.props;
        return <Button {...other} onClick={this.handleClick} loading={this.state.isLoading}/>;
    }
}

export const XButton = withRouter<XButtonProps>(XButtonComponent);