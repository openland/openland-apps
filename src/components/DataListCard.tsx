import * as React from 'react';
import { XLink } from './X/XLink';
import { XCloudImage } from './X/XCloudImage';
import { XCard } from './X/XCard';
import { Links } from '../Links';

function makeLocationUrl(location: { latitude: number, longitude: number }) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=16&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY`;
}

export interface ListCardProps {
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

export class DataListCard extends React.Component<ListCardProps, { expanded: boolean }> {

    constructor(props: ListCardProps) {
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

export function DataListCardItem(props: { title: string, children: any }) {
    return (
        <tr>
            <td>{props.title}</td>
            <td>{props.children}</td>
        </tr>
    );
}

export interface OrganizationListCardProps {
    slug: string,
    title: string;
    subtitle?: string;
    projects?: number;
    logo?: string;
    profile: string;
    featuredProject?: {
        title: string,
        url: string,
        picture?: { url: string; retina: string; }
    };
    url?: string;
}

export class OrganizationDataListCard extends React.Component<OrganizationListCardProps, {}> {
    render() {
        return (
            <XCard>
                <div className={'x-card--in is-organization' + (this.props.logo ? '' : ' without-photo')}>
                    <XLink path={'/organizations/' + this.props.slug}>
                        {this.props.logo && (<div className="x-card--photo">
                            <XCloudImage src={this.props.logo} maxWidth={140} maxHeight={140} />
                        </div>)}
                        {!this.props.logo && (<div className="x-card--photo no-photo">{}</div>)}
                    </XLink>

                    <div className="x-card--info">
                        <div className="x-card--box">
                            <div className="x-card--title" style={{ textColor: '#000000' }}><XLink
                                path={'/organizations/' + this.props.slug}>{this.props.title}</XLink></div>
                            {this.props.subtitle && (<div className="x-card--text">{this.props.subtitle}</div>)}
                        </div>

                        {this.props.url && (
                            <div className="x-card--btns">
                                {this.props.url && (<a className="x-card--btn" href={this.props.url} target="_blank"><i
                                    className="icon-share">{}</i></a>)}
                                {/* <a className="x-card--btn" href="#"><i className="icon-edit">{}</i></a> */}
                            </div>
                        )}
                    </div>

                    <div className="x-card--tools">
                        {(this.props.projects !== undefined) && ((this.props.projects > 0) && (<div className="x-card--counter"><span>{this.props.projects}</span>recent projects</div>))}

                        {this.props.featuredProject && (
                            <XLink path={this.props.featuredProject.url}
                                className={'x-card--counter is-project' + (this.props.featuredProject.picture ? ' with-photo' : '')}>
                                {this.props.featuredProject.picture && (
                                    <img src={this.props.featuredProject.picture.retina} alt="" />)}

                                <span>{this.props.featuredProject.title}</span>
                                featured project
                            </XLink>
                        )}

                        <XLink className="x-card--toggler is-link" path={'/organizations/' + this.props.slug}>View profile</XLink>
                    </div>
                </div>
            </XCard>
        );
    }
}