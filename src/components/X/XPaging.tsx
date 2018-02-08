import * as React from 'react';
import Glamorous from 'glamorous';
import { Menu, Icon } from 'semantic-ui-react';
import { XLink } from './XLink';

export const MenuItem = Glamorous(Menu.Item)({
    color: '#6638F0',
    fontSize: '15px',
    fontWeight: 'normal',
    margin: '0 20px',
    boxSizing: 'border-box',
    '&.active': {
        fontWeight: 500,
        margin: '0 10px',
        color: '#fff',
        width: '40px',
        height: '40px',
        borderRadius: '25px',
        backgroundColor: '#553ed6',
        textAlign: 'center',
        lineHeight: '40px'
    },
    '&.icon': {
        width: '40px',
        height: '40px',
        borderRadius: '25px',
        border: 'solid 1px #553ed6',
    }
})

interface XPagingProps {
    totalPages: number,
    currentPage: number,
    openEnded: boolean,
    alignSelf?: 'stretch' | 'flex-start' | 'flex-end' | 'center' | undefined;
}

export const PaginationWrapper = Glamorous(Menu)((props) => {
    return {
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        alignSelf: props.alignSelf
    }
})

function XPageItem(props: { toPage: number, currentPage: number }) {
    if (props.toPage > 0) {
        return (
            <MenuItem
                as={XLink}
                query={{ field: 'page', value: props.toPage.toString() }}
                active={props.currentPage === props.toPage}>
                {props.toPage}
            </MenuItem>
        );
    } else {
        return <MenuItem as={XLink} query={{ field: 'page' }} active={props.currentPage === props.toPage}>1</MenuItem>;
    }
}

export function XPaging(props: XPagingProps ) {

    let elements = new Array<any>();
    if (props.currentPage > 1) {
        elements.push(
            <MenuItem key="page_prev" as={XLink} query={{ field: 'page', value: props.currentPage - 1 }} icon={true}>
                <Icon name="chevron left" />
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
                <MenuItem key={'spread'} disabled={true}>...</MenuItem>
            );

        } else if (props.totalPages - props.currentPage < 3) {
            elements.push(
                <MenuItem key={'spread'} disabled={true}>...</MenuItem>
            );
            if (!props.openEnded) {
                for (let i = 2; i < 5; i++) {
                    elements.push(
                        <XPageItem key={'page_' + (props.totalPages - 5 + i)} toPage={props.totalPages - 5 + i}
                            currentPage={props.currentPage} />
                    );
                }
            }
        } else {
            elements.push(
                <MenuItem disabled={true}>...</MenuItem>
            );
            for (let i = 0; i < 3; i++) {
                elements.push(
                    <XPageItem key={'page_' + (props.currentPage - 1 + i)} toPage={props.currentPage - 1 + i}
                        currentPage={props.currentPage} />
                );
            }
            elements.push(
                <MenuItem key={'spread'} disabled={true}>...</MenuItem>
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
            <MenuItem key="page_next" as={XLink} query={{ field: 'page', value: props.currentPage + 1 }} icon={true}>
                <Icon name="chevron right" />
            </MenuItem>
        );
    }

    return (
        <PaginationWrapper alignSelf={props.alignSelf}>
            {elements}
        </PaginationWrapper>
    );
}