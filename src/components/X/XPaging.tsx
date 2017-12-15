import * as React from 'react';
import { Menu, Icon } from 'semantic-ui-react';
import { XLink } from './XLink';

function XPageItem(props: { toPage: number, currentPage: number }) {
    if (props.toPage > 0) {
        return <Menu.Item as={XLink} query={{ field: 'page', value: props.toPage.toString() }} active={props.currentPage === props.toPage}>{props.toPage}</Menu.Item>;
    } else {
        return <Menu.Item as={XLink} query={{ field: 'page' }} active={props.currentPage === props.toPage}>1</Menu.Item>;
    }
}

export function XPaging(props: { totalPages: number, currentPage: number }) {

    var elements = new Array<any>();
    if (props.currentPage > 1) {
        elements.push(
            <Menu.Item key="page_prev" as={XLink} query={{ field: 'page', value: props.currentPage - 1 }} icon={true}>
                <Icon name="chevron left" />
            </Menu.Item>
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
                <Menu.Item disabled={true}>...</Menu.Item>
            );

        } else if (props.totalPages - props.currentPage < 3) {
            elements.push(
                <Menu.Item disabled={true}>...</Menu.Item>
            );
            for (let i = 2; i < 5; i++) {
                elements.push(
                    <XPageItem key={'page_' + (props.totalPages - 5 + i)} toPage={props.totalPages - 5 + i} currentPage={props.currentPage} />
                );
            }
        } else {
            elements.push(
                <Menu.Item disabled={true}>...</Menu.Item>
            );
            for (let i = 0; i < 3; i++) {
                elements.push(
                    <XPageItem key={'page_' + (props.currentPage - 1 + i)} toPage={props.currentPage - 1 + i} currentPage={props.currentPage} />
                );
            }
            elements.push(
                <Menu.Item disabled={true}>...</Menu.Item>
            );
        }
        elements.push(
            <XPageItem key={'page_' + (props.totalPages)} toPage={props.totalPages} currentPage={props.currentPage} />
        );
    }

    if (props.currentPage < props.totalPages - 1) {
        elements.push(
            <Menu.Item key="page_next" as={XLink} query={{ field: 'page', value: props.currentPage + 1 }} icon={true}>
                <Icon name="chevron right" />
            </Menu.Item>
        );
    }

    return (
        <Menu floated="right" pagination={true}>
            {elements}
        </Menu>
    );
}