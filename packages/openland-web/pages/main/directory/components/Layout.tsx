import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XScrollView } from 'openland-x/XScrollView';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XIcon } from 'openland-x/XIcon';
import OrganizationsIcon from '../icons/ic-organization-small.svg';
import CommunityIcon from '../icons/ic-community.svg';

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

export const SidebarList = Glamorous.div({
    
});

export const SidebarItem = Glamorous.div<{ active?: boolean }>([
    {
        borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    },
    (props) => (props.active) ? {
        background: 'rgba(245, 246, 247, 0.42)',
    } : {}
]);

export const SidebarItemHead = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    padding: '14px 11px 13px 14px',
    color: '#5c6a81',

    '& i:first-child': {
        fontSize: 20,
        marginRight: 12,
        color: '#bcc3cc'
    },

    '& svg': {
        width: 20,
        marginRight: 10,

        '& > *': {
            fill: '#bcc3cc'
        }
    },

    '& span': {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap',
        fontWeight: 500,
    },

    '& i:last-child': {
        fontSize: 16,
        marginLeft: 12,
        color: '#bcc3cc'
    },

    '&:hover': {
        color: '#1790ff',
        background: 'rgba(23, 144, 255, 0.05)',

        '& svg > *': {
            opacity: 0.5,
            fill: '#1790ff',
        },

        '& i': {
            opacity: 0.5,
            color: '#1790ff',
        },
    },
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

export const ContentView = Glamorous.div({
    
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
    paddingBottom: 10
});

export const SearchFormIcon = Glamorous(XIcon)({
    marginRight: 5,
    fontSize: 20,
    color: '#c1c7cf',
});

export const SearchInput = Glamorous.input({
    height: '100%',
    minHeight: 40,
    paddingLeft: 5,
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

export class OrganizationsSidebarItemHead extends React.Component {
    render() {
        return (
            <SidebarItemHead path="/directory">
                <OrganizationsIcon />
                <span>Organizations</span>
                <XIcon icon="chevron_right" />
            </SidebarItemHead>
        );
    }
}

export class CommunitiesSidebarItemHead extends React.Component {
    render() {
        return (
            <SidebarItemHead path="/directory/communities">
                <CommunityIcon />
                <span>Communities</span>
                <XIcon icon="chevron_right" />
            </SidebarItemHead>
        );
    }
}