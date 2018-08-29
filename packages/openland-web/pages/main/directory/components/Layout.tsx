import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XScrollView } from 'openland-x/XScrollView';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XIcon } from 'openland-x/XIcon';
import OrganizationsIcon from '../icons/ic-organization-small.svg';
import CommunityIcon from '../icons/ic-community.svg';
import RightIcon from '../icons/ic-arrow-rignt.svg';
import { XVertical } from 'openland-x-layout/XVertical';

export const RootWrapper = Glamorous.div({
    height: '100vh',
    display: 'flex'
});

export const Sidebar = Glamorous.div({
    width: 300,
    height: '100%',
    background: '#f9fafb',
    borderRight: '1px solid rgba(216, 218, 229, 0.7)'
});

export const SidebarHeader = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    fontSize: 18,
    fontWeight: 500,
    lineHeight: '24px',
    letterSpacing: -0.5,
    color: '#334562',
    padding: '16px 16px 20px'
});

export const SidebarItemWrapper = Glamorous.div<{ active?: boolean }>([
    {
        borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    },
    (props) => (props.active) ? {
        background: 'rgba(245, 246, 247, 0.42)',
    } : {}
]);

export const SidebarItemLink = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    color: '#5c6a81',
    paddingTop: 14,
    paddingRight: 15,
    paddingBottom: 13,
    paddingLeft: 17,

    '& span': {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: 500,
    },

    '&:not(.is-active):hover': {
        color: '#1790ff',
        background: 'rgba(23, 144, 255, 0.05)',
        cursor: 'pointer !important',

        '& > div > svg > *': {
            opacity: 0.5,
            fill: '#1790ff',
        },
        '& > svg > g > path:last-child': {
            opacity: 0.5,
            fill: '#1790ff',
        },
    },
    '&:hover': {
        color: '#5c6a81',
        cursor: 'default !important'
    }
});

export const SidebarItemBody = Glamorous.div({
    padding: '3px 16px 16px 15px',
    height: 291 // ugly way to fix content jumping
});

export const Container = Glamorous.div({
    flex: 1,
    height: '100%',
    position: 'relative',
});

export const SearchRow = Glamorous.div({
    borderBottom: '1px solid rgba(220, 222, 228, 0.45)'
});

export const Results = Glamorous(XScrollView)({
    height: 'calc(100vh - 118px)'
});

export const SearchFormWrapper = Glamorous(XHorizontal)({
    paddingLeft: 14,
    paddingRight: 14,
    minHeight: 60,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between'
});

export const SearchFormContent = Glamorous(XHorizontal)({
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 5,
    '&:focus-within': {
        '& > svg > g > path:last-child': {
            fill: '#1790ff',
            opacity: 0.5
        },
    }
});

export const SearchFormIcon = Glamorous(XIcon)({
    marginRight: 5,
    fontSize: 20,
    color: '#c1c7cf',
});

export const SearchInput = Glamorous.input({
    height: '100%',
    minHeight: 40,
    paddingLeft: 9,
    lineHeight: 1.43,
    flexGrow: 1,
    '::placeholder': {
        fontWeight: 500,
        color: '#99A2B0'
    }
});

export const ResetButton = Glamorous.div({
    color: '#99a2b0',
    height: 32,
    lineHeight: '32px',
    fontSize: 14,
    letterSpacing: -0.2,
    fontWeight: 500,
    padding: '0 14px',
    cursor: 'pointer',
    '&:hover': {
        color: '#334562',
    },
    '&:active': {
        color: '#1790ff',
    },
});

export const SidebarItemHeadLink = (props: { isCommunity: boolean }) => (
    <SidebarItemLink path={props.isCommunity ? '/directory/communities' : '/directory'}>
        <XHorizontal separator={7} alignItems="center">
            {props.isCommunity ? <CommunityIcon /> : <OrganizationsIcon />}
            <span>{props.isCommunity ? 'Communities' : 'Organizations'}</span>
        </XHorizontal>
        <RightIcon />
    </SidebarItemLink>
);