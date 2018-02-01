import * as React from 'react';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
import { ListOrganizations } from '../../../components/ListOrganizations';
import { ListProjects } from '../../../components/ListProjects';
import { XCloudImage } from '../../../components/X/XCloudImage';
import { XLink } from '../../../components/X/XLink';
import { XWrap } from '../../../components/X/XWrap';
import { XRow } from '../../../components/X/XRow';
import { XHead } from '../../../components/X/XHead';
import { XCard } from '../../../components/X/XCard';
import { Links } from '../../../Links';
import { withAreaPage } from '../../../components/withAreaPage';
import { ProjectShortFragment } from '../../../api/Types';
import { withOrganization } from '../../../api';

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
        <div className="x-in">
            <XContainer wide={true}>
                <XWrap>
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
                </XWrap>

                {/*<Segment>
                    <XWriteAcces>
                        <XButton content="Edit" icon="edit"
                                 path={'/organizations/' + props.data.organization.slug + '/edit'}/>
                    </XWriteAcces>
                    <div>Slug: {props.data.organization.slug}</div>
                    <div>Title: {props.data.organization.title}</div>
                    <div>Is Developer: {props.data.organization.isDeveloper!!.toString()}</div>
                    <div>Is Constructor: {props.data.organization.isConstructor!!.toString()}</div>
                    {props.data.organization.logo && (<div><XLogo src={props.data.organization.logo}/></div>)}
                    {props.data.organization.url && (<div>Url: {props.data.organization.url}</div>)}
                    {props.data.organization.city && (<div>City: {props.data.organization.city}</div>)}
                    {props.data.organization.address && (<div>Address: {props.data.organization.address}</div>)}
                    {props.data.organization.twitter && (<div>Twitter: {props.data.organization.twitter}</div>)}
                    {props.data.organization.linkedin && (<div>LinkedIn: {props.data.organization.linkedin}</div>)}
                    {props.data.organization.facebook && (<div>Facebook: {props.data.organization.facebook}</div>)}
                    {props.data.organization.comments && (<div>Comments: {props.data.organization.comments}</div>)}
                </Segment>*/}

                <XRow>
                    <div className="col-xs-12 col-md-8">
                        {projects.length > 0 && (
                            <XWrap title="Recent Projects">
                                <ListProjects projects={projects} />
                            </XWrap>
                        )}
                    </div>

                    <div className="col-xs-12 col-md-4">
                        {props.data.organization.partners!!.length > 0 && (
                            <XWrap title="Partners">
                                <ListOrganizations developers={props.data.organization.partners!!} />
                            </XWrap>
                        )}
                    </div>
                </XRow>
            </XContainer>
        </div>
        </>
    );
})));