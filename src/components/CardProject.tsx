import * as React from 'react';
import { XLink } from './X/XLink';
import { XCard } from './X/XCard';
import { Links } from '../Links';

function makeLocationUrl(location: { latitude: number, longitude: number }) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=16&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY`;
}

export interface CardProjectProps {
    title: string;
    newUnits: number | null;
    subtitle?: string | null;
    endYear: string | null;
    picture?: { url: string, retina: string } | null;
    verified?: boolean;
    url?: string | null;
    location?: { latitude: number, longitude: number };
    slug?: string;
}

export class CardProject extends React.Component<CardProjectProps, { expanded: boolean }> {

    constructor(props: CardProjectProps) {
        super(props);

        this.state = {
            expanded: false
        };
    }

    render() {
        return (
            <XCard>
                <div className={'x-card--in' + (this.props.picture ? '' : ' without-photo') + (this.props.verified ? ' is-checked' : '') + (this.state.expanded ? ' is-expanded' : '')}>
                    {this.props.picture && (<div className="x-card--photo"
                        style={{ backgroundImage: `url(${this.props.picture.retina})` }}><XLink path={Links.area('sf').project(this.props.slug!!).view} /></div>)}
                    {!this.props.picture && (<div className="x-card--photo no-photo"><XLink path={Links.area('sf').project(this.props.slug!!).view} /></div>)}

                    <div className="x-card--info">
                        <div className="x-card--box">
                            <div className="x-card--title"><XLink path={Links.area('sf').project(this.props.slug!!).view}>{this.props.title}</XLink></div>
                            {this.props.subtitle && (<div className="x-card--text">{this.props.subtitle}</div>)}
                        </div>

                        {this.props.url && (
                            <div className="x-card--btns">
                                {this.props.url && (<XLink className="x-card--btn" href={this.props.url}>
                                    <i className="icon-share">{}</i>
                                </XLink>)}
                                {/* <XLink className="x-card--btn" path="#"><i className="icon-edit">{}</i></XLink> */}
                            </div>
                        )}
                    </div>

                    <div className="x-card--tools">
                        <div className="x-card--counter"><span>{this.props.newUnits || '?'}</span>Net new units</div>
                        <div className="x-card--counter"><span>{this.props.endYear || '?'}</span>Expected completion</div>

                        {this.props.slug && (<XLink path={Links.area('sf').project(this.props.slug!!).view} className="x-card--toggler" />)}
                        {!this.props.slug && (<a className="x-card--toggler" href="#" onClick={(e) => {
                            e.preventDefault();
                            this.setState({ expanded: !this.state.expanded });
                        }}>{}</a>)}
                    </div>

                    <div className="x-card--details">
                        {this.props.location && (<div className="x-card--map"
                            style={{ backgroundImage: 'url(' + makeLocationUrl(this.props.location) + ')' }}>{}</div>)}
                        {!this.props.location && (<div className="x-card--map no-photo">{}</div>)}

                        <div className="x-card--fields">
                            <table>
                                <tbody>
                                    {this.props.children}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </XCard>
        );
    }
}