import * as React from 'react';
import Glamorous from 'glamorous';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { ImageRefInput } from 'openland-api/Types';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XIcon } from 'openland-x/XIcon';
import { XLink } from 'openland-x/XLink';
import { XButton } from 'openland-x/XButton';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
// import { XVertical } from 'openland-x-layout/XVertical';
import { XModal } from 'openland-x-modal/XModal';
import { DateFormater } from 'openland-x-format/XDateLegacy';
import { XStreetViewModal } from 'openland-x-map/XStreetViewModal';
import { XStreetViewModalPreview } from 'openland-x-map/XStreetViewModalPreview';
import PlaceholderAR from '../icons/placeholder/img_placeholder_ar.svg';
import PlaceholderDO from '../icons/placeholder/img_placeholder_do.svg';

import {
    XHorizontalStyled,
    XVerticalStyled,
    CardTitle,
    AdditionalLink,
    TagRowCard,
    TagRowMapCard
} from './profileComponents';

const Separator = Glamorous.div({
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(220, 222, 228, 0.45)',
    marginTop: 24,
    marginBottom: 20,
});

const FullCardTagsWrapper = Glamorous.div({
    '& > div:last-child': {
        marginBottom: '0 !important'
    }
});

export const Text = Glamorous.div({
    opacity: 0.7,
    fontSize: 18,
    lineHeight: 1.28,
    letterSpacing: -0.3,
    color: '#334562'
});

const ListingTitle = Glamorous.div({
    fontSize: 18,
    lineHeight: 1.11,
    letterSpacing: 0.6,
    color: '#334562',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: '100%'
});

const ListingCard = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    borderRadius: 4,
    backgroundColor: '#fff'
});

const AcquizitionRequestPhoto = Glamorous(XCloudImage)({
    borderRadius: 4,
    margin: 'auto'
});

const ClickableXStreetViewModalPreview = Glamorous.div({
    cursor: 'pointer',
    alignSelf: 'flex-start'
});

const Lock = Glamorous(XIcon)({
    width: 14,
    height: 14,
    fontSize: 16,
    marginRight: 8,
    marginTop: -1
});

interface DevelopmentOportunityShortProps {
    name: string;
    id: string;
    updatedAt: string;
    location: {
        lat: number;
        lon: number;
    } | null;
    locationTitle: string | null;
    area: number | null;
    price: number | null;
}

export const DevelopmentOportunityShort = (props: { item: DevelopmentOportunityShortProps, orgId: string, showType?: boolean }) => {
    const { item } = props;

    return (
        <ListingCard>
            <XVerticalStyled separator={7} padding={24}>
                <XHorizontal justifyContent="space-between" alignItems="center">
                    <CardTitle>Listing > Development opportunity • {DateFormater(item.updatedAt)}</CardTitle>
                    <XWithRole role={['org-' + props.orgId + '-admin']}>
                        <XOverflow
                            smallSize={true}
                            placement="bottom-end"
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
                </XHorizontal>
                <XHorizontal separator={12}>
                    {item.location && (
                        <XStreetViewModal
                            location={{ latitude: item.location!.lat, longitude: item.location!.lon }}
                            target={(
                                <ClickableXStreetViewModalPreview>
                                    <XStreetViewModalPreview
                                        location={{ latitude: item.location!.lat, longitude: item.location!.lon }}
                                        width={133}
                                        height={100}
                                    />
                                </ClickableXStreetViewModalPreview>
                            )}
                        />
                    )}
                    {!item.location && (
                        <PlaceholderDO style={{ width: 133, height: 100 }} />
                    )}
                    <XVerticalStyled flexGrow={1} width={'calc(100% - 300px)'} separator={5} paddingTop={8}>
                        <ListingTitle>{item.name}</ListingTitle>
                        {item.locationTitle && <Text>{item.locationTitle}</Text>}
                        {!item.location && <Text><Lock icon="locked" />{TextOrganizationProfile.listingDoLocked}</Text>}
                        {item.area && <Text>{`Area: ${item.area} ft²`}</Text>}
                        {item.price && <Text>{`Price: $${item.price}`}</Text>}
                    </XVerticalStyled>
                    <XButton alignSelf="flex-end" text="View details" />
                </XHorizontal>
            </XVerticalStyled>
        </ListingCard>
    );
};

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

export const DevelopmentOportunityFull = (props: { item: DevelopmentOportunityProps, orgId: string, showType?: boolean }) => {
    const { item } = props;

    return (
        <ListingCard>
            <XVerticalStyled separator={12} padding={24}>
                <XHorizontal justifyContent="space-between" alignItems="center">
                    <CardTitle>Listing > Development opportunity • {DateFormater(item.updatedAt)}</CardTitle>
                    <XWithRole role={['org-' + props.orgId + '-admin']}>
                        <XOverflow
                            smallSize={true}
                            placement="bottom-end"
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
                </XHorizontal>
                <XHorizontal separator={12}>
                    {item.location && (
                        <XStreetViewModal
                            location={{ latitude: item.location!.lat, longitude: item.location!.lon }}
                            target={(
                                <ClickableXStreetViewModalPreview>
                                    <XStreetViewModalPreview
                                        location={{ latitude: item.location!.lat, longitude: item.location!.lon }}
                                        width={160}
                                        height={120}
                                    />
                                </ClickableXStreetViewModalPreview>
                            )}
                        />
                    )}
                    {!item.location && (
                        <PlaceholderDO style={{ width: 160, height: 120 }} />
                    )}
                    <XVerticalStyled flexGrow={1} maxwidth={'calc(100% - 184px)'} paddingTop={8} separator={10}>
                        <ListingTitle>{item.name}</ListingTitle>
                        {/* {props.showType && <Text>{TextOrganizationProfile.listingDoTagRowTitileDealType}</Text>} */}

                        <FullCardTagsWrapper>
                            {item.locationTitle && (
                                <TagRowCard title="Address" text={item.locationTitle} isTextStyle={true} marginBottom={16} />
                            )}
                            {item.area && (
                                <TagRowCard title={TextOrganizationProfile.listingDoTagRowTitileArea} text={`${item.area} ft²`} isTextStyle={true} marginBottom={16} />
                            )}
                            {item.price && (
                                <TagRowCard title={TextOrganizationProfile.listingDoTagRowTitilePrice} text={`$${item.price}`} isTextStyle={true} marginBottom={16} />
                            )}
                            {item.summary && (
                                <TagRowCard title={TextOrganizationProfile.listingDoTagRowTitileSummary} text={item.summary} isTextStyle={true} marginBottom={14} />
                            )}
                            {item.availability && (
                                <TagRowCard title={TextOrganizationProfile.listingDoTagRowTitileAvailability} text={item.availability} isTextStyle={true} marginBottom={14} />
                            )}

                            {((item.dealType || item.shapeAndForm || item.currentUse || item.goodFitFor || item.specialAttributes) || (item.additionalLinks && item.additionalLinks.length > 0)) && (
                                <Separator />
                            )}

                            {item.dealType && (
                                <TagRowMapCard title={TextOrganizationProfile.listingDoTagRowTitileDealType} items={item.dealType} />
                            )}
                            {item.shapeAndForm && (
                                <TagRowMapCard title={TextOrganizationProfile.listingDoTagRowTitileShapeAndForm} items={item.shapeAndForm} />
                            )}
                            {item.currentUse && (
                                <TagRowMapCard title={TextOrganizationProfile.listingDoTagRowTitileCurrentUse} items={item.currentUse} />
                            )}
                            {item.goodFitFor && (
                                <TagRowMapCard title={TextOrganizationProfile.listingDoTagRowTitileGoodFitFor} items={item.goodFitFor} />
                            )}
                            {item.specialAttributes && (
                                <TagRowMapCard title={TextOrganizationProfile.listingDoTagRowTitileSpecialAttributes} items={item.specialAttributes} />
                            )}

                            {((item.dealType || item.shapeAndForm || item.currentUse || item.goodFitFor || item.specialAttributes) && (item.additionalLinks && item.additionalLinks.length > 0)) && (
                                <Separator />
                            )}

                            {item.additionalLinks && item.additionalLinks.length > 0 && (
                                <TagRowCard title="Additional links" titlePadding={true}>
                                    {item.additionalLinks!!.map((s, k) => (
                                        <AdditionalLink key={k + '_' + s} href={s.url}>
                                            <span>{s.text}</span>
                                            <XIcon icon="launch" />
                                        </AdditionalLink>
                                    ))}
                                </TagRowCard>
                            )}
                        </FullCardTagsWrapper>
                    </XVerticalStyled>
                </XHorizontal>
            </XVerticalStyled>
        </ListingCard>
    );
};

interface AcquizitionRequestShortProps {
    name: string;
    id: string;
    photo: ImageRefInput | null;
    updatedAt: string;
    shortDescription: string | null;
    areaRange: {
        from: number | null;
        to: number | null;
    } | null;
}

const Thousander = (num?: number | null) => {
    if (num === undefined || num === null) {
        return '';
    }
    return Math.round(num).toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
};

export const AcquizitionRequestShort = (props: { item: AcquizitionRequestShortProps, orgId: string, showType?: boolean }) => {
    const { item } = props;

    return (
        <ListingCard>
            <XVerticalStyled separator={7} padding={24}>
                <XHorizontal justifyContent="space-between" alignItems="center">
                    <CardTitle>Listing > Acquisition criteria • {DateFormater(item.updatedAt)}</CardTitle>
                    <XWithRole role={['org-' + props.orgId + '-admin']}>
                        <XOverflow
                            smallSize={true}
                            placement="bottom-end"
                            content={(
                                <>
                                    <XOverflow.Item autoClose={true} query={{ field: 'editListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowEdit}</XOverflow.Item>
                                    <XOverflow.Item autoClose={true} style="danger" query={{ field: 'deleteListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowDelete}</XOverflow.Item>
                                </>
                            )}
                        />
                    </XWithRole>
                </XHorizontal>
                <XHorizontal separator={12}>
                    {item.photo && (
                        <XModal
                            useTopCloser={true}
                            title={item.name}
                            target={(
                                <XLink>
                                    <AcquizitionRequestPhoto resize="fill" photoRef={item.photo} width={133} height={100} />
                                </XLink>
                            )}
                        >
                            <AcquizitionRequestPhoto resize="fill" photoRef={item.photo} width={500} height={400} />
                        </XModal>
                    )}
                    {!item.photo && (
                        <PlaceholderAR style={{ width: 133, height: 100 }} />
                    )}
                    <XVerticalStyled flexGrow={1} width={'calc(100% - 300px)'} separator={5} paddingTop={8}>
                        <ListingTitle>{item.name}</ListingTitle>
                        {item.shortDescription && <Text>{item.shortDescription}</Text>}
                        <XHorizontalStyled justifyContent="flex-end" separator={5} alignItems="center" marginTop="auto">
                            <XButton text="View details" />
                            <XButton style="primary" text="Message" />
                        </XHorizontalStyled>
                    </XVerticalStyled>
                </XHorizontal>
            </XVerticalStyled>
        </ListingCard>
    );
};

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

export const AcquizitionRequestFull = (props: { item: AcquizitionRequestProps, orgId: string, showType?: boolean }) => {
    const { item } = props;

    return (
        <ListingCard>
            <XVerticalStyled separator={12} padding={24}>
                <XHorizontal justifyContent="space-between" alignItems="center">
                    <CardTitle>Listing > Acquisition criteria • {DateFormater(item.updatedAt)}</CardTitle>
                    <XWithRole role={['org-' + props.orgId + '-admin']}>
                        <XOverflow
                            smallSize={true}
                            placement="bottom-end"
                            content={(
                                <>
                                    <XOverflow.Item autoClose={true} query={{ field: 'editListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowEdit}</XOverflow.Item>
                                    <XOverflow.Item autoClose={true} style="danger" query={{ field: 'deleteListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowDelete}</XOverflow.Item>
                                </>
                            )}
                        />
                    </XWithRole>
                </XHorizontal>
                <XHorizontal>
                    {item.photo && (
                        <XModal
                            useTopCloser={true}
                            title={item.name}
                            target={(
                                <XLink>
                                    <AcquizitionRequestPhoto resize="fill" photoRef={item.photo} width={160} height={120} />
                                </XLink>
                            )}
                        >
                            <AcquizitionRequestPhoto resize="fill" photoRef={item.photo} width={500} height={400} />
                        </XModal>
                    )}
                    {!item.photo && (
                        <PlaceholderAR style={{ width: 160, height: 120 }} />
                    )}
                    <XVerticalStyled flexGrow={1} maxwidth={'calc(100% - 175px)'} paddingTop={8} separator={10}>
                        <ListingTitle>{item.name}</ListingTitle>
                        {/* {props.showType && <Text>{TextOrganizationProfile.listingArType}</Text>} */}
                        <FullCardTagsWrapper>
                            {item.shortDescription && (
                                <TagRowCard title="Description" text={item.shortDescription} isTextStyle={true} marginBottom={16} />
                            )}
                            {item.summary && (
                                <TagRowCard title={TextOrganizationProfile.listingArTagRowSummary} text={item.summary} isTextStyle={true} marginBottom={16} />
                            )}

                            {(item.areaRange || item.geographies || item.landUse || item.specialAttributes || item.unitCapacity) && (
                                <Separator />
                            )}

                            {item.areaRange && (
                                <TagRowCard title={TextOrganizationProfile.listingArTagRowAreaRange} text={`${Thousander(item.areaRange.from)} - ${Thousander(item.areaRange.to)} ft²`} isTagStyle={true} />
                            )}
                            {item.geographies && (
                                <TagRowMapCard title={TextOrganizationProfile.listingArTagRowGeographies} items={item.geographies} />
                            )}
                            {item.landUse && (
                                <TagRowMapCard title={TextOrganizationProfile.listingArTagRowLandUse} items={item.landUse} />
                            )}
                            {item.specialAttributes && (
                                <TagRowMapCard title={TextOrganizationProfile.listingArTagRowSpecialAttributes} items={item.specialAttributes} />
                            )}
                            {item.unitCapacity && (
                                <TagRowMapCard title={TextOrganizationProfile.listingArTagRowUnitCapacity} items={item.unitCapacity} />
                            )}
                        </FullCardTagsWrapper>
                    </XVerticalStyled>
                </XHorizontal>
            </XVerticalStyled>
        </ListingCard>
    );
};