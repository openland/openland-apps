import * as React from 'react';
import { XCard } from './X/XCard';
import { Links } from '../Links';
import * as Types from '../api/Types';
import { XGrid, XCell } from './X/XGrid';

export function OrganizationsListCard(props: { org: Types.OrganizationShortFragment }) {

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
            <XGrid>
                <XCell area="sidebar">
                    <XCard.Photo path={Links.area('sf').org(props.org.slug).view} src={props.org.logo} />
                </XCell>
                <XCell area="header">
                    <XCard.Row>
                        <XCard.Col mode="fill">
                            <XCard.Title
                                title={props.org.title}
                                subtitle={subtitle}
                                path={Links.area('sf').org(props.org.slug).view}
                            />
                        </XCard.Col>

                        {props.org.url && (
                            <XCard.Col>
                                <XCard.ExternalLink href={props.org.url} />
                            </XCard.Col>
                        )}
                    </XCard.Row>
                </XCell>
                <XCell area="footer">
                    <XCard.Row>
                        {projectsLength > 0 && (
                            <XCard.Col mode="fixed">
                                <XCard.Title
                                    title={projectsLength.toString()}
                                    subtitle="Recent Projects"
                                />
                            </XCard.Col>
                        )}
                        <XCard.Col mode="fill">
                            {featured && (
                                <XCard.Title
                                    title={featured.title}
                                    subtitle="Featured Project"
                                    path={Links.area('sf').project(featured.url).view}
                                    preview={featured.picture ? featured.picture.url : null}
                                />
                            )}
                        </XCard.Col>
                    </XCard.Row>
                </XCell>
                <XCell area="button">
                    <XCard.Button
                        title="View Profile"
                        path={Links.area('sf').org(props.org.slug).view}
                    />
                </XCell>
            </XGrid>
            {/* <XCard.Photo path={Links.area('sf').org(props.org.slug).view} src={props.org.logo} />
            <XCard.Row>
                <XCard.Col mode="fill">
                    <XCard.Title
                        title={props.org.title}
                        subtitle={subtitle}
                        path={Links.area('sf').org(props.org.slug).view}
                    />
                </XCard.Col>

                {props.org.url && (
                    <XCard.Col>
                        <XCard.ExternalLink href={props.org.url} />
                    </XCard.Col>
                )}
            </XCard.Row>
            <XCard.Row>
                {projectsLength > 0 && (
                    <XCard.Col mode="fixed">
                        <XCard.Title
                            title={projectsLength.toString()}
                            subtitle="Recent Projects"
                        />
                    </XCard.Col>
                )}
                <XCard.Col mode="fill">
                    {featured && (
                        <XCard.Title
                            title={featured.title}
                            subtitle="Featured Project"
                            path={Links.area('sf').project(featured.url).view}
                            preview={featured.picture ? featured.picture.url : null}
                        />
                    )}
                </XCard.Col>
                <XCard.Col mode="fixed">
                    <XCard.Button
                        title="View Profile"
                        path={Links.area('sf').org(props.org.slug).view}
                    />
                </XCard.Col>
            </XCard.Row> */}
        </XCard>
    );
}