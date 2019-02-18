import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import AddIcon from 'openland-icons/ic-add-medium.svg';
import { XLink, XLinkProps } from 'openland-x/XLink';

const Wrapper = Glamorous(XHorizontal)({
    height: 62,
    paddingLeft: 16,
    paddingRight: 16,
    flexShrink: 0,
    cursor: 'pointer',
    marginLeft: -16,
    marginRight: -16,
    paddingTop: 2,
    borderRadius: 8,
    alignItems: 'center',
    '&:hover': {
        backgroundColor: '#F9F9F9',
    },
});

const Icon = Glamorous.div<{ colorus: boolean }>(props => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: 20,
    background: '#ffffff',

    '& svg': {
        width: props.colorus ? undefined : 16,
        height: props.colorus ? undefined : 16,
    },

    '& svg *': {
        fill: props.colorus ? '#1790ff' : undefined,
    },
}));

const Text = Glamorous.div({
    fontSize: 14,
    fontWeight: 600,
    color: '#000000',
    lineHeight: '20px',
    letterSpacing: 0,
});

interface XCreateCardProps extends XLinkProps {
    text: string;
    icon?: any;
}

export const XCreateCard = (props: XCreateCardProps) => {
    let { text, ...other } = props;

    return (
        <XLink {...other}>
            <Wrapper separator={8}>
                <Icon colorus={!props.icon}>{props.icon ? props.icon : <AddIcon />}</Icon>
                <Text>{text}</Text>
            </Wrapper>
        </XLink>
    );
};
