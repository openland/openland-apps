import * as React from 'react';

export class Footer extends React.Component {
    render () {
        return (
            <div className="x-footer">
                <div className="x-container">
                    <div className="x-footer--title">San Francisco Housing Forecast 2017-18</div>
                    <div className="x-footer--powered">Powered by Statecraft</div>

                    {this.props.children}
                </div>
            </div>
        );
    }
}