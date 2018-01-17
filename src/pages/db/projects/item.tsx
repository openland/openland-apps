import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withBuildingProjectQuery } from '../../../api/BuildingProjects';
import { withLoader } from '../../../components/withLoader';
import { XContainer } from '../../../components/X/XContainer';
import { ListOrganizations } from '../../../components/ListOrganizations';
import { ListPermits } from '../../../components/ListPermits';
import { XRow } from '../../../components/X/XRow';
import { XWrap } from '../../../components/X/XWrap';
import { XLink } from '../../../components/X/XLink';
import { XColumn } from '../../../components/X/XColumn';
import Head from 'next/head';

export default withPage(withBuildingProjectQuery(withLoader((props) => {
    let map = undefined;
    if (props.data.project.extrasLocation) {
        map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + props.data.project.extrasLocation!!.latitude + ',' + props.data.project.extrasLocation!!.longitude + '&zoom=16&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY';
    }
    let subtitle = undefined;
    if (props.data.project.extrasAddress && (props.data.project.extrasAddress.toLowerCase() !== props.data.project.name.toLowerCase())) {
        subtitle = props.data.project.extrasAddress;
    }
    return (
        <div className="x-in">
            <Head>
                <title>Statecraft » San Francisco » Construction projects » {props.data.project.name}</title>
                <meta property="og:title" content={'Statecraft » San Francisco » Construction projects » ' + props.data.project.name} />

                {props.data.project.preview && (<meta property="og:image" content={props.data.project.preview!!.url} />)}
            </Head>

            <XContainer wide={true}>
                <XRow>
                    <XColumn cols={8} mobile={12}>
                        <XWrap>
                            <div className="x-project">
                                <div className="x-project--photo">
                                    <img src={props.data.project.preview!!.url} alt="" />
                                </div>

                                <div className="x-project--info">
                                    <div className="x-project--title">
                                        <div className="x-project--name">{props.data.project.name}</div>

                                        {props.data.project.verified &&
                                            <div className="x-project--verified"><span>Verified profile</span></div>}
                                    </div>

                                    {subtitle && <div className="x-project--address">{subtitle}</div>}
                                    {props.data.project.description && (
                                        <div className="x-project--text">{props.data.project.description}</div>
                                    )}
                                </div>

                                <div className="x-project--tools">
                                    <div className="x-project--counters">
                                        <div className="x-project--counter">
                                            <span>{props.data.project.extrasYearEnd}</span>
                                            Expected completion
                                        </div>
                                        <div className="x-project--counter">
                                            <span>{props.data.project.proposedUnits!! - props.data.project.existingUnits!!}</span>
                                            Net units
                                        </div>
                                        {/*<div className="x-project--counter"><span>Rent</span>Building type</div>*/}
                                    </div>

                                    <XLink path={'/projects/' + props.data.project.slug + '/edit'}
                                        className="x-project--btn" writeAccess={true}><span><i
                                            className="icon-edit" />Edit profile</span></XLink>
                                </div>
                            </div>
                        </XWrap>

                        {props.data.project.permits && props.data.project.permits.length > 0 && (
                            <XWrap title="Building permits">
                                <ListPermits permits={props.data.project.permits} hideCounter={true} />
                            </XWrap>
                        )}
                    </XColumn>
                    <XColumn cols={4} mobile={12}>
                        <XWrap>
                            <div className="x-project--box">
                                {map && <div className="x-project--map" style={{ backgroundImage: 'url(' + map + ')' }} />}
                                {!map && <div className="x-project--map no-photo" />}

                                <div className="x-project--links">
                                    {props.data.project.extrasUrl && (
                                        <XLink href={props.data.project.extrasUrl} className="x-project--link">Website</XLink>
                                    )}

                                    {/*<XLink href="#" className="x-project--social"><i className="icon-inst"/></XLink>*/}
                                    {/*<XLink href="#" className="x-project--social"><i className="icon-fb-o"/></XLink>*/}
                                </div>
                            </div>
                        </XWrap>

                        {props.data.project.developers && props.data.project.developers.length > 0 && (
                            <XWrap title="Developers">
                                <ListOrganizations developers={props.data.project.developers} />
                            </XWrap>
                        )}

                        {props.data.project.constructors && props.data.project.constructors.length > 0 && (
                            <XWrap title="Contractors">
                                <ListOrganizations developers={props.data.project.constructors} />
                            </XWrap>
                        )}

                    </XColumn>
                </XRow>
            </XContainer>
        </div>
    );
})));