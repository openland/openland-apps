import * as React from 'react';
import { XInfiniteListItem } from './withInfiniteList';
import { XCard } from './X/XCard';

export function ListCardContainer(props: { children: any; key?: string }) {
    return (
        <XInfiniteListItem key={props.key}>
            <XCard>
                {props.children}
            </XCard>
        </XInfiniteListItem>
    )
}

export function ListCardImageElement(props: { children: any; className?: string }) {
    return (
        <div className={`x-card--photo ${props.className}`}>
            {props.children}
        </div>
    )
}

export function ListCardTopBarElement(props: { children: any; className?: string }) {
    return (
        <div className={`x-card--top ${props.className}`}>
            {props.children}
        </div>
    )
}

export function ListCardDownBarElement(props: { children: any; className?: string }) {
    return (
        <div className={`x-card--bottom ${props.className}`}>
            {props.children}
        </div>
    )
}

export function ListCardWithImage(props: {cardImageChildren: any; cardTopBarChildren: any; cardDownBarChildren: any}) {
    return (
        <ListCardContainer>
            <ListCardImageElement>
                {props.cardImageChildren}
            </ListCardImageElement>
            <div className={'x-card--box'}>
                <ListCardTopBarElement>
                    {props.cardTopBarChildren}
                </ListCardTopBarElement>
                <ListCardDownBarElement>
                    {props.cardDownBarChildren}
                </ListCardDownBarElement>
            </div>
        </ListCardContainer>
    )
}

export function ListCardWithoutImage(props: {cardTopBarChildren: any; cardDownBarChildren: any}) {
    return (
        <ListCardContainer>
            <ListCardTopBarElement>
                {props.cardTopBarChildren}
            </ListCardTopBarElement>
            <ListCardDownBarElement>
                {props.cardDownBarChildren}
            </ListCardDownBarElement>
        </ListCardContainer>
    )
}