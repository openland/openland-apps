import * as React from 'react';
import Glamorous from 'glamorous';
import { XOverflow } from '../../../../components/Incubator/XOverflow';
import { XCloudImage } from 'openland-x/XCloudImage';
import { TextOrganizationProfile } from 'openland-text/TextOrganizationProfile';
import { ImageRefInput } from 'openland-api/Types';
import { XWithRole } from 'openland-x-permissions/XWithRole';
import { XLink } from 'openland-x/XLink';
import { XIcon } from 'openland-x/XIcon';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
// import { XVertical } from 'openland-x-layout/XVertical';
import { DateFormater } from 'openland-x-format/XDateLegacy';

import {
    XVerticalStyled,
    CardPath,
    CardTitle
} from './profileComponents';

const PostCardWrapper = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    borderRadius: 4,
    backgroundColor: '#fff'
});

const Separator = Glamorous.div({
    width: '100%',
    height: 1,
    backgroundColor: 'rgba(220, 222, 228, 0.45)',
    marginTop: 14,
    marginBottom: 14,
});

const PostPhoto = Glamorous(XCloudImage)({
    borderRadius: 4
});

const PostDescription = Glamorous.div({
    opacity: 0.7,
    fontSize: 18,
    lineHeight: 1.44,
    letterSpacing: -0.1,
    color: '#1f3449',
    paddingLeft: 12,
    borderLeft: '2px solid #bcc3cc'
});

const PostLink = Glamorous(XLink)({
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

const PostTag = Glamorous.div({
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 30,
    borderRadius: 4,
    backgroundColor: '#edf3fe',
    whiteSpace: 'nowrap',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: '30px',
    color: '#4285f4',
    padding: '0px 9px 1px'
});

const UpperCase = Glamorous.span({
    textTransform: 'capitalize'
});

const PostPath = (props: { type: string, date: string }) => (
    <CardPath>
        <span><UpperCase>{props.type}</UpperCase> • {DateFormater(props.date)}</span>
    </CardPath>
);

interface PostCardProps {
    text: string;
    type: string;
    description: string | null;
    date: string;
    image: ImageRefInput | null;
    activity: string[] | null;
    links: {
        text: string,
        url: string,
    }[] | null;
    pinned: boolean | null;
}

export const PostCard = (props: { item: PostCardProps, orgId: string }) => {
    const { item } = props;

    return (
        <PostCardWrapper>
            <XVerticalStyled separator={8} padding={24}>
                <XHorizontal justifyContent="space-between" alignItems="center">
                    <PostPath type={item.type} date={item.date} />
                    <XWithRole role={['org-' + props.orgId + '-admin']}>
                        <XOverflow
                            horizontal={true}
                            placement="bottom-end"
                            content={(
                                <>
                                    {/* <XOverflow.Item autoClose={true} query={{ field: 'editListing', value: item.id }}>{TextOrganizationProfile.listingArOwerflowEdit}</XOverflow.Item> */}
                                    <XOverflow.Item
                                        autoClose={true}
                                        style="danger"
                                    // query={{ field: 'deleteListing', value: item.id }}
                                    >
                                        {TextOrganizationProfile.listingArOwerflowDelete}
                                    </XOverflow.Item>
                                </>
                            )}
                        />
                    </XWithRole>
                </XHorizontal>
                <XHorizontal separator={12}>
                    {item.image && (
                        <PostPhoto resize="fill" photoRef={item.image} width={133} height={100} />
                    )}
                    <XVerticalStyled flexGrow={1} maxwidth={'calc(100% - 175px)'} paddingTop={4} separator={10}>
                        <CardTitle>{item.text}</CardTitle>
                        {item.description && <PostDescription>{item.description}</PostDescription>}

                        {(item.description && ((item.links && item.links.length > 0) || (item.activity && item.activity.length > 0))) && <Separator />}

                        <XHorizontal>
                            {(item.links && item.links.length > 0) && (
                                <>
                                    {item.links!!.map((i, k) => (
                                        <PostLink key={k + '_' + i} href={i.url}>
                                            <span>{i.text}</span>
                                            <XIcon icon="launch" />
                                        </PostLink>
                                    ))}
                                </>
                            )}
                            {(item.activity && item.activity.length > 0) && (
                                <>
                                    {item.activity!!.map((i, k) => (
                                        <PostTag key={k + '_' + i}>{i}</PostTag>
                                    ))}
                                </>
                            )}
                        </XHorizontal>
                    </XVerticalStyled>
                </XHorizontal>
            </XVerticalStyled>
        </PostCardWrapper>
    );
};