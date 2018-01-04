import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withBuildingProjectQuery } from '../../../api/BuildingProjects';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { Segment, Header } from 'semantic-ui-react';
import { ListOrganizations } from '../../../components/ListOrganizations';
import { XPicture } from '../../../components/X/XPicture';
import { XGeo } from '../../../components/X/XGeo';
import { ListPermits } from '../../../components/ListPermits';

export default withPage(withBuildingProjectQuery(withLoader((props) => {
    return (
        <div style={{paddingTop: 32, paddingBottom: 32}}>
            <XContainer wide={true}>
                <Segment>
                    <div>Project Id: {props.data.project.slug}</div>
                    <div>Description: {props.data.project.description}</div>
                    <div>Started At: {props.data.project.startedAt}</div>
                    <div>Completed At: {props.data.project.completedAt}</div>
                    <div>Expected Completed At: {props.data.project.expectedCompletedAt}</div>
                    <div>Verified: {props.data.project.verified.toString()}</div>

                    <div>Existing Units: {props.data.project.existingUnits}</div>
                    <div>Proposed Units: {props.data.project.proposedUnits}</div>
                    <div>Existing Affordable Units: {props.data.project.existingAffordableUnits}</div>
                    <div>Proposed Affordable Units: {props.data.project.proposedAffordableUnits}</div>

                    <div>[Extras] General Constructor: {props.data.project.extrasGeneralConstructor}</div>
                    <div>[Extras] Year End: {props.data.project.extrasYearEnd}</div>
                    <div>[Extras] Address: {props.data.project.extrasAddress}</div>
                    <div>[Extras] Address Secondary: {props.data.project.extrasAddressSecondary}</div>
                    <div>[Extras] Permit: {props.data.project.extrasPermit} </div>
                    <div>[Extras] Comment: {props.data.project.extrasComment} </div>
                    <div>[Extras] Url: {props.data.project.extrasUrl} </div>
                    {props.data.project.preview && <XPicture picture={props.data.project.preview}/>}
                    {props.data.project.extrasLocation && <div><XGeo geo={props.data.project.extrasLocation}/></div>}
                </Segment>

                {props.data.project.developers && props.data.project.developers.length > 0 && (
                    <Segment>
                        <Header content="Developers"/>
                        <ListOrganizations developers={props.data.project.developers}/>
                    </Segment>
                )}

                {props.data.project.permits && props.data.project.permits.length > 0 && (
                    <Segment>
                        <Header content="Permits"/>
                        <ListPermits permits={props.data.project.permits}/>
                    </Segment>
                )}
            </XContainer>
        </div>
    );
})));