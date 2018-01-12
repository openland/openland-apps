import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withBuildingProjectQuery } from '../../../api/BuildingProjects';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { ListOrganizations } from '../../../components/ListOrganizations';
import { XPicture } from '../../../components/X/XPicture';
import { XGeo } from '../../../components/X/XGeo';
import { ListPermits } from '../../../components/ListPermits';
import { XRow } from '../../../components/X/XRow';
import { XWrap } from '../../../components/X/XWrap';
import { XLink } from '../../../components/X/XLink';
import { Footer } from '../../../components/Footer';

export default withPage(withBuildingProjectQuery(withLoader((props) => {
    let map = 'https://maps.googleapis.com/maps/api/staticmap?center=37.7718238831,-122.4038848877&zoom=16&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY';

    return (
        <>
            <div className="x-in">
                <XContainer wide={true}>
                    {/*<Segment>
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
                    </Segment>*/}

                    <XRow>
                        <div className="col-xs-12 col-md-8">
                            <XWrap>
                                <div className="x-project">
                                    <div className="x-project--photo">
                                        <img src="//placehold.it/800x384" alt="" />
                                    </div>

                                    <div className="x-project--info">
                                        <div className="x-project--title">
                                            <div className="x-project--name">Avalon Dogpatch</div>

                                            {props.data.project.verified && <div className="x-project--verified"><span>Verified profile</span></div>}
                                        </div>

                                        <div className="x-project--address">800 Indiana St</div>
                                        <div className="x-project--text">Avalon Dogpatch is a new apartment development By AvalonBay Communities, Inc.</div>
                                    </div>

                                    <div className="x-project--tools">
                                        <div className="x-project--counters">
                                            <div className="x-project--counter"><span>2017</span>Expected completion</div>
                                            <div className="x-project--counter"><span>326</span>Net units</div>
                                            <div className="x-project--counter"><span>Rent</span>Building type</div>
                                        </div>

                                        <XLink path={'/projects/' + props.data.project.slug + '/edit'} className="x-project--btn"><span><i className="icon-edit" />Edit profile</span></XLink>
                                    </div>
                                </div>
                            </XWrap>

                            {props.data.project.permits && props.data.project.permits.length > 0 && (
                                <XWrap title="Building permits">
                                    <ListPermits permits={props.data.project.permits}/>
                                </XWrap>
                            )}
                        </div>

                        <div className="col-xs-12 col-md-4">
                            <XWrap>
                                <div className="x-project--box">
                                    <div className="x-project--map" style={{backgroundImage: 'url(' + map + ')'}}/>

                                    {/*<div className="x-project--map no-photo"/>*/}

                                    <div className="x-project--links">
                                        <a href="#" className="x-project--link">Website</a>
                                        <a href="#" className="x-project--social"><i className="icon-inst" /></a>
                                        <a href="#" className="x-project--social"><i className="icon-fb-o" /></a>
                                    </div>
                                </div>
                            </XWrap>

                            {props.data.project.developers && props.data.project.developers.length > 0 && (
                                <XWrap title="Developers">
                                    <ListOrganizations developers={props.data.project.developers}/>
                                </XWrap>
                            )}
            
                            {props.data.project.constructors && props.data.project.constructors.length > 0 && (
                                <XWrap title="Contractors">
                                    <ListOrganizations developers={props.data.project.constructors}/>
                                </XWrap>
                            )}
                        </div>
                    </XRow>
                </XContainer>
            </div>
            <Footer/>
        </>
    );
})));