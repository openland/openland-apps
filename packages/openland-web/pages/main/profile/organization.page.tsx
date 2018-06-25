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

const SwitcherWrapper = Glamorous(XSwitcher)<{ height?: number }>((props) => ({
    padding: 0,
    height: props.height ? props.height : '100%',
    borderRadius: 0
}));

const Switcher = Glamorous(XSwitcher.Item)({
    display: 'flex',
    alignItems: 'center',
    padding: '0 5px',

    fontSize: 15,
    fontSeight: 500,
    lineHeight: 1.33,
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
    whiteSpace: 'nowrap'
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

const ContactWrapper = Glamorous(XHorizontal)({
    paddingTop: 12,
    paddingBottom: 12,
    paddingLeft: 18,
    paddingRight: 18
});

interface TextProps {
    opacity?: number;
    bold?: boolean;
    upperCase?: boolean;
    marginBottom?: number;
    marginTop?: number;
    small?: boolean;
}

const Text = Glamorous.div<TextProps>((props) => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: props.small ? 14 : 15,
    lineHeight: props.small ? 1.43 : 1.33,
    color: '#334562',
    opacity: props.opacity,
    fontWeight: props.bold ? 500 : undefined,
    letterSpacing: props.bold ? -0.3 : undefined,
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
                <Text>{textToShow}</Text>
                {isBigText && <ShowMoreBtn onClick={this.switcher} marginTop={12}>{buttonText}</ShowMoreBtn>}
            </>
        );
    }
}

interface XVerticalStyledProps {
    borderRight?: boolean;
    borderBottom?: boolean;
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
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
    maxWidth: props.maxwidth
}));

interface XHorizontalStyledProps {
    borderRight?: boolean;
    borderBottom?: boolean;
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    marginTop?: number;
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
    maxWidth: props.maxwidth
}));

const OpportunitiesWrapper = Glamorous.div<{ marginBottom?: number, marginTop?: number }>((props) => ({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: props.marginBottom ? props.marginBottom : undefined,
    marginTop: props.marginTop ? props.marginTop : undefined,
    '&:first-child': {
        '& > div': {
            minHeight: 50,
            paddingTop: 15,
            '&:first-child': {
                '& > div': {
                    paddingTop: 8,

                }
            }
        }
    },
    '&:last-child': {
        '& > div': {
            minHeight: 50,
            paddingBottom: 18
        }
    },
    '&:only-child': {
        '& > div': {
            height: 'auto',
            paddingBottom: 'unset',
            paddingTop: 'unset'
        }
    }
}));

const OpportunitiesTextWrapper = Glamorous.div<{ width?: number, alignSelf?: string }>((props) => ({
    width: props.width ? props.width : 220,
    height: '100%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    alignSelf: props.alignSelf ? props.alignSelf : undefined,
    paddingLeft: 24,
    paddingTop: 12,

}));

const OpportunitiesValueWrapper = Glamorous.div<{ bordered?: boolean }>((props) => ({
    minHeight: 35,
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
    padding: '0 24px',
    borderLeft: props.bordered ? '1px solid rgba(220, 222, 228, 0.45)' : undefined
}));

const OpportunitiesValue = Glamorous.div({
    height: 32,
    borderRadius: 4,
    backgroundColor: '#edf3fe',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.14,
    color: '#4285f4',
    display: 'flex',
    alignItems: 'center',
    padding: '8px 9px',
    marginRight: 11,
    marginTop: 5,
    marginBottom: 5,
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
}

const TagRowMap = (props: TagRowMapProps) => (
    <OpportunitiesWrapper>
        <OpportunitiesTextWrapper width={props.titleWidth} alignSelf="flex-start">
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
}

const TagRow = (props: TagRowProps) => (
    <OpportunitiesWrapper marginBottom={props.isTextStyle ? 13 : undefined}>
        <OpportunitiesTextWrapper width={props.titleWidth} alignSelf={props.isTextStyle ? 'flex-start' : undefined}>
            <Text bold={true}>{props.title}</Text>
        </OpportunitiesTextWrapper>
        <OpportunitiesValueWrapper bordered={props.bordered}>
            {props.isTextStyle && (
                <Text>
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

const DevelopmentOportunityCard = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

const StatusDot = Glamorous.div({
    width: 6,
    height: 6,
    borderRadius: 50,
    backgroundColor: '#50d25e',
    marginRight: 6
});

const Lock = Glamorous(XIcon)({
    width: 14,
    height: 14,
    fontSize: 14,
    marginRight: 8
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
    marginRight: 11,
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

const ListingTitle = Glamorous.div({
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: -0.2,
    color: '#334562',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    marginBottom: 4
});

const ClickableXStreetViewModalPreview = Glamorous.div({
    cursor: 'pointer'
});

class DevelopmentOportunity extends React.Component<{ item: DevelopmentOportunityProps, orgId: string, full?: boolean, showType?: boolean }> {
    render() {

        const { item, full } = this.props;

        return (
            <DevelopmentOportunityCard>
                <XHorizontalStyled justifyContent="space-between" padding={24}>
                    {item.location && (
                        <XStreetViewModal
                            location={{ latitude: item.location!.lat, longitude: item.location!.lon }}
                            target={<ClickableXStreetViewModalPreview><XStreetViewModalPreview location={{ latitude: item.location!.lat, longitude: item.location!.lon }} width={full ? 160 : 133} height={full ? 120 : 100} /></ClickableXStreetViewModalPreview>}
                        />
                    )}
                    {!item.location && (
                        <img src={'/static/img/icons/organization/profile/img_placeholder_do.svg'} style={{ width: full ? 160 : 133, height: full ? 120 : 100 }} />
                    )}
                    <XHorizontalStyled flexGrow={1} maxwidth={full ? 'calc(100% - 175px)' : 'calc(100% - 148px)'}>
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%' }}>
                            <XHorizontal justifyContent="space-between" alignItems="center">
                                <ListingTitle>{item.name}</ListingTitle>
                                <XWithRole role={['org-' + this.props.orgId + '-admin']}>
                                    <XOverflow
                                        marginRight={138}
                                        placement="bottom"
                                        content={(
                                            <>
                                                <XOverflow.Item query={{ field: 'editListing', value: item.id }}>Edit</XOverflow.Item>
                                                <XOverflow.Item query={{ field: 'deleteListing', value: item.id }}>Delete</XOverflow.Item>
                                            </>
                                        )}
                                    />
                                </XWithRole>
                            </XHorizontal>
                            {this.props.showType && <Text opacity={0.5}>Development oportunity</Text>}
                            <Text opacity={0.5} bold={true}>{item.locationTitle}</Text>
                            <XHorizontal separator="large" flexGrow={full ? 1 : undefined} alignItems={full ? 'flex-end' : undefined}>
                                {item.area && (
                                    <Text bold={true} marginTop={3}>{`Area: ${item.area} ft²`}</Text>
                                )}
                                {item.price && (
                                    <Text bold={true} marginTop={3}>{`Price: $${item.price}`}</Text>
                                )}
                            </XHorizontal>
                            {(!full && item.location) && (
                                <XHorizontalStyled marginTop={10}>
                                    <Text><StatusDot />Open</Text>
                                    <Text opacity={0.5} small={true} marginBottom={-1}>Last updated: {DateFormater(item.updatedAt)}</Text>
                                </XHorizontalStyled>
                            )}
                            {(!full && !item.location) && <Text opacity={0.5} marginTop={3}> <Lock icon="locked" />Details and location on request</Text>}

                        </div>
                    </XHorizontalStyled>
                </XHorizontalStyled>

                {full && (
                    <XVerticalStyled paddingBottom={24}>
                        <div>
                            {item.summary && (
                                <TagRow title="Summary" text={item.summary} titleWidth={178} isTextStyle={true} />
                            )}
                            {item.availability && (
                                <TagRow title="Availability" text={item.availability} titleWidth={178} isTextStyle={true} />
                            )}
                            {item.dealType && (
                                <TagRowMap title="Deal type" items={item.dealType} titleWidth={178} />
                            )}
                            {item.shapeAndForm && (
                                <TagRowMap title="Shape and form" items={item.shapeAndForm} titleWidth={178} />
                            )}
                            {item.currentUse && (
                                <TagRowMap title="Current use" items={item.currentUse} titleWidth={178} />
                            )}
                            {item.goodFitFor && (
                                <TagRowMap title="Good fit for" items={item.goodFitFor} titleWidth={178} />
                            )}
                            {item.specialAttributes && (
                                <TagRowMap title="Special attributes" items={item.specialAttributes} titleWidth={178} />
                            )}
                            {item.additionalLinks!!.length > 0 && (
                                <OpportunitiesWrapper marginTop={10} marginBottom={10}>
                                    <OpportunitiesTextWrapper width={178}>
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

                            <TagRow title="Status" titleWidth={178}>
                                <XHorizontalStyled flexGrow={1} alignItems="flex-end">
                                    <Text><StatusDot />Open</Text>
                                    <Text opacity={0.5} small={true}>Last updated: {DateFormater(item.updatedAt)}</Text>
                                </XHorizontalStyled>
                            </TagRow>
                        </div>
                    </XVerticalStyled>
                )}

            </DevelopmentOportunityCard>
        );
    }
}

const AquizitionRequestPhoto = Glamorous(XCloudImage)({
    borderRadius: 4
});

interface AquizitionRequestProps {
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

class AquizitionRequest extends React.Component<{ item: AquizitionRequestProps, orgId: string, full?: boolean, showType?: boolean }> {

    render() {

        const { item, full } = this.props;

        return (
            <DevelopmentOportunityCard>
                <XHorizontalStyled justifyContent="space-between" padding={24}>

                    {item.photo && (
                        <AquizitionRequestPhoto resize="fill" photoRef={item.photo} width={full ? 160 : 133} height={full ? 120 : 100} />
                    )}
                    {!item.photo && (
                        <PlaceholderAR style={{ width: full ? 160 : 133, height: full ? 120 : 100 }} />
                        // <img src={require('./img_placeholder_ar.svg')} />
                    )}
                    {/* <XAvatar photoRef={item.photo || undefined} size="large" style="square" /> */}
                    <XHorizontalStyled flexGrow={1} maxwidth={full ? 'calc(100% - 175px)' : 'calc(100% - 148px)'}>
                        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%' }}>
                            <XHorizontal justifyContent="space-between" alignItems="center">
                                <ListingTitle>{item.name}</ListingTitle>
                                <XWithRole role={['org-' + this.props.orgId + '-admin']}>
                                    <XOverflow
                                        marginRight={138}
                                        placement="bottom"
                                        content={(
                                            <>
                                                <XOverflow.Item query={{ field: 'editListing', value: item.id }}>Edit</XOverflow.Item>
                                                <XOverflow.Item query={{ field: 'deleteListing', value: item.id }}>Delete</XOverflow.Item>
                                            </>
                                        )}
                                    />
                                </XWithRole>
                            </XHorizontal>
                            {this.props.showType && <Text opacity={0.5}>Aquizition request</Text>}
                            <Text opacity={0.5} bold={true}>{item.shortDescription}</Text>
                            {item.areaRange && <Text opacity={0.5} bold={true} marginTop={3}>{`Area range: ${Thousander(item.areaRange.from!!)} - ${Thousander(item.areaRange.to!!)} ft²`}</Text>}
                            {(!full && item.areaRange) && (
                                <XHorizontalStyled marginTop={10}>
                                    <Text><StatusDot />Open</Text>
                                    <Text opacity={0.5} small={true} marginBottom={-1}>Last updated: {DateFormater(item.updatedAt)}</Text>
                                </XHorizontalStyled>
                            )}
                            {(!full && !item.areaRange) && <Text opacity={0.5} marginTop={3}> <Lock icon="locked" />Details and location on request</Text>}
                        </div>
                    </XHorizontalStyled>
                </XHorizontalStyled>
                {full && (
                    <XVertical>
                        <div>
                            {item.summary && (
                                <TagRow title="Summary" text={item.summary} titleWidth={178} isTextStyle={true} />
                            )}
                            {item.areaRange && (
                                <TagRow title="Area range" text={`${Thousander(item.areaRange.from!!)} - ${Thousander(item.areaRange.to!!)} ft²`} titleWidth={178} isTagStyle={true} />
                            )}
                            {item.geographies && (
                                <TagRowMap title="Geographies" items={item.geographies} titleWidth={178} />
                            )}
                            {item.landUse && (
                                <TagRowMap title="Land use" items={item.landUse} titleWidth={178} />
                            )}
                            {item.specialAttributes && (
                                <TagRowMap title="Special attributes" items={item.specialAttributes} titleWidth={178} />
                            )}
                            {item.unitCapacity && (
                                <TagRowMap title="Unit capacity" items={item.unitCapacity} titleWidth={178} />
                            )}
                            <TagRow title="Status" titleWidth={178}>
                                <XHorizontalStyled flexGrow={1} alignItems="flex-end">
                                    <Text><StatusDot />Open</Text>
                                    <Text opacity={0.5} small={true}>Last updated: {DateFormater(item.updatedAt)}</Text>
                                </XHorizontalStyled>
                            </TagRow>
                        </div>
                    </XVertical>
                )}

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
                                <Field title="Link text">
                                    <XInput field={`input.additionalLinks.${i}.text`} placeholder="Link text" />
                                </Field>
                                <XVertical separator="none" flexGrow={1}>
                                    <XHorizontal >
                                        <FormFieldTitle>Link text</FormFieldTitle>
                                        <DelLinkBtn
                                            style="link_danger"
                                            text="Delete"
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
                                    <XInput field={`input.additionalLinks.${i}.url`} placeholder="Link url" />
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
                            text={`Add${links.length === 0 ? '' : ' another'} link`}
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
            <XDocumentHead title="Organization profile" />
            <Scaffold>
                <Scaffold.Content padding={false} bottomOffset={false} >
                    <Root>
                        <Header>
                            <AvatarWrapper>
                                {hasLogo && (
                                    <Avatar cloudImageUuid={organization.photo!!} size="large" style="square" />
                                )}
                                {!hasLogo && (
                                    <>
                                        <XWithRole role={['org-' + organization.id + '-admin']} >
                                            <AvatartPlaceholder />
                                        </XWithRole>
                                        <XWithRole role={['org-' + organization.id + '-admin']} negate={true}>
                                            <Avatar cloudImageUuid={organization.photo!!} size="large" style="square" />
                                        </XWithRole>
                                    </>
                                )}
                            </AvatarWrapper>

                            <XVerticalStyled flexShrink={0} flexGrow={1} separator="none" paddingTop={35}>
                                <OrganizationName>{organization.name}</OrganizationName>
                                <div style={{ marginTop: 4 }}>
                                    {organization.location && <Text opacity={0.5}>{organization.location}</Text>}
                                    <XWithRole role={['org-' + organization.id + '-admin']}>
                                        {!organization.location && <LocationPlaceholder />}
                                    </XWithRole>
                                </div>
                                <div style={{ marginTop: 16 }}>
                                    <SwitcherWrapper flatStyle={true} height={60}>
                                        <Switcher path={rootPath}>Overview</Switcher>
                                        <Switcher path={lsitingsPath}>{'Listings (' + (((organization.developmentOportunities && organization.developmentOportunities.length) || 0) + ((organization.acquisitionRequests && organization.acquisitionRequests.length) || 0)) + ')'}</Switcher>
                                        <Switcher path={lsitingsAllPath}>{'All listings (' + (((organization.developmentOportunities && organization.developmentOportunities.length) || 0) + ((organization.acquisitionRequests && organization.acquisitionRequests.length) || 0)) + ')'}</Switcher>
                                    </SwitcherWrapper>
                                </div >
                            </XVerticalStyled>
                            <XHorizontalStyled paddingTop={20}>
                                {!organization.isMine && (
                                    <XButton
                                        style="primary"
                                        size="medium"
                                        text={organization!!.followed ? 'Following' : 'Follow'}
                                        action={async () => {
                                            console.warn(organization!!.followed);
                                            await props.followOrganization({ variables: { follow: !organization!!.followed } });
                                        }}
                                    />
                                )}
                                <XWithRole role={['org-' + organization.id + '-admin']}>
                                    <XButton
                                        style="primary"
                                        size="medium"
                                        icon="edit"
                                        text="Edit"
                                        path="/settings/organization"
                                    />
                                    <XOverflow
                                        placement="bottom"
                                        width={220}
                                        marginRight={88}
                                        target={<XButton style="primary" size="medium" text="Add a listing" />}
                                        content={
                                            <>
                                                <XOverflow.Item query={{ field: 'addListing', value: 'DO' }}>Development opportunity</XOverflow.Item>

                                                <XOverflow.Item query={{ field: 'addListing', value: 'AR' }}>Aquisition request</XOverflow.Item>
                                            </>
                                        }
                                    />

                                </XWithRole>
                            </XHorizontalStyled>
                        </Header>

                        <MainContent>

                            <XHorizontal>
                                <XVerticalStyled flexGrow={1} maxwidth="calc(100% - 286px)">
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
                                                        <TagRowMap title="Organization type" items={organization.organizationType} bordered={true} />
                                                    )}
                                                    {organization.lookingFor && (
                                                        <TagRowMap title="Looking for" items={organization.lookingFor} bordered={true} />
                                                    )}
                                                    {organization.geographies && (
                                                        <TagRowMap title="Geographies" items={organization.geographies} bordered={true} />
                                                    )}

                                                </XCardStyled>
                                            )}

                                            <XCardStyled padding={0}>
                                                <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                                    <Title marginBottom={24}>Development opportunities</Title>
                                                </XVerticalStyled>

                                                {(organization.doShapeAndForm || organization.doCurrentUse || organization.doGoodFitFor || organization.doSpecialAttributes || organization.doAvailability) && (
                                                    <div style={{ borderBottom: '1px solid rgba(220, 222, 228, 0.45)' }}>
                                                        {organization.doShapeAndForm && (
                                                            <TagRowMap title="Shape and form" items={organization.doShapeAndForm} bordered={true} />
                                                        )}
                                                        {organization.doCurrentUse && (
                                                            <TagRowMap title="Current use" items={organization.doCurrentUse} bordered={true} />
                                                        )}
                                                        {organization.doGoodFitFor && (
                                                            <TagRowMap title="Good fit for  " items={organization.doGoodFitFor} bordered={true} />
                                                        )}
                                                        {organization.doSpecialAttributes && (
                                                            <TagRowMap title="Special attributes" items={organization.doSpecialAttributes} bordered={true} />
                                                        )}
                                                        {organization.doAvailability && (
                                                            <TagRowMap title="Availability " items={organization.doAvailability} bordered={true} />
                                                        )}

                                                    </div>
                                                )}

                                                {organization.developmentOportunities && (
                                                    organization.developmentOportunities.map((devop, i) => (
                                                        cardFilter(() => <DevelopmentOportunity key={'do_' + i} orgId={organization.id} item={devop} />, cardCountAR)
                                                    ))
                                                )}
                                                <XHorizontal justifyContent="center">
                                                    <ShowListingLink path={lsitingsPath}>
                                                        View all ({organization.developmentOportunities!!.length}) >
                                                        </ShowListingLink>
                                                </XHorizontal>
                                            </XCardStyled>

                                            <XCardStyled padding={0}>
                                                <XVerticalStyled borderBottom={true} flexGrow={1} padding={24}>
                                                    <Title marginBottom={24}>Acquisition requests</Title>
                                                </XVerticalStyled>

                                                {(organization.arGeographies || organization.arAreaRange || organization.arHeightLimit || organization.arLandUse || organization.arSpecialAttributes || organization.arActivityStatus || organization.arAquisitionBudget || organization.arAquisitionRate || organization.arClosingTime) && (
                                                    <div style={{ borderBottom: '1px solid rgba(220, 222, 228, 0.45)' }}>
                                                        {organization.arGeographies && (
                                                            <TagRowMap title="Geographies" items={organization.arGeographies} bordered={true} />
                                                        )}
                                                        {organization.arAreaRange && (
                                                            <TagRowMap title="Area range" items={organization.arAreaRange} bordered={true} />
                                                        )}
                                                        {organization.arHeightLimit && (
                                                            <TagRowMap title="Height limit" items={organization.arHeightLimit} bordered={true} />
                                                        )}
                                                        {organization.arLandUse && (
                                                            <TagRowMap title="Land use" items={organization.arLandUse} bordered={true} />
                                                        )}
                                                        {organization.arSpecialAttributes && (
                                                            <TagRowMap title="Special attributes " items={organization.arSpecialAttributes} bordered={true} />
                                                        )}
                                                        {organization.arActivityStatus && (
                                                            <TagRowMap title="Activity status" items={organization.arActivityStatus} bordered={true} />
                                                        )}
                                                        {organization.arAquisitionBudget && (
                                                            <TagRowMap title="3-year aquisition budget" items={organization.arAquisitionBudget} bordered={true} />
                                                        )}
                                                        {organization.arAquisitionRate && (
                                                            <TagRowMap title="Aquisition rate" items={organization.arAquisitionRate} bordered={true} />
                                                        )}
                                                        {organization.arClosingTime && (
                                                            <TagRowMap title="Closing time" items={organization.arClosingTime} bordered={true} />
                                                        )}
                                                    </div>
                                                )}

                                                {organization.acquisitionRequests && (
                                                    organization.acquisitionRequests.map((devop, i) => (
                                                        cardFilter(() => <AquizitionRequest key={'do_' + i} orgId={organization.id} item={devop} />, cardCountDO)
                                                    ))
                                                )}
                                                <XHorizontal justifyContent="center">
                                                    <ShowListingLink path={lsitingsPath + '?listingType=ar'}>
                                                        View all ({organization.acquisitionRequests!!.length})
                                                        </ShowListingLink>
                                                </XHorizontal>
                                            </XCardStyled>
                                        </>
                                    )}

                                    {props.router.path === lsitingsPath && (
                                        <>
                                            <DOARListingPlaceholder />
                                            <XCardStyled padding={0}>
                                                <XVerticalStyled borderBottom={true} flexGrow={1} padding={0} paddingLeft={24} paddingRight={24}>
                                                    <SwitcherWrapper flatStyle={true} height={66}>
                                                        <Switcher query={{ field: 'listingType' }}>Development opportunities</Switcher>
                                                        <Switcher query={{ field: 'listingType', value: 'ar' }}>Acquisition requests</Switcher>

                                                    </SwitcherWrapper>
                                                </XVerticalStyled>
                                                {props.router.path === lsitingsPath && props.router.query.listingType === undefined && organization && organization.developmentOportunities && (
                                                    organization.developmentOportunities.map((devop, i) => <DevelopmentOportunity key={'do_' + i} orgId={organization.id} item={devop} full={true} />)
                                                )}
                                                {props.router.path === lsitingsPath && props.router.query.listingType === 'ar' && organization && organization.acquisitionRequests && (
                                                    organization.acquisitionRequests.map((devop, i) => <AquizitionRequest key={'do_' + i} orgId={organization.id} item={devop} full={true} />)
                                                )}
                                            </XCardStyled>
                                        </>
                                    )}

                                    {props.router.path === lsitingsAllPath && (
                                        <>
                                            <DOARListingPlaceholder />
                                            <XCardStyled padding={0}>
                                                {props.router.path === lsitingsAllPath && organization && organization.listingsAll && (
                                                    organization.listingsAll.map((l, i) => l.type === 'development_opportunity' ? <DevelopmentOportunity key={'do_' + i} orgId={organization.id} item={l} full={true} showType={true} /> : < AquizitionRequest key={'do_' + i} orgId={organization.id} item={l} full={true} showType={true} />)
                                                )}
                                                {props.router.path === lsitingsPath && props.router.query.listingType === 'ar' && organization && organization.acquisitionRequests && (
                                                    organization.acquisitionRequests.map((devop, i) => <AquizitionRequest key={'do_' + i} orgId={organization.id} item={devop} full={true} />)
                                                )}
                                            </XCardStyled>
                                        </>

                                    )}

                                    {props.router.query.addListing && (
                                        <XModalForm
                                            fixedFooter={true}
                                            title={props.router.query.addListing === 'DO' ? 'Create development opportunity' : 'Create acquisition requests'}

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

                                                    <XFormField title="Name">
                                                        <XInput field="input.name" required={true} placeholder="Name" />
                                                    </XFormField>
                                                    {props.router.query.addListing === 'DO' && (
                                                        <>
                                                            <XFormField title="Full adress">
                                                                <XLocationPickerModal field="input.location" />
                                                            </XFormField>

                                                            <XHorizontal>
                                                                <Field title="Area">
                                                                    <XInput field="input.area" placeholder="Area" />
                                                                </Field>
                                                                <Field title="Price">
                                                                    <XInput field="input.price" placeholder="Price" />
                                                                </Field>
                                                            </XHorizontal>

                                                            <XFormField title="Availability">
                                                                <XInput field="input.availability" placeholder="Availability" />
                                                            </XFormField>

                                                            <XFormField title="Summary">
                                                                <XTextArea valueStoreKey="fields.input.summary" placeholder="Summary" />
                                                            </XFormField>

                                                            <XTitle>Details</XTitle>
                                                            <XFormField title="Deal Type">
                                                                <XSelect creatable={true} multi={true} field="input.dealType" placeholder="Deal Type" />
                                                            </XFormField>
                                                            <XFormField title="Shape And Form">
                                                                <XSelect creatable={true} multi={true} field="input.shapeAndForm" placeholder="Shape And Form" />
                                                            </XFormField>
                                                            <XFormField title="Current Use">
                                                                <XSelect creatable={true} multi={true} field="input.currentUse" placeholder="Current Use" />
                                                            </XFormField>
                                                            <XFormField title="Good Fit For">
                                                                <XSelect creatable={true} multi={true} field="input.goodFitFor" placeholder="Good Fit For" />
                                                            </XFormField>
                                                            <XFormField title="Special attributes">
                                                                <XSelect creatable={true} multi={true} field="input.specialAttributes" placeholder="Special attributes" />
                                                            </XFormField>
                                                            <XTitle>Additional links</XTitle>
                                                            {linksElements}
                                                        </>
                                                    )}
                                                    {props.router.query.addListing === 'AR' && (
                                                        <>
                                                            <XFormField title="Short description">
                                                                <XInput field="input.shortDescription" placeholder="Short description" />
                                                            </XFormField>

                                                            <XFormField title="Summary">
                                                                <XTextArea valueStoreKey="fields.input.summary" placeholder="Summary" />
                                                            </XFormField>

                                                            <XTitle>Details</XTitle>

                                                            <XFormField title="Area range">
                                                                <XSelect field="input.areaRange" placeholder="Area range" options={[{ value: 'small', label: 'up to 10,000 ft²' }, { value: 'medium', label: '10,000 - 100,000 ft²' }, { value: 'large', label: '100,000 ft² +' }]} />
                                                            </XFormField>

                                                            <XFormField title="Geographies">
                                                                <XSelect creatable={true} multi={true} field="input.geographies" placeholder="Geographies" />
                                                            </XFormField>
                                                            <XFormField title="Land Use">
                                                                <XSelect creatable={true} multi={true} field="input.landUse" placeholder="Land Use" />
                                                            </XFormField>
                                                            <XFormField title="Special attributes">
                                                                <XSelect creatable={true} multi={true} field="input.specialAttributes" placeholder="Special attributes" />
                                                            </XFormField>
                                                            <XFormField title="Unit Capacity">
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
                                            fixedFooter={true}
                                            title={editDoTarget ? 'Edit development opportunity' : 'Edit aquizition request'}
                                            defaultData={editListingDefaultData}
                                            defaultAction={editListingDefaultAction}
                                            targetQuery="editListing"
                                        >
                                            <XFormLoadingContent>
                                                <XVertical>
                                                    {editArTarget && (
                                                        <XAvatarUpload field="input.photo" placeholder={{ add: 'Add listing photo', change: 'Change listing photo' }} />
                                                    )}
                                                    <XFormField title="Name">
                                                        <XInput field="input.name" required={true} placeholder="Name" />
                                                    </XFormField>
                                                    {editDoTarget && (
                                                        <>
                                                            <XFormField title="Full adress">
                                                                <XLocationPickerModal field="input.location" />
                                                            </XFormField>
                                                            <XHorizontal >
                                                                <Field title="Area">
                                                                    <XInput field="input.area" placeholder="Area" />
                                                                </Field>
                                                                <Field title="Price">
                                                                    <XInput field="input.price" placeholder="Price" />
                                                                </Field>
                                                            </XHorizontal>
                                                            <XFormField title="Availability">
                                                                <XInput field="input.availability" placeholder="Availability" />
                                                            </XFormField>
                                                            <XFormField title="Summary">
                                                                <XTextArea valueStoreKey="fields.input.summary" placeholder="Summary" />
                                                            </XFormField>
                                                            <XTitle>Details</XTitle>
                                                            <XFormField title="Deal Type">
                                                                <XSelect creatable={true} multi={true} field="input.dealType" placeholder="Deal Type" />
                                                            </XFormField>
                                                            <XFormField title="Shape And Form">
                                                                <XSelect creatable={true} multi={true} field="input.shapeAndForm" placeholder="Shape And Form" />
                                                            </XFormField>
                                                            <XFormField title="Current Use">
                                                                <XSelect creatable={true} multi={true} field="input.currentUse" placeholder="Current Use" />
                                                            </XFormField>
                                                            <XFormField title="Good Fit For">
                                                                <XSelect creatable={true} multi={true} field="input.goodFitFor" placeholder="Good Fit For" />
                                                            </XFormField>
                                                            <XFormField title="Special attributes">
                                                                <XSelect creatable={true} multi={true} field="input.specialAttributes" placeholder="Special attributes" />
                                                            </XFormField>
                                                            <XTitle>Additional links</XTitle>
                                                            {linksElements}
                                                        </>

                                                    )}

                                                    {editArTarget && (
                                                        <>
                                                            <XFormField title="Short description">
                                                                <XInput field="input.shortDescription" placeholder="Short description" />
                                                            </XFormField>

                                                            <XTitle>Details</XTitle>

                                                            <XFormField title="Area range">
                                                                <XSelect field="input.areaRange" options={[{ value: 'small', label: 'up to 10,000 ft²' }, { value: 'medium', label: '10,000 - 100,000 ft²' }, { value: 'large', label: '100,000 ft² +' }]} />
                                                            </XFormField>

                                                            <XFormField title="Geographies">
                                                                <XSelect creatable={true} multi={true} field="input.geographies" placeholder="Geographies" />
                                                            </XFormField>
                                                            <XFormField title="Land Use">
                                                                <XSelect creatable={true} multi={true} field="input.landUse" placeholder="Land Use" />
                                                            </XFormField>
                                                            <XFormField title="Special attributes">
                                                                <XSelect creatable={true} multi={true} field="input.specialAttributes" placeholder="Special attributes" />
                                                            </XFormField>
                                                            <XFormField title="Unit Capacity">
                                                                <XSelect creatable={true} multi={true} field="input.unitCapacity" placeholder="Unit Capacity" />
                                                            </XFormField>
                                                        </>
                                                    )}
                                                </XVertical>
                                            </XFormLoadingContent>
                                        </XModalForm>
                                    )}

                                    <XModalForm
                                        title="Add new link"
                                        defaultAction={async (data) => {
                                            let additionalLinks = [...((editDoTarget.additionalLinks || []).map(l => ({ text: l.text, url: l.url })))];
                                            additionalLinks.push({ text: data.text, url: data.url });
                                            await props.editListing({
                                                variables: {
                                                    id: props.router.query.addLink,
                                                    input: {
                                                        additionalLinks: additionalLinks
                                                    }
                                                }
                                            });
                                        }}
                                        targetQuery="addLink"
                                    >
                                        <XHorizontal>
                                            <Field title="Link text">
                                                <XInput field="text" placeholder="Link text" />
                                            </Field>
                                            <Field title="Link text">
                                                <XInput field="url" placeholder="Link url" />
                                            </Field>
                                        </XHorizontal>
                                    </XModalForm>

                                </XVerticalStyled>
                                <XVertical width={270} flexShrink={0}>
                                    {organization.about && (
                                        <XCardStyled padding={18}>
                                            <Title small={true} marginBottom={10}>
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
                            </XHorizontal>
                        </MainContent>
                    </Root>
                </Scaffold.Content>
            </Scaffold>
        </>
    );
})));
