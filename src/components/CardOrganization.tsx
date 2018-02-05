import * as React from 'react';
import { XLink } from './X/XLink';
import { XCloudImage } from './X/XCloudImage';
import { XCard } from './X/XCard';

export interface CardOrganizationProps {
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

export class CardOrganization extends React.Component<CardOrganizationProps, {}> {
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