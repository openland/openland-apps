import * as React from 'react';
import { XLink } from './X/XLink';
import { XCloudImage } from './X/XCloudImage';
import { XCard } from './X/XCard';
import * as Types from '../api/Types';

export function CardOrganization(props: { org: Types.OrganizationShortFragment }) {

    let subtitle = undefined

    if (props.org.isDeveloper) {
        if (props.org.isConstructor) {
            subtitle = 'Developer and Contractor'
        } else {
            subtitle = 'Developer'
        }
    } else {
        subtitle = 'Contractor'
    }

    let project = null

    if (props.org.developerIn && props.org.developerIn.length > 0) {
        project = props.org.developerIn!![0]
    } else if (props.org.constructorIn && props.org.constructorIn.length > 0) {
        project = props.org.constructorIn!![0]
    }

    let featured = undefined;
    if (project !== null) {
        featured = {
            title: project.name,
            url: project.slug,
            picture: project.preview
        };
    }

    let projectsLength: number = props.org.constructorIn!!.length + props.org.developerIn!!.length

    return (
        <XCard>
            <div className={'x-card--in is-organization' + (props.org.logo ? '' : ' without-photo')}>
                <XLink path={'/sf/organizations/' + props.org.slug}>
                    {props.org.logo && (<div className="x-card--photo">
                        <XCloudImage src={props.org.logo} maxWidth={140} maxHeight={140} />
                    </div>)}
                    {!props.org.logo && (<div className="x-card--photo no-photo">{}</div>)}
                </XLink>

                <div className="x-card--info">
                    <div className="x-card--box">
                        <div className="x-card--title" style={{ textColor: '#000000' }}><XLink
                            path={'/sf/organizations/' + props.org.slug}>{props.org.title}</XLink></div>
                        {subtitle && (<div className="x-card--text">{subtitle}</div>)}
                    </div>

                    {props.org.url && (
                        <div className="x-card--btns">
                            {props.org.url && (<a className="x-card--btn" href={props.org.url} target="_blank"><i
                                className="icon-share">{}</i></a>)}
                            {/* <a className="x-card--btn" href="#"><i className="icon-edit">{}</i></a> */}
                        </div>
                    )}
                </div>

                <div className="x-card--tools">
                    {(projectsLength !== undefined) && ((projectsLength > 0) && (<div className="x-card--counter"><span>{projectsLength}</span>recent projects</div>))}

                    {featured && (
                        <XLink path={'/sf/projects/' + featured.url}
                            className={'x-card--counter is-project' + (featured.picture ? ' with-photo' : '')}>
                            {featured.picture && (
                                <img src={featured.picture.retina} alt="" />)}

                            <span>{featured.title}</span>
                            featured project
                            </XLink>
                    )}

                    <XLink className="x-card--toggler is-link" path={'/sf/organizations/' + props.org.slug}>View profile</XLink>
                </div>
            </div>
        </XCard>
    );
}