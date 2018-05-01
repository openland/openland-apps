import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { XHead } from '../../../components/X/XHead';
import { withApp } from '../../../components/withApp';
import { XCard } from '../../../components/X/XCard';
import { XVertical } from '../../../components/X/XVertical';
import { OpportunitiesTable } from '../../../components/OpportunitiesTableUrbynReport';
import { OpportunityState } from 'openland-api/Types';
import { withRouter } from '../../../components/withRouter';
import { Scaffold } from '../../../components/Scaffold';
import { SourcingTileSource } from '../../../api';
import { XMapImageLayer } from '../../../components/X/XMapImageLayer';
import { XIcon } from '../../../components/X/XIcon';
import { XMapSource } from '../../../components/X/XMapSource';
import { withDealsMap } from '../../../api';
import { JustMap } from './JustMap';
import hpdprojects from './lots_of_data.json';
import { XRouter } from '../../../components/routing/XRouter';
import XStyles from '../../../components/X/XStyles';
import { XHeader } from '../../../components/X/XHeader';

const UrbinHeaderWrapper = Glamorous.div({
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    width: '100%',
    height: 206,
    backgroundColor: '#78a9c7',
    overflow: 'hidden',
    borderTopLeftRadius: 8,
    padding: 50
});

const UrbinLogo = Glamorous.img({
    width: 65,
    height: 22,
    marginBottom: 11,
    objectFit: 'contain'
});

const NYLogo = Glamorous.img({
    position: 'absolute',
    right: 12,
    bottom: 0,
    height: '100%',
    width: 530,
    objectFit: 'contain'
});

const UrbinTitle = Glamorous.div({
    fontSize: 28,
    fontWeight: 500,
    lineHeight: 1.07,
    letterSpacing: -0.2,
    color: '#78a9c7',
    borderRadius: 6,
    backgroundColor: '#fff',
    padding: '7px 12px 7px 10px',
    alignSelf: 'flex-start'
});

// const TabTitle = Glamorous.div({
//     width: 110,
//     height: 20,
//     fontFamily: 'CircularStd',
//     fontSize: 16,
//     fontWeight: 500,
//     fontStyle: 'normal',
//     fontStretch: 'normal',
//     lineHeight: 1.25,
//     letterSpacing: -0.2,
//     textAlign: 'left',
//     color: '#1f3449'

// });

const UrbinStatisticContent = Glamorous.div({
    display: 'flex',
    height: 117
});

const UrbinStatisticWrapper = Glamorous.div<{ bordered?: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    flexBasis: '33.33%',
    borderLeft: props.bordered ? '1px solid rgba(97, 126, 156, 0.2)' : undefined,
    borderRight: props.bordered ? '1px solid rgba(97, 126, 156, 0.2)' : undefined
}));

const UrbinStatisticTite = Glamorous.div({
    fontSize: 16,
    fontWeight: 500,
    lineHeight: 1.25,
    letterSpacing: -0.2,
    color: '#1f3449',
    marginBottom: 10
});

const UrbinStatisticNumber = Glamorous.div({
    fontSize: 28,
    fontWeight: 500,
    letterSpacing: -0.3,
    color: '#76afd4'
});

const UrbinStatistic = () => (
    <UrbinStatisticContent>
        <UrbinStatisticWrapper>
            <UrbinStatisticTite>Urbyn portfolio</UrbinStatisticTite>
            <UrbinStatisticNumber>50 sites</UrbinStatisticNumber>
        </UrbinStatisticWrapper>
        <UrbinStatisticWrapper bordered={true}>
            <UrbinStatisticTite>Housing & Preservation Department</UrbinStatisticTite>
            <UrbinStatisticNumber>114 sites, 530 units</UrbinStatisticNumber>
        </UrbinStatisticWrapper>
        <UrbinStatisticWrapper>
            <UrbinStatisticTite>Other public agencies</UrbinStatisticTite>
            <UrbinStatisticNumber>129 sites, 595 units</UrbinStatisticNumber>
        </UrbinStatisticWrapper>
    </UrbinStatisticContent>
);

const XMapContainer = Glamorous.div({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'stretch',
    height: '500px'
});

const ChbContiner = Glamorous(XCard)<{}>((props) => ({
    top: 20,
    left: 20,
    position: 'absolute',
    flexDirection: 'column',
    alignItems: 'flex-start',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 15,
    paddingBottom: 15,
}));

// const Tabs = Glamorous.div({
//     display: 'flex',
//     flexDirection: 'row',
//     alignItems: 'stretch',
//     justifyContent: 'center'
// });

const XMapContainer2 = Glamorous.div({
    position: 'relative',
    flexGrow: 1,
    flexShrink: 1,
    flexBasis: 0,
    height: '500px',
    // alignItems: 'stretch',
    // height: '100%'
    '& .mapboxgl-ctrl-top-right': {
        right: '18px !important',
        top: '18px !important',
        zIndex: 0,
        '& .mapboxgl-ctrl-group': {
            border: '1px solid rgba(132, 142, 143, 0.1)',
            boxShadow: 'none',

            '& .mapboxgl-ctrl-zoom-out': {
                borderBottom: 'none !important'
            },
            '& .mapboxgl-ctrl-compass': {
                display: 'none !important'
            }
        }
    },
    '& .mapboxgl-ctrl-bottom-left': {
        display: 'none'
    }
});

const Circle = Glamorous.div<{ color: string }>((props) => ({
    marginLeft: 8,
    height: 10,
    width: 10,
    backgroundColor: props.color,
    borderRadius: '50%',
    display: 'inline-block'
}));

const FilterInputDiv = Glamorous.div<{ active: boolean }>((props) => ({
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    '> input': {
        display: 'none'
    },
    '> label': {
        ...XStyles.text.h400,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        color: props.active ? '#76afd4' : '#525f7f',
        cursor: 'pointer',
        '> i': {
            width: 16,
            height: 16,
            borderRadius: 3.5,
            color: '#fff',
            backgroundColor: props.active ? '#76afd4' : '#fff',
            border: '1px solid rgba(97, 126, 156, 0.2)',
            fontSize: 13,
            lineHeight: '14px',
            marginRight: 10,
            paddingLeft: 1
        },
        '> div': {
            width: 16,
            height: 16,
            borderRadius: 50,
            backgroundColor: props.active ? '#76afd4' : '#fff',
            border: '1px solid rgba(97, 126, 156, 0.2)',
            marginRight: 10,
            position: 'relative',
            '&::after': {
                content: props.active ? `''` : undefined,
                width: 8,
                height: 8,
                borderRadius: 50,
                backgroundColor: '#ffffff',
                position: 'absolute',
                top: 3,
                left: 3
            }
        },
        '> span': {
            color: '#1f3449'
        }
    }
}));

const DealsSource = withDealsMap((props) => {
    if (props.data.deals) {
        let features = props.data.deals
            .filter((v) => v.parcel !== null)
            .map((v) => ({
                type: 'Feature',
                'geometry': { type: 'Point', coordinates: [v.parcel!!.center!!.longitude, v.parcel!!.center!!.latitude] },
                properties: {
                    'id': v.parcel!!.id
                }
            }));
        let result = { 'type': 'FeatureCollection', features: features };
        (props as any).loaded(features.length);
        return <XMapSource id="deals" data={result} />;
    }
    return null;
}) as React.ComponentType<{ loaded: Function }>;

class HPDProjectsSource extends React.Component<{ loaded: Function }> {
    render() {
        let f = [];
        for (let key of Object.keys(hpdprojects.data)) {
            f.push(hpdprojects.data[key]);
        }

        let features = f
            .filter((v) => v.longitude && v.latitude)
            .map((v) => ({
                type: 'Feature',
                'geometry': { type: 'Point', coordinates: [v.longitude, v.latitude] },
                properties: {
                    'id': v.id
                }
            }));
        this.props.loaded(features.length);
        let result = { 'type': 'FeatureCollection', features: features };
        return <XMapSource id="hpdp" data={result} />;
    }
}

const UrbinHeader = () => (
    <UrbinHeaderWrapper>
        <NYLogo src="/static/img/icons/reports/ny-bei-nacht.svg" />
        <UrbinLogo src="/static/img/icons/reports/urbyn.png" srcSet="/static/img/icons/reports/urbyn@2x.png 2x" />
        <UrbinTitle>Mini-Home Opportunities in New York City</UrbinTitle>
    </UrbinHeaderWrapper>
);

const Wrapper = Glamorous.div({
    backgroundColor: '#FAFAFC',
    padding: 18,
    marginTop: -16
});

const ContentWrapper = Glamorous.div({
    backgroundColor: '#fff',
    borderRadius: 4,
    border: 'solid 1px rgba(229, 233, 242, 0.5)'
});

class Checkbox extends React.Component<{ checkedChangeListener: Function, label: string, checked?: boolean, color: string, count?: number }, { isChecked: boolean }> {
    constructor(props: { checkedChangeListener: Function, label: string, color: string }) {
        super(props);

        this.state = {
            isChecked: this.props.checked !== undefined ? this.props.checked : false
        };

        this.handleChange = this.handleChange.bind(this);
    }

    handleChange() {
        this.props.checkedChangeListener(!this.state.isChecked);

        this.setState({
            isChecked: !this.state.isChecked
        });
    }

    render() {
        const id = `toggle_${Math.random().toString().replace(/0\./, '')}`;

        return (
            <FilterInputDiv active={this.state.isChecked}>
                <input onChange={this.handleChange} id={id} type="checkbox" checked={this.state.isChecked} />
                <label htmlFor={id}>
                    <XIcon icon={this.state.isChecked ? 'done' : ''} />
                    <span>{this.props.label}</span>
                </label>
                <Circle color={this.props.color} />
            </FilterInputDiv>
        );
    }
}

class ReportMap extends React.Component<{ router: XRouter, qHpd: any }, { dealsEnabled: boolean, dealsCount?: number, hpdoEnabled: boolean, hpdoCount?: number, hpdpEnabled: boolean, hpdpCount?: number }> {
    dealsCount: number;
    hpdoCount: number;
    hpdpCount: number;

    constructor(props: { router: XRouter, qHpd: any }) {
        super(props);
        this.state = {
            dealsEnabled: true,
            hpdoEnabled: true,
            hpdpEnabled: true,
        };
    }

    onUrbynChange = (checked: boolean) => {
        this.setState({ dealsEnabled: checked });
    }

    hpdoChange = (checked: boolean) => {
        this.setState({ hpdoEnabled: checked });
    }

    hpdpChange = (checked: boolean) => {
        this.setState({ hpdpEnabled: checked });
    }

    dealsLoaded = (count: number) => {
        if (count !== this.dealsCount) {
            this.setState({ dealsCount: count });
            this.dealsCount = count;
        }
    }

    hpdoLoaded = (count: number) => {
        if (count !== this.hpdoCount) {
            this.setState({ hpdoCount: count });
            this.hpdoCount = count;
        }
    }

    hpdpLoaded = (count: number) => {
        if (count !== this.hpdpCount) {
            this.setState({ hpdpCount: count });
            this.hpdpCount = count;
        }
    }

    render() {

        let focus = false
            ? { latitude: 37.75444398077139, longitude: -122.43963811583545, zoom: 12 }
            : { latitude: 40.713919, longitude: -74.002332, zoom: 12 };

        return (

            <XMapContainer2>
                <JustMap
                    mode={this.props.router.query.mode}
                    selectedParcel={this.props.router.query.selectedParcel}
                    // onParcelClick={handleClick}
                    focusPosition={focus}
                // lastKnownCameraLocation={knownCameraLocation}
                // onCameraLocationChanged={handleMap}
                >

                    <DealsSource loaded={this.dealsLoaded} />

                    {this.state.dealsEnabled &&
                        <>
                            <XMapImageLayer
                                image="/static/img/icons/pin1.png"
                                source="deals"
                                layer="deals"
                            // onClick={handleClick}
                            />

                        </>}
                    <SourcingTileSource
                        layer="sourcing"
                        query={this.props.qHpd}
                        loaded={this.hpdoLoaded}
                    />
                    {this.state.hpdoEnabled &&
                        <>

                            <XMapImageLayer
                                image="/static/img/icons/pin2.png"
                                source="sourcing"
                                layer="sourcing"
                            // onClick={handleClick}
                            />
                        </>}
                    <HPDProjectsSource loaded={this.hpdpLoaded} />

                    {this.state.hpdpEnabled &&
                        <>
                            <XMapImageLayer
                                image="/static/img/icons/pin3.png"
                                source="hpdp"
                                layer="hpdp"
                            // onClick={handleClick}
                            />
                        </>}

                </JustMap>
                <ChbContiner>
                    <Checkbox label="Urbyn portfolio" checked={this.state.dealsEnabled} checkedChangeListener={this.onUrbynChange} color="#e8bd58" count={this.state.dealsCount} />
                    {/* {this.state.dealsCount} */}
                    <Checkbox label="HPD mini-home opportunities" checked={this.state.hpdoEnabled} checkedChangeListener={this.hpdoChange} color="#7f7cd5" />
                    {/* {this.state.hpdoCount} */}
                    <Checkbox label="HPD projects" checked={this.state.hpdpEnabled} checkedChangeListener={this.hpdpChange} color="#79c07f" />
                    {/* {this.state.hpdpCount} */}
                </ChbContiner>
            </XMapContainer2>
        );
    }
}

// const Divider = Glamorous.div({
//     width: '100%',
//     height: 1,
//     borderRadius: 1,
//     backgroundColor: 'rgba(229, 233, 242, 0.5)'

// });

// const DividerVertical = Glamorous.div({
//     width: 1,
//     height: '100%',
//     borderRadius: 1,
//     backgroundColor: 'rgba(229, 233, 242, 0.5)'

// });

export default withApp('Reports Urbyn MHO', 'viewer', withRouter((props) => {
    // let clauses1: any[] = [];
    // clauses1.push({ isPublic: true });
    // let qPublic = buildQuery(clauses1);
    // let clauses2: any[] = [];
    // clauses2.push({ 'stage': OpportunityState.APPROVED_ZONING }, { '$and': [{ isPublic: true }, { '$or': [{ ownerName: 'HPD NYC' }, { ownerName: 'hpd' }, { ownerName: 'Housing Preservation' }] }] });
    // let qHpd = buildQuery(clauses2);

    let clauses1: any[] = [];
    clauses1.push({ isPublic: true });
    let q1 = buildQuery(clauses1);

    let clauses2: any[] = [];
    clauses2.push({ '$and': [{ isPublic: true }, { '$or': [{ ownerName: 'HPD NYC' }, { ownerName: 'hpd' }, { ownerName: 'Housing Preservation' }] }] });
    let q2 = buildQuery(clauses2);

    return (
        <>
            <XHead title="Mini-Home Opportunities in New York City" />
            <Scaffold>
                <Scaffold.Content bottomOffset={false}>
                    <UrbinHeader />
                    <Wrapper>
                        <XVertical>
                            {/* <ContentWrapper>
                                <XVertical>
                                    <XHeader text="Qualified Opportunities for Urbyn Mini-Homes" />
                                    <Divider />
                                    <Tabs>
                                        <TabTitle>Urbyn portfolio</TabTitle>
                                        <DividerVertical/>
                                        <TabTitle>{'Housing & Preservation Department'}</TabTitle>
                                        <DividerVertical/>
                                        <TabTitle>Other public agencies</TabTitle>
                                    </Tabs>
                                </XVertical>
                            </ContentWrapper> */}
                            <ContentWrapper>
                                <XVertical>
                                    <XHeader text="Qualified Opportunities for Urbyn Mini-Homes" separated={true} />
                                    <UrbinStatistic />
                                </XVertical>
                            </ContentWrapper>
                            <ContentWrapper>
                                <XVertical>
                                    <XHeader text="Mini-Home Opportunities on the Map" separated={true} />
                                    <XMapContainer>
                                        <ReportMap router={props.router} qHpd={q2} />
                                    </XMapContainer>
                                </XVertical>
                            </ContentWrapper>
                            <ContentWrapper>
                                <OpportunitiesTable
                                    // variables={{ state: OpportunityState.INCOMING, query: JSON.stringify(qPublic), page: props.router.query.page_hpd ? props.router.query.page_hpd : undefined }}
                                    // variables={{ state: OpportunityState.APPROVED_ZONING, query: JSON.stringify(qPublic), page: props.router.query.page_hpd ? props.router.query.page_hpd : undefined }}
                                    variables={{ state: OpportunityState.APPROVED_INITIAL, query: JSON.stringify(q1), page: props.router.query.page_hpd ? props.router.query.page_hpd : undefined }}
                                    stage="unit"
                                    type="hpd"
                                    title="HPD Mini-Home Opportunity Sites"
                                >
                                    <XCard.Empty text="There are no parcels for review" icon="sort" />
                                </OpportunitiesTable>
                            </ContentWrapper>
                            <ContentWrapper>
                                <OpportunitiesTable
                                    // variables={{ state: OpportunityState.APPROVED_ZONING, query: JSON.stringify(qHpd), page: props.router.query.page_public ? props.router.query.page_public : undefined }}
                                    variables={{ state: OpportunityState.INCOMING, query: JSON.stringify(q2), page: props.router.query.page_public ? props.router.query.page_public : undefined }}
                                    stage="unit"
                                    type="public"
                                    title="Other Public Opportunity Sites"
                                >
                                    <XCard.Empty text="There are no parcels for review" icon="sort" />
                                </OpportunitiesTable>
                            </ContentWrapper>
                        </XVertical>
                    </Wrapper>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
}));

function buildQuery(clauses: any[]): any | null {
    if (clauses.length === 0) {
        return null;
    } else if (clauses.length === 1) {
        return clauses[0];
    } else {
        return {
            '$and': clauses
        };
    }
}