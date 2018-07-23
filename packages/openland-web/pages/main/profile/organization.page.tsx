import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { WelcomePopup } from './components/welcomePopup';
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
import { XButton } from 'openland-x/XButton';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XInput } from 'openland-x/XInput';
import { XLocationPickerModal } from 'openland-x-map/XLocationPickerModal';
import { XSelect } from 'openland-x/XSelect';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormField, XFormFieldTitle } from 'openland-x-forms/XFormField';
import { XTextArea } from 'openland-x/XTextArea';
import { XTitle } from 'openland-x/XTitle';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { OverviewPlaceholder, DOARListingPlaceholder, AboutPlaceholder, SocialPlaceholder, ContactPlaceholder, LocationPlaceholder, AvatartPlaceholder, CategoriesPlaceholder } from './placeholders';
import { XIcon } from 'openland-x/XIcon';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import ContactEmailIc from './icons/contacts/ic-email.svg';
import ContactLinkedInIc from './icons/contacts/ic-linkedin.svg';
import ContactPhoneIc from './icons/contacts/ic-phone.svg';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';

import {
    XHorizontalStyled,
    XVerticalStyled,
    Title,
    Text,
    TextLink,
    // TagRowMapMain,
} from './components/profileComponents';
import {
    DevelopmentOportunityShort,
    DevelopmentOportunityFull,
    AcquizitionRequestShort,
    AcquizitionRequestFull
} from './components/listingsCards';
import { PostCard } from './components/postsCards';

const Root = Glamorous(XVertical)({
    minHeight: '100%',
    backgroundColor: '#f9fafb',
    paddingBottom: 80
});

const MainContentWrapper = Glamorous(XVertical)({
    backgroundColor: '#f9fafb',
    padding: '0 40px'
});

const MainContent = Glamorous(XHorizontal)({
    maxWidth: 1160,
    width: '100%',
    margin: 'auto'
});

const HeaderWrapper = Glamorous.div({
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(220, 222, 228, 0.4)',
    padding: '0 40px'
});

const HeaderContent = Glamorous.div({
    display: 'flex',
    maxWidth: 1160,
    margin: 'auto'
});

const SwitcherWrapper = Glamorous(XSwitcher)<{ height?: number, smallText?: boolean }>((props) => ({
    padding: 0,
    height: props.height ? props.height : '100%',
    borderRadius: 0,
    '& > a': {
        marginRight: '30px !important',
        fontSize: props.smallText ? 15 : 16,
        fontWeight: 500,
        lineHeight: props.smallText ? 1.33 : 1.25,
        letterSpacing: props.smallText ? -0.3 : -0.6,
        '&.is-active': {
            fontWeight: 500
        },
        '&:last-child': {
            marginRight: 0
        }
    }
}));

const Switcher = Glamorous(XSwitcher.Item)({
    display: 'flex',
    alignItems: 'center',
    padding: 0,
    color: '#334562 !important',
    opacity: 0.5,
    borderBottom: '3px solid transparent !important',

    '&.is-active': {
        opacity: 1,
        borderBottom: '3px solid #654bfa !important'
    }
});

const AvatarWrapper = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    paddingTop: 20,
    marginRight: 24
});

const Avatar = Glamorous(XAvatar)({
    width: 110,
    height: 110,
    borderRadius: 8,
    boxShadow: 'none',
    '> img': {
        width: '100% !important',
        height: '100% !important'
    }
});

const OrganizationName = Glamorous.div({
    fontSize: 22,
    fontWeight: 500,
    color: '#334562',
    whiteSpace: 'nowrap',
    maxWidth: 400,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 25,
    lineHeight: '25px'
});

const XCardStyled = Glamorous(XCard)<{ padding?: number, paddingTop?: number, paddingBottom?: number }>((props) => ({
    borderRadius: 5,
    padding: props.padding !== undefined ? props.padding : 24,
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom
}));

const SocialLinksWrapper = Glamorous.div({
    marginLeft: -20,
    marginRight: -20,
    // marginTop: 8,
    display: 'flex',
    alignItems: 'center',
    paddingTop: 12,
    borderTop: '1px solid rgba(220, 222, 228, 0.45)',
    paddingLeft: 20,
    paddingRight: 20
});

const SocialLink = Glamorous(XLink)({
    fontSize: '14px',
    fontWeight: 500,
    lineHeight: '16px',
    color: '#334562',
    letterSpacing: -0.5,
    marginRight: 24,
    '&:hover': {
        color: '#5640d6'
    }
});

const SocialLinkImg = Glamorous(XLink)({
    display: 'block',
    width: 24,
    height: 24,
    backgroundColor: '#bcc3cc',
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
    '&.li': {
        padding: 3,
        backgroundImage: 'url(\'/static/img/icons/organization/ic-linkedin.svg\')',
    },
    '&:hover': {
        backgroundColor: '#5640d6'
    }
});

const ShowMoreBtn = Glamorous.div<{ marginTop?: number, marginBottom?: number }>((props) => ({
    fontSize: 14,
    fontWeight: 500,
    color: '#765efd',
    cursor: 'pointer',
    marginTop: props.marginTop,
    marginBottom: props.marginBottom
}));

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
        let buttonText = this.state.open ? 'Show less' : 'Show more';

        return (
            <>
                <Text lineHeight={1.34} letterSpacing={-0.2}>{textToShow}</Text>
                {isBigText && <ShowMoreBtn onClick={this.switcher} marginTop={12}>{buttonText}</ShowMoreBtn>}
            </>
        );
    }
}

const Field = Glamorous(XFormField)({
    flex: 1
});

const DelLinkBtn = Glamorous(XButton)({
    marginRight: -24,
});

const AddLinkBtn = Glamorous(XButton)({
    marginLeft: -14,
    marginTop: -8,
});

const ShowListingLink = Glamorous(XLink)({
    fontSize: 14,
    fontWeight: 500,
    color: '#765efd',
    cursor: 'pointer',
    marginBottom: 23,
    marginTop: 20,
    letterSpacing: -0.4
});

const FormFieldTitle = Glamorous(XFormFieldTitle)({
    flexGrow: 1
});

const ViewAllIcon = Glamorous(XIcon)({
    width: 22,
    height: 22,
    fontSize: 22,
    color: '#654bfa',
    opacity: 0.5,
    textAlign: 'end',
    marginBottom: 23,
    marginTop: 20
});

const ListingsWrap = Glamorous(XVertical)({
    border: '1px solid rgba(38,38,38,0.08)',
    borderRadius: 5,

    '> *': {
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 0,
        borderTopRightRadius: 0,
    },
    '>:first-child': {
        borderBottom: '1px solid rgba(38,38,38,0.08)',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
        backgroundColor: '#fff'

    },
    '>:last-child': {
        borderBottom: 0,
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
    }
});

const AddListingButton = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    backgroundColor: '#654bfa',
    color: '#ffffff',
    border: 'solid 1px transparent',
    height: 32,
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 500,
    borderRadius: 4,
    paddingLeft: 14,
    paddingRight: 8,
    cursor: 'pointer',
    '& .material-icons': {
        transform: 'rotate(90deg)',
        opacity: 0.5,
        fontSize: 23
    },
    transition: 'box-shadow .08s ease-in,color .08s ease-in, border .0s, all .15s ease',
    '&:hover': {
        backgroundColor: '#816cf9',
        color: '#fff'
    }
});

export default withApp('Organization profile', 'viewer', withOrganization(withQueryLoader((props) => {

    console.log('posts - ', props.data.organization.posts);

    let editDoTarget = (props.data.organization.developmentOportunities || []).filter((devOp) => devOp.id === props.router.query.editListing)[0];
    let editArTarget = (props.data.organization.acquisitionRequests || []).filter((devOp) => devOp.id === props.router.query.editListing)[0];
    let target = editDoTarget || editArTarget;

    let editCommon;
    if (editDoTarget || editArTarget) {
        editCommon = {
            name: target.name,
            summary: target.summary,
            specialAttributes: target.specialAttributes,
        };
    }

    let editListingDefaultData;
    if (editDoTarget) {
        editListingDefaultData = {
            input: {
                ...editCommon,
                location: editDoTarget.location ? {
                    result: {
                        text: editDoTarget.locationTitle,
                        center: [editDoTarget.location!.lon, editDoTarget.location!.lat]
                    }
                } : undefined,
                locationTitle: target.locationTitle,
                availability: target.availability,
                area: target.area,
                price: target.price,
                dealType: target.dealType,
                shapeAndForm: target.shapeAndForm,
                currentUse: target.currentUse,
                goodFitFor: target.goodFitFor,
                additionalLinks: target.additionalLinks || [],
                status: 'open'
            }
        };
    }
    if (editArTarget) {

        let areaRange;
        if (editArTarget.areaRange) {
            if ((editArTarget.areaRange.to || Number.MAX_SAFE_INTEGER) <= 10000) {
                areaRange = 'small';
            } else if ((editArTarget.areaRange.to || Number.MAX_SAFE_INTEGER) <= 100000) {
                areaRange = 'medium';
            } else {
                areaRange = 'large';
            }
        }

        editListingDefaultData = {
            input: {
                ...editCommon,
                photo: sanitizeIamgeRef(editArTarget.photo),
                shortDescription: editArTarget.shortDescription,
                geographies: editArTarget.geographies,
                landUse: editArTarget.landUse,
                unitCapacity: editArTarget.unitCapacity,
                areaRange: areaRange,
                status: 'open'
            }
        };
    }

    let linksElements = (
        <>
            <XStoreContext.Consumer>
                {(store) => {
                    return (((store && store.readValue('fields.input.additionalLinks')) || []).map((link: any, i: number) => {
                        return (
                            <XHorizontal key={'link_' + i} >
                                <Field title={TextOrganizationProfile.listingEditDoLinkTextTitle}>
                                    <XInput field={`input.additionalLinks.${i}.text`} placeholder={TextOrganizationProfile.listingEditDoLinkTextPlaceholder} />
                                </Field>
                                <XVertical separator="none" flexGrow={1}>
                                    <XHorizontal >
                                        <FormFieldTitle>{TextOrganizationProfile.listingEditDoLinkUrlTitle}</FormFieldTitle>
                                        <DelLinkBtn
                                            style="link_danger"
                                            text={TextOrganizationProfile.listingEditDoLinkDelete}
                                            onClick={() => {
                                                if (store) {
                                                    let links: any[] = store.readValue('fields.input.additionalLinks') || [];
                                                    links.splice(i, 1);
                                                    store.writeValue('fields.input.additionalLinks', links);
                                                }
                                            }}
                                        />
                                        <div />
                                    </XHorizontal>
                                    <XInput field={`input.additionalLinks.${i}.url`} placeholder={TextOrganizationProfile.listingEditDoLinkUrlPlaceholder} />
                                </XVertical>
                            </XHorizontal>
                        );
                    }));
                }}
            </XStoreContext.Consumer>
            <XStoreContext.Consumer>
                {(store) => {
                    let links = store ? store.readValue('fields.input.additionalLinks') || [] : [];
                    return (
                        <AddLinkBtn
                            onClick={() => {
                                if (store) {
                                    links.push({ text: '', url: '' });
                                    store.writeValue('fields.input.additionalLinks', links);
                                }
                            }}
                            text={links.length === 0 ? TextOrganizationProfile.listingEditDoLinkAddFirst : TextOrganizationProfile.listingEditDoLinkAdd}
                            style="link"
                            alignSelf="flex-start"
                        />
                    );
                }}
            </XStoreContext.Consumer>
        </>
    );

    let editListingDefaultAction = async (data: any) => {

        let input = data.input || {};
        let areaRange = input.areaRange === undefined ? null : input.areaRange === 'small' ? { from: 0, to: 10000 } : input.areaRange === 'medium' ? { from: 10000, to: 100000 } : { from: 100000 };
        await props.editListing({
            variables: {
                id: target.id,
                input: {
                    name: input.name || '',
                    summary: input.summary,
                    specialAttributes: input.specialAttributes,

                    location: input.location ? { lat: input.location.result.center[1], lon: input.location.result.center[0] } : null,
                    locationTitle: input.location ? (input.location.result.place_name || input.location.result.text) : '',
                    availability: input.availability,
                    area: input.area,
                    price: input.price,
                    dealType: input.dealType,
                    shapeAndForm: input.shapeAndForm,
                    currentUse: input.currentUse,
                    goodFitFor: input.goodFitFor,
                    additionalLinks: (input.additionalLinks || []).filter((l: any) => l.text || l.url).map((l: any) => ({ text: l.text, url: l.url })),

                    photo: input.photo,
                    shortDescription: input.shortDescription,
                    areaRange: areaRange,
                    geographies: input.geographies,
                    landUse: input.landUse,
                    unitCapacity: input.unitCapacity,
                    status: 'open'
                }
            }
        });
    };

    let editListinFields = (
        <XVertical>
            {(props.router.query.addListing === 'AR' || editArTarget) && (
                <XAvatarUpload field="input.photo" cropParams="1:1, free" placeholder={{ add: TextOrganizationProfile.listingCreateDoPhotoPlaceholderAdd, change: TextOrganizationProfile.listingCreateDoPhotoPlaceholderChange }} />
            )}

            <XFormField title={TextOrganizationProfile.listingCreateDoNameTitle} field="input.name" >
                <XInput field="input.name" placeholder={TextOrganizationProfile.listingCreateDoNamePlaceholder} />
            </XFormField>
            {(props.router.query.addListing === 'DO' || editDoTarget) && (
                <>
                    <XFormField field="input.location" optional={true} title={TextOrganizationProfile.listingCreateDoLocationTitle}>
                        <XLocationPickerModal field="input.location" placeholder={TextOrganizationProfile.listingCreateDoLocationPlaceholder} />
                    </XFormField>

                    <XHorizontal>
                        <Field field="input.area" optional={true} title={TextOrganizationProfile.listingCreateDoAreaTitle}>
                            <XInput field="input.area" placeholder={TextOrganizationProfile.listingCreateDoAreaPlaceholder} />
                        </Field>
                        <Field field="input.price" optional={true} title={TextOrganizationProfile.listingCreateDoPriceTitle}>
                            <XInput field="input.price" placeholder={TextOrganizationProfile.listingCreateDoPricePlaceholder} />
                        </Field>
                    </XHorizontal>

                    <XFormField field="input.availability" optional={true} title={TextOrganizationProfile.listingCreateDoAvailabilityTitle}>
                        <XInput field="input.availability" placeholder={TextOrganizationProfile.listingCreateDoAvailabilityPlaceholder} />
                    </XFormField>

                    <XFormField optional={true} title={TextOrganizationProfile.listingCreateDoSummaryTitle} field="fields.input.summary" >
                        <XTextArea valueStoreKey="fields.input.summary" placeholder={TextOrganizationProfile.listingCreateDoSummaryPlaceholder} />
                    </XFormField>

                    <XTitle>Details</XTitle>
                    <XFormField field="input.dealType" optional={true} title={TextOrganizationProfile.listingCreateDoDealTypeTitle}>
                        <XSelect creatable={true} multi={true} field="input.dealType" placeholder={TextOrganizationProfile.listingCreateDoDealTypePlaceholder} />
                    </XFormField>
                    <XFormField field="input.shapeAndForm" optional={true} title={TextOrganizationProfile.listingCreateDoShapeAndFormTitle}>
                        <XSelect creatable={true} multi={true} field="input.shapeAndForm" placeholder={TextOrganizationProfile.listingCreateDoShapeAndFormPlaceholder} />
                    </XFormField>
                    <XFormField field="input.currentUse" optional={true} title={TextOrganizationProfile.listingCreateDoCurrentUseTitle}>
                        <XSelect creatable={true} multi={true} field="input.currentUse" placeholder={TextOrganizationProfile.listingCreateDoCurrentUsePlaceholder} />
                    </XFormField>
                    <XFormField field="input.goodFitFor" optional={true} title={TextOrganizationProfile.listingCreateDoGoodFitForTitle}>
                        <XSelect creatable={true} multi={true} field="input.goodFitFor" placeholder={TextOrganizationProfile.listingCreateDoGoodFitForPlaceholder} />
                    </XFormField>
                    <XFormField field="input.specialAttributes" optional={true} title={TextOrganizationProfile.listingCreateDoSpecialAttributesTitle}>
                        <XSelect creatable={true} multi={true} field="input.specialAttributes" placeholder={TextOrganizationProfile.listingCreateDoSpecialAttributesPlaceholder} />
                    </XFormField>
                    <XTitle>Additional links</XTitle>
                    {linksElements}
                </>
            )}
            {(props.router.query.addListing === 'AR' || editArTarget) && (
                <>
                    <XFormField field="input.shortDescription" optional={true} title={TextOrganizationProfile.listingCreateArShortDescriptionTitle}>
                        <XInput field="input.shortDescription" placeholder={TextOrganizationProfile.listingCreateArShortDescriptionPlaceholder} />
                    </XFormField>

                    <XFormField optional={true} title={TextOrganizationProfile.listingCreateArSummaryTitle} field="fields.input.summary">
                        <XTextArea valueStoreKey="fields.input.summary" placeholder={TextOrganizationProfile.listingCreateArSummaryPlaceholder} />
                    </XFormField>

                    <XTitle>Details</XTitle>

                    <XFormField field="input.areaRange" optional={true} title={TextOrganizationProfile.listingCreateArareaRangeTitle}>
                        <XSelect field="input.areaRange" options={[{ value: 'small', label: 'up to 10,000 ft²' }, { value: 'medium', label: '10,000 - 100,000 ft²' }, { value: 'large', label: '100,000 ft² +' }]} placeholder={TextOrganizationProfile.listingCreateArareaRangePlaceholder} />
                    </XFormField>

                    <XFormField field="input.geographies" optional={true} title={TextOrganizationProfile.listingCreateArgeographiesTitle}>
                        <XSelect creatable={true} multi={true} field="input.geographies" placeholder={TextOrganizationProfile.listingCreateArgeographiesPlaceholder} />
                    </XFormField>
                    <XFormField field="input.landUse" optional={true} title={TextOrganizationProfile.listingCreateArlandUseTitle}>
                        <XSelect creatable={true} multi={true} field="input.landUse" placeholder={TextOrganizationProfile.listingCreateArlandUsePlaceholder} />
                    </XFormField>
                    <XFormField field="input.specialAttributes" optional={true} title={TextOrganizationProfile.listingCreateArspecialAttributesTitle}>
                        <XSelect creatable={true} multi={true} field="input.specialAttributes" placeholder={TextOrganizationProfile.listingCreateArspecialAttributesPlaceholder} />
                    </XFormField>
                    <XFormField field="input.unitCapacity" optional={true} title={TextOrganizationProfile.listingCreateArunitCapacityTitle}>
                        <XSelect creatable={true} multi={true} field="input.unitCapacity" placeholder={TextOrganizationProfile.listingCreateArunitCapacityPlaceholder} />
                    </XFormField>
                </>
            )}
        </XVertical>
    );

    let currentPath = props.router.path.replace('#', '');
    let rootPath = '/o/' + props.data.organization.id;
    let lsitingsPath = '/o/' + props.data.organization.id + '/listings';
    // let lsitingsAllPath = '/o/' + props.data.organization.id + '/listings/all';

    const { organization } = props.data;

    let cardCountDO = 0;
    let cardCountAR = 0;

    let cardFilter = (cb: () => any, counter: number) => {
        counter++;
        if (counter <= 3) {
            return cb();
        } else {
            return;
        }
    };

    let hasLogo = !!(organization.photo);

    return (
        <>
            <XDocumentHead title={organization.name} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <Root>
                        <HeaderWrapper>
                            <HeaderContent>
                                <AvatarWrapper>
                                    {hasLogo && (
                                        <Avatar cloudImageUuid={organization.photo || undefined} size="large" style="organization" />
                                    )}
                                    {!hasLogo && (
                                        <>
                                            <XWithRole role={['org-' + organization.id + '-admin']} >
                                                <AvatartPlaceholder />
                                            </XWithRole>
                                            <XWithRole role={['org-' + organization.id + '-admin']} negate={true}>
                                                <Avatar cloudImageUuid={organization.photo || undefined} size="large" style="organization" />
                                            </XWithRole>
                                        </>
                                    )}
                                </AvatarWrapper>

                                <XVerticalStyled flexShrink={0} flexGrow={1} separator="none" paddingTop={31}>
                                    <OrganizationName>{organization.name}</OrganizationName>
                                    <div style={{ marginTop: 8 }}>
                                        {(organization.locations || [])[0] && <Text opacity={0.5} bold={true}>{(organization.locations || [])[0]}</Text>}
                                        <XWithRole role={['org-' + organization.id + '-admin']}>
                                            {!((organization.locations || [])[0]) && <LocationPlaceholder />}
                                            {!((organization.organizationType || [])[0]) && <CategoriesPlaceholder />}
                                        </XWithRole>
                                    </div>
                                    <div style={{ marginTop: 16 }}>
                                        <SwitcherWrapper flatStyle={true} height={57} smallText={true}>
                                            <Switcher path={rootPath}>{TextOrganizationProfile.headerTabOverview}</Switcher>
                                            <XWithRole role={['org-' + organization.id + '-admin']}>
                                                <Switcher path={lsitingsPath}>{TextOrganizationProfile.headerTabListings + ' (' + (((organization.developmentOportunities && organization.developmentOportunities.length) || 0) + ((organization.acquisitionRequests && organization.acquisitionRequests.length) || 0)) + ')'}</Switcher>
                                            </XWithRole>
                                            <XWithRole role={['org-' + organization.id + '-admin']} negate={true}>
                                                {(organization.listingsAll || []).length > 0 && (
                                                    <Switcher path={lsitingsPath}>{TextOrganizationProfile.headerTabListings + ' (' + (((organization.developmentOportunities && organization.developmentOportunities.length) || 0) + ((organization.acquisitionRequests && organization.acquisitionRequests.length) || 0)) + ')'}</Switcher>
                                                )}
                                            </XWithRole>
                                            {/* <Switcher path={lsitingsAllPath}>{'All Listings (' + ((organization.listingsAll && organization.listingsAll.length) || 0) + ')'}</Switcher> */}
                                        </SwitcherWrapper>
                                    </div >
                                </XVerticalStyled>
                                <XHorizontalStyled paddingTop={20}>
                                    {!organization.isMine && (
                                        <XButton
                                            style={organization.followed ? 'primary' : 'electric'}
                                            text={organization.followed ? TextOrganizationProfile.headerButtonFollowUnFollow : TextOrganizationProfile.headerButtonFollowFollow}
                                            action={async () => {
                                                await props.followOrganization({ variables: { follow: !organization.followed } });
                                            }}
                                        />
                                    )}
                                    <XWithRole role={['org-' + organization.id + '-admin']}>
                                        <XButton
                                            text={TextOrganizationProfile.headerButtonEdit}
                                            path="/settings/organization"
                                        />
                                        <XOverflow
                                            placement="bottom-end"
                                            width={220}
                                            target={
                                                <AddListingButton>
                                                    <span>{TextOrganizationProfile.headerButtonAddListing}</span>
                                                    <XIcon icon="keyboard_arrow_right" />
                                                </AddListingButton>
                                            }
                                            content={
                                                <>
                                                    <XOverflow.Item autoClose={true} query={{ field: 'addListing', value: 'DO' }}>{TextOrganizationProfile.headerButtonAddListingDO}</XOverflow.Item>
                                                    <XOverflow.Item autoClose={true} query={{ field: 'addListing', value: 'AR' }}>{TextOrganizationProfile.headerButtonAddListingAR}</XOverflow.Item>
                                                </>
                                            }
                                        />

                                    </XWithRole>
                                </XHorizontalStyled>
                            </HeaderContent>
                        </HeaderWrapper>

                        <WelcomePopup />

                        <MainContentWrapper>
                            <MainContent>
                                <XVerticalStyled
                                    flexGrow={1}
                                    maxwidth={currentPath === rootPath ? 'calc(100% - 286px)' : '100%'}
                                    width2={currentPath === rootPath ? 'calc(100% - 286px)' : '100%'}
                                >
                                    <XWithRole role={['org-' + props.data.organization.id + '-admin']}>
                                        {currentPath === rootPath && (
                                            <>
                                                <OverviewPlaceholder />
                                            </>
                                        )}
                                    </XWithRole>
                                    {currentPath === rootPath && (
                                        <>
                                            {organization.posts && (
                                                organization.posts.map((post, i) => (
                                                    <PostCard key={'post_' + i} orgId={organization.id} item={post} />
                                                ))
                                            )}

                                            {/* {(organization.organizationType || organization.locations || organization.interests) && (
                                                <XCardStyled padding={0}>
                                                    {organization.organizationType && (
                                                        <TagRowMapMain
                                                            title={TextOrganizationProfile.overviewOrganizationTypeTitle}
                                                            items={organization.organizationType}
                                                        />
                                                    )}
                                                    {organization.locations && (
                                                        <TagRowMapMain
                                                            title={TextOrganizationProfile.overviewOrganizationLocationsTitle}
                                                            items={organization.locations}
                                                        />
                                                    )}
                                                    {organization.interests && (
                                                        <TagRowMapMain
                                                            title={TextOrganizationProfile.overviewOrganizationInterestsTitle}
                                                            items={organization.interests}
                                                        />
                                                    )}

                                                </XCardStyled>
                                            )} */}

                                            {(organization.doShapeAndForm || organization.doCurrentUse || organization.doGoodFitFor || organization.doSpecialAttributes || organization.doAvailability || (organization.developmentOportunities || []).length > 0) && (
                                                <XCardStyled padding={0}>
                                                    <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                                        <Title marginBottom={24}>{TextOrganizationProfile.overviewDOTitle}</Title>
                                                    </XVerticalStyled>

                                                    {/* {(organization.doShapeAndForm || organization.doCurrentUse || organization.doGoodFitFor || organization.doSpecialAttributes || organization.doAvailability) && (
                                                        <div style={{ borderBottom: '1px solid rgba(220, 222, 228, 0.45)' }}>
                                                            {organization.doShapeAndForm && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewDOTagRowShapeAndFormTitle}
                                                                    items={organization.doShapeAndForm}
                                                                />
                                                            )}
                                                            {organization.doCurrentUse && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewDOTagRowCurrentUseTitle}
                                                                    items={organization.doCurrentUse}
                                                                />
                                                            )}
                                                            {organization.doGoodFitFor && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewDOTagRowGoodFitForTitle}
                                                                    items={organization.doGoodFitFor}
                                                                />
                                                            )}
                                                            {organization.doSpecialAttributes && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewDOTagRowSpecialAttributesTitle}
                                                                    items={organization.doSpecialAttributes}
                                                                />
                                                            )}
                                                            {organization.doAvailability && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewDOTagRowAvailabilityTitle}
                                                                    items={organization.doAvailability}
                                                                />
                                                            )}

                                                        </div>
                                                    )} */}

                                                    {organization.developmentOportunities && (
                                                        organization.developmentOportunities.map((devop, i) => (
                                                            cardFilter(() => <DevelopmentOportunityShort key={'do_' + devop.id} orgId={organization.id} item={devop} />, cardCountAR)
                                                        ))
                                                    )}
                                                    <XWithRole role={['org-' + organization.id + '-admin']}>
                                                        <XHorizontal justifyContent="center" alignItems="center" separator="none">
                                                            {(organization.developmentOportunities || []).length > 0 && (
                                                                <>
                                                                    <ShowListingLink path={lsitingsPath}>
                                                                        {TextOrganizationProfile.overviewListingsDoFooterNonEmpty} ({((organization.developmentOportunities || []).length) || 0})
                                                                    </ShowListingLink>
                                                                    <ViewAllIcon icon="keyboard_arrow_right" />
                                                                </>
                                                            )}
                                                            {(organization.developmentOportunities || []).length === 0 && (
                                                                <ShowListingLink query={{ field: 'addListing', value: 'DO' }}>
                                                                    {TextOrganizationProfile.overviewListingsDoFooterAddListing}
                                                                </ShowListingLink>
                                                            )}

                                                        </XHorizontal>
                                                    </XWithRole>
                                                    <XWithRole role={['org-' + organization.id + '-admin']} negate={true}>
                                                        {(organization.developmentOportunities || []).length > 0 && (
                                                            <XHorizontal justifyContent="center" alignItems="center" separator="none">
                                                                <ShowListingLink path={lsitingsPath}>
                                                                    {TextOrganizationProfile.overviewListingsDoFooterNonEmpty} ({((organization.developmentOportunities || []).length) || 0})
                                                                </ShowListingLink>
                                                                <ViewAllIcon icon="keyboard_arrow_right" />
                                                            </XHorizontal>
                                                        )}

                                                    </XWithRole>
                                                </XCardStyled>
                                            )}

                                            {(organization.arGeographies || organization.arAreaRange || organization.arHeightLimit || organization.arLandUse || organization.arSpecialAttributes || organization.arActivityStatus || organization.arAquisitionBudget || organization.arAquisitionRate || organization.arClosingTime || (organization.acquisitionRequests || []).length > 0) && (
                                                <XCardStyled padding={0}>
                                                    <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                                        <Title marginBottom={24}>{TextOrganizationProfile.overviewArTitle}</Title>
                                                    </XVerticalStyled>

                                                    {/* {(organization.arGeographies || organization.arAreaRange || organization.arHeightLimit || organization.arLandUse || organization.arSpecialAttributes || organization.arActivityStatus || organization.arAquisitionBudget || organization.arAquisitionRate || organization.arClosingTime) && (
                                                        <div style={{ borderBottom: '1px solid rgba(220, 222, 228, 0.45)' }}>
                                                            {organization.arGeographies && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowGeographiesTitle}
                                                                    items={organization.arGeographies}
                                                                />
                                                            )}
                                                            {organization.arAreaRange && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowAreaRangeTitle}
                                                                    items={organization.arAreaRange}
                                                                />
                                                            )}
                                                            {organization.arHeightLimit && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowHeightLimitTitle}
                                                                    items={organization.arHeightLimit}
                                                                />
                                                            )}
                                                            {organization.arLandUse && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowLandUseTitle}
                                                                    items={organization.arLandUse}
                                                                />
                                                            )}
                                                            {organization.arSpecialAttributes && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowSpecialAttributesTitle}
                                                                    items={organization.arSpecialAttributes}
                                                                />
                                                            )}
                                                            {organization.arActivityStatus && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowActivityStatusTitle}
                                                                    items={organization.arActivityStatus}
                                                                />
                                                            )}
                                                            {organization.arAquisitionBudget && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowAquisitionBudgetTitle}
                                                                    items={organization.arAquisitionBudget}
                                                                />
                                                            )}
                                                            {organization.arAquisitionRate && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowAquisitionRateTitle}
                                                                    items={organization.arAquisitionRate}
                                                                />
                                                            )}
                                                            {organization.arClosingTime && (
                                                                <TagRowMapMain
                                                                    title={TextOrganizationProfile.overviewArTagRowClosingTimeTitle}
                                                                    items={organization.arClosingTime}
                                                                />
                                                            )}
                                                        </div>
                                                    )} */}

                                                    {organization.acquisitionRequests && (
                                                        organization.acquisitionRequests.map((devop, i) => (
                                                            cardFilter(() => <AcquizitionRequestShort key={'do_' + devop.id} orgId={organization.id} item={devop} />, cardCountDO)
                                                        ))
                                                    )}
                                                    <XHorizontal justifyContent="center" alignItems="center" separator="none">
                                                        {/* here
                                                    <ShowListingLink path={lsitingsPath + '?listingType=ar'}>
                                                        {TextOrganizationProfile.overviewListingsArFooterNonEmpty} ({((organization.acquisitionRequests || []).length) || 0})
                                                    </ShowListingLink> */}
                                                        <XWithRole role={['org-' + organization.id + '-admin']}>
                                                            <XHorizontal justifyContent="center" alignItems="center" separator="none">
                                                                {(organization.acquisitionRequests || []).length > 0 && (
                                                                    <>
                                                                        <ShowListingLink path={lsitingsPath + '?listingType=ar'}>
                                                                            {TextOrganizationProfile.overviewListingsArFooterNonEmpty} ({((organization.acquisitionRequests || []).length) || 0})
                                                                        </ShowListingLink>
                                                                        <ViewAllIcon icon="keyboard_arrow_right" />
                                                                    </>
                                                                )}
                                                                {(organization.acquisitionRequests || []).length === 0 && (
                                                                    <ShowListingLink query={{ field: 'addListing', value: 'AR' }}>
                                                                        {TextOrganizationProfile.overviewListingsArFooterAddListing}
                                                                    </ShowListingLink>
                                                                )}

                                                            </XHorizontal>
                                                        </XWithRole>
                                                        <XWithRole role={['org-' + organization.id + '-admin']} negate={true}>
                                                            {(organization.acquisitionRequests || []).length > 0 && (
                                                                <XHorizontal justifyContent="center" alignItems="center" separator="none">
                                                                    <ShowListingLink path={lsitingsPath + '?listingType=ar'}>
                                                                        {TextOrganizationProfile.overviewListingsArFooterNonEmpty} ({((organization.acquisitionRequests || []).length) || 0})
                                                                    </ShowListingLink>
                                                                    <ViewAllIcon icon="keyboard_arrow_right" />
                                                                </XHorizontal>)}

                                                        </XWithRole>
                                                    </XHorizontal>
                                                </XCardStyled>
                                            )}
                                        </>
                                    )}

                                    {currentPath === lsitingsPath && (
                                        <>
                                            <DOARListingPlaceholder />
                                            {((organization.developmentOportunities || []).length > 0 || (organization.acquisitionRequests || []).length > 0) && (
                                                <ListingsWrap separator="none">
                                                    <XVerticalStyled flexGrow={1} padding={0} paddingLeft={24} paddingRight={24} paddingTop={6}>
                                                        <SwitcherWrapper flatStyle={true} height={58}>
                                                            {(organization.developmentOportunities || []).length > 0 && <Switcher query={{ field: 'listingType' }}>{TextOrganizationProfile.listingsDoTabTitle}</Switcher>}
                                                            {(organization.acquisitionRequests || []).length > 0 && <Switcher query={{ field: 'listingType', value: 'ar' }}>{TextOrganizationProfile.listingsArTabTitle}</Switcher>}

                                                        </SwitcherWrapper>
                                                    </XVerticalStyled>
                                                    {currentPath === lsitingsPath && props.router.query.listingType === undefined && organization && organization.developmentOportunities && (
                                                        organization.developmentOportunities.map((devop, i) => <DevelopmentOportunityFull key={'do_' + i} orgId={organization.id} item={devop} />)
                                                    )}
                                                    {currentPath === lsitingsPath && props.router.query.listingType === 'ar' && organization && organization.acquisitionRequests && (
                                                        organization.acquisitionRequests.map((devop, i) => <AcquizitionRequestFull key={'do_' + i} orgId={organization.id} item={devop} />)
                                                    )}
                                                </ListingsWrap>
                                            )}
                                        </>
                                    )}

                                    {/* {currentPath === lsitingsAllPath && (
                                        <>
                                            <DOARListingPlaceholder />
                                            <XVertical>
                                                {currentPath === lsitingsAllPath && organization && organization.listingsAll && (
                                                    organization.listingsAll.map((l, i) => l.type === 'development_opportunity' ? <DevelopmentOportunityFull key={'do_' + i} orgId={organization.id} item={l} showType={true} isSoloComponent={true} /> : < AcquizitionRequestFull key={'do_' + i} orgId={organization.id} item={l} showType={true} isSoloComponent={true} />)
                                                )}
                                                {currentPath === lsitingsPath && props.router.query.listingType === 'ar' && organization && organization.acquisitionRequests && (
                                                    organization.acquisitionRequests.map((devop, i) => <AcquizitionRequestFull key={'do_' + i} orgId={organization.id} item={devop} isSoloComponent={true} />)
                                                )}
                                            </XVertical>
                                        </>

                                    )} */}

                                    {props.router.query.addListing && (
                                        <XModalForm
                                            scrollableContent={true}
                                            title={props.router.query.addListing === 'DO' ? TextOrganizationProfile.listingCreateDoTitle : TextOrganizationProfile.listingCreateArTitle}

                                            defaultAction={async (data) => {
                                                let input = data.input || {};
                                                let areaRange = input.areaRange === undefined ? null : input.areaRange === 'small' ? { from: 0, to: 10000 } : input.areaRange === 'medium' ? { from: 10000, to: 100000 } : { from: 100000 };
                                                await props.createListing({
                                                    variables: {
                                                        type: props.router.query.addListing === 'DO' ? 'development_opportunity' : 'acquisition_request',
                                                        input: {
                                                            name: input.name || '',
                                                            summary: input.summary,
                                                            specialAttributes: input.specialAttributes,

                                                            location: input.location ? { lat: input.location.result.center[1], lon: input.location.result.center[0] } : null,
                                                            locationTitle: input.location ? (input.location.result.place_name || input.location.result.text) : '',
                                                            availability: input.availability,
                                                            area: input.area,
                                                            price: input.price,
                                                            dealType: input.dealType,
                                                            shapeAndForm: input.shapeAndForm,
                                                            currentUse: input.currentUse,
                                                            goodFitFor: input.goodFitFor,

                                                            photo: input.photo,
                                                            shortDescription: input.shortDescription,
                                                            areaRange: areaRange,
                                                            geographies: input.geographies,
                                                            landUse: input.landUse,
                                                            unitCapacity: input.unitCapacity,
                                                            status: 'open'
                                                        }
                                                    }
                                                });
                                            }}
                                            targetQuery="addListing"
                                        >
                                            <XFormLoadingContent>
                                                {editListinFields}
                                            </XFormLoadingContent>
                                        </XModalForm>

                                    )}

                                    <XModalForm
                                        title="Delete?"
                                        submitProps={{ text: 'Delete' }}
                                        defaultAction={async (data) => {
                                            await props.deleteListing({
                                                variables: {
                                                    id: props.router.query.deleteListing
                                                }
                                            });
                                        }}
                                        targetQuery="deleteListing"
                                    />
                                    {(editDoTarget || editArTarget) && (
                                        <XModalForm
                                            scrollableContent={true}
                                            title={editDoTarget ? 'Edit development opportunity' : 'Edit acquizition request'}
                                            defaultData={editListingDefaultData}
                                            defaultAction={editListingDefaultAction}
                                            targetQuery="editListing"
                                        >
                                            <XFormLoadingContent>
                                                {editListinFields}
                                            </XFormLoadingContent>
                                        </XModalForm>
                                    )}

                                </XVerticalStyled>
                                {currentPath === rootPath && (
                                    <XVertical width={270} flexShrink={0}>
                                        {organization.about && (
                                            <XCardStyled padding={20} paddingBottom={24} paddingTop={16}>
                                                <Title small={true} marginBottom={12}>
                                                    {TextOrganizationProfile.additionalInfoAbout}
                                                </Title>
                                                <AboutContent text={organization.about} />
                                            </XCardStyled>
                                        )}
                                        <XWithRole role={['org-' + organization.id + '-admin']}>
                                            {!organization.about && (
                                                <AboutPlaceholder />
                                            )}
                                        </XWithRole>

                                        {((organization.contacts || []).length || organization.website || organization.facebook || organization.linkedin || organization.twitter) && (
                                            <XCardStyled padding={20} paddingTop={16} paddingBottom={16}>
                                                <XVertical separator={7}>
                                                    <Title small={true}>{TextOrganizationProfile.additionalInfoContacts}</Title>
                                                    <XVertical separator={10}>
                                                        {(organization.contacts || []).filter(p => !!(p)).map((contact, i) => {
                                                            return (
                                                                <XHorizontalStyled
                                                                    key={i}
                                                                    separator={8}
                                                                >
                                                                    <XAvatar cloudImageUuid={contact.photo || undefined} size="small" />
                                                                    <XVertical separator={3.5}>
                                                                        <Title small={true}>{contact.name}</Title>
                                                                        <Text small={true} lineHeight="18px" fontWeight={600} letterSpacing={-0.3} opacity={0.5}>{contact.position}</Text>
                                                                        {contact.phone && <XHorizontal alignItems="center" separator={4}><ContactPhoneIc width={20} height={20} style={{ padding: 3 }} /><TextLink fontWeight={600} showIcon={false} href={'tel:' + contact.phone} letterSpacing={0.1} small={true} opacity={0.5} content={contact.phone} /></XHorizontal>}
                                                                        {contact.email && <XHorizontal alignItems="center" separator={4}><ContactEmailIc width={20} height={20} style={{ padding: 3 }} /><TextLink fontWeight={600} showIcon={false} href={'mailto:' + contact.email} letterSpacing={0.1} small={true} opacity={0.5} content={contact.email} /></XHorizontal>}
                                                                        {contact.link && <XHorizontal alignItems="center" separator={4}><ContactLinkedInIc width={20} height={20} style={{ padding: 3, paddingTop: 0 }} /><TextLink fontWeight={600} showIcon={false} href={contact.link.startsWith('http') ? contact.link : 'https://' + contact.link} content="LinkedIn" letterSpacing={0.1} small={true} opacity={0.5} /></XHorizontal>}
                                                                    </XVertical>
                                                                </XHorizontalStyled>
                                                            );
                                                        })}
                                                    </XVertical>
                                                    <SocialLinksWrapper>
                                                        {organization.website && <SocialLink href={organization.website}>{TextOrganizationProfile.additionalInfoWebsite}</SocialLink>}
                                                        {organization.facebook && <SocialLinkImg className="fb" href={organization.facebook} />}
                                                        {organization.twitter && <SocialLinkImg className="tw" href={organization.twitter} />}
                                                        {organization.linkedin && <SocialLinkImg className="li" href={organization.linkedin} />}
                                                    </SocialLinksWrapper>
                                                </XVertical>
                                            </XCardStyled>
                                        )}
                                        <XWithRole role={['org-' + organization.id + '-admin']}>
                                            {!((organization.contacts || []).length || organization.website || organization.facebook || organization.linkedin || organization.twitter) && (
                                                <XCardStyled padding={18}>
                                                    <XVertical>
                                                        {!(organization.contacts || []).length && <ContactPlaceholder />}
                                                        {!(organization.website || organization.facebook || organization.linkedin || organization.twitter) && <SocialPlaceholder />}
                                                    </XVertical>
                                                </XCardStyled>
                                            )}
                                        </XWithRole>
                                    </XVertical>
                                )}
                            </MainContent>
                        </MainContentWrapper>
                    </Root>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));
