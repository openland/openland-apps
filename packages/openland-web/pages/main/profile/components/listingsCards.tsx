import * as React from 'react';
import Glamorous from 'glamorous';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { ImageRefInput } from 'openland-api/Types';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XIcon } from 'openland-x/XIcon';
import { XLink } from 'openland-x/XLink';
import { XCloudImage } from 'openland-x/XCloudImage';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XModal } from 'openland-x-modal/XModal';
import { DateFormater } from 'openland-x-format/XDateLegacy';
import { XStreetViewModal } from 'openland-x-map/XStreetViewModal';
import { XStreetViewModalPreview } from 'openland-x-map/XStreetViewModalPreview';
import PlaceholderAR from '../icons/placeholder/img_placeholder_ar.svg';
import PlaceholderDO from '../icons/placeholder/img_placeholder_do.svg';

import {
    XHorizontalStyled,
    XVerticalStyled,
    Text,
    AdditionalLink,
    OpportunitiesWrapper,
    OpportunitiesTextWrapper,
    OpportunitiesValueWrapper,

    TagRowCard,
    TagRowMapCard
} from './profileComponents';

const ListingTitleWrapper = Glamorous.div({
    flexGrow: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    maxWidth: 'calc(100% - 48px)'
});

const ListingTitle = Glamorous.div({
    height: 22,
    fontSize: 20,
    fontWeight: 500,
    letterSpacing: 0.5,
    color: '#334562',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: 'calc(100% - 120px)'
});

const ListingCard = Glamorous.div<{ border?: boolean }>((props) => ({
    border: props.border ? '1px solid rgba(220, 222, 228, 0.45)' : undefined,
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    borderRadius: 4,
    backgroundColor: '#fff'
}));

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

export const DevelopmentOportunityShort = (props: { item: DevelopmentOportunityShortProps, orgId: string, showType?: boolean, isSoloComponent?: boolean }) => {
    const { item } = props;

    return (
        <ListingCard border={props.isSoloComponent}>
            <XHorizontalStyled justifyContent="space-between" separator={12} padding={24}>
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
                <XHorizontalStyled flexGrow={1} maxwidth={'calc(100% - 157px)'}>
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%', width: '100%' }}>
                        <XHorizontalStyled justifyContent="space-between" alignItems="center" marginBottom={0}>
                            <ListingTitleWrapper>
                                <ListingTitle>{item.name}</ListingTitle>
                                <Text opacity={0.5} small={true}>{DateFormater(item.updatedAt)}</Text>
                            </ListingTitleWrapper>
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
                        </XHorizontalStyled>
                        {props.showType && <Text opacity={0.5} marginTop={8}>{TextOrganizationProfile.listingDoTagRowTitileDealType}</Text>}
                        {item.locationTitle && <Text opacity={0.5} bold={true}>{item.locationTitle}</Text>}
                        {!item.location && <Text opacity={0.5} marginTop={5} bold={true}><Lock icon="locked" />{TextOrganizationProfile.listingDoLocked}</Text>}
                        {(item.area || item.price) && (
                            <XHorizontal separator="large">
                                {item.area && (
                                    <Text marginTop={12} bold={true} opacity={0.7} lineHeight={1.53}>{`Area: ${item.area} ft²`}</Text>
                                )}
                                {item.price && (
                                    <Text marginTop={12} bold={true} opacity={0.7} lineHeight={1.53}>{`Price: $${item.price}`}</Text>
                                )}
                            </XHorizontal>
                        )}
                    </div>
                </XHorizontalStyled>
            </XHorizontalStyled>
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

export const DevelopmentOportunityFull = (props: { item: DevelopmentOportunityProps, orgId: string, showType?: boolean, isSoloComponent?: boolean }) => {
    const { item } = props;

    return (
        <ListingCard border={props.isSoloComponent}>
            <XHorizontalStyled justifyContent="space-between" separator={12} padding={24}>
                {item.location && (
                    <XStreetViewModal
                        location={{ latitude: item.location!.lat, longitude: item.location!.lon }}
                        target={<ClickableXStreetViewModalPreview><XStreetViewModalPreview location={{ latitude: item.location!.lat, longitude: item.location!.lon }} width={160} height={120} /></ClickableXStreetViewModalPreview>}
                    />
                )}
                {!item.location && (
                    <PlaceholderDO style={{ width: 160, height: 120 }} />
                )}
                <XHorizontalStyled flexGrow={1} maxwidth={'calc(100% - 184px)'}>
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%', width: '100%' }}>
                        <XHorizontalStyled justifyContent="space-between" alignItems="center" marginBottom={3}>
                            <ListingTitleWrapper>
                                <ListingTitle>{item.name}</ListingTitle>
                                <Text opacity={0.5} small={true}>{DateFormater(item.updatedAt)}</Text>
                            </ListingTitleWrapper>
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
                        </XHorizontalStyled>
                        {props.showType && <Text opacity={0.5} marginTop={0}>{TextOrganizationProfile.listingDoTagRowTitileDealType}</Text>}
                        {item.locationTitle && <Text opacity={0.5} bold={true}>{item.locationTitle}</Text>}

                        <XVerticalStyled marginTop={item.locationTitle ? 12 : 6}>
                            <div>
                                {item.area && (
                                    <TagRowCard title={TextOrganizationProfile.listingDoTagRowTitileArea} marginBottom={20}>
                                        <Text fontWeight={600}>{`${item.area} ft²`}</Text>
                                    </TagRowCard>
                                )}
                                {item.price && (
                                    <TagRowCard title={TextOrganizationProfile.listingDoTagRowTitilePrice} marginBottom={20}>
                                        <Text fontWeight={600}>{`$${item.price}`}</Text>
                                    </TagRowCard>
                                )}
                                {item.summary && (
                                    <TagRowCard title={TextOrganizationProfile.listingDoTagRowTitileSummary} text={item.summary} isTextStyle={true} marginBottom={14} />
                                )}
                                {item.availability && (
                                    <TagRowCard title={TextOrganizationProfile.listingDoTagRowTitileAvailability} text={item.availability} isTextStyle={true} marginBottom={14} />
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
                                {item.additionalLinks && item.additionalLinks.length > 0 && (
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
                    </div>
                </XHorizontalStyled>
            </XHorizontalStyled>
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

export const AcquizitionRequestShort = (props: { item: AcquizitionRequestShortProps, orgId: string, showType?: boolean, isSoloComponent?: boolean }) => {
    const { item } = props;

    return (
        <ListingCard border={props.isSoloComponent}>
            <XHorizontalStyled justifyContent="space-between" separator={12} padding={24}>

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
                <XHorizontalStyled flexGrow={1} maxwidth={'calc(100% - 148px)'}>
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%', width: '100%' }}>
                        <XHorizontalStyled justifyContent="space-between" alignItems="center" marginBottom={4}>
                            <ListingTitleWrapper>
                                <ListingTitle>{item.name}</ListingTitle>
                                <Text opacity={0.5} small={true}>{DateFormater(item.updatedAt)}</Text>
                            </ListingTitleWrapper>
                            <XWithRole role={['org-' + props.orgId + '-admin']}>
                                <XOverflow
                                    placement="bottom"
                                    content={(
                                        <>
                                            <XOverflow.Item autoClose={true} query={{ field: 'editListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowEdit}</XOverflow.Item>
                                            <XOverflow.Item autoClose={true} style="danger" query={{ field: 'deleteListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowDelete}</XOverflow.Item>
                                        </>
                                    )}
                                />
                            </XWithRole>
                        </XHorizontalStyled>
                        {props.showType && <Text opacity={0.5}>{TextOrganizationProfile.listingArType}</Text>}
                        {item.shortDescription && <Text opacity={0.5} bold={true}>{item.shortDescription}</Text>}
                        {(item.areaRange) && <Text opacity={0.7} bold={true} marginTop={12} lineHeight={1.53}>{`Area range: ${Thousander(item.areaRange.from)} - ${Thousander(item.areaRange.to)} ft²`}</Text>}

                        {(!item.areaRange) && <Text opacity={0.5} bold={true} marginTop={12}> <Lock icon="locked" />{TextOrganizationProfile.listingArLocked}</Text>}
                    </div>
                </XHorizontalStyled>
            </XHorizontalStyled>
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

export const AcquizitionRequestFull = (props: { item: AcquizitionRequestProps, orgId: string, showType?: boolean, isSoloComponent?: boolean }) => {
    const { item } = props;

    return (
        <ListingCard border={props.isSoloComponent}>
            <XHorizontalStyled justifyContent="space-between" separator={12} padding={24}>

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
                <XHorizontalStyled flexGrow={1} maxwidth={'calc(100% - 175px)'}>
                    <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, maxWidth: '100%', width: '100%' }}>
                        <XHorizontalStyled justifyContent="space-between" alignItems="center" marginBottom={3}>
                            <ListingTitleWrapper>
                                <ListingTitle>{item.name}</ListingTitle>
                                <Text opacity={0.5} small={true}>{DateFormater(item.updatedAt)}</Text>
                            </ListingTitleWrapper>
                            <XWithRole role={['org-' + props.orgId + '-admin']}>
                                <XOverflow
                                    placement="bottom"
                                    content={(
                                        <>
                                            <XOverflow.Item autoClose={true} query={{ field: 'editListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowEdit}</XOverflow.Item>
                                            <XOverflow.Item autoClose={true} style="danger" query={{ field: 'deleteListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowDelete}</XOverflow.Item>
                                        </>
                                    )}
                                />
                            </XWithRole>
                        </XHorizontalStyled>
                        {props.showType && <Text opacity={0.5}>{TextOrganizationProfile.listingArType}</Text>}
                        {item.shortDescription && <Text opacity={0.5} bold={true}>{item.shortDescription}</Text>}

                        <XVerticalStyled marginTop={item.shortDescription ? 16 : 6}>
                            <div>
                                {item.summary && (
                                    <TagRowCard title={TextOrganizationProfile.listingArTagRowSummary} text={item.summary} isTextStyle={true} marginBottom={8} />
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
                            </div>
                        </XVerticalStyled>
                    </div>
                </XHorizontalStyled>
            </XHorizontalStyled>
        </ListingCard>
    );
};