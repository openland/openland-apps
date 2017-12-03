import * as React from 'react';

export class ListCard extends React.Component<{
    title: string, newUnits: number,
    subtitle: string, endYear: number
}, { expanded: boolean }> {
    render() {
        return (
            <div className="sf-in--item">
                <div className="sf-card without-photo is-checked">
                    <div className="sf-card--info">
                        <div className="sf-card--in">
                            <div className="sf-card--box">
                                <div className="sf-card--title">{this.props.title}</div>
                                <div className="sf-card--text">{this.props.subtitle}</div>
                            </div>
                        </div>
                        <div className="sf-card--counter"><span>{this.props.newUnits}</span>Net new units</div>
                        <div className="sf-card--counter"><span>{this.props.endYear}</span>Expected completion</div><a className="sf-card--toggler" href="#" data-label="Hide details">Show details</a>
                        <div className="sf-card--btns"><a className="sf-card--btn" href="#"><i className="icon-share">{}</i></a><a className="sf-card--btn" href="#"><i className="icon-edit">{}</i></a></div>
                    </div>
                    <div className="sf-card--details">
                        <div className="sf-card--map">
                            <div className="sf-card--map-in">{}</div>
                        </div>
                        <div className="sf-card--fields">
                            <div className="sf-card--field"><span>Permit ID</span>N201603172392</div>
                            <div className="sf-card--field"><span>Net new affordable units</span>15</div>
                            <div className="sf-card--field"><span>Permit issued</span>2015</div>
                            <div className="sf-card--field"><span>Total affordable units</span>15</div>
                            <div className="sf-card--field"><span>Developer</span>Shorenstein Properties</div>
                            <div className="sf-card--field"><span>Total units</span>650</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}