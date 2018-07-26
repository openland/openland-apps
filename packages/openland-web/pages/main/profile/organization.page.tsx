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
import { XIcon } from 'openland-x/XIcon';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import ContactEmailIc from './icons/contacts/ic-email.svg';
import ContactLinkedInIc from './icons/contacts/ic-linkedin.svg';
import ContactPhoneIc from './icons/contacts/ic-phone.svg';

import { PostCard } from './components/postsCards';

import {
    XHorizontalStyled,
    XVerticalStyled,
    Title,
    Text,
    TagWrapper,
    Tag
} from './components/profileComponents';

import {
    DOARListingPlaceholder,
    SocialPlaceholder,
    ContactPlaceholder,
    LocationPlaceholder,
    AvatartPlaceholder,
    CategoriesPlaceholder,
    InterestsPlaceholder,
    EmptyPlaceholder,
    SemiEmptyPlaceholder
} from './placeholders';

import {
    DevelopmentOportunityShort,
    DevelopmentOportunityFull,
    AcquizitionRequestShort,
    AcquizitionRequestFull
} from './components/listingsCards';
import { XTag } from 'openland-x/XTag';
import { XPopper } from 'openland-x/XPopper';

const Root = Glamorous(XVertical)({
    minHeight: '100%',
    backgroundColor: '#f9fafb',
    paddingBottom: 80
});

const MainContentWrapper = Glamorous(XVertical)({
    backgroundColor: '#f9fafb',
    padding: '0 40px'
});

const MainContent = Glamorous(XVertical)({
    maxWidth: 1240,
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
    maxWidth: 1240,
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
    letterSpacing: 0.7,
    lineHeight: '25px'
});

const XCardStyled = Glamorous(XCard)<{ padding?: number, paddingTop?: number, paddingBottom?: number, paddingLeft?: number, paddingRight?: number }>((props) => ({
    borderRadius: 5,
    padding: props.padding !== undefined ? props.padding : 24,
    paddingTop: props.paddingTop,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingBottom: props.paddingBottom
}));

const SocialLinksWrapper = Glamorous.div<{ topBorder: boolean }>(props => ({
    marginLeft: -20,
    marginRight: -20,
    display: 'flex',
    alignItems: 'center',
    paddingTop: props.topBorder ? 20 : 2,
    borderTop: props.topBorder ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    paddingLeft: 20,
    paddingRight: 20
}));

const SocialLink = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    color: '#334562',
    letterSpacing: -0.2,
    marginRight: 20,
    '&:hover': {
        color: '#5640d6'
    },
    '& > i': {
        fontSize: 20,
        color: '#bcc3cc',
        marginTop: 4,
        marginLeft: 6
    }
});

const SocialLinkImg = Glamorous(XLink)({
    display: 'block',
    width: 24,
    height: 24,
    backgroundColor: '#bcc3cc',
    borderRadius: 50,
    marginRight: 20,
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

const FormFieldTitle = Glamorous(XFormFieldTitle)({
    flexGrow: 1
});

const AddButton = Glamorous(XLink)({
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

const AddSeporator = Glamorous.div({
    height: 1,
    margin: '4px 0',
    backgroundColor: 'rgba(220, 222, 228, 0.45)',
});

const ContactLink = Glamorous.a({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    '&:hover > svg > g > path:last-child': {
        fill: '#5640d6'
    }
});

export default withApp('Organization profile', 'viewer', withOrganization(withQueryLoader((props) => {
    let currentPath = props.router.path;
    let rootPath = '/o/' + props.data.organization.id;
    let lsitingsPath = '/o/' + props.data.organization.id + '/listings';

    let listingsPathReg = /^[A-Za-z0-9]+$/;

    const { organization } = props.data;

    let contentLength = (organization.listingsAll || []).length + (organization.posts || []).length;
    let empty = contentLength === 0;
    let semiEmpty = contentLength < 2;

    // prepare listings edit
    let hasLogo = !!(organization.photo);
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

    return (
        <>
            <XDocumentHead title={organization.name} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false}>
                    <Root>
                        <HeaderWrapper>
                            <HeaderContent>

                                <XVerticalStyled flexShrink={0} flexGrow={1} separator="none" paddingTop={27}>
                                    <XHorizontal separator={12}>
                                        <AvatarWrapper>
                                            {(hasLogo) && (
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
                                        <XVerticalStyled paddingTop={4} separator={0}>
                                            <OrganizationName>{organization.name}</OrganizationName>
                                            {(organization.locations || []).length === 1 && (
                                                <Text marginTop={8} opacity={0.5} bold={true}>{(organization.locations || [])[0]}</Text>
                                            )}
                                            {(organization.locations || []).length > 1 && (
                                                <XHorizontalStyled marginTop={8} separator={4}>
                                                    <Text opacity={0.5} bold={true}>{(organization.locations || [])[0]}</Text>
                                                    <XPopper
                                                        showOnHover={true}
                                                        placement="bottom-start"
                                                        arrow={null}
                                                        content={
                                                            <XVerticalStyled padding={2} scrollable={true} maxHeight={254} separator={4} >
                                                                {organization.locations!!.map((l, i) => <XTag size="large" color="gost" key={l + i} text={l} />)}
                                                            </XVerticalStyled>}
                                                    >
                                                        <Text opacity={0.5} bold={true}>{' • More locations'}</Text>
                                                    </XPopper>

                                                    <img src="/static/X/ic-arrow-down.svg" />
                                                </XHorizontalStyled>

                                            )}
                                            {(organization.organizationType || []).length > 0 && (
                                                <XHorizontalStyled marginTop={20}>
                                                    {organization.organizationType!!.map((l, i) => <XTag size="large" color="default" key={l + i} text={l} />)}
                                                </XHorizontalStyled>
                                            )}
                                            <XWithRole role={['org-' + organization.id + '-admin']}>
                                                {!((organization.locations || [])[0]) && <LocationPlaceholder />}
                                                {!((organization.organizationType || [])[0]) && <CategoriesPlaceholder />}
                                            </XWithRole>
                                        </XVerticalStyled>
                                    </XHorizontal>
                                    <div style={{ marginTop: 9 }}>
                                        <SwitcherWrapper flatStyle={true} height={57} smallText={true}>
                                            <Switcher path={rootPath}>{TextOrganizationProfile.headerTabOverview}</Switcher>
                                            <XWithRole role={['org-' + organization.id + '-admin']}>
                                                <Switcher path={lsitingsPath} count={(organization.listingsAll || []).length}>{TextOrganizationProfile.headerTabListings}</Switcher>
                                            </XWithRole>
                                            <XWithRole role={['org-' + organization.id + '-admin']} negate={true}>
                                                {(organization.listingsAll || []).length > 0 && (
                                                    <Switcher path={lsitingsPath} count={(organization.listingsAll || []).length}>{TextOrganizationProfile.headerTabListings}</Switcher>
                                                )}
                                            </XWithRole>
                                        </SwitcherWrapper>
                                    </div >
                                </XVerticalStyled>
                                <XHorizontalStyled paddingTop={20}>
                                    {!organization.isMine && (
                                        <XButton
                                            style={organization.followed ? 'ghost' : 'default'}
                                            icon={organization.followed ? 'check' : undefined}
                                            text={organization.followed ? TextOrganizationProfile.headerButtonFollowUnFollow : TextOrganizationProfile.headerButtonFollowFollow}
                                            action={async () => {
                                                await props.followOrganization({ variables: { follow: !organization.followed } });
                                            }}
                                        />
                                    )}
                                    {!organization.isMine && !organization.editorial && (
                                        <XButton style="primary" path={'/mail/' + organization.id} text={TextOrganizationProfile.headerButtonMessage} />
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
                                                <AddButton>
                                                    <span>{TextOrganizationProfile.headerButtonAdd}</span>
                                                    <XIcon icon="keyboard_arrow_right" />
                                                </AddButton>
                                            }
                                            content={
                                                <>
                                                    {(false) && (
                                                        <>
                                                            <XOverflow.Item autoClose={true}>{TextOrganizationProfile.headerButtonAddUpdate}</XOverflow.Item>
                                                            <AddSeporator />
                                                        </>
                                                    )}
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
                                {currentPath === rootPath && (
                                    <XHorizontal separator={9}>
                                        <XVertical flexGrow={1}>
                                            <XVertical separator={9} minWidth={0} >
                                                <XWithRole role={['org-' + props.data.organization.id + '-admin']} >
                                                    <DOARListingPlaceholder />
                                                </XWithRole>
                                                {!organization.isMine && empty && (
                                                    <EmptyPlaceholder />
                                                )}

                                                {!organization.isMine && !empty && semiEmpty && (
                                                    <SemiEmptyPlaceholder followed={organization.followed} orgId={organization.id} />
                                                )}

                                                {(organization.posts && organization.posts.length > 0) && (
                                                    <>
                                                        {organization.posts.map((post, i) => {
                                                            if (post.pinned === true) {
                                                                return <PostCard key={'post_' + i} orgId={organization.id} item={post} pinned={true} />;
                                                            } else {
                                                                return null;
                                                            }
                                                        })}
                                                        {organization.posts.map((post, i) => {
                                                            if (post.pinned === true) {
                                                                return null;
                                                            } else {
                                                                return <PostCard key={'post_' + i} orgId={organization.id} item={post} />;
                                                            }
                                                        })}
                                                    </>
                                                )}

                                                {(organization.developmentOportunities && organization.developmentOportunities.length > 0) && (
                                                    organization.developmentOportunities.map((devop) => (
                                                        <DevelopmentOportunityShort key={'do_' + devop.id} orgId={organization.id} item={devop} />
                                                    ))
                                                )}

                                                {(organization.acquisitionRequests && organization.acquisitionRequests.length > 0) && (
                                                    organization.acquisitionRequests.map((devop) => (
                                                        <AcquizitionRequestShort key={'ar_' + devop.id} orgId={organization.id} item={devop} />
                                                    ))
                                                )}
                                            </XVertical>
                                        </XVertical>

                                        <XVertical maxWidth={422} flexShrink={0}>
                                            {((organization.contacts || []).length > 0 || organization.website || organization.facebook || organization.linkedin || organization.twitter) && (
                                                <XCardStyled padding={18} paddingBottom={20}>
                                                    <XVertical separator={9}>
                                                        {(organization.contacts || []).length > 0 && (
                                                            <>
                                                                <Title>{TextOrganizationProfile.additionalInfoContacts}</Title>
                                                                <XVertical separator={8}>
                                                                    {(organization.contacts || []).filter(p => !!(p)).map((contact, i) => {
                                                                        return (
                                                                            <XHorizontal
                                                                                key={i}
                                                                                separator={10}
                                                                                alignItems="center"
                                                                            >
                                                                                <XAvatar cloudImageUuid={contact.photo || undefined} size="medium" />
                                                                                <XVertical separator={1}>
                                                                                    <XHorizontal separator={5} alignItems="center">
                                                                                        <Title>{contact.name}</Title>
                                                                                        {contact.phone && <ContactLink href={'tel:' + contact.phone} target="_blank"><ContactPhoneIc width={15} height={15} /></ContactLink>}
                                                                                        {contact.email && <ContactLink href={'mailto:' + contact.email} target="_blank"><ContactEmailIc width={15} height={15} /></ContactLink>}
                                                                                        {contact.link && <ContactLink href={contact.link.startsWith('http') ? contact.link : 'https://' + contact.link} target="_blank"><ContactLinkedInIc width={15} height={15} /></ContactLink>}
                                                                                    </XHorizontal>
                                                                                    <Title opacity={0.8}>{contact.position}</Title>
                                                                                </XVertical>
                                                                            </XHorizontal>
                                                                        );
                                                                    })}
                                                                </XVertical>
                                                            </>
                                                        )}

                                                        {(organization.website || organization.facebook || organization.twitter || organization.linkedin) && (
                                                            <SocialLinksWrapper topBorder={(organization.contacts || []).length > 0}>
                                                                {organization.website && <SocialLink href={organization.website}>{TextOrganizationProfile.additionalInfoWebsite}<XIcon icon="launch" /></SocialLink>}
                                                                {organization.facebook && <SocialLinkImg className="fb" href={organization.facebook} />}
                                                                {organization.twitter && <SocialLinkImg className="tw" href={organization.twitter} />}
                                                                {organization.linkedin && <SocialLinkImg className="li" href={organization.linkedin} />}
                                                            </SocialLinksWrapper>
                                                        )}

                                                    </XVertical>
                                                </XCardStyled>
                                            )}
                                            {organization.interests && (
                                                <XCardStyled padding={18}>
                                                    <XVertical separator={3}>
                                                        <Title>Intrerests</Title>
                                                        <TagWrapper>
                                                            {organization.interests.map((val, i) => (
                                                                <Tag key={i + val}>{val}</Tag>
                                                            ))}
                                                        </TagWrapper>
                                                    </XVertical>
                                                </XCardStyled>
                                            )}
                                            <XWithRole role={['org-' + organization.id + '-admin']}>
                                                <XVertical separator={9}>
                                                    {!((organization.contacts || []).length || organization.website || organization.facebook || organization.linkedin || organization.twitter) && (
                                                        <XCardStyled padding={18}>
                                                            <XVertical>
                                                                {!(organization.contacts || []).length && <ContactPlaceholder />}
                                                                {!(organization.website || organization.facebook || organization.linkedin || organization.twitter) && <SocialPlaceholder />}
                                                            </XVertical>
                                                        </XCardStyled>
                                                    )}
                                                    {!(organization.interests || []).length && (
                                                        <InterestsPlaceholder />
                                                    )}
                                                </XVertical>
                                            </XWithRole>
                                        </XVertical>
                                    </XHorizontal>
                                )}

                                {((currentPath === lsitingsPath) || listingsPathReg.test(currentPath.replace('/o/' + props.data.organization.id + '/listings#', ''))) && (
                                    <>
                                        <XWithRole role={['org-' + props.data.organization.id + '-admin']}>
                                            <DOARListingPlaceholder />
                                        </XWithRole>
                                        {(organization.listingsAll && organization.listingsAll.length > 0) && (
                                            organization.listingsAll.map((l) => (
                                                l.type === 'development_opportunity'
                                                    ? <DevelopmentOportunityFull key={'do_' + l.id} orgId={organization.id} item={l} showType={true} />
                                                    : < AcquizitionRequestFull key={'do_' + l.id} orgId={organization.id} item={l} showType={true} />
                                            ))
                                        )}
                                    </>
                                )}

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
                            </MainContent>
                        </MainContentWrapper>
                    </Root>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));
