import * as React from 'react';

export class ListCard extends React.Component<{
    title: string, newUnits?: number,
    subtitle?: string, endYear?: string,
    picture?: string, verified?: boolean,
    url?: string
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
                            {this.props.url && (
                                <div className="x-card--btns">
                                    {this.props.url && (<a className="x-card--btn" href={this.props.url} target="_blank"><i className="icon-share">{}</i></a>)}
                                    {/* <a className="x-card--btn" href="#"><i className="icon-edit">{}</i></a> */}
                                </div>
                            )}
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
                    {this.props.picture && this.props.url && (
                        <div className="x-card--btns">
                            {this.props.url && (<a className="x-card--btn" href={this.props.url} target="_blank"><i className="icon-share">{}</i></a>)}
                            {/* <a className="x-card--btn" href="#"><i className="icon-edit">{}</i></a> */}
                        </div>
                    )}

                    <div className="x-card--details">
                        <div className="x-card--map" style={{backgroundImage: 'url(https://maps.googleapis.com/maps/api/staticmap?center=54.939320,37.450654&zoom=15&size=500x500)'}}>{}</div>
                        <div className="x-card--fields">
                            <table>
                                <tbody>
                                    {this.props.children}
                                </tbody>
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