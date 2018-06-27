import '../../init';
import '../../../globals';
import * as React from 'react';
import Glamorous from 'glamorous';
import { withApp } from '../../../components/withApp';
import { withOrganization } from '../../../api/withOrganization';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCard } from 'openland-x/XCard';
import { XAvatar } from 'openland-x/XAvatar';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XSwitcher } from 'openland-x/XSwitcher';
import { XLink } from 'openland-x/XLink';
import { XDocumentHead } from 'openland-x-routing/XDocumentHead';
import { Scaffold } from '../../../components/Scaffold';
import { ContactPerson } from '../../../utils/OrganizationProfileFields';
import { XButton } from 'openland-x/XButton';
import { withQueryLoader } from '../../../components/withQueryLoader';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XStreetViewModalPreview } from 'openland-x-map/XStreetViewModalPreview';
import { XModalForm } from 'openland-x-modal/XModalForm2';
import { XFormLoadingContent } from 'openland-x-forms/XFormLoadingContent';
import { XInput } from 'openland-x/XInput';
import { XLocationPickerModal } from 'openland-x-map/XLocationPickerModal';
import { ImageRefInput } from 'openland-api/Types';
import { XSelect } from 'openland-x/XSelect';
import { XAvatarUpload } from 'openland-x/XAvatarUpload';
import { XFormField, XFormFieldTitle } from 'openland-x-forms/XFormField';
import { XTextArea } from 'openland-x/XTextArea';
import { XTitle } from 'openland-x/XTitle';
import { XOverflow } from '../../../components/Incubator/XOverflow';
import { XStoreContext } from 'openland-x-store/XStoreContext';
import { DateFormater } from 'openland-x-format/XDate';
import { OverviewPlaceholder, DOAROverviewPlaceholder, DOARListingPlaceholder, AboutPlaceholder, SocialPlaceholder, ContactPlaceholder, LocationPlaceholder, AvatartPlaceholder } from './placeholders';
import { XIcon } from 'openland-x/XIcon';
import { sanitizeIamgeRef } from '../../../utils/sanitizer';
import PlaceholderAR from './img_placeholder_ar.svg';
import { XStreetViewModal } from 'openland-x-map/XStreetViewModal';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';

const Root = Glamorous(XVertical)({
    backgroundColor: '#f9fafb',
    paddingBottom: 80
});

const MainContent = Glamorous(XVertical)({
    backgroundColor: '#f9fafb',
    padding: '0 184px',
    '@media (max-width: 1200px)': {
        padding: '0 40px',
    }
});

const Header = Glamorous.div({
    display: 'flex',
    backgroundColor: '#fff',
    borderBottom: '1px solid rgba(220, 222, 228, 0.4)',
    padding: '0 184px',
    '@media (max-width: 1200px)': {
        padding: '0 40px',
    }
});

interface XHorizontalStyledProps {
    borderRight?: boolean;
    borderBottom?: boolean;
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    marginTop?: number;
    marginBottom?: number;
    maxwidth?: string | number;
}

const XHorizontalStyled = Glamorous(XHorizontal)<XHorizontalStyledProps>((props) => ({
    borderRight: props.borderRight ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    borderBottom: props.borderBottom ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    padding: props.padding,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    maxWidth: props.maxwidth
}));

interface XVerticalStyledProps {
    borderRight?: boolean;
    borderBottom?: boolean;
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    marginTop?: number;
    marginBottom?: number;
    maxwidth?: string | number;
}

const XVerticalStyled = Glamorous(XVertical)<XVerticalStyledProps>((props) => ({
    borderRight: props.borderRight ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    borderBottom: props.borderBottom ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    padding: props.padding,
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom,
    marginTop: props.marginTop,
    marginBottom: props.marginBottom,
    maxWidth: props.maxwidth
}));

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
    padding: '0 5px',
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
    textOverflow: 'ellipsis'
});

const Title = Glamorous.div<{ small?: boolean, marginBottom?: number, marginLeft?: number, marginRight?: number }>((props) => ({
    fontSize: props.small ? 15 : 18,
    fontWeight: 500,
    lineHeight: props.small ? 1.33 : 1.11,
    color: '#334562',
    letterSpacing: props.small ? -0.1 : -0.4,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight
}));

const XCardStyled = Glamorous(XCard)<{ padding?: number, paddingTop?: number, paddingBottom?: number }>((props) => ({
    borderRadius: 5,
    padding: props.padding !== undefined ? props.padding : 24,
    paddingTop: props.paddingTop,
    paddingBottom: props.paddingBottom
}));

interface TextProps {
    opacity?: number;
    bold?: boolean;
    fontWeight?: any;
    letterSpacing?: number;
    lineHeight?: number;
    upperCase?: boolean;
    marginBottom?: number;
    marginTop?: number;
    small?: boolean;
}

const Text = Glamorous.div<TextProps>((props) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: props.small ? 14 : 15,
    lineHeight: props.lineHeight !== undefined ? props.lineHeight : props.small ? 1.43 : 1.33,
    color: '#334562',
    opacity: props.opacity,
    fontWeight: props.fontWeight !== undefined ? props.fontWeight : props.bold ? 500 : undefined,
    letterSpacing: props.letterSpacing !== undefined ? props.letterSpacing : props.bold ? -0.3 : undefined,
    textTransform: props.upperCase ? 'capitalize' : undefined,
    marginBottom: props.marginBottom,
    marginTop: props.marginTop
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
    <XHorizontalStyled
        paddingTop={12}
        paddingBottom={12}
        paddingLeft={18}
        paddingRight={18}
    >
        <XAvatar cloudImageUuid={props.contact.photo || undefined} size="small" />
        <div>
            <Text bold={true}>{props.contact.name}</Text>
            <Text opacity={0.8}>{props.contact.role}</Text>
            <Text opacity={0.5}>{props.contact.phone}</Text>
            <Text opacity={0.5}>{props.contact.email}</Text>
            <Text opacity={0.5}>{props.contact.link}</Text>
        </div>
    </XHorizontalStyled>
);

const ContactPersons = (props: { contacts: ContactPerson[] }) => (
    <>
        {!props.contacts && 'No contacts'}
        {props.contacts && props.contacts.map((person, index) => <ContactPersonComponent key={index + '_' + person.name} contact={person} index={index} />)}
    </>
);

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

const OpportunitiesWrapper = Glamorous.div<{ marginBottom?: number }>((props) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: props.marginBottom,
    '&:first-child': {
        '& > div': {
            '&:first-child': {
                paddingTop: 24
            },
            '&:last-child': {
                paddingTop: 16
            }
        }
    },
    '&:last-child': {
        '& > div': {
            '&:first-child': {
                paddingBottom: 24
            },
            '&:last-child': {
                paddingBottom: 16
            }
        }
    },
}));

interface OpportunitiesTextWrapperProps {
    width?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
}

const OpportunitiesTextWrapper = Glamorous.div<OpportunitiesTextWrapperProps>((props) => ({
    width: props.width ? props.width : 226,
    height: '100%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop !== undefined ? props.paddingTop : 10,
    paddingBottom: props.paddingBottom !== undefined ? props.paddingBottom : undefined
}));

const OpportunitiesValueWrapper = Glamorous.div<{ bordered?: boolean }>((props) => ({
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
    padding: '0 25px',
    borderLeft: props.bordered ? '1px solid rgba(220, 222, 228, 0.45)' : undefined
}));

const OpportunitiesValue = Glamorous.div({
    height: 30,
    borderRadius: 4,
    backgroundColor: '#edf3fe',
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.14,
    color: '#4285f4',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 9px',
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
});

interface DevelopmentOportunityProps {
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

interface TagRowMapProps {
    title: string;
    items: string[];
    bordered?: boolean;
    titleWidth?: number;
    paddingLeft?: number;
    titlePaddingTop?: number;
}

const TagRowMap = (props: TagRowMapProps) => (
    <OpportunitiesWrapper>
        <OpportunitiesTextWrapper width={props.titleWidth} paddingLeft={props.paddingLeft} paddingTop={props.titlePaddingTop}>
            <Text bold={true}>{props.title}</Text>
        </OpportunitiesTextWrapper>
        <OpportunitiesValueWrapper bordered={props.bordered}>
            {props.items.map((s, k) => (
                <OpportunitiesValue key={k + '_' + s}>
                    {s}
                </OpportunitiesValue>
            ))}
        </OpportunitiesValueWrapper>
    </OpportunitiesWrapper>
);

interface TagRowProps {
    children?: any;
    title: string;
    text?: string;
    bordered?: boolean;
    titleWidth?: number;
    isTextStyle?: boolean;
    isTagStyle?: boolean;
    paddingLeft?: number;
    titlePaddingTop?: number;
    titlePaddingBottom?: number;
    marginBottom?: number;
}

const TagRow = (props: TagRowProps) => (
    <OpportunitiesWrapper marginBottom={props.marginBottom}>
        <OpportunitiesTextWrapper width={props.titleWidth} paddingLeft={props.paddingLeft} paddingTop={props.titlePaddingTop} paddingBottom={props.titlePaddingBottom}>
            <Text bold={true}>{props.title}</Text>
        </OpportunitiesTextWrapper>
        <OpportunitiesValueWrapper bordered={props.bordered}>
            {props.isTextStyle && (
                <Text lineHeight={1.53}>
                    {props.text}
                </Text>
            )}
            {props.isTagStyle && (
                <OpportunitiesValue>
                    {props.text}
                </OpportunitiesValue>
            )}
            {props.children}
        </OpportunitiesValueWrapper>
    </OpportunitiesWrapper>
);

const DevelopmentOportunityCard = Glamorous.div<{ border?: boolean }>((props) => ({
    border: props.border ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    borderRadius: 4,
    backgroundColor: '#fff'
}));

const Lock = Glamorous(XIcon)({
    width: 14,
    height: 14,
    fontSize: 16,
    marginRight: 8,
    marginTop: -1
});

const AdditionalLink = Glamorous(XLink)({
    borderRadius: 4,
    backgroundColor: 'rgba(244, 245, 247, 0.7)',
    display: 'flex',
    alignItems: 'center',
    color: '#334562',
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    letterSpacing: -0.2,
    padding: '6px 10px',
    marginRight: 8,
    marginTop: 5,
    marginBottom: 5,
    '& > span': {
        marginRight: 8
    },
    '& > i': {
        fontSize: 20,
        color: '#bcc3cc'
    },
    '&:hover': {
        backgroundColor: 'rgb(236, 237, 240)',
        color: '#334562',
    }
});

const ListingTitleWrapper = Glamorous.div({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 'calc(100% - 48px)'
});

const ListingTitle = Glamorous.div({
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.5,
    color: '#334562',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 'calc(100% - 120px)'
});

const ClickableXStreetViewModalPreview = Glamorous.div({
    cursor: 'pointer'
});

class DevelopmentOportunity extends React.Component<{ item: DevelopmentOportunityProps, orgId: string, full?: boolean, showType?: boolean, isSoloComponent?: boolean }> {
    render() {

        const { item, full } = this.props;

        const FullContent = (
            <XVerticalStyled marginTop={10}>
                <div>
                    {item.area && (
                        <TagRow title={TextOrganizationProfile.listingDoTagRowTitileArea} titleWidth={150} marginBottom={10}>
                            <Text marginTop={5} fontWeight={600}>{`${item.area} ft²`}</Text>
                        </TagRow>
                    )}
                    {item.price && (
                        <TagRow title={TextOrganizationProfile.listingDoTagRowTitilePrice} titleWidth={150} marginBottom={18}>
                            <Text marginTop={5} fontWeight={600}>{`$${item.price}`}</Text>
                        </TagRow>
                    )}
                    {item.summary && (
                        <TagRow title={TextOrganizationProfile.listingDoTagRowTitileSummary} text={item.summary} titleWidth={150} isTextStyle={true} titlePaddingTop={0} titlePaddingBottom={0} marginBottom={14} />
                    )}
                    {item.availability && (
                        <TagRow title={TextOrganizationProfile.listingDoTagRowTitileAvailability} text={item.availability} titleWidth={150} isTextStyle={true} titlePaddingTop={0} titlePaddingBottom={0} marginBottom={14} />
                    )}
                    {item.dealType && (
                        <TagRowMap title={TextOrganizationProfile.listingDoTagRowTitileDealType} items={item.dealType} titleWidth={150} />
                    )}
                    {item.shapeAndForm && (
                        <TagRowMap title={TextOrganizationProfile.listingDoTagRowTitileShapeAndForm} items={item.shapeAndForm} titleWidth={150} />
                    )}
                    {item.currentUse && (
                        <TagRowMap title={TextOrganizationProfile.listingDoTagRowTitileCurrentUse} items={item.currentUse} titleWidth={150} />
                    )}
                    {item.goodFitFor && (
                        <TagRowMap title={TextOrganizationProfile.listingDoTagRowTitileGoodFitFor} items={item.goodFitFor} titleWidth={150} />
                    )}
                    {item.specialAttributes && (
                        <TagRowMap title={TextOrganizationProfile.listingDoTagRowTitileSpecialAttributes} items={item.specialAttributes} titleWidth={150} />
                    )}
                    {item.additionalLinks!!.length > 0 && (
                        <OpportunitiesWrapper>
                            <OpportunitiesTextWrapper width={150}>
                                <Text bold={true}>Additional links</Text>
                            </OpportunitiesTextWrapper>
                            <OpportunitiesValueWrapper>
                                {item.additionalLinks!!.map((s, k) => (
                                    <AdditionalLink key={k + '_' + s} href={s.url}>
                                        <span>{s.text}</span>
                                        <XIcon icon="launch" />
                                    </AdditionalLink>
                                ))}
                            </OpportunitiesValueWrapper>
                        </OpportunitiesWrapper>
                    )}
                </div>
            </XVerticalStyled>
        );

        return (
            <DevelopmentOportunityCard border={this.props.isSoloComponent}>
                <XHorizontalStyled justifyContent="space-between" separator={12} padding={24} paddingBottom={full ? 0 : 24}>
                    {item.location && (
                        <XStreetViewModal
                            location={{ latitude: item.location!.lat, longitude: item.location!.lon }}
                            target={<ClickableXStreetViewModalPreview><XStreetViewModalPreview location={{ latitude: item.location!.lat, longitude: item.location!.lon }} width={full ? 160 : 133} height={full ? 120 : 100} /></ClickableXStreetViewModalPreview>}
                        />
                    )}
                    {!item.location && (
                        <img src={'/static/img/icons/organization/profile/img_placeholder_do.svg'} style={{ width: full ? 160 : 133, height: full ? 120 : 100 }} />
                    )}
                    <XHorizontalStyled flexGrow={1} maxwidth={full ? 'calc(100% - 184px)' : 'calc(100% - 157px)'}>
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%' }}>
                            <XHorizontalStyled justifyContent="space-between" alignItems="center" marginBottom={full ? 8 : 4}>
                                <ListingTitleWrapper>
                                    <ListingTitle>{item.name}</ListingTitle>
                                    <Text opacity={0.5} small={true} marginBottom={-1}>{DateFormater(item.updatedAt)}</Text>
                                </ListingTitleWrapper>
                                <XWithRole role={['org-' + this.props.orgId + '-admin']}>
                                    <XOverflow
                                        marginRight={item.location ? 92 : 50}
                                        placement="bottom"
                                        content={(
                                            <>
                                                <XOverflow.Item query={{ field: 'editListing', value: item.id }}>{TextOrganizationProfile.listingDoOwerflowEdit}</XOverflow.Item>
                                                {item.locationTitle && < XOverflow.Item href={`https://www.google.com/maps/place/${item.locationTitle}`}>{TextOrganizationProfile.listingDoOwerflowGoogleMaps}</XOverflow.Item>}
                                                {(!item.locationTitle && item.location) && < XOverflow.Item href={`https://www.google.com/maps/place/${item.location.lat},${item.location.lon}`}>{TextOrganizationProfile.listingDoOwerflowGoogleMaps}</XOverflow.Item>}
                                                {item.location && < XOverflow.Item href={`https://www.google.com/maps?cbll=${item.location.lat},${item.location.lon}&cbp=12,90,0,0,5&layer=c`}>{TextOrganizationProfile.listingDoOwerflowStreetView}</XOverflow.Item>}
                                                <XOverflow.Item style="danger" query={{ field: 'deleteListing', value: item.id }}>{TextOrganizationProfile.listingDoOwerflowDelete}</XOverflow.Item>
                                            </>
                                        )}
                                    />
                                </XWithRole>
                            </XHorizontalStyled>
                            {this.props.showType && <Text opacity={0.5}>{TextOrganizationProfile.listingDoTagRowTitileDealType}</Text>}
                            {item.locationTitle && <Text opacity={0.5} bold={true}>{item.locationTitle}</Text>}
                            {(!full && !item.location) && <Text opacity={0.5} marginTop={5} bold={true}><Lock icon="locked" />{TextOrganizationProfile.listingDoLocked}</Text>}
                            {(item.area || item.price) && (
                                <XHorizontal separator="large" flexGrow={full ? 1 : undefined} alignItems={full ? 'flex-end' : undefined}>
                                    {!full && (
                                        <>
                                            {item.area && (
                                                <Text marginTop={10} bold={true} opacity={0.7} lineHeight={1.53}>{`Area: ${item.area} ft²`}</Text>
                                            )}
                                            {item.price && (
                                                <Text marginTop={10} bold={true} opacity={0.7} lineHeight={1.53}>{`Price: $${item.price}`}</Text>
                                            )}
                                        </>
                                    )}
                                </XHorizontal>
                            )}

                            {full && FullContent}
                        </div>
                    </XHorizontalStyled>
                </XHorizontalStyled>
            </DevelopmentOportunityCard >
        );
    }
}

const AcquizitionRequestPhoto = Glamorous(XCloudImage)({
    borderRadius: 4
});

interface AcquizitionRequestProps {
    name: string;
    id: string;
    photo: ImageRefInput | null;
    summary: string | null;
    specialAttributes: string[] | null;
    status: string | null;
    updatedAt: string;
    shortDescription: string | null;
    areaRange: {
        from: number | null;
        to: number | null;
    } | null;
    geographies: string[] | null;
    landUse: string[] | null;
    unitCapacity: string[] | null;
}

const Thousander = (num: number) => (
    Math.round(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
);

class AcquizitionRequest extends React.Component<{ item: AcquizitionRequestProps, orgId: string, full?: boolean, showType?: boolean, isSoloComponent?: boolean }> {

    render() {

        const { item, full } = this.props;

        const FullContent = (
            <XVerticalStyled marginTop={14}>
                <div>
                    {item.summary && (
                        <TagRow title={TextOrganizationProfile.listingArTagRowSummary} text={item.summary} titleWidth={150} isTextStyle={true} titlePaddingTop={0} marginBottom={14} />
                    )}
                    {item.areaRange && (
                        <TagRow title={TextOrganizationProfile.listingArTagRowAreaRange} text={`${Thousander(item.areaRange.from!!)} - ${Thousander(item.areaRange.to!!)} ft²`} titleWidth={150} isTagStyle={true} />
                    )}
                    {item.geographies && (
                        <TagRowMap title={TextOrganizationProfile.listingArTagRowGeographies} items={item.geographies} titleWidth={150} />
                    )}
                    {item.landUse && (
                        <TagRowMap title={TextOrganizationProfile.listingArTagRowLandUse} items={item.landUse} titleWidth={150} />
                    )}
                    {item.specialAttributes && (
                        <TagRowMap title={TextOrganizationProfile.listingArTagRowSpecialAttributes} items={item.specialAttributes} titleWidth={150} />
                    )}
                    {item.unitCapacity && (
                        <TagRowMap title={TextOrganizationProfile.listingArTagRowUnitCapacity} items={item.unitCapacity} titleWidth={150} />
                    )}
                </div>
            </XVerticalStyled>
        );

        return (
            <DevelopmentOportunityCard border={this.props.isSoloComponent}>
                <XHorizontalStyled justifyContent="space-between" separator={12} padding={24}>

                    {item.photo && (
                        <AcquizitionRequestPhoto resize="fill" photoRef={item.photo} width={full ? 160 : 133} height={full ? 120 : 100} />
                    )}
                    {!item.photo && (
                        <PlaceholderAR style={{ width: full ? 160 : 133, height: full ? 120 : 100 }} />
                    )}
                    <XHorizontalStyled flexGrow={1} maxwidth={full ? 'calc(100% - 175px)' : 'calc(100% - 148px)'}>
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%' }}>
                            <XHorizontalStyled justifyContent="space-between" alignItems="center" marginBottom={4}>
                                <ListingTitleWrapper>
                                    <ListingTitle>{item.name}</ListingTitle>
                                    <Text opacity={0.5} small={true} marginBottom={-1}>{DateFormater(item.updatedAt)}</Text>
                                </ListingTitleWrapper>
                                <XWithRole role={['org-' + this.props.orgId + '-admin']}>
                                    <XOverflow
                                        marginRight={50}
                                        placement="bottom"
                                        content={(
                                            <>
                                                <XOverflow.Item query={{ field: 'editListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowEdit}</XOverflow.Item>
                                                <XOverflow.Item style="danger" query={{ field: 'deleteListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowDelete}</XOverflow.Item>
                                            </>
                                        )}
                                    />
                                </XWithRole>
                            </XHorizontalStyled>
                            {this.props.showType && <Text opacity={0.5}>{TextOrganizationProfile.listingArType}</Text>}
                            <Text opacity={0.5} bold={true}>{item.shortDescription}</Text>
                            {(!full && item.areaRange) && <Text opacity={0.7} bold={true} marginTop={10} lineHeight={1.53}>{`Area range: ${Thousander(item.areaRange.from!!)} - ${Thousander(item.areaRange.to!!)} ft²`}</Text>}

                            {(!full && !item.areaRange) && <Text opacity={0.5} bold={true} marginTop={10}> <Lock icon="locked" />{TextOrganizationProfile.listingArLocked}</Text>}

                            {full && FullContent}
                        </div>
                    </XHorizontalStyled>
                </XHorizontalStyled>
            </DevelopmentOportunityCard>
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
    marginTop: 20
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

export default withApp('Organization profile', 'viewer', withOrganization(withQueryLoader((props) => {

    let editDoTarget = props.data.organization.developmentOportunities!!.filter((devOp) => devOp.id === props.router.query.editListing)[0];
    let editArTarget = props.data.organization.acquisitionRequests!!.filter((devOp) => devOp.id === props.router.query.editListing)[0];
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
                additionalLinks: target.additionalLinks || []
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
                }
            }
        });
    };

    let rootPath = '/o/' + props.data.organization.id;
    let lsitingsPath = '/o/' + props.data.organization.id + '/listings';
    let lsitingsAllPath = '/o/' + props.data.organization.id + '/listings/all';

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
            <XDocumentHead title={TextOrganizationProfile.pageTitle} />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false} >
                    <Root>
                        <Header>
                            <AvatarWrapper>
                                {hasLogo && (
                                    <Avatar cloudImageUuid={organization.photo!!} size="large" style="organization" />
                                )}
                                {!hasLogo && (
                                    <>
                                        <XWithRole role={['org-' + organization.id + '-admin']} >
                                            <AvatartPlaceholder />
                                        </XWithRole>
                                        <XWithRole role={['org-' + organization.id + '-admin']} negate={true}>
                                            <Avatar cloudImageUuid={organization.photo!!} size="large" style="organization" />
                                        </XWithRole>
                                    </>
                                )}
                            </AvatarWrapper>

                            <XVerticalStyled flexShrink={0} flexGrow={1} separator="none" paddingTop={35}>
                                <OrganizationName>{organization.name}</OrganizationName>
                                <div style={{ marginTop: 5 }}>
                                    {organization.location && <Text opacity={0.5} bold={true}>{organization.location}</Text>}
                                    <XWithRole role={['org-' + organization.id + '-admin']}>
                                        {!organization.location && <LocationPlaceholder />}
                                    </XWithRole>
                                </div>
                                <div style={{ marginTop: 16 }}>
                                    <SwitcherWrapper flatStyle={true} height={60} smallText={true}>
                                        <Switcher path={rootPath}>{TextOrganizationProfile.headerTabOverview}</Switcher>
                                        <Switcher path={lsitingsPath}>{TextOrganizationProfile.headerTabListings + ' (' + (((organization.developmentOportunities && organization.developmentOportunities.length) || 0) + ((organization.acquisitionRequests && organization.acquisitionRequests.length) || 0)) + ')'}</Switcher>
                                        {/* <Switcher path={lsitingsAllPath}>{'All Listings (' + ((organization.listingsAll && organization.listingsAll.length) || 0) + ')'}</Switcher> */}
                                    </SwitcherWrapper>
                                </div >
                            </XVerticalStyled>
                            <XHorizontalStyled paddingTop={20}>
                                {!organization.isMine && (
                                    <XButton
                                        style={organization!!.followed ? 'primary' : 'electric'}
                                        text={organization!!.followed ? TextOrganizationProfile.headerButtonFollowUnFollow : TextOrganizationProfile.headerButtonFollowFollow}
                                        action={async () => {
                                            await props.followOrganization({ variables: { follow: !organization!!.followed } });
                                        }}
                                    />
                                )}
                                <XWithRole role={['org-' + organization.id + '-admin']}>
                                    <XButton
                                        text={TextOrganizationProfile.headerButtonEdit}
                                        path="/settings/organization"
                                    />
                                    <XOverflow
                                        placement="bottom"
                                        width={220}
                                        marginRight={108}
                                        target={<XButton style="primary" text={TextOrganizationProfile.headerButtonAddListing} />}
                                        content={
                                            <>
                                                <XOverflow.Item query={{ field: 'addListing', value: 'DO' }}>{TextOrganizationProfile.headerButtonAddListingDO}</XOverflow.Item>
                                                <XOverflow.Item query={{ field: 'addListing', value: 'AR' }}>{TextOrganizationProfile.headerButtonAddListingAR}</XOverflow.Item>
                                            </>
                                        }
                                    />

                                </XWithRole>
                            </XHorizontalStyled>
                        </Header>

                        <MainContent>

                            <XHorizontal>
                                <XVerticalStyled flexGrow={1} maxwidth={props.router.path === rootPath ? 'calc(100% - 286px)' : '100%'}>
                                    <XWithRole role={['org-' + props.data.organization.id + '-admin']}>
                                        {props.router.path === rootPath && (
                                            <>
                                                <OverviewPlaceholder />
                                                <DOAROverviewPlaceholder />
                                            </>
                                        )}
                                    </XWithRole>
                                    {props.router.path === rootPath && (
                                        <>

                                            {(organization.organizationType || organization.lookingFor || organization.geographies) && (
                                                <XCardStyled padding={0}>
                                                    {organization.organizationType && (
                                                        <TagRowMap title={TextOrganizationProfile.overviewOrganizationTypeTitle} items={organization.organizationType} bordered={true} paddingLeft={24} />
                                                    )}
                                                    {organization.lookingFor && (
                                                        <TagRowMap title={TextOrganizationProfile.overviewOrganizationLookingForTitle} items={organization.lookingFor} bordered={true} paddingLeft={24} />
                                                    )}
                                                    {organization.geographies && (
                                                        <TagRowMap title={TextOrganizationProfile.overviewOrganizationGeographiesTitle} items={organization.geographies} bordered={true} paddingLeft={24} />
                                                    )}

                                                </XCardStyled>
                                            )}

                                            <XCardStyled padding={0}>
                                                <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                                    <Title marginBottom={24}>{TextOrganizationProfile.overviewDOTitle}</Title>
                                                </XVerticalStyled>

                                                {(organization.doShapeAndForm || organization.doCurrentUse || organization.doGoodFitFor || organization.doSpecialAttributes || organization.doAvailability) && (
                                                    <div style={{ borderBottom: '1px solid rgba(220, 222, 228, 0.45)' }}>
                                                        {organization.doShapeAndForm && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewDOTagRowShapeAndFormTitle} items={organization.doShapeAndForm} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.doCurrentUse && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewDOTagRowCurrentUseTitle} items={organization.doCurrentUse} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.doGoodFitFor && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewDOTagRowGoodFitForTitle} items={organization.doGoodFitFor} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.doSpecialAttributes && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewDOTagRowSpecialAttributesTitle} items={organization.doSpecialAttributes} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.doAvailability && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewDOTagRowAvailabilityTitle} items={organization.doAvailability} bordered={true} paddingLeft={24} />
                                                        )}

                                                    </div>
                                                )}

                                                {organization.developmentOportunities && (
                                                    organization.developmentOportunities.map((devop, i) => (
                                                        cardFilter(() => <DevelopmentOportunity key={'do_' + devop.id} orgId={organization.id} item={devop} />, cardCountAR)
                                                    ))
                                                )}
                                                <XHorizontal justifyContent="center" alignItems="center" separator="none">
                                                    <ShowListingLink path={lsitingsPath}>
                                                        View all ({(organization.developmentOportunities && organization.developmentOportunities.length) || 0})
                                                    </ShowListingLink>
                                                    <ViewAllIcon icon="keyboard_arrow_right" />
                                                </XHorizontal>
                                            </XCardStyled>

                                            <XCardStyled padding={0}>
                                                <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                                    <Title marginBottom={24}>{TextOrganizationProfile.overviewArTitle}</Title>
                                                </XVerticalStyled>

                                                {(organization.arGeographies || organization.arAreaRange || organization.arHeightLimit || organization.arLandUse || organization.arSpecialAttributes || organization.arActivityStatus || organization.arAquisitionBudget || organization.arAquisitionRate || organization.arClosingTime) && (
                                                    <div style={{ borderBottom: '1px solid rgba(220, 222, 228, 0.45)' }}>
                                                        {organization.arGeographies && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowGeographiesTitle} items={organization.arGeographies} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.arAreaRange && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowAreaRangeTitle} items={organization.arAreaRange} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.arHeightLimit && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowHeightLimitTitle} items={organization.arHeightLimit} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.arLandUse && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowLandUseTitle} items={organization.arLandUse} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.arSpecialAttributes && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowSpecialAttributesTitle} items={organization.arSpecialAttributes} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.arActivityStatus && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowActivityStatusTitle} items={organization.arActivityStatus} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.arAquisitionBudget && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowAquisitionBudgetTitle} items={organization.arAquisitionBudget} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.arAquisitionRate && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowAquisitionRateTitle} items={organization.arAquisitionRate} bordered={true} paddingLeft={24} />
                                                        )}
                                                        {organization.arClosingTime && (
                                                            <TagRowMap title={TextOrganizationProfile.overviewArTagRowClosingTimeTitle} items={organization.arClosingTime} bordered={true} paddingLeft={24} />
                                                        )}
                                                    </div>
                                                )}

                                                {organization.acquisitionRequests && (
                                                    organization.acquisitionRequests.map((devop, i) => (
                                                        cardFilter(() => <AcquizitionRequest key={'do_' + devop.id} orgId={organization.id} item={devop} />, cardCountDO)
                                                    ))
                                                )}
                                                <XHorizontal justifyContent="center" alignItems="center" separator="none">
                                                    <ShowListingLink path={lsitingsPath + '?listingType=ar'}>
                                                        View all ({(organization.acquisitionRequests && organization.acquisitionRequests.length) || 0})
                                                    </ShowListingLink>
                                                    <ViewAllIcon icon="keyboard_arrow_right" />
                                                </XHorizontal>
                                            </XCardStyled>
                                        </>
                                    )}

                                    {props.router.path === lsitingsPath && (
                                        <>
                                            <DOARListingPlaceholder />
                                            <XCardStyled padding={0}>
                                                <XVerticalStyled flexGrow={1} padding={0} paddingLeft={24} paddingRight={24}>
                                                    <SwitcherWrapper flatStyle={true} height={66}>
                                                        <Switcher query={{ field: 'listingType' }}>{TextOrganizationProfile.listingsDoTabTitle}</Switcher>
                                                        <Switcher query={{ field: 'listingType', value: 'ar' }}>{TextOrganizationProfile.listingsArTabTitle}</Switcher>

                                                    </SwitcherWrapper>
                                                </XVerticalStyled>
                                            </XCardStyled>
                                            <XVertical>
                                                {props.router.path === lsitingsPath && props.router.query.listingType === undefined && organization && organization.developmentOportunities && (
                                                    organization.developmentOportunities.map((devop, i) => <DevelopmentOportunity key={'do_' + i} orgId={organization.id} item={devop} full={true} isSoloComponent={true} />)
                                                )}
                                                {props.router.path === lsitingsPath && props.router.query.listingType === 'ar' && organization && organization.acquisitionRequests && (
                                                    organization.acquisitionRequests.map((devop, i) => <AcquizitionRequest key={'do_' + i} orgId={organization.id} item={devop} full={true} isSoloComponent={true} />)
                                                )}
                                            </XVertical>
                                        </>
                                    )}

                                    {props.router.path === lsitingsAllPath && (
                                        <>
                                            <DOARListingPlaceholder />
                                            <XVertical>
                                                {props.router.path === lsitingsAllPath && organization && organization.listingsAll && (
                                                    organization.listingsAll.map((l, i) => l.type === 'development_opportunity' ? <DevelopmentOportunity key={'do_' + i} orgId={organization.id} item={l} full={true} showType={true} isSoloComponent={true} /> : < AcquizitionRequest key={'do_' + i} orgId={organization.id} item={l} full={true} showType={true} isSoloComponent={true} />)
                                                )}
                                                {props.router.path === lsitingsPath && props.router.query.listingType === 'ar' && organization && organization.acquisitionRequests && (
                                                    organization.acquisitionRequests.map((devop, i) => <AcquizitionRequest key={'do_' + i} orgId={organization.id} item={devop} full={true} isSoloComponent={true} />)
                                                )}
                                            </XVertical>
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
                                                        }
                                                    }
                                                });
                                            }}
                                            targetQuery="addListing"
                                        >
                                            <XFormLoadingContent>
                                                <XVertical>
                                                    {props.router.query.addListing === 'AR' && (
                                                        <XAvatarUpload field="input.photo" placeholder={{ add: 'Add listing photo', change: 'Change listing photo' }} />
                                                    )}

                                                    <XFormField title="Name" field="input.name" >
                                                        <XInput field="input.name" placeholder="Name" />
                                                    </XFormField>
                                                    {props.router.query.addListing === 'DO' && (
                                                        <>
                                                            <XFormField field="input.location" optional={true} title="Full adress">
                                                                <XLocationPickerModal field="input.location" />
                                                            </XFormField>

                                                            <XHorizontal>
                                                                <Field field="input.area" optional={true} title="Area">
                                                                    <XInput field="input.area" placeholder="Area" />
                                                                </Field>
                                                                <Field field="input.price" optional={true} title="Price">
                                                                    <XInput field="input.price" placeholder="Price" />
                                                                </Field>
                                                            </XHorizontal>

                                                            <XFormField field="input.availability" optional={true} title="Availability">
                                                                <XInput field="input.availability" placeholder="Availability" />
                                                            </XFormField>

                                                            <XFormField optional={true} title="Summary" field="fields.input.summary" >
                                                                <XTextArea valueStoreKey="fields.input.summary" placeholder="Summary" />
                                                            </XFormField>

                                                            <XTitle>Details</XTitle>
                                                            <XFormField field="input.dealType" optional={true} title="Deal Type">
                                                                <XSelect creatable={true} multi={true} field="input.dealType" placeholder="Deal Type" />
                                                            </XFormField>
                                                            <XFormField field="input.shapeAndForm" optional={true} title="Shape And Form">
                                                                <XSelect creatable={true} multi={true} field="input.shapeAndForm" placeholder="Shape And Form" />
                                                            </XFormField>
                                                            <XFormField field="input.currentUse" optional={true} title="Current Use">
                                                                <XSelect creatable={true} multi={true} field="input.currentUse" placeholder="Current Use" />
                                                            </XFormField>
                                                            <XFormField field="input.goodFitFor" optional={true} title="Good Fit For">
                                                                <XSelect creatable={true} multi={true} field="input.goodFitFor" placeholder="Good Fit For" />
                                                            </XFormField>
                                                            <XFormField field="input.specialAttributes" optional={true} title="Special attributes">
                                                                <XSelect creatable={true} multi={true} field="input.specialAttributes" placeholder="Special attributes" />
                                                            </XFormField>
                                                            <XTitle>Additional links</XTitle>
                                                            {linksElements}
                                                        </>
                                                    )}
                                                    {props.router.query.addListing === 'AR' && (
                                                        <>
                                                            <XFormField field="input.shortDescription" optional={true} title="Short description">
                                                                <XInput field="input.shortDescription" placeholder="Short description" />
                                                            </XFormField>

                                                            <XFormField optional={true} title="Summary" field="fields.input.summary">
                                                                <XTextArea valueStoreKey="fields.input.summary" placeholder="Summary" />
                                                            </XFormField>

                                                            <XTitle>Details</XTitle>

                                                            <XFormField field="input.areaRange" optional={true} title="Area range">
                                                                <XSelect field="input.areaRange" placeholder="Area range" options={[{ value: 'small', label: 'up to 10,000 ft²' }, { value: 'medium', label: '10,000 - 100,000 ft²' }, { value: 'large', label: '100,000 ft² +' }]} />
                                                            </XFormField>

                                                            <XFormField field="input.geographies" optional={true} title="Geographies">
                                                                <XSelect creatable={true} multi={true} field="input.geographies" placeholder="Geographies" />
                                                            </XFormField>
                                                            <XFormField field="input.landUse" optional={true} title="Land Use">
                                                                <XSelect creatable={true} multi={true} field="input.landUse" placeholder="Land Use" />
                                                            </XFormField>
                                                            <XFormField field="input.specialAttributes" optional={true} title="Special attributes">
                                                                <XSelect creatable={true} multi={true} field="input.specialAttributes" placeholder="Special attributes" />
                                                            </XFormField>
                                                            <XFormField field="input.unitCapacity" optional={true} title="Unit Capacity">
                                                                <XSelect creatable={true} multi={true} field="input.unitCapacity" placeholder="Unit Capacity" />
                                                            </XFormField>
                                                        </>
                                                    )}
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
                                                <XVertical>
                                                    {editArTarget && (
                                                        <XAvatarUpload field="input.photo" placeholder={{ add: 'Add listing photo', change: 'Change listing photo' }} />
                                                    )}
                                                    <XFormField title="Name" field="input.name">
                                                        <XInput field="input.name" placeholder="Name" />
                                                    </XFormField>
                                                    {editDoTarget && (
                                                        <>
                                                            <XFormField title="Full adress" field="input.location" >
                                                                <XLocationPickerModal field="input.location" />
                                                            </XFormField>
                                                            <XHorizontal >
                                                                <Field title="Area" field="input.area" optional={true}>
                                                                    <XInput field="input.area" placeholder="Area" />
                                                                </Field>
                                                                <Field title="Price" field="input.price" optional={true}>
                                                                    <XInput field="input.price" placeholder="Price" />
                                                                </Field>
                                                            </XHorizontal>
                                                            <XFormField field="input.availability" optional={true} title="Availability">
                                                                <XInput placeholder="Availability" />
                                                            </XFormField>
                                                            <XFormField title="Summary" field="fields.input.summary" optional={true}>
                                                                <XTextArea valueStoreKey="fields.input.summary" placeholder="Summary" />
                                                            </XFormField>
                                                            <XTitle>Details</XTitle>
                                                            <XFormField title="Deal Type" field="input.dealType" optional={true}>
                                                                <XSelect creatable={true} multi={true} placeholder="Deal Type" />
                                                            </XFormField>
                                                            <XFormField title="Shape And Form" field="input.shapeAndForm" optional={true}>
                                                                <XSelect creatable={true} multi={true} placeholder="Shape And Form" />
                                                            </XFormField>
                                                            <XFormField title="Current Use" field="input.currentUse" optional={true}>
                                                                <XSelect creatable={true} multi={true} placeholder="Current Use" />
                                                            </XFormField>
                                                            <XFormField title="Good Fit For" field="input.goodFitFor" optional={true}>
                                                                <XSelect creatable={true} multi={true} placeholder="Good Fit For" />
                                                            </XFormField>
                                                            <XFormField title="Special attributes" field="input.specialAttributes" optional={true}>
                                                                <XSelect creatable={true} multi={true} placeholder="Special attributes" />
                                                            </XFormField>
                                                            <XFormField title="Additional links" field="input.additionalLinks" optional={true} showErrors={false}>
                                                                {linksElements}
                                                            </XFormField>
                                                        </>

                                                    )}

                                                    {editArTarget && (
                                                        <>
                                                            <XFormField field="input.shortDescription" optional={true} title="Short description">
                                                                <XInput placeholder="Short description" />
                                                            </XFormField>

                                                            <XTitle>Details</XTitle>

                                                            <XFormField field="input.areaRange" optional={true} title="Area range">
                                                                <XSelect options={[{ value: 'small', label: 'up to 10,000 ft²' }, { value: 'medium', label: '10,000 - 100,000 ft²' }, { value: 'large', label: '100,000 ft² +' }]} />
                                                            </XFormField>

                                                            <XFormField field="input.geographies" optional={true} title="Geographies">
                                                                <XSelect creatable={true} multi={true} placeholder="Geographies" />
                                                            </XFormField>
                                                            <XFormField field="input.landUse" optional={true} title="Land Use">
                                                                <XSelect creatable={true} multi={true} placeholder="Land Use" />
                                                            </XFormField>
                                                            <XFormField field="input.specialAttributes" optional={true} title="Special attributes">
                                                                <XSelect creatable={true} multi={true} placeholder="Special attributes" />
                                                            </XFormField>
                                                            <XFormField field="input.unitCapacity" optional={true} title="Unit Capacity">
                                                                <XSelect creatable={true} multi={true} placeholder="Unit Capacity" />
                                                            </XFormField>
                                                        </>
                                                    )}
                                                </XVertical>
                                            </XFormLoadingContent>
                                        </XModalForm>
                                    )}

                                </XVerticalStyled>
                                {props.router.path === rootPath && (
                                    <XVertical width={270} flexShrink={0}>
                                        {organization.about && (
                                            <XCardStyled padding={18}>
                                                <Title small={true} marginBottom={12}>
                                                    About
                                        </Title>
                                                <AboutContent text={organization.about} />
                                            </XCardStyled>
                                        )}
                                        <XWithRole role={['org-' + organization.id + '-admin']}>
                                            {!organization.about && (
                                                <AboutPlaceholder />
                                            )}
                                        </XWithRole>

                                        {((organization.contacts || []).length || organization.website || organization.facebook || organization.twitter) && (
                                            <XCardStyled padding={0} paddingTop={18} paddingBottom={20}>
                                                <Title small={true} marginBottom={10} marginLeft={18}>Contacts</Title>
                                                <ContactPersons contacts={organization.contacts!!.filter(c => c !== null) as any} />
                                                <SocialLinksWrapper>
                                                    {organization.website && <SocialLink href={organization.website}>Website</SocialLink>}
                                                    {organization.facebook && <SocialLinkImg className="fb" href={organization.facebook} />}
                                                    {organization.twitter && <SocialLinkImg className="tw" href={organization.twitter} />}
                                                </SocialLinksWrapper>
                                            </XCardStyled>
                                        )}
                                        <XWithRole role={['org-' + organization.id + '-admin']}>
                                            {!((organization.contacts || []).length || organization.website || organization.facebook || organization.twitter) && (
                                                <XCardStyled padding={18}>
                                                    <XVertical>
                                                        {!(organization.website || organization.facebook || organization.twitter) && <SocialPlaceholder />}
                                                        {!(organization.contacts || []).length && <ContactPlaceholder />}
                                                    </XVertical>
                                                </XCardStyled>
                                            )}
                                        </XWithRole>
                                    </XVertical>
                                )}
                            </XHorizontal>
                        </MainContent>
                    </Root>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));
