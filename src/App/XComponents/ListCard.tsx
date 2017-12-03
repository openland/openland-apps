import * as React from 'react';

export class ListCard extends React.Component<{
    title: string, newUnits?: number,
    subtitle?: string, endYear?: string,
    picture?: string, verified?: boolean
}, { expanded: boolean }> {
    constructor() {
        super();

        this.state = {
            expanded: false
        };
    }

    render() {
        return (
            <div className="x-in--item">
                <div className={'x-card' + (this.props.picture ? '' : ' without-photo') + (this.props.verified ? ' is-checked' : '') + (this.state.expanded ? ' is-expanded' : '')}>
                    {this.props.picture && (<div className="x-card--photo" style={{ backgroundImage: `url(${this.props.picture})` }}>{}</div>)}

                    {!this.props.picture && (
                        <div className="x-card--info">
                            <div className="x-card--in">
                                <div className="x-card--box">
                                    <div className="x-card--title">{this.props.title}</div>
                                    {this.props.subtitle && (<div className="x-card--text">{this.props.subtitle}</div>)}
                                </div>
                            </div>
                            <div className="x-card--counter"><span>{this.props.newUnits || '?'}</span>Net new units</div>
                            <div className="x-card--counter"><span>{this.props.endYear || '?'}</span>Expected completion</div>
                            <a className="x-card--toggler" href="#" onClick={(e) => { e.preventDefault(); this.setState({ expanded: !this.state.expanded }); }}>{}</a>
                            <div className="x-card--btns">
                                <a className="x-card--btn" href="#"><i className="icon-share">{}</i></a>
                                <a className="x-card--btn" href="#"><i className="icon-edit">{}</i></a>
                            </div>
                        </div>
                    )}
                    {this.props.picture && (
                        <div className="x-card--info">
                            <div className="x-card--box">
                                <div className="x-card--title">{this.props.title}</div>
                                {this.props.subtitle && (<div className="x-card--text">{this.props.subtitle}</div>)}
                            </div>
                        </div>
                    )}
                    {this.props.picture && (
                        <div className="x-card--tools">
                            <div className="x-card--counter"><span>{this.props.newUnits || '?'}</span>Net new units</div>
                            <div className="x-card--counter"><span>{this.props.endYear || '?'}</span>Expected completion</div>

                            <a className="x-card--toggler" href="#" onClick={(e) => { e.preventDefault(); this.setState({ expanded: !this.state.expanded }); }}>{}</a>
                        </div>
                    )}
                    {this.props.picture && (
                        <div className="x-card--btns">
                            <a className="x-card--btn" href="#"><i className="icon-share">{}</i></a>
                            <a className="x-card--btn" href="#"><i className="icon-edit">{}</i></a>
                        </div>
                    )}

                    <div className="x-card--details">
                        <div className="x-card--map">
                            <div className="x-card--map-in">{}</div>
                        </div>
                        <div className="x-card--fields">
                            <table>
                                {this.props.children}
                            </table>
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export function ListCardItem(props: { title: string, value: string }) {
    return (<tr><td>{props.title}</td><td>{props.value}</td></tr>);
}