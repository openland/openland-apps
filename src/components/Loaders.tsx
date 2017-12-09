import * as React from 'react';

export class Loader extends React.Component<{ isRelative?: boolean, noBackground?: boolean, }> {
    render() {
        return (
            <div className={'st-loader' + (this.props.isRelative!! ? ' is-relative' : '') + (this.props.noBackground!! ? ' no-bg' : '')}>
                <svg className="st-loader--svg" viewBox="25 25 50 50">
                    <circle className="st-loader--circle" cx="50" cy="50" r="20" fill="none" strokeWidth="2" strokeMiterlimit="10" />
                </svg>
            </div>
        );
    }
}

export class LoaderLine extends React.Component {
    render() {
        return (
            <div className="x-lineloader" >
                <div className="x-lineloader--bar">{}</div>
                <div className="x-lineloader--bar">{}</div>
                <div className="x-lineloader--bar">{}</div>
            </div>
        );
    }
}