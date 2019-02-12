import * as React from 'react';
import Glamorous from 'glamorous';
import { XHorizontal } from 'openland-x-layout/XHorizontal';
import { XVertical } from 'openland-x-layout/XVertical';
import CloseIcon from 'openland-icons/ic-close.svg';

const EditWrapper = Glamorous(XHorizontal)({
    paddingLeft: 14,
    paddingRight: 14,
});

const VerticalHidden = Glamorous(XVertical)({
    overflow: 'hidden',
});

const HorizontalHidden = Glamorous(XHorizontal)({
    overflow: 'hidden',
});

const BlueLine = Glamorous.div({
    width: 3,
    height: 36,
    borderRadius: 50,
    backgroundColor: '#1790ff',
    flexShrink: 0,
});

const EditTitle = Glamorous.div({
    opacity: 0.8,
    fontSize: 14,
    fontWeight: 600,
    color: '#000',
});

const EditText = Glamorous.div({
    opacity: 0.8,
    fontSize: 13,
    lineHeight: 1.69,
    color: '#000',
    minWidth: 0,
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
});

const EditCloseBtn = Glamorous.div({
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    '& > svg': {
        width: 16,
        height: 16,
    },
    '& > svg > path': {
        fill: '#BCC3CC',
    },
    '&:hover > svg > path': {
        fill: '#000000',
    },
});

export const EditView = (props: { title: string; message: string; onCancel: () => void }) => (
    <EditWrapper justifyContent="space-between" alignItems="center" separator={5}>
        <BlueLine />
        <HorizontalHidden
            flexGrow={1}
            separator={9}
            alignItems="center"
            justifyContent="space-between"
        >
            <VerticalHidden separator={1}>
                <EditTitle>{props.title}</EditTitle>
                <EditText>{props.message}</EditText>
            </VerticalHidden>
            <EditCloseBtn onClick={props.onCancel}>
                <CloseIcon />
            </EditCloseBtn>
        </HorizontalHidden>
    </EditWrapper>
);
