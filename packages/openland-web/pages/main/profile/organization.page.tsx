import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withOrganization } from '../../../api/withOrganization';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCard } from 'openland-x/XCard';
import { XAvatar } from 'openland-x/XAvatar';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XLink } from 'openland-x/XLink';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import {
    ContactPerson
} from '../../../utils/OrganizationProfileFields';
import { XButton } from 'openland-x/XButton';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XStreetViewModalPreview } from 'openland-x-map/XStreetViewModalPreview';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XInput } from 'openland-x/XInput';
import { XLocationPickerModal } from 'openland-x-map/XLocationPickerModal';

const Root = Glamorous(XVertical)({
    backgroundColor: '#f9fafb',
    paddingBottom: 80
});

const MainContent = Glamorous(XVertical)({
    backgroundColor: '#f9fafb',
    padding: '0 150px',
    '@media (max-width: 1200px)': {
        padding: '0 40px',
    }
});

const Header = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.4)'
});

const HeaderPicture = Glamorous.div<{ img?: string }>((props) => ({
    height: 238,
    backgroundColor: '#3b345e',
}));

const HeaderContent = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    position: 'relative',
    backgroundColor: '#fff',
    height: 66,
    paddingRight: 150,
    paddingLeft: 302,
    '@media (max-width: 1200px)': {
        paddingRight: 40,
        paddingLeft: 192,
    }
});

const SwitcherWrapper = Glamorous(XSwitcher)({
    padding: 0,
    height: '100%',
    borderRadius: 0
});

const Switcher = Glamorous(XSwitcher.Item)({
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',

    fontSize: 15,
    fontSeight: 500,
    lineHeight: 1.33,
    color: '#334562 !important',
    opacity: 0.5,

    '&.is-active': {
        opacity: 1,
        borderBottom: '3px solid #654bfa !important'
    }
});

const OrganizationData = Glamorous.div({
    position: 'absolute',
    bottom: 16,
    left: 150,
    '@media (max-width: 1200px)': {
        left: 40
    }
});

const Avatar = Glamorous(XAvatar)({
    width: 136,
    height: 136,
    borderRadius: 10,
    border: 'solid 1px rgba(0, 0, 0, 0.07)',
    boxShadow: 'none'
});

const OrganizationName = Glamorous.div({
    fontSize: 22,
    fontWeight: 500,
    color: '#fff',
    position: 'absolute',
    // bottom: 90,
    bottom: 80,
    left: 157,
    whiteSpace: 'nowrap'
});

// const OrganizationPlace = Glamorous.div({
//     opacity: 0.7,
//     fontSize: 15,
//     fontWeight: 500,
//     color: '#fff',
//     position: 'absolute',
//     bottom: 66,
//     left: 157,
//     whiteSpace: 'nowrap'
// });

const Title = Glamorous.div<{ small?: boolean, marginBottom?: number, marginLeft?: number }>((props) => ({
    fontSize: props.small ? 15 : 18,
    fontWeight: 500,
    lineHeight: props.small ? 1.33 : 1.11,
    color: '#334562',
    letterSpacing: props.small ? -0.1 : -0.4,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
}));

const XCardStyled = Glamorous(XCard)<{ padding?: number, paddingTop?: number, paddingBottom?: number }>((props) => ({
    borderRadius: 5,
    padding: props.padding !== undefined ? props.padding : 24,
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom
}));

const ContactWrapper = Glamorous(XHorizontal)({
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18
});

const Text = Glamorous.div<{ opacity?: number, bold?: boolean, upperCase?: boolean }>((props) => ({
    fontSize: 15,
    lineHeight: 1.33,
    color: '#334562',
    opacity: props.opacity,
    fontWeight: props.bold ? 500 : undefined,
    textTransform: props.upperCase ? 'capitalize' : undefined
}));

const SocialLinksWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    borderTop: '1px solid rgba(220, 222, 228, 0.45)',
    paddingLeft: 18,
    paddingRight: 18
});

const SocialLink = Glamorous(XLink)({
    fontSize: 15,
    lineHeight: 1.33,
    color: '#334562',
    fontWeight: 500,
    marginRight: 22,
    '&:hover': {
        color: '#5640d6'
    }
});

const SocialLinkImg = Glamorous(XLink)({
    display: 'block',
    width: 24,
    height: 24,
    backgroundColor: '#d6dadf',
    borderRadius: 50,
    marginRight: 10,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 10,
    backgroundPosition: 'center',
    '&.fb': {
        backgroundSize: 7,
        backgroundImage: 'url(\'/static/img/icons/organization/ic-fb.svg\')',
    },
    '&.tw': {
        backgroundImage: 'url(\'/static/img/icons/organization/ic-twitter.svg\')',
    },
    '&:hover': {
        backgroundColor: '#5640d6'
    }
});

const ContactPersonComponent = (props: { contact: ContactPerson, index: number }) => (
    <ContactWrapper>
        <XAvatar cloudImageUuid={props.contact.photo || undefined} size="small" />
        <div>
            <Text bold={true}>{props.contact.name}</Text>
            <Text opacity={0.8}>{props.contact.role}</Text>
            <Text opacity={0.5}>{props.contact.phone}</Text>
            <Text opacity={0.5}>{props.contact.email}</Text>
            <Text opacity={0.5}>{props.contact.link}</Text>
        </div>
    </ContactWrapper>
);

const ContactPersons = (props: { contacts: ContactPerson[] }) => (
    <>
        {!props.contacts && 'No contacts'}
        {props.contacts && props.contacts.map((person, index) => <ContactPersonComponent key={index + '_' + person.name} contact={person} index={index} />)}
    </>
);

const ShowMoreBtn = Glamorous.div({
    fontSize: 14,
    fontWeight: 500,
    color: '#765efd',
    cursor: 'pointer',
    marginTop: 12
});

class AboutContent extends React.Component<{ text: string }, { open: boolean }> {
    constructor(props: { text: string }) {
        super(props);

        this.state = {
            open: this.props.text.length >= 320 ? false : true,
        };
    }

    switcher = () => {
        let { open } = this.state;

        this.setState({ open: !open });
    }

    render() {
        let { text } = this.props;

        let { open } = this.state;

        let isBigText = this.props.text.length >= 320;
        let textToShow = isBigText && !open ? this.props.text.substring(0, 320) + '...' : text;
        let buttonText = this.state.open ? 'Show minimize' : 'Show more';

        return (
            <>
                <Text>{textToShow}</Text>
                {isBigText && <ShowMoreBtn onClick={this.switcher}>{buttonText}</ShowMoreBtn>}
            </>
        );
    }
}

const TagItem = Glamorous.div({
    display: 'flex',
    alignItems: 'center'
});

const TagImg = Glamorous.div<{ img?: string }>((props) => ({
    width: 42,
    height: 42,
    backgroundColor: '#f3f3f5',
    borderRadius: 50,
    marginRight: 18,
    backgroundImage: props.img ? `url(\'/static/img/icons/organization/${props.img}.svg\')` : undefined,
    backgroundRepeat: 'no-repeat',
    backgroundSize: 20,
    backgroundPosition: 'center',
    '&.request_for_proposals': {
        backgroundSize: 20,
    },
    '&.joint_venture': {
        backgroundSize: 19,
    },
    '&.ground_lease': {
        backgroundSize: 20,
    },
    '&.sale': {
        backgroundSize: 10,
    },
    '&.option_to_buy': {
        backgroundSize: 20,
    },
    '&.immediate': {
        backgroundSize: 20,
    },
    '&.long_term': {
        backgroundSize: 17,
    },
    '&.near_future': {
        backgroundSize: 20,
    },
}));

const XVerticalStyled = Glamorous(XVertical)<{ borderRight?: boolean, borderBottom?: boolean, padding?: number }>((props) => ({
    borderRight: props.borderRight ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    borderBottom: props.borderBottom ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    padding: props.padding
}));

const OpportunitiesWrapper = Glamorous.div({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:first-child': {
        '& > div': {
            height: 50,
            paddingTop: 18,
            paddingBottom: 5
        }
    },
    '&:last-child': {
        '& > div': {
            height: 50,
            paddingBottom: 18,
            paddingTop: 5
        }
    }
});

const OpportunitiesTextWrapper = Glamorous.div({
    width: 220,
    height: 45,
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    borderRight: '1px solid rgba(220, 222, 228, 0.45)',
    paddingLeft: 24
});

const OpportunitiesValueWrapper = Glamorous.div({
    height: 45,
    display: 'flex',
    alignItems: 'center',
    flexGrow: 1,
    padding: '0 24px'
});

const OpportunitiesValue = Glamorous.div({
    height: 32,
    borderRadius: 4,
    backgroundColor: '#eeecfa',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.14,
    color: '#5640d6',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 9px',
    marginRight: 11
});

interface DevelopmentOportunity {
    name: string;
    id: string;
    summary: string | null;
    specialAttributes: string[] | null;
    status: string | null;
    updatedAt: string;
    location: {
        lat: number;
        lon: number;
    } | null;
    locationTitle: string | null;
    availability: string | null;
    area: number | null;
    price: number | null;
    dealType: string[] | null;
    shapeAndForm: string[] | null;
    currentUse: string[] | null;
    goodFitFor: string[] | null;
    additionalLinks: {
        text: string;
        url: string;
    }[] | null;
}

// interface AquizitionRequest {

// }

class DevelopmentOportunityComponent extends React.Component<{ item: DevelopmentOportunity, orgId: string, index: number }> {
    render() {
        return (
            <XHorizontal>
                <XStreetViewModalPreview location={{ latitude: this.props.item.location!.lat, longitude: this.props.item.location!.lon }} width={170} height={130} />

                <XVertical>
                    <Title >{this.props.item.name}</Title>
                    <Title >{this.props.item.locationTitle}</Title>
                    {/* {(this.props.item.tags || []).join(' ')} */}
                    <XWithRole role={['org-' + this.props.orgId + '-admin']}>

                        <XHorizontal>
                            <XButton text="edit" style="electric" query={{ field: 'editFeaturedOpportunity', value: this.props.item.id }} />
                            <XButton text="delete" style="danger" query={{ field: 'deleteFeaturedOpportunity', value: this.props.item.id }} />
                        </XHorizontal>
                    </XWithRole>

                </XVertical>
            </XHorizontal>
        );
    }
}

export default withApp('Organization profile', 'viewer', withOrganization(withQueryLoader((props) => {
    console.warn(props.data.organization.developmentOportunities!!.filter((devOp) => devOp.id === props.router.query.editFeaturedOpportunity)[0]);
    return (
        <>
            <XDocumentHead title="Organization profile" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false} >
                    <Root>
                        <Header>
                            <HeaderPicture />
                            <HeaderContent>
                                <OrganizationData>
                                    <Avatar cloudImageUuid={props.data.organization.photo!!} size="x-large" style="square" />
                                    <OrganizationName>{props.data.organization.name}</OrganizationName>
                                    {/* <OrganizationPlace>San Francisco, CA</OrganizationPlace> */}
                                </OrganizationData>
                                <SwitcherWrapper flatStyle={true}>
                                    <Switcher path={'/o/' + props.data.organization.id}>Development opportunities</Switcher>
                                    {/* <Switcher>Docs</Switcher>
                                <Switcher>News</Switcher>
                                <Switcher>Contacts</Switcher> */}
                                </SwitcherWrapper>
                                <XHorizontal>
                                    {!props.data.organization.isMine && (
                                        <XButton
                                            style="primary"
                                            size="medium"
                                            text={props.data.organization!!.followed ? 'Following' : 'Follow'}
                                            action={async () => {
                                                console.warn(props.data.organization!!.followed);
                                                await props.followOrganization({ variables: { follow: !props.data.organization!!.followed } });
                                            }}
                                        />
                                    )}
                                    <XWithRole role={['org-' + props.data.organization.id + '-admin']}>
                                        <XButton
                                            style="primary"
                                            size="medium"
                                            icon="edit"
                                            text="Edit"
                                            href="/settings/organization"
                                        />
                                        <XButton
                                            query={{ field: 'addDevelopmentOpportunity', value: 'true' }}
                                            size="medium"
                                            text="Add DO"
                                            icon="add"
                                            style="primary"
                                            alignSelf="flex-start"
                                        />

                                    </XWithRole>
                                </XHorizontal>
                            </HeaderContent>
                        </Header>
                        <MainContent>
                            <XHorizontal>
                                <XVertical flexGrow={1}>
                                    <XCardStyled padding={0}>
                                        <XHorizontal>
                                            <XVerticalStyled flexGrow={1} borderRight={true} padding={24}>
                                                <Title>Development models</Title>
                                                {props.data.organization.developmentModels && (
                                                    props.data.organization.developmentModels!!.map((s, k) => (
                                                        <TagItem key={k + '_' + s}>
                                                            <TagImg img={s!} className={s!!} />
                                                            <Text bold={true} upperCase={true}>
                                                                {s}
                                                            </Text>
                                                        </TagItem>
                                                    )))
                                                }
                                            </XVerticalStyled>
                                            <XVerticalStyled flexGrow={1} padding={24}>
                                                <Title>Availability</Title>
                                                {props.data.organization.availability && (
                                                    props.data.organization.availability!!.map((s, k) => (
                                                        <TagItem key={k + '_' + s}>
                                                            <TagImg img={s!} className={s!!} />
                                                            <Text bold={true} upperCase={true}>
                                                                {s}
                                                            </Text>
                                                        </TagItem>
                                                    )))
                                                }
                                            </XVerticalStyled>
                                        </XHorizontal>
                                    </XCardStyled>
                                    <XCardStyled padding={0}>
                                        <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                            <Title marginBottom={24}>Tags</Title>
                                        </XVerticalStyled>

                                        <div>
                                            {props.data.organization.potentialSites && (
                                                <OpportunitiesWrapper>
                                                    <OpportunitiesTextWrapper>
                                                        <Text bold={true}>Number of potential sites</Text>
                                                    </OpportunitiesTextWrapper>
                                                    <OpportunitiesValueWrapper>
                                                        <XHorizontal>
                                                            {props.data.organization.potentialSites!!.map((s, k) => (
                                                                <OpportunitiesValue key={k + '_' + s}>
                                                                    {
                                                                        ((s.to || Number.MAX_SAFE_INTEGER) <= 5) ?
                                                                            '0-5 sites' :
                                                                            ((s.to || Number.MAX_SAFE_INTEGER) <= 50) ?
                                                                                '5-50 sites' :
                                                                                '50+ sites'
                                                                    }
                                                                </OpportunitiesValue>
                                                            ))}
                                                        </XHorizontal>
                                                    </OpportunitiesValueWrapper>
                                                </OpportunitiesWrapper>
                                            )}
                                            {props.data.organization.siteSizes && (
                                                <OpportunitiesWrapper>
                                                    <OpportunitiesTextWrapper>
                                                        <Text bold={true}>Site sizes</Text>
                                                    </OpportunitiesTextWrapper>
                                                    <OpportunitiesValueWrapper>
                                                        <XHorizontal>
                                                            {props.data.organization.siteSizes!!.map((s, k) => (
                                                                <OpportunitiesValue key={k + '_' + s}>
                                                                    {
                                                                        ((s.to || Number.MAX_SAFE_INTEGER) <= 10000) ?
                                                                            'small (up to 10,000 sf)' :
                                                                            ((s.to || Number.MAX_SAFE_INTEGER) <= 100000) ?
                                                                                'medium (10,000 - 100,000 sf)' :
                                                                                'large (100,000 + sf)'
                                                                    }
                                                                </OpportunitiesValue>
                                                            ))}
                                                        </XHorizontal>
                                                    </OpportunitiesValueWrapper>
                                                </OpportunitiesWrapper>
                                            )}
                                            {props.data.organization.landUse && (
                                                <OpportunitiesWrapper>
                                                    <OpportunitiesTextWrapper>
                                                        <Text bold={true}>Land use</Text>
                                                    </OpportunitiesTextWrapper>
                                                    <OpportunitiesValueWrapper>
                                                        {props.data.organization.landUse!!.map((s, k) => (
                                                            <OpportunitiesValue key={k + '_' + s}>
                                                                {s}
                                                            </OpportunitiesValue>
                                                        ))}
                                                    </OpportunitiesValueWrapper>
                                                </OpportunitiesWrapper>
                                            )}

                                            {props.data.organization.goodFor && (
                                                <OpportunitiesWrapper>
                                                    <OpportunitiesTextWrapper>
                                                        <Text bold={true}>Good fit for</Text>
                                                    </OpportunitiesTextWrapper>
                                                    <OpportunitiesValueWrapper>
                                                        {props.data.organization.goodFor!!.map((s, k) => (
                                                            <OpportunitiesValue key={k + '_' + s}>
                                                                {s}
                                                            </OpportunitiesValue>
                                                        ))}
                                                    </OpportunitiesValueWrapper>
                                                </OpportunitiesWrapper>
                                            )}

                                            {props.data.organization.specialAttributes && (
                                                <OpportunitiesWrapper>
                                                    <OpportunitiesTextWrapper>
                                                        <Text bold={true}>Special attributes </Text>
                                                    </OpportunitiesTextWrapper>
                                                    <OpportunitiesValueWrapper>
                                                        {props.data.organization!!.specialAttributes!!.map((s, k) => (
                                                            <OpportunitiesValue key={k + '_' + s}>
                                                                {s}
                                                            </OpportunitiesValue>
                                                        ))}
                                                    </OpportunitiesValueWrapper>
                                                </OpportunitiesWrapper>
                                            )}
                                        </div>

                                    </XCardStyled>

                                    <XCardStyled padding={0}>
                                        <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                            <Title marginBottom={24}>Development opportunities</Title>
                                        </XVerticalStyled>
                                        {props.data.organization && props.data.organization.developmentOportunities && (
                                            props.data.organization.developmentOportunities.map((devop, i) => < DevelopmentOportunityComponent key={'do_' + i} orgId={props.data.organization.id} item={devop} index={i} />)
                                        )}
                                    </XCardStyled>

                                    {props.router.query.deleteFeaturedOpportunity && (
                                        <XModalForm
                                            title="Add Development Opportunity"

                                            defaultAction={async (data) => {

                                                // summary: String!
                                                // specialAttributes: [String!]
                                                // status: String

                                                // location: MapPoint
                                                // locationTitle: String
                                                // availability: String
                                                // area: Int
                                                // price: Int
                                                // dealType: [String!]
                                                // shapeAndForm: [String!]
                                                // currentUse: [String!]
                                                // goodFitFor: [String!]
                                                // additionalLinks: [AlphaOrganizationListingLink!]
                                                await props.createListing({
                                                    variables: {
                                                        type: 'development_opportunity',
                                                        input: {
                                                            name: data.name,
                                                            location: data.location ? { lat: data.location.result.center[1], lon: data.location.result.center[0] } : null,
                                                            locationTitle: data.location ? data.location.result.place_name || data.location.result.text : null,
                                                        }
                                                    }
                                                });
                                            }}
                                            targetQuery="addDevelopmentOpportunity"
                                        >
                                            <XFormLoadingContent>
                                                <XVertical>
                                                    <XInput field="name" required={true} placeholder="Name" />
                                                    <XLocationPickerModal field="location" />
                                                </XVertical>
                                            </XFormLoadingContent>
                                        </XModalForm>
                                    )}

                                    <XModalForm
                                        title="Delete?"
                                        submitProps={{ text: 'Delete' }}
                                        defaultAction={async (data) => {
                                            await props.deleteListing({
                                                variables: {
                                                    id: props.router.query.deleteFeaturedOpportunity
                                                }
                                            });
                                        }}
                                        targetQuery="deleteFeaturedOpportunity"
                                    />
                                    {props.router.query.editFeaturedOpportunity && (
                                        <XModalForm
                                            title="Edit Development Opportunity"

                                            defaultData={{
                                                input: {
                                                    name: props.data.organization.developmentOportunities!!.filter((devOp) => devOp.id === props.router.query.editFeaturedOpportunity)[0].name,
                                                    location: {
                                                        result: {
                                                            text: props.data.organization.developmentOportunities!!.filter((devOp) => devOp.id === props.router.query.editFeaturedOpportunity)[0].locationTitle,
                                                            center: [props.data.organization.developmentOportunities!!.filter((devOp) => devOp.id === props.router.query.editFeaturedOpportunity)[0].location!.lon, props.data.organization.developmentOportunities!!.filter((devOp) => devOp.id === props.router.query.editFeaturedOpportunity)[0].location!.lat]
                                                        }
                                                    },
                                                }
                                            }}

                                            defaultAction={async (data) => {

                                                // summary: String!
                                                // specialAttributes: [String!]
                                                // status: String

                                                // location: MapPoint
                                                // locationTitle: String
                                                // availability: String
                                                // area: Int
                                                // price: Int
                                                // dealType: [String!]
                                                // shapeAndForm: [String!]
                                                // currentUse: [String!]
                                                // goodFitFor: [String!]
                                                // additionalLinks: [AlphaOrganizationListingLink!]
                                                await props.editListing({
                                                    variables: {
                                                        id: props.router.query.editFeaturedOpportunity,
                                                        input: {
                                                            name: data.input.name,

                                                            location: data.input.location ? { lat: data.input.location.result.center[1], lon: data.input.location.result.center[0] } : null,
                                                            locationTitle: data.input.location ? data.input.location.result.place_name || data.input.location.result.text : null,
                                                        }
                                                    }

                                                });
                                            }}
                                            targetQuery="editFeaturedOpportunity"
                                        >
                                            <XFormLoadingContent>
                                                <XVertical>
                                                    <XInput field="input.name" required={true} placeholder="Name" />
                                                    <XLocationPickerModal field="input.location" />
                                                </XVertical>
                                            </XFormLoadingContent>
                                        </XModalForm>
                                    )}

                                </XVertical>
                                <XVertical width={270}>
                                    {props.data.organization.about && (
                                        <XCardStyled padding={18}>
                                            <Title small={true} marginBottom={10}>
                                                About
                                        </Title>
                                            <AboutContent text={props.data.organization.about} />
                                        </XCardStyled>
                                    )}
                                    <XCardStyled padding={0} paddingTop={18} paddingBottom={20}>
                                        <Title small={true} marginBottom={10} marginLeft={18}>Contacts</Title>
                                        <ContactPersons contacts={props.data.organization.contacts!!.filter(c => c !== null) as any} />
                                        <SocialLinksWrapper>
                                            {props.data.organization.website && <SocialLink href={props.data.organization.website}>Website</SocialLink>}
                                            {props.data.organization.facebook && <SocialLinkImg className="fb" href={props.data.organization.facebook} />}
                                            {props.data.organization.twitter && <SocialLinkImg className="tw" href={props.data.organization.twitter} />}
                                        </SocialLinksWrapper>
                                    </XCardStyled>
                                </XVertical>
                            </XHorizontal>
                        </MainContent>
                    </Root>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));
