import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from 'openland-x/XLink';
import { XScrollView } from 'openland-x/XScrollView';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XIcon } from 'openland-x/XIcon';
import { XButton } from 'openland-x/XButton';

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
        '&:first-child': {
            borderTop: 'none!important'
        }
    },
    (props) => (props.active) ? {
        background: 'rgba(245, 246, 247, 0.42)',
        borderTop: '1px solid rgba(220, 222, 228, 0.45)',
        borderBottom: '1px solid rgba(220, 222, 228, 0.45)',
    } : {}
]);

export const SidebarItemHead = Glamorous(XLink)({
    display: 'flex',
    alignItems: 'center',
    padding: '11px 11px 13px 16px',

    '& i:first-child': {
        fontSize: 20,
        marginRight: 12,
        color: '#bcc3cc'
    },

    '& span': {
        flex: 1,
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        whiteSpace: 'nowrap'
    },

    '& i:last-child': {
        fontSize: 16,
        marginLeft: 12,
        color: '#bcc3cc'
    },
});

export const SidebarItemBody = Glamorous.div({
    padding: '6px 16px 16px'
});

export const Container = Glamorous.div({
    flex: 1,
    height: '100%'
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

export const ResetButton = Glamorous(XButton)({
    color: '#99a2b0'
});

export class OrganizationsSidebarItemHead extends React.Component {
    render() {
        return (
            <SidebarItemHead path="/directory">
                <XIcon icon="star" />
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
                <XIcon icon="star" />
                <span>Communities</span>
                <XIcon icon="chevron_right" />
            </SidebarItemHead>
        );
    }
}