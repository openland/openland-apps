import * as React from 'react';
import Glamorous from 'glamorous';
import { XIcon } from 'openland-x/XIcon';
import { XLink } from 'openland-x/XLink';

interface MenuItemProps {
    active?: boolean;
    disabled?: boolean;
    icon?: boolean;
    query?: { field: string, value?: string } | null;
}

export const MenuItem = Glamorous<MenuItemProps>(XLink)((props) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: props.active ? '#fff' : '#6638F0',
    width: props.icon ? 40 : (props.active ? 40 : 'auto'),
    height: props.icon ? 40 : (props.active ? 40 : 'auto'),
    backgroundColor: props.active ? '#553ed6' : undefined,
    fontSize: '15px',
    lineHeight: props.active ? '40px' : undefined,
    fontWeight: props.active ? 500 : 'normal',
    textAlign: props.active ? 'center' : undefined,
    margin: props.active ? '0 10px' : '0 20px',
    boxSizing: 'border-box',
    borderRadius: '25px',
    border: props.icon ? 'solid 1px #553ed6' : undefined,
    cursor: props.disabled ? 'default' : 'pointer',
    '&:hover': {
        color: props.disabled ? '#fff' : undefined
    },
    '&.icon': {
        width: '40px',
        height: '40px'
    }
}));

export const MenuSpread = Glamorous.span({
    display: 'block',
    fontSize: '15px',
    color: '#6638F0',
    margin: '0 20px'
});

interface XPagingProps {
    totalPages: number;
    currentPage: number;
    openEnded: boolean;
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | undefined;
}

interface PaginationWrapperProps {
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | undefined;
}

export const PaginationWrapper = Glamorous.div<PaginationWrapperProps>((props) => ({
    display: 'flex',
    flexShrink: 0,
    alignItems: 'center',
    alignSelf: props.alignSelf
}));

function XPageItem(props: { toPage: number, currentPage: number, disabled?: boolean }) {
    if (props.toPage > 0) {
        return (
            <MenuItem
                query={{ field: 'page', value: props.toPage.toString() }}
                active={props.currentPage === props.toPage}
                disabled={props.currentPage === props.toPage}
            >
                {props.toPage}
            </MenuItem>
        );
    } else {
        return <MenuItem query={{ field: 'page' }} disabled={props.currentPage === props.toPage} active={props.currentPage === props.toPage}>1</MenuItem>;
    }
}

export function XPaging(props: XPagingProps) {

    let elements = new Array<any>();
    if (props.currentPage > 1) {
        elements.push(
            <MenuItem key="page_prev" icon={true} query={{ field: 'page', value: (props.currentPage - 1).toString() }}>
                <XIcon icon="keyboard_arrow_left" className="icon" />
            </MenuItem>
        );
    }

    if (props.totalPages <= 5) {
        for (let i = 1; i <= props.totalPages; i++) {
            elements.push(
                <XPageItem key={'page_' + i} toPage={i} currentPage={props.currentPage} />
            );
        }
    } else {
        elements.push(
            <XPageItem key={'page_' + 1} toPage={1} currentPage={props.currentPage} />
        );
        if (props.currentPage <= 3) {
            for (let i = 2; i < 5 && i < props.totalPages; i++) {
                elements.push(
                    <XPageItem key={'page_' + i} toPage={i} currentPage={props.currentPage} />
                );
            }
            elements.push(
                <MenuSpread key={'spread'}>...</MenuSpread>
            );

        } else if (props.totalPages - props.currentPage < 3) {
            elements.push(
                <MenuSpread key={'spread'}>...</MenuSpread>
            );
            if (!props.openEnded) {
                for (let i = 2; i < 5; i++) {
                    elements.push(
                        <XPageItem 
                            key={'page_' + (props.totalPages - 5 + i)} 
                            toPage={props.totalPages - 5 + i}
                            currentPage={props.currentPage}
                        />
                    );
                }
            }
        } else {
            elements.push(
                <MenuSpread>...</MenuSpread>
            );
            for (let i = 0; i < 3; i++) {
                elements.push(
                    <XPageItem 
                        key={'page_' + (props.currentPage - 1 + i)} 
                        toPage={props.currentPage - 1 + i}
                        currentPage={props.currentPage} 
                    />
                );
            }
            elements.push(
                <MenuSpread key={'spread'}>...</MenuSpread>
            );
        }
        if (!props.openEnded) {
            elements.push(
                <XPageItem key={'page_' + (props.totalPages)} toPage={props.totalPages} currentPage={props.currentPage} />
            );
        }
    }

    if (props.currentPage < props.totalPages - 1) {
        elements.push(
            <MenuItem key="page_next" icon={true} query={{ field: 'page', value: (props.currentPage + 1).toString() }}>
                <XIcon icon="keyboard_arrow_right" />
            </MenuItem>
        );
    }

    return (
        <PaginationWrapper alignSelf={props.alignSelf}>
            {elements}
        </PaginationWrapper>
    );
}