import * as React from 'react';
import Glamorous from 'glamorous';

const XTagWrapper = Glamorous.div({
    maxWidth: '100%',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    height: 25,
    borderRadius: 4,
    backgroundColor: '#edf3fe',
    whiteSpace: 'nowrap',
    fontSize: 11,
    fontWeight: 500,
    letterSpacing: 0.2,
    lineHeight: '24px',
    color: '#4285f4',
    padding: '0px 8px 1px',
    marginRight: 8,
    marginTop: 4,
    marginBottom: 4,
});

export function XTag(props: { title: string }) {
    return (
        <XTagWrapper>{props.title}</XTagWrapper>
    );
}