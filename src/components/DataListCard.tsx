import * as React from 'react';
import { XLink } from './X/XLink';
import { XCloudImage } from './X/XCloudImage';

function makeLocationUrl(location: { latitude: number, longitude: number }) {
    return `https://maps.googleapis.com/maps/api/staticmap?center=${location.latitude},${location.longitude}&zoom=16&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY`;
}

export interface ListCardProps {
    title: string;
    newUnits?: number;
    subtitle?: string;
    endYear?: string;
    picture?: { url: string, retina: string };
    verified?: boolean;
    url?: string;
    location?: { latitude: number, longitude: number };
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
            <div
                className={'x-card' + (this.props.picture ? '' : ' without-photo') + (this.props.verified ? ' is-checked' : '') + (this.state.expanded ? ' is-expanded' : '')}>
                {this.props.picture && (<div className="x-card--photo"
                                             style={{backgroundImage: `url(${this.props.picture.retina})`}}>{}</div>)}
                {!this.props.picture && (<div className="x-card--photo no-photo">{}</div>)}

                <div className="x-card--info">
                    <div className="x-card--box">
                        <div className="x-card--title">{this.props.title}</div>
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
                    <div className="x-card--counter"><span>{this.props.newUnits || '?'}</span>Net new units</div>
                    <div className="x-card--counter"><span>{this.props.endYear || '?'}</span>Expected completion</div>

                    <a className="x-card--toggler" href="#" onClick={(e) => {
                        e.preventDefault();
                        this.setState({expanded: !this.state.expanded});
                    }}>{}</a>
                </div>

                <div className="x-card--details">
                    {this.props.location && (<div className="x-card--map"
                                                  style={{backgroundImage: 'url(' + makeLocationUrl(this.props.location) + ')'}}>{}</div>)}
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
            <div
                className={'x-card is-organization' + (this.props.logo ? '' : ' without-photo')}>
                {this.props.logo && (<div className="x-card--photo">
                    <XCloudImage src={this.props.logo} maxWidth={140} maxHeight={140}/>
                </div>)}
                {!this.props.logo && (<div className="x-card--photo no-photo">{}</div>)}

                <div className="x-card--info">
                    <div className="x-card--box">
                        <div className="x-card--title">{this.props.title}</div>
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
                    <div className="x-card--counter"><span>{this.props.projects || '?'}</span>recent projects</div>

                    {this.props.featuredProject && (
                        <XLink path={this.props.featuredProject.url}
                               className={'x-card--counter is-project' + (this.props.featuredProject.picture ? ' with-photo' : '')}>
                            {this.props.featuredProject.picture && (
                                <img src={this.props.featuredProject.picture.retina} alt=""/>)}

                            <span>{this.props.featuredProject.title}</span>
                            featured project
                        </XLink>
                    )}

                    <XLink className="x-card--toggler is-link" path={this.props.profile}>View profile</XLink>
                </div>
            </div>
        );
    }
}