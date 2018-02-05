import * as React from 'react';
import { withLoader } from '../../../components/withLoader';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
import { ListOrganizations } from '../../../components/ListOrganizations';
import { ListProjects } from '../../../components/ListProjects';
import { XCloudImage } from '../../../components/X/XCloudImage';
import { XLink } from '../../../components/X/XLink';
import { XHead } from '../../../components/X/XHead';
import { XCard } from '../../../components/X/XCard';
import { Links } from '../../../Links';
import { withAreaPage } from '../../../components/withAreaPage';
import { ProjectShortFragment } from '../../../api/Types';
import { withOrganization } from '../../../api';
import { XPageContent } from '../../../components/X/XPageContent';
import { XSection } from '../../../components/X/XSection';
import { XLayoutTwoColumns } from '../../../components/X/XLayoutTwoColumnts';
import { XTitle } from '../../../components/X/XTitle';

export default withAreaPage(withOrganization(withLoader((props) => {
    let projects: ProjectShortFragment[] = [];
    for (let p of props.data.organization.developerIn!!) {
        if (!projects.find((v) => v.id === p.id)) {
            projects.push(p);
        }
    }
    for (let p of props.data.organization.constructorIn!!) {
        if (!projects.find((v) => v.id === p.id)) {
            projects.push(p);
        }
    }
    return (
        <>
        <XHead
            title={['Statecraft', 'San Francisco', 'Organizations', props.data.organization.title]}
            imgCloud={props.data.organization.cover}
        />
        <XPageContent>
            <XCard>
                {props.data.organization.cover && (<div className="x-dev--photo">
                    <XCloudImage src={props.data.organization.cover} maxWidth={1216} maxHeight={350}
                        resize={'fill'} />
                </div>)}

                <div className="x-dev--info">
                    {props.data.organization.logo && (<div className="x-dev--logo">
                        <XCloudImage src={props.data.organization.logo} maxWidth={100} maxHeight={100} />
                    </div>)}

                    <div className="x-dev--box">
                        <div className="x-dev--title">{props.data.organization.title}</div>
                        <div className="x-dev--subtitle">
                            {((props.data.organization.isDeveloper) && !(props.data.organization.isConstructor)) ? 'Developer' : ''}
                            {(!(props.data.organization.isDeveloper) && (props.data.organization.isConstructor)) ? 'Contractor' : ''}
                            {((props.data.organization.isDeveloper) && (props.data.organization.isConstructor)) ? 'Developer, Contractor' : ''}
                        </div>

                        {props.data.organization.city && (
                            <div className="x-dev--city">{props.data.organization.city}</div>)}
                        {props.data.organization.address && (
                            <div className="x-dev--address">{props.data.organization.address}</div>)}
                    </div>

                    <div className="x-dev--links">
                        {props.data.organization.url && (
                            <XLink href={props.data.organization.url} className="x-dev--link">Website</XLink>)}

                        <div className="x-dev--socials">
                            {props.data.organization.facebook && (
                                <XLink href={props.data.organization.facebook} className="x-dev--social"><i
                                    className="icon-fb-o" /></XLink>)}
                            {props.data.organization.linkedin && (
                                <XLink href={props.data.organization.linkedin} className="x-dev--social"><i
                                    className="icon-lin" /></XLink>)}
                            {props.data.organization.twitter && (
                                <XLink href={props.data.organization.twitter} className="x-dev--social"><i
                                    className="icon-tw" /></XLink>)}
                        </div>
                    </div>
                </div>

                <div className="x-dev--in">
                    {props.data.organization.description && (
                        <div className="x-dev--text">{props.data.organization.description}</div>)}

                    <XWriteAcces>
                        <div className="x-dev--side">
                            <XLink
                                path={Links.area('sf').org(props.data.organization.slug).edit}
                                className="x-dev--edit"
                            >
                                <span><i className="icon-edit" />Edit profile</span>
                            </XLink>
                        </div>
                    </XWriteAcces>
                </div>
            </XCard>
            <XLayoutTwoColumns>
                <XLayoutTwoColumns.Primary>
                    {projects.length > 0 && (
                        <XSection>
                            <XTitle>Recent Projects</XTitle>
                            <ListProjects projects={projects} />
                        </XSection>
                    )}
                </XLayoutTwoColumns.Primary>
                <XLayoutTwoColumns.Secondary>
                    {props.data.organization.partners!!.length > 0 && (
                        <XSection>
                            <XTitle>Partners</XTitle>
                            <ListOrganizations developers={props.data.organization.partners!!} />
                        </XSection>
                    )}
                </XLayoutTwoColumns.Secondary>
            </XLayoutTwoColumns>
        </XPageContent>
        </>
    );
})));