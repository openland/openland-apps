import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withOrganizationQuery } from '../../../api/Organizations';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { Segment, Header } from 'semantic-ui-react';
import { XButton } from '../../../components/X/XButton';
import { XWriteAcces } from '../../../components/X/XWriteAccess';
import { ListOrganizations } from '../../../components/ListOrganizations';
import { ListProjects } from '../../../components/ListProjects';
import { XLogo } from '../../../components/X/XLogo';

export default withPage(withOrganizationQuery(withLoader((props) => {
    return (
        <div style={{paddingTop: 32, paddingBottom: 32}}>
            <XContainer wide={true}>
                <Segment>
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
                </Segment>
                {props.data.organization.partners!!.length > 0 && (
                    <Segment>
                        <Header content="Partners"/>
                        <ListOrganizations developers={props.data.organization.partners!!}/>
                    </Segment>
                )}
                {props.data.organization.buildingProjects!!.length > 0 && (
                    <Segment>
                        <Header content="Projects"/>
                        <ListProjects projects={props.data.organization.buildingProjects!!}/>
                    </Segment>
                )}
            </XContainer>
        </div>
    );
})));