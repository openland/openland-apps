import * as React from 'react';

export class RootContainer extends React.Component<{}, { isShown: boolean }> {
    constructor() {
        super();
        this.state = { isShown: false };
    }

    render() {
        var items = React.Children.toArray(this.props.children);
        if (items.length === 1) {
            throw 'Need to have at least one child';
        }
        var sidebar = React.cloneElement(items[0] as React.ReactElement<any>, {
            isShown: this.state.isShown,
            showCallback: () => { this.setState({ isShown: !this.state.isShown }); }
        });
        var other = items.slice(1);
        return (
            <div className="st-page">
                {sidebar}
                <div className={'st-page--box' + (this.state.isShown ? ' is-shown' : '')}>
                    {other}
                </div>
            </div>
        );
    }
}