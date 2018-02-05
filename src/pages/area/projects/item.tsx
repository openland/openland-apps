import * as React from 'react';
import { withPage } from '../../../components/withPage';
import { withLoader } from '../../../components/withLoader';
import { ListOrganizations } from '../../../components/ListOrganizations';
import { ListPermits } from '../../../components/ListPermits';
import { XLink } from '../../../components/X/XLink';
import { XHead } from '../../../components/X/XHead';
import { XCard } from '../../../components/X/XCard';
import { Links } from '../../../Links';
import { withBuildingProject } from '../../../api';
import { XTitle } from '../../../components/X/XTitle';
import { XSection } from '../../../components/X/XSection';
import { XPageContent } from '../../../components/X/XPageContent';
import { XLayoutTwoColumns } from '../../../components/X/XLayoutTwoColumnts';

export default withPage(withBuildingProject(withLoader((props) => {
    let map = undefined;
    if (props.data.project.extrasLocation) {
        map = 'https://maps.googleapis.com/maps/api/staticmap?center=' + props.data.project.extrasLocation!!.latitude + ',' + props.data.project.extrasLocation!!.longitude + '&zoom=16&size=500x500&key=AIzaSyAZNqmyhPrPT5gRDMljsEwwyYwDuWIMIZY';
    }
    let subtitle = undefined;
    if (props.data.project.extrasAddress && (props.data.project.extrasAddress.toLowerCase() !== props.data.project.name.toLowerCase())) {
        subtitle = props.data.project.extrasAddress;
    }

    return (
        <>
        <XHead
            title={['Statecraft', 'San Francisco', 'Construction projects', props.data.project.name]}
            imgUrl={props.data.project.preview && props.data.project.preview.url}
        />
        <XPageContent>
            <XLayoutTwoColumns>
                <XLayoutTwoColumns.Primary>
                    <XSection>
                        <XCard>
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

                                <XLink
                                    path={Links.area('sf').project(props.data.project.slug).edit}
                                    className="x-project--btn" writeAccess={true}
                                ><span><i className="icon-edit" />Edit profile</span>
                                </XLink>
                            </div>
                        </XCard>
                    </XSection>
                    {props.data.project.permits && props.data.project.permits.length > 0 && (
                        <XSection>
                            <XTitle>Building Permits</XTitle>
                            <ListPermits permits={props.data.project.permits} hideCounter={true} />
                        </XSection>
                    )}
                </XLayoutTwoColumns.Primary>
                <XLayoutTwoColumns.Secondary>
                    <XSection>
                        <div className="x-project--box">
                            {map && <div className="x-project--map" style={{ backgroundImage: 'url(' + map + ')' }} />}
                            {!map && <div className="x-project--map no-photo" />}

                            <div className="x-project--links">
                                {props.data.project.extrasUrl && (
                                    <XLink href={props.data.project.extrasUrl} className="x-project--link">Website</XLink>
                                )}
                            </div>
                        </div>
                    </XSection>

                    {props.data.project.developers && props.data.project.developers.length > 0 && (
                        <XSection>
                            <XTitle>Developers</XTitle>
                            <ListOrganizations developers={props.data.project.developers} />
                        </XSection>
                    )}

                    {props.data.project.constructors && props.data.project.constructors.length > 0 && (
                        <XSection>
                            <XTitle>Contractors</XTitle>
                            <ListOrganizations developers={props.data.project.constructors} />
                        </XSection>
                    )}
                </XLayoutTwoColumns.Secondary>
            </XLayoutTwoColumns>
        </XPageContent>
        </>
    );
})));