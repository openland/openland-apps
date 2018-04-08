import * as React from 'react';
import Glamorous from 'glamorous';
import { XLink } from '../X/XLink';

const ParcelShortListDiv = Glamorous.div({
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 290
});

const ParcelItem = Glamorous(XLink)({
    cursor: 'pointer',
    userSelect: 'none',
    width: '100%',
    flexGrow: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    textAlign: 'left',
    border: '1px solid #e6ebf1',
    borderTop: 'none',
    position: 'relative',
    '&.is-active': {
        color: '#6772e5',
        backgroundColor: '#f5f6f8',
        '&::after': {
            position: 'absolute',
            right: -10,
            top: 'calc(50% - 10px)',
            display: 'block',
            width: 0,
            height: 0,
            content: `''`,
            border: '5px solid transparent',	
            borderLeft: '5px solid #f5f6f8'
        },
        '&::before': {
            position: 'absolute',
            right: -12,
            top: 'calc(50% - 11px)',
            display: 'block',
            width: 0,
            height: 0,
            content: `''`,
            border: '6px solid transparent',	
            borderLeft: '6px solid #e6ebf1'
        }
    },
    '&:first-child': {
        borderTop: 'none'
    },
    '&:last-child': {
        borderBottom: 'none'
    }
});

const ParcelTitleText = Glamorous.div({
    fontSize: 16,
    fontWeight: 600,
    color: '#182642',
    marginBottom: 4,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
});

const ParcelAdressText = Glamorous.div({
    fontSize: 14,
    color: '#525f7f',
    marginBottom: 8,
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
});

const ParcelInfoText = Glamorous.div({
    fontSize: 14,
    lineHeight: 1.71,
    color: '#182642',
    width: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap'
});

interface ParcelShortItemProps {
    title: string;
    adress: string;
    info: string;
    path?: string;
    href?: string;
}

const ParcelShortItem = (props: ParcelShortItemProps) => (
    <ParcelItem path={props.path} href={props.href}>
        <ParcelTitleText>{props.title}</ParcelTitleText>
        <ParcelAdressText>{props.adress}</ParcelAdressText>
        <ParcelInfoText>{props.info}</ParcelInfoText>
    </ParcelItem>
);

export class ParcelShortList extends React.Component {
    static Item = ParcelShortItem;

    render() {
        return (
            <ParcelShortListDiv>
                {this.props.children}
            </ParcelShortListDiv>
        );
    }
}