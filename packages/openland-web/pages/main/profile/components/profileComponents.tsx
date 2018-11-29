import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import { XCloudImage } from 'openland-x/XCloudImage';

interface XHorizontalStyledProps {
    borderRight?: boolean;
    borderBottom?: boolean;
    padding?: number;
    paddingLeft?: number;
    paddingRight?: number;
    paddingTop?: number;
    paddingBottom?: number;
    marginTop?: number | string;
    marginBottom?: number | string;
    maxwidth?: string | number;
}

export const XHorizontalStyled = Glamorous(XHorizontal)<XHorizontalStyledProps>(
    props => ({
        borderRight: props.borderRight
            ? '1px solid rgba(220, 222, 228, 0.45)'
            : undefined,
        borderBottom: props.borderBottom
            ? '1px solid rgba(220, 222, 228, 0.45)'
            : undefined,
        padding: props.padding,
        paddingLeft: props.paddingLeft,
        paddingRight: props.paddingRight,
        paddingTop: props.paddingTop,
        paddingBottom: props.paddingBottom,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        maxWidth: props.maxwidth,
    }),
);

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
    scrollable?: boolean;
    maxHeight?: number;
}

export const XVerticalStyled = Glamorous(XVertical)<XVerticalStyledProps>(
    props => ({
        borderRight: props.borderRight
            ? '1px solid rgba(220, 222, 228, 0.45)'
            : undefined,
        borderBottom: props.borderBottom
            ? '1px solid rgba(220, 222, 228, 0.45)'
            : undefined,
        padding: props.padding,
        paddingLeft: props.paddingLeft,
        paddingRight: props.paddingRight,
        paddingTop: props.paddingTop,
        paddingBottom: props.paddingBottom,
        marginTop: props.marginTop,
        marginBottom: props.marginBottom,
        overflowY: props.scrollable ? 'scroll' : undefined,
        maxHeight: props.maxHeight,
    }),
);

interface TitleProps {
    opacity?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
}

export const Title = Glamorous.div<TitleProps>(props => ({
    opacity: props.opacity,
    fontSize: 15,
    fontWeight: 500,
    lineHeight: 1.33,
    color: '#334562',
    letterSpacing: -0.2,
    marginBottom: props.marginBottom,
    marginLeft: props.marginLeft,
    marginRight: props.marginRight,
}));

interface TextProps {
    opacity?: number;
    bold?: boolean;
    fontWeight?: any;
    letterSpacing?: number;
    lineHeight?: string | number;
    upperCase?: boolean;
    marginBottom?: number;
    marginTop?: number;
    small?: boolean;
}

export const Text = Glamorous.div<TextProps>(props => ({
    display: 'flex',
    alignItems: 'center',
    fontSize: props.small ? 14 : 15,
    lineHeight:
        props.lineHeight !== undefined
            ? props.lineHeight
            : props.small
                ? 1.43
                : 1.33,
    color: '#334562',
    opacity: props.opacity,
    fontWeight:
        props.fontWeight !== undefined
            ? props.fontWeight
            : props.bold
                ? 500
                : undefined,
    letterSpacing:
        props.letterSpacing !== undefined
            ? props.letterSpacing
            : props.bold
                ? -0.3
                : undefined,
    textTransform: props.upperCase ? 'capitalize' : undefined,
    marginBottom: props.marginBottom,
    marginTop: props.marginTop,
}));

export const CardWrapper = Glamorous.div({
    border: '1px solid rgba(220, 222, 228, 0.4)',
    borderRadius: 5,
    backgroundColor: '#fff',
});

export const CardTitle = Glamorous.div<{ maxWidth?: number }>(props => ({
    fontSize: 18,
    lineHeight: 1.11,
    letterSpacing: 0.6,
    color: '#334562',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    maxWidth: props.maxWidth ? props.maxWidth : '100%',
}));

export const CardPhoto = Glamorous(XCloudImage)({
    borderRadius: 4,
    margin: 'auto',
});

export const CardPath = Glamorous.div({
    display: 'flex',
    alignItems: 'center',
    fontSize: 14,
    fontWeight: 500,
    lineHeight: 1.14,
    letterSpacing: -0.3,
    color: '#334562',
    '& > span': {
        opacity: 0.5,
    },
    '& > img': {
        width: 11,
        height: 11,
        objectFit: 'contain',
        marginRight: 4,
        marginLeft: 4,
        marginTop: 3,
    },
});

export const AdditionalLink = Glamorous(XLink)({
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
        marginRight: 8,
    },
    '& > i': {
        fontSize: 20,
        color: '#bcc3cc',
    },
    '&:hover': {
        backgroundColor: 'rgb(236, 237, 240)',
        color: '#334562',
    },
});

export const OpportunitiesMainWrapper = Glamorous.div({
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '&:first-child': {
        '& > div': {
            '&:first-child': {
                paddingTop: 24,
            },
            '&:last-child': {
                paddingTop: 16,
            },
        },
    },
    '&:last-child': {
        '& > div': {
            '&:first-child': {
                paddingBottom: 24,
            },
            '&:last-child': {
                paddingBottom: 16,
            },
        },
    },
    '@media (max-width: 950px)': {
        flexDirection: 'column',
        borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
        paddingBottom: 16,
        '&:last-child': {
            borderBottom: 'none',
        },
    },
});

export const OpportunitiesWrapper = Glamorous.div<{ marginBottom?: number }>(
    props => ({
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        marginBottom: props.marginBottom,
    }),
);

interface OpportunitiesTextWrapperProps {
    width?: number;
    paddingTop?: number;
    paddingBottom?: number;
    paddingLeft?: number;
    paddingRight?: number;
}

export const OpportunitiesTextWrapper = Glamorous.div<
    OpportunitiesTextWrapperProps
>(props => ({
    width: props.width ? props.width : 226,
    height: '100%',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    alignSelf: 'flex-start',
    paddingLeft: props.paddingLeft,
    paddingRight: props.paddingRight,
    paddingTop: props.paddingTop !== undefined ? props.paddingTop : 10,
    paddingBottom:
        props.paddingBottom !== undefined ? props.paddingBottom : undefined,
    '@media (max-width: 950px)': {
        '&.main-tags-text': {
            paddingTop: '16px !important',
            paddingBottom: '0 !important',
            width: '100%',
            height: 'auto',
            justifyContent: 'flex-start',
        },
    },
}));

export const OpportunitiesValueWrapper = Glamorous.div<{
    bordered?: boolean;
    paddingTop?: number;
}>(props => ({
    maxWidth: '100%',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    flexGrow: 1,
    padding: '0 25px',
    borderLeft: props.bordered
        ? '1px solid rgba(220, 222, 228, 0.45)'
        : undefined,
    paddingTop: props.paddingTop
        ? `${props.paddingTop}px !important`
        : undefined,
    '@media (max-width: 950px)': {
        '&.main-tags-value': {
            width: '100%',
            borderLeft: 'none',
            paddingTop: '16px !important',
            paddingBottom: '0 !important',
        },
    },
}));

export const TagWrapper = Glamorous.div({
    display: 'flex',
    flexWrap: 'wrap',
});

export const Tag = Glamorous.div({
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
    padding: '0px 9px 1px',
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
});

interface TagRowProps {
    children?: any;
    title: string;
    titlePadding?: boolean;
    text?: string;
    bordered?: boolean;
    isTextStyle?: boolean;
    isTagStyle?: boolean;
    paddingLeft?: number;
    valuePaddingTop?: number;
    marginBottom?: number;
}

interface TagRowMapProps {
    title: string;
    items: string[];
    bordered?: boolean;
    paddingLeft?: number;
    isOnlyTagComponent?: boolean;
}

export const TagRowMapMain = (props: TagRowMapProps) => (
    <OpportunitiesMainWrapper>
        <OpportunitiesTextWrapper paddingLeft={24} className="main-tags-text">
            <Text bold={true}>{props.title}</Text>
        </OpportunitiesTextWrapper>
        <OpportunitiesValueWrapper bordered={true} className="main-tags-value">
            {props.items.map((s, k) => (
                <Tag key={k + '_' + s}>{s}</Tag>
            ))}
        </OpportunitiesValueWrapper>
    </OpportunitiesMainWrapper>
);

export const TagRowCard = (props: TagRowProps) => (
    <OpportunitiesWrapper marginBottom={props.marginBottom}>
        <OpportunitiesTextWrapper
            width={150}
            paddingLeft={props.paddingLeft}
            paddingTop={props.isTagStyle || props.titlePadding ? 10 : 0}
        >
            <Text bold={true}>{props.title}</Text>
        </OpportunitiesTextWrapper>
        <OpportunitiesValueWrapper
            bordered={props.bordered}
            paddingTop={props.valuePaddingTop}
        >
            {props.isTextStyle && <Text lineHeight={1.53}>{props.text}</Text>}
            {props.isTagStyle && <Tag>{props.text}</Tag>}
            {props.children}
        </OpportunitiesValueWrapper>
    </OpportunitiesWrapper>
);

export const TagRowMapCard = (props: TagRowMapProps) => (
    <OpportunitiesWrapper>
        <OpportunitiesTextWrapper
            width={150}
            paddingLeft={props.paddingLeft}
            paddingTop={10}
        >
            <Text bold={true}>{props.title}</Text>
        </OpportunitiesTextWrapper>
        <OpportunitiesValueWrapper bordered={props.bordered}>
            {props.items.map((s, k) => (
                <Tag key={k + '_' + s}>{s}</Tag>
            ))}
        </OpportunitiesValueWrapper>
    </OpportunitiesWrapper>
);
